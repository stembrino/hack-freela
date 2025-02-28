import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Worker } from "../entities/worker.entity";

@Injectable()
export class WorkerRepository extends Repository<Worker> {
  constructor(private dataSource: DataSource) {
    super(Worker, dataSource.createEntityManager());
  }
}
