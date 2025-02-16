// src/auth/services/user.service.ts
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string): Promise<User> {
    try {
      const user = this.userRepository.create({ email });

      console.info("INFO: user created", user);
      return this.userRepository.save(user);
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async geAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
