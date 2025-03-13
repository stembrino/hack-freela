import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { GoogleCustomerStrategy } from "./strategies/google-customer.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule } from "@nestjs/config";
import { RedisModule } from "src/redis/redis.module";
import { CustomerModule } from "src/user/customer.module";
import { GoogleWorkerStrategy } from "./strategies/google-worker.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1d" },
      }),
    }),
    RedisModule,
    CustomerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleCustomerStrategy,
    GoogleWorkerStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
