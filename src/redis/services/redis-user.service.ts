// filepath: /Users/rdn346/Fabio/hack-freela/src/user/user.service.ts
import { Injectable } from "@nestjs/common";
import { RedisUserRepository } from "../repositories/redis-user.repository";

@Injectable()
export class RedisUserService {
  constructor(private readonly userRepository: RedisUserRepository) {}

  async debug() {
    return await this.userRepository.getAllUsers();
  }

  async createUser(id: string, user: any): Promise<void> {
    await this.userRepository.setUser(id, user);
  }

  async getUser(id: string): Promise<any> {
    return this.userRepository.getUser(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
