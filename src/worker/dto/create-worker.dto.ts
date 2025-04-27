import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWorkerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsNotEmpty()
  @IsNumber()
  experienceYears: number;
}
