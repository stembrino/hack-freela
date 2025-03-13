import { Controller, Get, UseGuards, Req, Request } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { GoogleUser } from "../interfaces/google-user";
import { AuthGuard } from "@nestjs/passport";
import { Permissions } from "../decorators/roles.decorator";
import { PermissionsGuard } from "../guards/permissions.guard";
import { Role, RolePermissions } from "../enums/roles.enum";
import { RedisUserService } from "src/redis/services/redis-user.service";
import { GoogleCustomerAuthGuard } from "../guards/google-customer-auth.guard";
import { GoogleWorkerAuthGuard } from "../guards/google-worker-auth.guard";

interface GoogleUserRequest extends Request {
  user: GoogleUser;
}

@Controller("auth/google")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisUserService: RedisUserService,
  ) {}

  @Get("customer")
  @UseGuards(GoogleCustomerAuthGuard)
  async googleAuthCustomer() {}

  @Get("worker")
  @UseGuards(GoogleWorkerAuthGuard)
  async googleAuthWorker() {}

  @Get("customer/redirect")
  @UseGuards(GoogleCustomerAuthGuard)
  async googleCustomerRedirect(@Req() req: GoogleUserRequest) {
    return this.authService.customerGoogleLogin(req.user);
  }

  @Get("worker/redirect")
  @UseGuards(GoogleWorkerAuthGuard)
  async googleWorkerRedirect(@Req() req: GoogleUserRequest) {
    return this.authService.workerGoogleLogin(req.user);
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
