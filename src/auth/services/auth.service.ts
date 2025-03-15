import { Injectable } from "@nestjs/common";
import { GoogleUser } from "../interfaces/google-user";
import { JwtService } from "@nestjs/jwt";
import { RedisUserService } from "src/redis/services/redis-user.service";
import { CustomerService } from "src/user/services/customer.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly rediService: RedisUserService,
    private readonly userService: CustomerService,
  ) {}

  customerGoogleLogin(user: GoogleUser) {
    const token = this.jwtService.sign(user);
    return { token };
  }

  workerGoogleLogin(user: GoogleUser) {
    const token = this.jwtService.sign(user);
    return { token };
  }

  refreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify<GoogleUser>(token);
      // @ts-expect-error Intentionally ignore unused vars
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { iat, exp, ...tokenData } = decoded;
      const newToken = this.jwtService.sign({ ...tokenData });

      return newToken;
    } catch (e) {
      throw new Error(`Invalid token, error: ${e}`);
    }
  }
}
