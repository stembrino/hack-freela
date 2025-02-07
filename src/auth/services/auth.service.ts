import { Injectable } from '@nestjs/common';
import { GoogleUser } from '../interfaces/google-user';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  googleLogin(user: GoogleUser) {
    const token = this.jwtService.sign(user, {
      secret: process.env.JWT_SECRET,
    });
    return { token };
  }

  // validateUser(token: string): Promise<{ userId: string; username: string }> {
  //   const decoded = this.jwtService.verify(token);
  //   return { userId: decoded.sub, username: decoded.username };
  // }
}
