// filepath: /Users/rdn346/Fabio/hack-freela/src/user/user.service.ts
import { Injectable } from "@nestjs/common";
import { RedisUserRepository } from "../repositories/redis-user.repository";

@Injectable()
export class RedisUserService {
  constructor(private readonly userRepository: RedisUserRepository) {}

  async debug() {
    return await this.userRepository.getAllUsers();
  }

  async createUser(sub: string, email: string): Promise<void> {
    await this.userRepository.setUser(sub, email);
  }

  async getUser(sub: string): Promise<any> {
    return this.userRepository.getUser(sub);
  }

  async deleteUser(sub: string): Promise<void> {
    await this.userRepository.deleteUser(sub);
  }

  async hasUser(sub: string): Promise<boolean> {
    return this.userRepository.hasUser(sub);
  }
}
