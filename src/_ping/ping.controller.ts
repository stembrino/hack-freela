import { Controller, Get, UseGuards } from "@nestjs/common";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { AuthGuard } from "@nestjs/passport";
import { Role, RolePermissions } from "src/auth/enums/roles.enum";
import { Permissions } from "src/auth/decorators/roles.decorator";
import { RedisUserService } from "src/redis/services/redis-user.service";

@UseGuards(AuthGuard("jwt"), PermissionsGuard)
@Controller("ping")
export class PingController {
  constructor(private readonly redisUserService: RedisUserService) {}

  @Get()
  ping() {
    return { ping: "pong" };
  }

  @Permissions(...RolePermissions[Role.USER])
  @Get()
  pingRole() {
    return { ping: "pong" };
  }
}
