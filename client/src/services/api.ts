import axios, { AxiosError, AxiosRequestConfig } from "axios";
import authService from "./authService";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";

const API_BASE_URL: string | undefined = import.meta.env.VITE_API;

if (!API_BASE_URL) {
  throw new Error("Vui lòng nhập VITE_API ở env!");
}

interface Option {
  data?: any;
  refreshToken?: boolean;
  headers?: AxiosRequestConfig["headers"];
  withCredentials?: boolean;
}

let store: ToolkitStore;

export const injectStore = (s: ToolkitStore) => {
  store = s;
};

const api = axios.create({
  baseURL: API_BASE_URL + "/api/v1",
});

export default async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  options?: Option
): Promise<T> {
  // Auto refresh token when token expired
  if (options?.refreshToken) {
    options.withCredentials = true;

    api.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          try {
            await authService.refreshToken();
            return api(error.config!);
          } catch (error) {
            await authService.logout();
            window.location.href = "/dang-nhap";
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  api.interceptors.request.use((config) => {
    const accessToken = store.getState().auth.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const res = await api<T>({
    method,
    url: endpoint,
    data: options?.data,
    headers: options?.headers,
    withCredentials: options?.withCredentials,
  });

  return res.data;
}
