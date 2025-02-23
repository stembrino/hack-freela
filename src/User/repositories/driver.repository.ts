import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { Driver } from "../entities/driver.entity";

@Injectable()
export class DriverRepository extends Repository<Driver> {
  constructor(private dataSource: DataSource) {
    super(Driver, dataSource.createEntityManager());
  }
}
