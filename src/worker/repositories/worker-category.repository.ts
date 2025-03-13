import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { WorkerCategory } from "../entities/worker-category.entity";

@Injectable()
export class WorkerCategoryRepository extends Repository<WorkerCategory> {
  constructor(private dataSource: DataSource) {
    super(WorkerCategory, dataSource.createEntityManager());
  }
}
