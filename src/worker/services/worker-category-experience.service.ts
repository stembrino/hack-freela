import { Injectable } from "@nestjs/common";
import { WorkerCategoryExperienceRepository } from "../repositories/worker-category-experience.repository";
import { WorkerCategoryExperience } from "../entities/worker-category-experience.entity";

@Injectable()
export class WorkerCategoryExperienceService {
  constructor(
    private wCategoryExperienceService: WorkerCategoryExperienceRepository,
  ) {}

  async addExperienceToWorker(
    workerId: number,
    experienceData: WorkerCategoryExperience,
  ): Promise<any> {
    const experience = this.wCategoryExperienceService.create({
      ...experienceData,
      worker: { id: workerId },
    });

    return this.wCategoryExperienceService.save(experience);
  }
}
