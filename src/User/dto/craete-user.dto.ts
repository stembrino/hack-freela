import { Trim } from "class-sanitizer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDTO {
  @IsNotEmpty({ message: "Username is required" })
  @IsString({ message: "Username must be a string" })
  @MinLength(3, { message: "Username must be at least 3 characters" })
  @Trim()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Trim()
  email: string;
}
