import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWorkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
