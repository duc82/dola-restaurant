const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const AuthDto = require("../dtos/auth.dto");
const { Body } = require("../middlewares/validation.middleware");
const { lowLimiter } = require("../middlewares/limiter.middleware");

const authDto = new AuthDto();

const router = Router();

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
  lowLimiter,
  Body(authDto.forgotPassword),
  authController.forgotPassword
);
router.post("/forgotPassword/verify", authController.verifyPasswordResetToken);
router.post("/forgotPassword/reset", authController.resetPassword);

module.exports = router;
