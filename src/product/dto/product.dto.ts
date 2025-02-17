import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDecimal,
} from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  price: number;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  userSub: string;
}
