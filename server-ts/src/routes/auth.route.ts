import AuthDto from "@/dtos/auth.dto";
import { Router } from "express";
import { Body, Params, Query } from "@/middlewares/validation.middleware";

const router = Router();

const authDto = new AuthDto();

router.post("/signup", Body(authDto.signUp), authController.signUp);

router.post("/login", Body(authDto.login), authController.login);

router.post("/logout", authController.logout);

router.post("/refreshToken", authController.refreshToken);

router.post(
  "/login/google",
  Body(authDto.loginGoogle),
  authController.loginGoogle
);

router.post(
  "/login/facebook",
  Body(authDto.loginFacebook),
  authController.loginFacebook
);

router.post(
  "/forgotPassword",
  Body(authDto.forgotPassword),
  authController.forgotPassword
);
router.post("/forgotPassword/verify", authController.verifyPasswordResetToken);
router.post("/forgotPassword/reset", authController.resetPassword);

export default router;
