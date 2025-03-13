import {
  CustomerPermission,
  UserPermission,
  WorkerPrmission,
} from "./permissions.enum";

export enum Role {
  CUSTOMER = "CUSTOMER",
  WORKER = "WOKER",
  ADMIN = "ADMIN",
  USER = "USER",
}

export const RolePermissions = {
  [Role.CUSTOMER]: [
    CustomerPermission.CREATE_CUSTOMER,
    CustomerPermission.READ_CUSTOMER,
    CustomerPermission.UPDATE_CUSTOMER,
    CustomerPermission.DELETE_CUSTOMER,
    CustomerPermission.CUSTOMER,
  ],
  [Role.WORKER]: [
    WorkerPrmission.CREATE_WORKER,
    WorkerPrmission.READ_WORKER,
    WorkerPrmission.UPDATE_WORKER,
    WorkerPrmission.DELETE_WORKER,
    WorkerPrmission.WORKER,
  ],
  [Role.USER]: [
    UserPermission.CREATE_USER,
    UserPermission.READ_USER,
    UserPermission.UPDATE_USER,
    UserPermission.DELETE_USER,
    UserPermission.ADMIN,
    // Permission.DIMOND,
  ],
};
