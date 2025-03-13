import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserPermission } from "../enums/permissions.enum";
import { User } from "../interfaces/google-user";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.get<UserPermission[]>(
      "permissions",
      context.getHandler(),
    );
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest<{ user: User }>();
    const { user } = request;
    if (!user) {
      console.warn("No user found in request");
      return false;
    }
    const userPermissions: string[] = user.permissions;

    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
