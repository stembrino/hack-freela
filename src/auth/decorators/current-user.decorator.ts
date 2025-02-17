import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GoogleUser } from "../interfaces/google-user";

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<{ user: GoogleUser }>();
    return request.user;
  },
);
