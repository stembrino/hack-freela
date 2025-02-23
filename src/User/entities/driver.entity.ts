import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from "typeorm";

@Entity()
export class Driver {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  @Unique(["sub"])
  sub: string;

  @Column()
  @Unique(["email"])
  email: string;

  @Column({ type: "varchar", length: 20 })
  phone: string;

  @Column({ type: "varchar", length: 50 })
  vehicleType: string;

  @Column({ type: "varchar", length: 20 })
  licensePlate: string;

  @Column({ type: "boolean", default: true })
  available: boolean;

  @Column({ type: "float", default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
