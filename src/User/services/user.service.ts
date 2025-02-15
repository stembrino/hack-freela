// src/auth/services/user.service.ts
import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(username: string, email: string): Promise<User> {
    const user = this.userRepository.create({ username, email });

    return this.userRepository.save(user);
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
}
