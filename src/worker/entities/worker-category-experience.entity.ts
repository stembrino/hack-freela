import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WorkerCategory } from "./worker-category.entity";
import { Worker } from "./worker.entity";

@Entity()
export class WorkerCategoryExperience {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Worker, (worker) => worker.experiences)
  worker: Worker;

  @ManyToOne(() => WorkerCategory)
  category: WorkerCategory;

  @Column()
  experienceYears: number;
}
