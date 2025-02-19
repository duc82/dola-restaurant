import { UserResponse } from "@/types/user";
import apiRequest from "./api";
import { LoginDTO, LoginResponse, SignUpDTO } from "@/types/auth";

const authService = {
  loginGoogle: (code: string) => {
    return apiRequest<LoginResponse>("/auth/login/google", {
      method: "POST",
      data: { code },
    });
  },

  loginFacebook: (accessToken: string) => {
    return apiRequest<LoginResponse>("/auth/login/facebook", {
      method: "POST",
      data: { accessToken },
    });
  },

  login: (data: LoginDTO) => {
    return apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      withCredentials: true,
      data,
    });
  },

  signUp: (data: SignUpDTO) => {
    return apiRequest<UserResponse>("/auth/signup", { method: "POST", data });
  },

  forgotPassword: (email: string) => {
    return apiRequest<{ message: string }>("/auth/forgotPassword", {
      method: "POST",
      data: { email },
    });
  },

  verifyPasswordResetToken: (data: { email: string; token: string }) => {
    return apiRequest<{ verified: boolean }>("/auth/forgotPassword/verify", {
      method: "POST",
      data,
    });
  },

  resetPassword: (data: LoginDTO) => {
    return apiRequest<{ message: string }>("/auth/forgotPassword/reset", {
      method: "POST",
      data,
    });
  },

  refreshToken: () => {
    return apiRequest<{ message: string; accessToken: string }>(
      "/auth/refreshToken",
      {
        method: "POST",
        data: { refreshToken: true },
      }
    );
  },

  logout: () => {
    return apiRequest<{ message: string }>("/auth/logout", {
      method: "POST",
      data: { logout: true },
    });
  },
};

export default authService;
