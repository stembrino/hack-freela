import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { WorkerCategory } from "./worker-category.entity";

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => WorkerCategory)
  category: WorkerCategory;
}
