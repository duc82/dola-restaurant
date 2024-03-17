import axios, { AxiosError } from "axios";
import authService from "./authService";
import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
import { loginSuccess } from "@/store/reducers/authSlice";

const API_BASE_URL: string | undefined = import.meta.env.VITE_API;

if (!API_BASE_URL) {
  throw new Error("Vui lòng nhập VITE_API ở env!");
}

interface Option {
  data?: any;
  refreshToken?: boolean;
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
    withCredentials: options?.withCredentials,
  });

  return res.data;
}
