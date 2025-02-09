import { Controller, Get, UseGuards, Req, Request } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { GoogleAuthGuard } from "../guards/google-auth.guard";
import { GoogleUser } from "../interfaces/google-user";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../decorators/roles.decorator";
import { PermissionsGuard } from "../guards/permissions.guard";
import { Role, RolePermissions } from "../enums/roles.enum";

interface GoogleUserRequest extends Request {
  user: GoogleUser;
}

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get("google")
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {}

  @Get("google/redirect")
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: GoogleUserRequest) {
    const authResult = this.authService.googleLogin(req.user);
    return authResult;
  }

  @UseGuards(AuthGuard("jwt"), PermissionsGuard)
  @Permissions(...RolePermissions[Role.USER])
  @Get("profile")
  getProfile(@Request() req: { user: GoogleUser }) {
    return req.user;
  }
}
