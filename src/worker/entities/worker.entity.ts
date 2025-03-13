import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { WorkerCategory } from "./worker-category.entity";

@Entity()
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @ManyToOne(() => WorkerCategory)
  @JoinColumn({ name: "categoryId" })
  category: WorkerCategory;
}
