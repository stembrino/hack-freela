import { Controller, Get, UseGuards, Req, Request } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { GoogleAuthGuard } from "../guards/google-auth.guard";
import { GoogleUser } from "../interfaces/google-user";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../decorators/roles.decorator";
import { PermissionsGuard } from "../guards/permissions.guard";
import { Role, RolePermissions } from "../enums/roles.enum";
import { RedisUserService } from "src/redis/services/redis-user.service";

interface GoogleUserRequest extends Request {
  user: GoogleUser;
}

@UseGuards(AuthGuard("jwt"), PermissionsGuard)
@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisUserService: RedisUserService,
  ) {}

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: GoogleUserRequest) {
    const authResult = this.authService.googleLogin(req.user);
    return authResult;
  }

  @Permissions(...RolePermissions[Role.USER])
  @Get("profile")
  getProfile(@Request() { user }: { user: GoogleUser }) {
    return user;
  }

  @Get("debug")
  async getDebug(@Request() { user }: { user: GoogleUser }) {
    await this.redisUserService.createUser(
      Math.random().toString(),
      user.email,
    );
    const debug = await this.redisUserService.debug();

    return { debug };
  }
}
