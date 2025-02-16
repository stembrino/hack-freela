import { Injectable } from "@nestjs/common";
import { GoogleUser } from "../interfaces/google-user";
import { JwtService } from "@nestjs/jwt";
import { RedisUserService } from "src/redis/services/redis-user.service";
import { UserService } from "src/User/services/user.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly rediService: RedisUserService,
    private readonly userService: UserService,
  ) {}

  async googleLogin(user: GoogleUser) {
    const token = this.jwtService.sign(user);
    const hasStoredUser = await this.rediService.hasUser(user.sub);
    if (hasStoredUser) {
      return { token };
    }
    await this.rediService.createUser(user.sub, user.email);
    await this.userService.createUser(user.email);
    return { token };
  }

  // validateUser(token: string): Promise<{ userId: string; username: string }> {
  //   const decoded = this.jwtService.verify(token);
  //   return { userId: decoded.sub, username: decoded.username };
  // }
}
