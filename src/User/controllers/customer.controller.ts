import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { CustomerService } from "../services/driver.service";

@Controller("user")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class UserController {
  constructor(private readonly customerService: CustomerService) {}

  // @Get()
  // async getUser() {
  //   const user = await this.customerService.geAllUsers();
  //   return { user: user };
  // }

  @Get(":id")
  async getUserById(@Param() param: { id: number }) {
    const customer = await this.customerService.getCustomerById(param.id);
    return { customer: customer };
  }
}
