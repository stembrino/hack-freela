import { Controller, Get, UseGuards } from "@nestjs/common";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { AuthGuard } from "@nestjs/passport";
import { RedisUserService } from "src/redis/services/redis-user.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { GoogleUser } from "src/auth/interfaces/google-user";

@UseGuards(AuthGuard("jwt"), PermissionsGuard)
@Controller("ping")
export class PingController {
  constructor(private readonly redisUserService: RedisUserService) {}

  @Get()
  ping() {
    return { ping: "pong" };
  }

  @Get("pong")
  pingRole(@CurrentUser() user: GoogleUser) {
    return { ping: "ping", user };
  }
}
