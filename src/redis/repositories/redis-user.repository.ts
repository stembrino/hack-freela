// filepath: /Users/rdn346/Fabio/hack-freela/src/user/user.repository.ts
import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisUserRepository {
  constructor(@Inject("RedisClient") private readonly redis: Redis) {}

  async setUser(id: string, user: any): Promise<void> {
    await this.redis.set(`${id}`, JSON.stringify(user));
  }

  async getUser(id: string): Promise<any> {
    const user = await this.redis.get(`user:${id}`);
    return user ? JSON.parse(user) : null;
  }

  async deleteUser(id: string): Promise<void> {
    await this.redis.del(`user:${id}`);
  }

  async getAllUsers(): Promise<string[]> {
    const keys = await this.redis.keys("*");
    console.debug("DEBUG: keys:", keys);
    if (keys.length === 0) {
      return [];
    }
    const values = (await this.redis.mget(keys)) as string[];
    console.debug("DEBUG values:", values);
    return values.map((user) => {
      return JSON.parse(user) as string;
    });
  }
}
