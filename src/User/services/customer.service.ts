import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/customer.entity";
import { CustomerRepository } from "../repositories/customer.repository";

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async createCustomer({
    sub,
    email,
  }: {
    sub: string;
    email: string;
  }): Promise<Customer> {
    try {
      const customer = this.customerRepository.create({ sub, email });

      console.log("🐛 - customer.service.ts - customer:", customer);
      console.info("INFO: customer created", customer);
      return this.customerRepository.save(customer);
    } catch (error) {
      console.error("Error creating customer", error);
      throw error;
    }
  }

  async getCustomerById(id: number): Promise<Customer | null> {
    return this.customerRepository.findOne({
      where: { id },
      relations: ["product"],
    });
  }

  // async geAllUsers(): Promise<User[]> {
  //   return this.customerRepository.find({
  //     relations: ["product"],
  //   });
  // }
}
