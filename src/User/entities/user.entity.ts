// src/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @Unique(["email"])
  email: string;
}
