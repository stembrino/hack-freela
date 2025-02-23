import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { DriverService } from "../services/customer.service copy";

@Controller("driver")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Get()
  getUser() {
    return { driver: "hello world driver" };
  }
}
