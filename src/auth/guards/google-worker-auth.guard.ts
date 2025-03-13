import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleWorkerAuthGuard extends AuthGuard("google-worker") {}
