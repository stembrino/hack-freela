// src/auth/services/user.service.ts
import { Injectable } from "@nestjs/common";
import { ProductRepository } from "../repositories/product.repository";
import { CreateProductDto } from "../dto/product.dto";

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(product: CreateProductDto): Promise<CreateProductDto> {
    try {
      const productCreated = this.productRepository.create(product);
      return this.productRepository.save(productCreated);
    } catch (error) {
      console.error("Error creating user", error);
      throw error;
    }
  }
}
