import { Injectable } from "@nestjs/common";
import { Worker } from "../entities/worker.entity";
import { WorkerCategoryRepository } from "../repositories/worker-category.repository";
import { WorkerRepository } from "../repositories/worker.repository";
import { CreateWorkerDto } from "../dto/create-worker.dto";
import { WorkerCategoryExperienceService } from "./worker-category-experience.service";

@Injectable()
export class WorkerService {
  constructor(
    private wRepository: WorkerRepository,
    private wCategoryRepository: WorkerCategoryRepository,
    private wExperienceService: WorkerCategoryExperienceService,
  ) {}

  async createWorker(workerData: CreateWorkerDto): Promise<Worker> {
    // TODO: improve category vall: using cache, check if use Redis or jusct cache in memory
    const category = await this.wCategoryRepository.findOne({
      where: { id: workerData.categoryId },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    const worker = this.wRepository.create({
      ...workerData,
    });
    return this.wRepository.save(worker);
  }

  async addExperienceToWorker(
    workerId: number,
    experienceData: any,
  ): Promise<any> {
    const worker = await this.wRepository.findOne({
      where: { id: workerId },
    });
    if (!worker) {
      throw new Error("Worker not found");
    }
    return this.wExperienceService.addExperienceToWorker(
      worker.id,
      experienceData,
    );
  }

  async findAllWorkers(): Promise<Worker[]> {
    return this.wRepository.find({
      relations: ["experiences", "experiences.category"],
    });
  }

  async deleteWorker(id: number): Promise<void> {
    await this.wRepository.delete(id);
  }
}
