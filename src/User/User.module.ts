import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./entities/customer.entity";
import { CustomerRepository } from "./repositories/customer.repository";
import { UserController } from "./controllers/customer.controller";
import { CustomerService } from "./services/driver.service";
import { DriverRepository } from "./repositories/driver.repository";
import { DriverService } from "./services/customer.service copy";

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [UserController],
  providers: [
    DriverService,
    CustomerService,
    DriverRepository,
    CustomerRepository,
  ],
  exports: [CustomerService, DriverService],
})
export class UserModule {}
