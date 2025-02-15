// src/auth/services/user.service.ts
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(username: string, email: string): Promise<User> {
    const user = this.userRepository.create({ username, email });

    return this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async geAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
