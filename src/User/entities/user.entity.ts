import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from "typeorm";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Unique(["email"])
  sub: string;

  @Column()
  @Unique(["email"])
  email: string;

  @OneToMany(() => Product, (product) => product.user)
  product: Product[];
}
