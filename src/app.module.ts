import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { PingModule } from "./_ping/ping.module";
import { DatabaseModule } from "./database/database.module";
import { CustomerModule } from "./user/customer.module";
import { WorkerModule } from "./worker/worker.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || "dev"}`,
      isGlobal: true,
    }),
    AuthModule,
    PingModule,
    DatabaseModule,
    CustomerModule,
    WorkerModule,
  ],
})
export class AppModule {}
