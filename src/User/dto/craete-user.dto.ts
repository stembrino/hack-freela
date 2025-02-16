import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;
}
