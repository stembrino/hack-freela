import helmet from "helmet";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV || "dev"}` });
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap().catch((err) => {
  console.error("Error during bootstrap:", err);
});
