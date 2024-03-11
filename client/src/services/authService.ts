import { UserResponse } from "@/types/user";
import apiRequest from "./api";
import { LoginDTO, SignUpDTO } from "@/types/auth";

const authService = {
  loginGoogle: (code: string) => {
    return apiRequest<UserResponse>(
      "/auth/login/google",
      "POST",
      { code },
      { withCredentials: true }
    );
  },

  loginFacebook: (accessToken: string) => {
    return apiRequest<UserResponse>(
      "/auth/login/facebook",
      "POST",
      { accessToken },
      { withCredentials: true }
    );
  },

  login: (data: LoginDTO) => {
    return apiRequest<UserResponse>("/auth/login", "POST", data, {
      withCredentials: true,
    });
  },

  signUp: (data: SignUpDTO) => {
    return apiRequest<UserResponse>("/auth/signup", "POST", data);
  },

  forgotPassword: (email: string) => {
    return apiRequest<{ message: string }>("/auth/forgotPassword", "POST", {
      email,
    });
  },

  verifyPasswordResetToken: (data: { email: string; token: string }) => {
    return apiRequest<{ verified: boolean }>(
      "/auth/forgotPassword/verify",
      "POST",
      data
    );
  },

  resetPassword: (data: LoginDTO) => {
    return apiRequest<{ message: string }>(
      "/auth/forgotPassword/reset",
      "POST",
      data
    );
  },

  refreshToken: () => {
    return apiRequest<void>(
      "/auth/refreshToken",
      "POST",
      {
        id: "refreshToken",
      },
      { withCredentials: true }
    );
  },

  logout: () => {
    return apiRequest<void>(
      "/auth/logout",
      "POST",
      { logout: true },
      { refreshToken: true }
    );
  },
};

export default authService;
