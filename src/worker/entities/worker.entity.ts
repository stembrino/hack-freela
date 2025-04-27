import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { WorkerCategoryExperience } from "./worker-category-experience.entity";

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => WorkerCategoryExperience, (wce) => wce.worker, {
    cascade: true,
  })
  experiences?: WorkerCategoryExperience[];
}
