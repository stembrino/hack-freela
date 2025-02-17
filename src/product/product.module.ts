import { Module } from "@nestjs/common";
import { ProductRepository } from "./repositories/product.repository";
import { Product } from "./entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductController } from "./controllers/product.controller";
import { ProductService } from "./services/product.service";

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
