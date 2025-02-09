import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { GoogleUser } from "../interfaces/google-user";
import { Role, RolePermissions } from "../enums/roles.enum";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private authService: AuthService) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL =
      process.env.GOOGLE_CALLBACK_URL ||
      "http://localhost:3000/auth/google/redirect";

    if (!clientID || !clientSecret) {
      console.error(
        "Google client ID or secret is not set in environment variables.",
      );
      throw new Error(
        "Google client ID or secret is not set in environment variables.",
      );
    }

    super({
      clientID,
      clientSecret,
      callbackURL,
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
      permissions: RolePermissions[Role.USER],
    };

    done(null, user);
  }
}
