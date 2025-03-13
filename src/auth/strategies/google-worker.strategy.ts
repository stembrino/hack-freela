import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { GoogleUser } from "../interfaces/google-user";
import { Role, RolePermissions } from "../enums/roles.enum";

@Injectable()
export class GoogleWorkerStrategy extends PassportStrategy(
  Strategy,
  "google-worker",
) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_WORKER_CALLBACK_URL,
      scope: ["email", "profile"],
    });
  }

  validate(
    accessToken: string,
    refreshToken: string,
    profile: {
      id: string;
      displayName: string;
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done: (error: any, user?: any) => void,
  ) {
    const { id, displayName, emails, photos } = profile;
    const user: GoogleUser = {
      sub: id,
      name: displayName,
      email: emails[0]?.value,
      photo: photos[0]?.value,
      permissions: [
        ...RolePermissions[Role.WORKER],
        ...RolePermissions[Role.USER],
      ],
    };
    console.log("🐛 - google-worker.strategy.ts - user:", user);

    done(null, user);
  }
}
