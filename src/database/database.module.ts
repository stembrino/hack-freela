import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { Customer } from "src/user/entities/customer.entity";
import { Worker } from "src/worker/entities/worker.entity";
import { WorkerCategory } from "src/worker/entities/worker-category.entity";
import { WorkerCategoryExperience } from "src/worker/entities/worker-category-experience.entity";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "mysql",
        host: process.env.DB_HOST,
        port: (process.env.DB_PORT || 3306) as number,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [Customer, Worker, WorkerCategory, WorkerCategoryExperience],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
