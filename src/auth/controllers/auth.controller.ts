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

@Controller("auth/google")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisUserService: RedisUserService,
  ) {}

  @Get()
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get("redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: GoogleUserRequest) {
    const authResult = this.authService.googleLogin(req.user);
    return authResult;
  }

  @Get("profile")
  @Permissions(...RolePermissions[Role.USER])
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  getProfile(@Request() { user }: { user: GoogleUser }) {
    console.info("INFO: user", user);
    return user;
  }

  @Get("debug")
  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  async getDebug() {
    const debug = await this.redisUserService.debug();

    return { debug };
  }
}
