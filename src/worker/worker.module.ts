import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WorkerService } from "./services/worker.service";
import { WorkerController } from "./controllers/worker.controller";
import { Worker } from "./entities/worker.entity";
import { WorkerCategory } from "./entities/worker-category.entity";
import { WorkerRepository } from "./repositories/worker.repository";
import { WorkerCategoryRepository } from "./repositories/worker-category.repository";
import { WorkerCategoryExperience } from "./entities/worker-category-experience.entity";
import { WorkerCategoryExperienceRepository } from "./repositories/worker-category-experience.repository";
import { WorkerCategoryExperienceService } from "./services/worker-category-experience.service";

@Module({
  imports: [TypeOrmModule.forFeature([Worker, WorkerCategory])],
  controllers: [WorkerController],
  providers: [
    WorkerRepository,
    WorkerService,
    WorkerCategoryRepository,
    WorkerCategoryExperience,
    WorkerCategoryExperienceRepository,
    WorkerCategoryExperienceService,
  ],
})
export class WorkerModule {}
