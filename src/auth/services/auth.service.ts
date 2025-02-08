import { Injectable } from "@nestjs/common";
import { GoogleUser } from "../interfaces/google-user";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async googleLogin(user: GoogleUser) {
    const token = await this.jwtService.signAsync(user);
    return { token };
  }

  // validateUser(token: string): Promise<{ userId: string; username: string }> {
  //   const decoded = this.jwtService.verify(token);
  //   return { userId: decoded.sub, username: decoded.username };
  // }
}
