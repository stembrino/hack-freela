import { Permission } from "../enums/permissions.enum";

export interface User {
  name: string;
  email: string;
  permissions: Permission[];
}

export interface GoogleUser extends User {
  sub: string;
  photo: string;
}
