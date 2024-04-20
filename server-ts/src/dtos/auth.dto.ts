import Joi from "joi";
import UserDto from "./user.dto";

class AuthDto extends UserDto {
  token = Joi.string().required().messages({
    "string.empty": "Code không được bỏ trống!",
  });

  accessToken = Joi.string().required().messages({
    "string.empty": "AccessToken không được bỏ trống!",
  });

  get signUp() {
    return Joi.object({
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      phone: this.phone,
    });
  }

  get login() {
    return Joi.object({
      email: this.email,
      password: this.password,
    });
  }

  get loginGoogle() {
    return Joi.object({
      token: this.token,
    });
  }

  get loginFacebook() {
    return Joi.object({
      accessToken: this.accessToken,
    });
  }

  get forgotPassword() {
    return Joi.object({
      email: this.email,
    });
  }
}

export default AuthDto;
