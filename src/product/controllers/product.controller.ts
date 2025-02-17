import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { PermissionsGuard } from "src/auth/guards/permissions.guard";
import { CreateProductDto } from "../dto/product.dto";
import { ProductService } from "../services/product.service";

@Controller("product")
@UseGuards(AuthGuard("jwt"), PermissionsGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() body: CreateProductDto) {
    const productCreated = await this.productService.createProduct({
      name: body.name,
      price: body.price,
      imageUrl: body.imageUrl,
      stock: body.stock,
      active: body.active,
      userSub: body.userSub,
    });

    return productCreated;
  }
}
