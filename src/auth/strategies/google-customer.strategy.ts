import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { GoogleUser } from "../interfaces/google-user";
import { Role, RolePermissions } from "../enums/roles.enum";

@Injectable()
export class GoogleCustomerStrategy extends PassportStrategy(
  Strategy,
  "google-customer",
) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: process.env.GOOGLE_CUSTOMER_CALLBACK_URL,
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
        ...RolePermissions[Role.CUSTOMER],
        ...RolePermissions[Role.USER],
      ],
    };

    done(null, user);
  }
}
