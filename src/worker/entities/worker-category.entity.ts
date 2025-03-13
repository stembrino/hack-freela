import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class WorkerCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;
}
