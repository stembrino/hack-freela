import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { UserService } from "../services/user.service";
import { CreateUserDTO } from "../dto/craete-user.dto";

@Controller("user")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param() param: { id: number }) {
    const user = await this.userService.getUserById(param.id);
    return { user: user };
  }

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createUser(@Body() createuserDto: CreateUserDTO) {
    const user = await this.userService.createUser(
      createuserDto.username,
      createuserDto.email,
    );
    return { user: user };
  }
}
