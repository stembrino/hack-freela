import { Module, Global } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Redis } from "ioredis";
import { RedisUserService } from "./services/redis-user.service";
import { RedisUserRepository } from "./repositories/redis-user.repository";

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: "RedisClient",
      useFactory: () => {
        const redisInstance = new Redis({
          host: process.env.REDIS_HOST,
          port: +(process.env.REDIS_PORT || 6379),
          password: process.env.REDIS_PASSWORD,
        });

        redisInstance.on("error", (e) => {
          throw new Error(`Redis connection failed: ${e}`);
        });

        return redisInstance;
      },
      inject: [ConfigService],
    },
    RedisUserService,
    RedisUserRepository,
  ],
  exports: [RedisUserService, RedisUserRepository],
})
export class RedisModule {}
