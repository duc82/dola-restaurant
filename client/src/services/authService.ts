import { UserResponse } from "@/types/user";
import apiRequest from "./api";
import { LoginDTO, SignUpDTO } from "@/types/auth";

const authService = {
  loginGoogle: (code: string) => {
    return apiRequest<UserResponse>("/auth/login/google", "POST", {
      data: { code },
    });
  },

  loginFacebook: (accessToken: string) => {
    return apiRequest<UserResponse>("/auth/login/facebook", "POST", {
      data: { accessToken },
    });
  },

  login: (data: LoginDTO) => {
    return apiRequest<UserResponse & { accessToken: string }>(
      "/auth/login",
      "POST",
      { data, withCredentials: true }
    );
  },

  signUp: (data: SignUpDTO) => {
    return apiRequest<UserResponse>("/auth/signup", "POST", { data });
  },

  forgotPassword: (email: string) => {
    return apiRequest<{ message: string }>("/auth/forgotPassword", "POST", {
      data: { email },
    });
  },

  verifyPasswordResetToken: (data: { email: string; token: string }) => {
    return apiRequest<{ verified: boolean }>(
      "/auth/forgotPassword/verify",
      "POST",
      { data }
    );
  },

  resetPassword: (data: LoginDTO) => {
    return apiRequest<{ message: string }>(
      "/auth/forgotPassword/reset",
      "POST",
      { data }
    );
  },

  refreshToken: () => {
    return apiRequest<{ message: string }>("/auth/refreshToken", "POST", {
      data: { refreshToken: true },
    });
  },

  logout: () => {
    return apiRequest<{ message: string }>("/auth/logout", "POST", {
      data: { logout: true },
    });
  },
};

export default authService;
