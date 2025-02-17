import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PingModule } from "./_ping/ping.module";
import { DatabaseModule } from "./database/database.module";
import { UserModule } from "./user/user.module";
import { ProductModule } from "./product/product.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || "dev"}`,
      isGlobal: true,
    }),
    AuthModule,
    PingModule,
    DatabaseModule,
    UserModule,
    ProductModule,
  ],
})
export class AppModule {}
