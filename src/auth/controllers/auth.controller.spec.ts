/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "../services/auth.service";
import { GoogleUser } from "../interfaces/google-user";

describe("AuthController", () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            googleLogin: jest.fn().mockResolvedValue({ accessToken: "token" }),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe("googleAuth", () => {
    it("should be defined", () => {
      expect(() => authController.googleAuthRedirect).toBeDefined();
      expect(() => authController.googleAuthRedirect).toBeDefined();
    });
  });

  describe("googleAuthRedirect", () => {
    it("should call authService.googleLogin and return its result", () => {
      const req = { user: { id: "123", email: "test@example.com" } };
      const result = { token: "token" };
      jest.spyOn(authService, "googleLogin").mockReturnValue(result);

      expect(authController.googleAuthRedirect(req as any)).toBe(result);
      expect(authService.googleLogin).toHaveBeenCalledWith(req.user);
    });
  });

  describe("getProfile", () => {
    it("should return the user from the request", () => {
      const req: { user: GoogleUser } = {
        user: {
          sub: "123",
          email: "test@example.com",
          name: "Test User",
          permissions: [],
          photo: "",
        },
      };
      expect(authController.getProfile(req)).toBe(req.user);
    });
  });
});
