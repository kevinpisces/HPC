/**
 * Copyright (c) 2022 Peking University and Peking University Institute for Computing and Digital Economy
 * SCOW is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import { OperationEvent, OperationType as LibOperationType, OperationTypeEnum } from "@scow/lib-operation-log";
import { Static, Type } from "@sinclair/typebox";
import { ValueOf } from "next/dist/shared/lib/constants";
import { Lang } from "react-typed-i18n";
import { prefix } from "src/i18n";
import en from "src/i18n/en";
import { nullableMoneyToString } from "src/utils/money";

export const OperationResult = {
  UNKNOWN: 0,
  SUCCESS: 1,
  FAIL: 2,
} as const;

export type OperationResult = ValueOf<typeof OperationResult>

export const OperationType: OperationTypeEnum = {
  login: "login",
  logout: "logout",
  submitJob: "submitJob",
  endJob: "endJob",
  addJobTemplate: "addJobTemplate",
  deleteJobTemplate: "deleteJobTemplate",
  updateJobTemplate: "updateJobTemplate",
  shellLogin: "shellLogin",
  createDesktop: "createDesktop",
  deleteDesktop: "deleteDesktop",
  createApp: "createApp",
  createFile: "createFile",
  deleteFile: "deleteFile",
  uploadFile: "uploadFile",
  createDirectory: "createDirectory",
  deleteDirectory: "deleteDirectory",
  moveFileItem: "moveFileItem",
  copyFileItem: "copyFileItem",
  setJobTimeLimit: "setJobTimeLimit",
  createUser: "createUser",
  addUserToAccount: "addUserToAccount",
  removeUserFromAccount: "removeUserFromAccount",
  setAccountAdmin: "setAccountAdmin",
  unsetAccountAdmin: "unsetAccountAdmin",
  blockUser: "blockUser",
  unblockUser: "unblockUser",
  accountSetChargeLimit: "accountSetChargeLimit",
  accountUnsetChargeLimit: "accountUnsetChargeLimit",
  setTenantBilling: "setTenantBilling",
  setTenantAdmin: "setTenantAdmin",
  unsetTenantAdmin: "unsetTenantAdmin",
  setTenantFinance: "setTenantFinance",
  unsetTenantFinance: "unsetTenantFinance",
  tenantChangePassword: "tenantChangePassword",
  createAccount: "createAccount",
  addAccountToWhitelist: "addAccountToWhitelist",
  removeAccountFromWhitelist: "removeAccountFromWhitelist",
  accountPay: "accountPay",
  blockAccount: "blockAccount",
  unblockAccount: "unblockAccount",
  importUsers: "importUsers",
  setPlatformAdmin: "setPlatformAdmin",
  unsetPlatformAdmin: "unsetPlatformAdmin",
  setPlatformFinance: "setPlatformFinance",
  unsetPlatformFinance: "unsetPlatformFinance",
  platformChangePassword: "platformChangePassword",
  setPlatformBilling: "setPlatformBilling",
  createTenant: "createTenant",
  tenantPay: "tenantPay",
  submitFileItemAsJob: "submitFileItemAsJob",
};

export const OperationLog = Type.Object({
  operationLogId: Type.Number(),
  operatorUserId: Type.String(),
  operatorUserName: Type.String(),
  operatorIp: Type.String(),
  operationResult: Type.Enum(OperationResult),
  operationTime: Type.Optional(Type.String()),
  operationEvent: Type.Any(),
});
export type OperationLog = Static<typeof OperationLog>;

export enum OperationLogQueryType {
  USER = 0,
  ACCOUNT = 1,
  TENANT = 2,
  PLATFORM = 3,
};

type OperationTextsTransType = (id: Lang<typeof en>, args?: React.ReactNode[]) => string;
const pRes = prefix("operationLog.resultTexts.");
const pTypes = prefix("operationLog.operationTypeTexts.");
const pDetails = prefix("operationLog.operationDetails.");

export const getOperationResultTexts = (t: OperationTextsTransType) => {

  return {
    [OperationResult.UNKNOWN]: t(pRes("unknown")),
    [OperationResult.SUCCESS]: t(pRes("success")),
    [OperationResult.FAIL]: t(pRes("fail")),
  };

};

export const getOperationTypeTexts = (t: OperationTextsTransType): { [key in LibOperationType]: string } => {

  return {
    login: t(pTypes("login")),
    logout: t(pTypes("logout")),
    submitJob: t(pTypes("submitJob")),
    endJob: t(pTypes("endJob")),
    addJobTemplate: t(pTypes("addJobTemplate")),
    deleteJobTemplate: t(pTypes("deleteJobTemplate")),
    updateJobTemplate: t(pTypes("updateJobTemplate")),
    shellLogin: t(pTypes("shellLogin")),
    createDesktop: t(pTypes("createDesktop")),
    deleteDesktop: t(pTypes("deleteDesktop")),
    createApp: t(pTypes("createApp")),
    createFile: t(pTypes("createFile")),
    deleteFile: t(pTypes("deleteFile")),
    uploadFile: t(pTypes("uploadFile")),
    createDirectory: t(pTypes("createDirectory")),
    deleteDirectory: t(pTypes("deleteDirectory")),
    moveFileItem: t(pTypes("moveFileItem")),
    copyFileItem: t(pTypes("copyFileItem")),
    setJobTimeLimit: t(pTypes("setJobTimeLimit")),
    createUser: t(pTypes("createUser")),
    addUserToAccount: t(pTypes("addUserToAccount")),
    removeUserFromAccount: t(pTypes("removeUserFromAccount")),
    setAccountAdmin: t(pTypes("setAccountAdmin")),
    unsetAccountAdmin: t(pTypes("unsetAccountAdmin")),
    blockUser: t(pTypes("blockUser")),
    unblockUser: t(pTypes("unblockUser")),
    accountSetChargeLimit: t(pTypes("accountSetChargeLimit")),
    accountUnsetChargeLimit: t(pTypes("accountUnsetChargeLimit")),
    setTenantBilling: t(pTypes("setTenantBilling")),
    setTenantAdmin: t(pTypes("setTenantAdmin")),
    unsetTenantAdmin: t(pTypes("unsetTenantAdmin")),
    setTenantFinance: t(pTypes("setTenantFinance")),
    unsetTenantFinance: t(pTypes("unsetTenantFinance")),
    tenantChangePassword: t(pTypes("tenantChangePassword")),
    createAccount: t(pTypes("createAccount")),
    addAccountToWhitelist: t(pTypes("addAccountToWhitelist")),
    removeAccountFromWhitelist: t(pTypes("removeAccountFromWhitelist")),
    accountPay: t(pTypes("accountPay")),
    blockAccount: t(pTypes("blockAccount")),
    unblockAccount: t(pTypes("unblockAccount")),
    importUsers: t(pTypes("importUsers")),
    setPlatformAdmin: t(pTypes("setPlatformAdmin")),
    unsetPlatformAdmin: t(pTypes("unsetPlatformAdmin")),
    setPlatformFinance: t(pTypes("setPlatformFinance")),
    unsetPlatformFinance: t(pTypes("unsetPlatformFinance")),
    platformChangePassword: t(pTypes("platformChangePassword")),
    setPlatformBilling: t(pTypes("setPlatformBilling")),
    createTenant: t(pTypes("createTenant")),
    tenantPay: t(pTypes("tenantPay")),
    submitFileItemAsJob: t(pTypes("submitFileItemAsJob")),
  };

};

export const OperationCodeMap: { [key in LibOperationType]: string } = {
  login: "000001",
  logout: "000002",
  submitJob: "010101",
  endJob: "010102",
  addJobTemplate: "010103",
  deleteJobTemplate: "010104",
  updateJobTemplate: "010105",
  shellLogin: "010201",
  createDesktop: "010301",
  deleteDesktop: "010302",
  createApp: "010401",
  createFile: "010501",
  createDirectory: "010502",
  uploadFile: "010503",
  deleteFile: "010504",
  deleteDirectory: "010505",
  moveFileItem: "010506",
  copyFileItem: "010507",
  submitFileItemAsJob: "010508",
  setJobTimeLimit: "010601",
  createUser: "020201",
  addUserToAccount: "020202",
  removeUserFromAccount: "020203",
  setAccountAdmin: "020204",
  unsetAccountAdmin: "020205",
  blockUser: "020206",
  unblockUser: "020207",
  accountSetChargeLimit: "020208",
  accountUnsetChargeLimit: "020209",
  setTenantBilling: "030101",
  setTenantAdmin: "030202",
  unsetTenantAdmin: "030203",
  setTenantFinance: "030204",
  unsetTenantFinance: "030205",
  tenantChangePassword: "030206",
  createAccount: "030301",
  addAccountToWhitelist: "030302",
  removeAccountFromWhitelist: "030303",
  accountPay: "030304",
  blockAccount: "030305",
  unblockAccount: "030306",
  importUsers: "040101",
  setPlatformAdmin: "040201",
  unsetPlatformAdmin: "040202",
  setPlatformFinance: "040203",
  unsetPlatformFinance: "040204",
  platformChangePassword: "040205",
  setPlatformBilling: "040206",
  createTenant: "040301",
  tenantPay: "040302",
};

type OperationTextsArgsTransType = (id: Lang<typeof en>, args?: React.ReactNode[]) => string | React.ReactNode;

export const getOperationDetail = (
  operationEvent: OperationEvent,
  t: OperationTextsTransType,
  tArgs: OperationTextsArgsTransType,
) => {

  try {
    if (!operationEvent) {
      return "";
    }

    const logEvent = operationEvent.$case;

    switch (logEvent) {
    case "login":
      return t(pDetails("login"));
    case "logout":
      return t(pDetails("logout"));
    case "submitJob":
      return t(pDetails("submitJob"), [operationEvent[logEvent].accountName, operationEvent[logEvent].jobId]);
    case "endJob":
      return t(pDetails("endJob"), [operationEvent[logEvent].jobId]);
    case "addJobTemplate":
      return t(pDetails("addJobTemplate"), [operationEvent[logEvent].jobTemplateId]);
    case "deleteJobTemplate":
      return t(pDetails("deleteJobTemplate"), [operationEvent[logEvent].jobTemplateId]);
    case "updateJobTemplate":
      return t(pDetails("updateJobTemplate"),
        [operationEvent[logEvent].jobTemplateId, operationEvent[logEvent].newJobTemplateId]);
    case "shellLogin":
      return t(pDetails("shellLogin"), [operationEvent[logEvent].clusterId, operationEvent[logEvent].loginNode]);
    case "createDesktop":
      return t(pDetails("createDesktop"), [operationEvent[logEvent].desktopName, operationEvent[logEvent].wm]);
    case "deleteDesktop":
      return t(pDetails("deleteDesktop"),
        [operationEvent[logEvent].loginNode, operationEvent[logEvent].desktopId]);
    case "createApp":
      return t(pDetails("createApp"), [operationEvent[logEvent].accountName, operationEvent[logEvent].jobId]);
    case "createFile":
      return t(pDetails("createFile"), [operationEvent[logEvent].path]);
    case "deleteFile":
      return t(pDetails("deleteFile"), [operationEvent[logEvent].path]);
    case "uploadFile":
      return t(pDetails("uploadFile"), [operationEvent[logEvent].path]);
    case "createDirectory":
      return t(pDetails("createDirectory"), [operationEvent[logEvent].path]);
    case "deleteDirectory":
      return t(pDetails("deleteDirectory"), [operationEvent[logEvent].path]);
    case "moveFileItem":
      return t(pDetails("moveFileItem"), [operationEvent[logEvent].fromPath, operationEvent[logEvent].toPath]);
    case "copyFileItem":
      return t(pDetails("copyFileItem"), [operationEvent[logEvent].fromPath, operationEvent[logEvent].toPath]);
    case "setJobTimeLimit":
      return t(pDetails("setJobTimeLimit"),
        [operationEvent[logEvent].jobId, Math.abs(operationEvent[logEvent].limitMinutes)]);
    case "createUser":
      return t(pDetails("createUser"), [operationEvent[logEvent].userId]);
    case "addUserToAccount":
      return t(pDetails("addUserToAccount"),
        [operationEvent[logEvent].userId, operationEvent[logEvent].accountName]);
    case "removeUserFromAccount":
      return t(pDetails("removeUserFromAccount"),
        [operationEvent[logEvent].userId, operationEvent[logEvent].accountName]);
    case "setAccountAdmin":
      return t(pDetails("setAccountAdmin"),
        [operationEvent[logEvent].userId, operationEvent[logEvent].accountName]);
    case "unsetAccountAdmin":
      return t(pDetails("unsetAccountAdmin"),
        [operationEvent[logEvent].userId, operationEvent[logEvent].accountName]);
    case "blockUser":
      return t(pDetails("blockUser"), [operationEvent[logEvent].accountName, operationEvent[logEvent].userId]);
    case "unblockUser":
      return t(pDetails("unblockUser"), [operationEvent[logEvent].accountName, operationEvent[logEvent].userId]);
    case "accountSetChargeLimit":
      return t(pDetails("accountSetChargeLimit"),
        [operationEvent[logEvent].accountName,
          operationEvent[logEvent].userId,
          nullableMoneyToString(operationEvent[logEvent].limit)]);
    case "accountUnsetChargeLimit":
      return t(pDetails("accountUnsetChargeLimit"),
        [operationEvent[logEvent].accountName, operationEvent[logEvent].userId]);
    case "setTenantBilling":
      return t(pDetails("setTenantBilling"),
        [operationEvent[logEvent].tenantName,
          operationEvent[logEvent].path,
          nullableMoneyToString(operationEvent[logEvent].price)]);
    case "setTenantAdmin":
      return t(pDetails("setTenantAdmin"), [operationEvent[logEvent].userId, operationEvent[logEvent].tenantName]);
    case "unsetTenantAdmin":
      return t(pDetails("unsetTenantAdmin"),
        [operationEvent[logEvent].userId, operationEvent[logEvent].tenantName]);
    case "setTenantFinance":
      return t(pDetails("setTenantFinance"),
        [operationEvent[logEvent].userId, operationEvent[logEvent].tenantName]);
    case "unsetTenantFinance":
      return t(pDetails("unsetTenantFinance"),
        [operationEvent[logEvent].userId, operationEvent[logEvent].tenantName]);
    case "tenantChangePassword":
      return t(pDetails("tenantChangePassword"), [operationEvent[logEvent].userId]);
    case "createAccount":
      return t(pDetails("createAccount"),
        [operationEvent[logEvent].accountName, operationEvent[logEvent].accountOwner]);
    case "addAccountToWhitelist":
      return t(pDetails("addAccountToWhitelist"),
        [operationEvent[logEvent].accountName, operationEvent[logEvent].tenantName]);
    case "removeAccountFromWhitelist":
      return t(pDetails("removeAccountFromWhitelist"),
        [operationEvent[logEvent].accountName, operationEvent[logEvent].tenantName]);
    case "accountPay":
      return t(pDetails("accountPay"),
        [operationEvent[logEvent].accountName, nullableMoneyToString(operationEvent[logEvent].amount)]);
    case "blockAccount":
      return t(pDetails("blockAccount"),
        [operationEvent[logEvent].tenantName, operationEvent[logEvent].accountName]);
    case "unblockAccount":
      return t(pDetails("unblockAccount"),
        [operationEvent[logEvent].tenantName, operationEvent[logEvent].accountName]);
    case "importUsers":
      return `${t(pDetails("importUsers1"), [operationEvent[logEvent].tenantName])}${
        operationEvent[logEvent].importAccounts.map(
          (account: { accountName: string; userIds: string[];}) =>
            (tArgs(pDetails("importUsers2"), [account.accountName, account.userIds.join("、")])),
        ).join(", ")}`;
    case "setPlatformAdmin":
      return t(pDetails("setPlatformAdmin"), [operationEvent[logEvent].userId]);
    case "unsetPlatformAdmin":
      return t(pDetails("unsetPlatformAdmin"), [operationEvent[logEvent].userId]);
    case "setPlatformFinance":
      return t(pDetails("setPlatformFinance"), [operationEvent[logEvent].userId]);
    case "unsetPlatformFinance":
      return t(pDetails("unsetPlatformFinance"), [operationEvent[logEvent].userId]);
    case "platformChangePassword":
      return t(pDetails("platformChangePassword"), [operationEvent[logEvent].userId]);
    case "createTenant":
      return t(pDetails("createTenant"),
        [operationEvent[logEvent].tenantName, operationEvent[logEvent].tenantAdmin]);
    case "tenantPay":
      return t(pDetails("tenantPay"),
        [operationEvent[logEvent].tenantName, nullableMoneyToString(operationEvent[logEvent].amount)]);
    case "setPlatformBilling":
      return t(pDetails("setPlatformBilling"),
        [operationEvent[logEvent].path, nullableMoneyToString(operationEvent[logEvent].price)]);
    case "submitFileItemAsJob":
      return t(pDetails("submitFileItemAsJob"), [operationEvent[logEvent].clusterId, operationEvent[logEvent].path]);
    default:
      return "-";
    }
  } catch (e) {
    return "-";
  }
};
