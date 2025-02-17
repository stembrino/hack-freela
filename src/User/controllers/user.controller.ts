import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { UserService } from "../services/user.service";

@Controller("user")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    const user = await this.userService.geAllUsers();
    return { user: user };
  }

  @Get(":id")
  async getUserById(@Param() param: { id: number }) {
    const user = await this.userService.getUserById(param.id);
    return { user: user };
  }
}
