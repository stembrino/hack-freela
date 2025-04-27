import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { WorkerCategoryExperience } from "../entities/worker-category-experience.entity";

@Injectable()
export class WorkerCategoryExperienceRepository extends Repository<WorkerCategoryExperience> {
  constructor(private dataSource: DataSource) {
    super(WorkerCategoryExperience, dataSource.createEntityManager());
  }
}
