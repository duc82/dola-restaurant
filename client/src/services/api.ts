import axios, { AxiosError, AxiosRequestConfig } from "axios";
import authService from "./authService";
import { loginSuccess } from "@/store/reducers/authSlice";
import { AppStore } from "@/store";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error("Vui lòng nhập VITE_API ở env!");
}

const api = axios.create({
  baseURL: API_URL + "/api/v1",
});

let store: AppStore;
export const injectStore = (_store: AppStore) => {
  store = _store;
};

export default async function apiRequest<T>(
  endpoint: string,
  config?: AxiosRequestConfig & {
    token?: boolean;
  }
): Promise<T> {
  if (config?.token) {
    // Auto refresh token when token expired
    api.interceptors.response.use(
      (res) => res,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          try {
            const { accessToken } = await authService.refreshToken();
            store.dispatch(loginSuccess(accessToken));
            const config = error.config!;
            return api<T>(config);
          } catch (error) {
            await authService.logout();
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

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
    withCredentials: true,
    ...config,
  });

  return res.data;
}
