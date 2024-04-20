const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const validation = require("../middlewares/validation.middleware");
const AuthDto = require("../dtos/auth.dto");

const authDto = new AuthDto();

const router = Router();

router.post(
  "/signup",
  validation.validateDto(authDto.signUp),
  authController.signUp
);

router.post(
  "/login",
  validation.validateDto(authDto.login),
  authController.login
);

router.post("/logout", authController.logout);

router.post("/refreshToken", authController.refreshToken);

router.post(
  "/login/google",
  validation.validateDto(authDto.loginGoogle),
  authController.loginGoogle
);

router.post(
  "/login/facebook",
  validation.validateDto(authDto.loginFacebook),
  authController.loginFacebook
);

router.post(
  "/forgotPassword",
  validation.validateDto(authDto.forgotPassword),
  authController.forgotPassword
);
router.post("/forgotPassword/verify", authController.verifyPasswordResetToken);
router.post("/forgotPassword/reset", authController.resetPassword);

module.exports = router;
