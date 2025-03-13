import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleCustomerAuthGuard extends AuthGuard("google-customer") {}
