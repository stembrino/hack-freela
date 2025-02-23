import { DataSource } from "typeorm";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });

export const AppDataSource = new DataSource({
  type: "mysql", // Change this to your DB type if needed (e.g., "postgres")
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/src/**/*.entity.js"],
  migrations: ["dist/db/migrations/*"],
  synchronize: false, // Set to false in production (use migrations instead)
  logging: true, // Enable logging (optional, can be turned off in production)
});
