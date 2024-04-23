import axios, { AxiosError, AxiosRequestConfig } from "axios";
import authService from "./authService";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { loginSuccess } from "@/store/reducers/authSlice";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("Vui lòng nhập VITE_API ở env!");
}

let store: ToolkitStore;

export const injectStore = (s: ToolkitStore) => {
  store = s;
};

const api = axios.create({
  baseURL: API_URL + "/api/v1",
});

export default async function apiRequest<T>(
  endpoint: string,
  config?: AxiosRequestConfig & {
    refreshToken?: boolean;
    accessToken?: boolean;
  }
): Promise<T> {
  // Auto refresh token when token expired
  if (config?.refreshToken) {
    api.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          try {
            const { accessToken } = await authService.refreshToken();
            store.dispatch(loginSuccess(accessToken));
            return api<T>(error.config!);
          } catch (error) {
            await authService.logout();
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    config.withCredentials = true;
  }

  if (config?.accessToken) {
    api.interceptors.request.use((config) => {
      const accessToken = store.getState().auth.accessToken;
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  const res = await api<T>({
    url: endpoint,
    ...config,
  });

  return res.data;
}
