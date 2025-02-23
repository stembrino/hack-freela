import { Injectable } from "@nestjs/common";
import { DriverRepository } from "../repositories/driver.repository";
import { Driver } from "../entities/driver.entity";

@Injectable()
export class DriverService {
  constructor(private readonly driverRepository: DriverRepository) {}

  async createDriver({
    sub,
    email,
  }: {
    sub: string;
    email: string;
  }): Promise<Driver> {
    try {
      const driver = this.driverRepository.create({ sub, email });

      console.info("INFO: driver created", driver);
      return this.driverRepository.save(driver);
    } catch (error) {
      console.error("Error creating driver", error);
      throw error;
    }
  }

  // async geAllUsers(): Promise<User[]> {
  //   return this.customerRepository.find({
  //     relations: ["product"],
  //   });
  // }
}
