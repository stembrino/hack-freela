import { Injectable } from "@nestjs/common";
import { Worker } from "../entities/worker.entity";
import { WorkerCategoryRepository } from "../repositories/worker-category.repository";
import { WorkerRepository } from "../repositories/worker.repository";

@Injectable()
export class WorkerService {
  constructor(
    private workerRepository: WorkerRepository,
    private workerCategoryRepository: WorkerCategoryRepository,
  ) {}

  async createWorker(name: string, categoryId: number): Promise<Worker> {
    const category = await this.workerCategoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    const worker = this.workerRepository.create({ name, category });
    return this.workerRepository.save(worker);
  }

  async findAllWorkers(): Promise<Worker[]> {
    return this.workerRepository.find({ relations: ["category"] });
  }

  //   async updateWorker(
  //     id: number,
  //     name: string,
  //     categoryId: number,
  //   ): Promise<Worker> {
  //     const worker = await this.workerRepository.findOne(id);
  //     if (!worker) {
  //       throw new Error("Worker not found");
  //     }
  //     const category = await this.workerCategoryRepository.findOne(categoryId);
  //     if (!category) {
  //       throw new Error("Category not found");
  //     }
  //     worker.name = name;
  //     worker.category = category;
  //     return this.workerRepository.save(worker);
  //   }

  async deleteWorker(id: number): Promise<void> {
    await this.workerRepository.delete(id);
  }
}
