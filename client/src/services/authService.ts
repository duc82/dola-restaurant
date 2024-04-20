import { UserResponse } from "@/types/user";
import apiRequest from "./api";
import { LoginDTO, LoginResponse, SignUpDTO } from "@/types/auth";

const authService = {
  loginGoogle: (code: string) => {
    return apiRequest<LoginResponse>("/auth/login/google", "POST", {
      data: { code },
      withCredentials: true,
    });
  },

  loginFacebook: (accessToken: string) => {
    return apiRequest<LoginResponse>("/auth/login/facebook", "POST", {
      data: { accessToken },
      withCredentials: true,
    });
  },

  login: (data: LoginDTO) => {
    return apiRequest<LoginResponse>("/auth/login", "POST", {
      data,
      withCredentials: true,
    });
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
    return apiRequest<{ message: string; accessToken: string }>(
      "/auth/refreshToken",
      "POST",
      {
        data: { refreshToken: true },
        withCredentials: true,
      }
    );
  },

  logout: () => {
    return apiRequest<{ message: string }>("/auth/logout", "POST", {
      data: { logout: true },
      withCredentials: true,
    });
  },
};

export default authService;
