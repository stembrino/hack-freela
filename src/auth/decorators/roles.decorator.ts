import { SetMetadata } from "@nestjs/common";
import {
  UserPermission,
  WorkerPrmission,
  CustomerPermission,
} from "../enums/permissions.enum";

export const Permissions = (
  ...permissions: UserPermission[] | WorkerPrmission[] | CustomerPermission[]
) => SetMetadata("permissions", permissions);
