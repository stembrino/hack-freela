import { Permission } from "./permissions.enum";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const RolePermissions = {
  [Role.USER]: [Permission.READ_USER],
  [Role.ADMIN]: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.ADMIN,
    // Permission.DIMOND,
  ],
};
