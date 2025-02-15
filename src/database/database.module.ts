import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../User/entities/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost", // Use the service name defined in docker-compose.yaml
      port: 3306, // default MySQL port
      username: "root", // replace with your MySQL username
      password: "fabio", // replace with your MySQL password
      database: "hack-freela", // replace with your MySQL database name
      entities: [User],
      synchronize: true, // Set to false in production
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
