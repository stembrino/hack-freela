// filepath: /Users/rdn346/Fabio/hack-freela/src/user/user.repository.ts
import { Inject, Injectable } from "@nestjs/common";
import { Redis } from "ioredis";

@Injectable()
export class RedisUserRepository {
  constructor(@Inject("RedisClient") private readonly redis: Redis) {}

  async setUser(sub: string, email: string): Promise<boolean> {
    try {
      await this.redis.set(`user:${sub}`, email);
      return true;
    } catch (e) {
      console.error("Error storing user in redis", e);
      return false;
    }
  }

  async getUser(sub: string): Promise<any> {
    const user = await this.redis.get(`user:${sub}`);
    return user ? JSON.parse(user) : null;
  }

  async deleteUser(sub: string): Promise<void> {
    await this.redis.del(`user:${sub}`);
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
      return user;
    });
  }

  async hasUser(sub: string): Promise<boolean> {
    try {
      return !!(await this.redis.exists(`user:${sub}`));
    } catch (e) {
      console.error("Error checking user in redis", e);
      return false;
    }
  }
}
