import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkerService } from "./services/worker.service";
import { WorkerController } from "./controllers/worker.controller";
import { Worker } from "./entities/worker.entity";
import { WorkerCategory } from "./entities/worker-category.entity";
import { WorkerRepository } from "./repositories/worker.repository";
import { WorkerCategoryRepository } from "./repositories/worker-category.repository";
import { WorkerCategoryController } from "./controllers/worker-category.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Worker, WorkerCategory])],
  controllers: [WorkerController],
  providers: [
    WorkerRepository,
    WorkerService,
    WorkerCategoryRepository,
    WorkerCategoryController,
  ],
})
export class WorkerModule {}
