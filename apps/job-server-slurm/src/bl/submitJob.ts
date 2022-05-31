import { Logger } from "@ddadaal/tsgrpc-server";
import { NodeSSH } from "node-ssh";
import { join } from "path";
import { config } from "src/config/env";
import { JobInfo } from "src/generated/portal/job";
import { loggedExec } from "src/plugins/ssh";
import { SFTPWrapper } from "ssh2";
import { promisify } from "util";

export function parseSbatchOutput(output: string): number {
  // Submitted batch job 34987
  const splitted = output.split(" ");
  return +splitted[splitted.length - 1];
}

export interface JobMetadata {
  jobName: string;
  account: string;
  partition?: string;
  qos?: string;
  nodeCount: number;
  coreCount: number;
  maxTime: number;
  command: string;
  comment?: string;
  submitTime: string;
}

export function generateJobScript(jobInfo: JobInfo) {
  const { jobName, account, coreCount, maxTime, nodeCount, partition, qos, command } = jobInfo;

  let script = "#!/bin/bash\n";

  function append(param: string) {
    script += "#SBATCH " + param + "\n";
  }

  append("-A " + account);
  append("--partition=" + partition);
  append("--qos=" + qos);
  append("-J " + jobName);
  append("--nodes=" + nodeCount);
  append("-c " + coreCount);
  append("--time=" + maxTime);

  script += "\n";
  script += command;

  return script;
}

export const sftpExists = (sftp: SFTPWrapper, path: string) => new Promise<boolean>((res) => {
  sftp.stat(path, (err) => res(err === undefined));
});

interface SubmitJobParams {
  jobInfo: JobInfo;
  logger: Logger;
  ssh: NodeSSH;
  env?: NodeJS.ProcessEnv;
}

export const JOB_SCRIPT_NAME = "job.sh";
export const JOB_METADATA_NAME = "metadata.json";

type SubmitJobResult =
  | { code: "OK", jobId: number, dir: string, metadata: JobMetadata, sftp: SFTPWrapper }
  | { code: "ALREADY_EXISTS", dir: string }
  | { code: "SBATCH_FAILED", message: string };

export async function submitJob(params: SubmitJobParams): Promise<SubmitJobResult> {

  const { jobInfo, logger, ssh, env } = params;

  const script = generateJobScript(jobInfo);

  const sftp = await ssh.requestSFTP();

  // create a dir named job name
  const dir = join(config.JOBS_DIR, jobInfo.jobName);

  // mkdir JOBS_DIR
  await ssh.mkdir(config.JOBS_DIR);

  // Query if job folder exists
  if (await sftpExists(sftp, dir)) {
    return { code: "ALREADY_EXISTS", dir };
  }

  await ssh.mkdir(dir);

  const metadata: JobMetadata = {
    ...jobInfo,
    submitTime: new Date().toISOString(),
  };

  const writeFile = promisify(sftp.writeFile.bind(sftp));

  // saved metadata json
  await writeFile(join(dir, JOB_METADATA_NAME), JSON.stringify(metadata));

  const scriptPath = join(dir, JOB_SCRIPT_NAME);
  // write the script to the target path
  await writeFile(scriptPath, script);

  // use sbatch to allocate the script
  const { code, stderr, stdout } = await loggedExec(ssh, logger, false,
    "sbatch", [JOB_SCRIPT_NAME],
    { cwd: dir, stream: "both", execOptions: { env } },
  );

  if (code !== 0) {
    return { code: "SBATCH_FAILED", message: stderr };
  }

  // parse stdout output to get the job id
  const jobId = parseSbatchOutput(stdout);

  return { code: "OK", jobId, dir, metadata, sftp };

}