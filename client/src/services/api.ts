import axios, { AxiosError, AxiosHeaders } from "axios";
import authService from "./authService";

const API_BASE_URL: string | undefined = import.meta.env.VITE_API;

if (!API_BASE_URL) {
  throw new Error("Vui lòng nhập VITE_API ở env!");
}

interface Option {
  withCredentials?: boolean;
  headers?: AxiosHeaders;
  refreshToken?: boolean;
}

const api = axios.create({
  baseURL: API_BASE_URL + "/api/v1",
});

export default async function apiRequest<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: any,
  options?: Option
): Promise<T> {
  // Auto refresh token when token expired
  if (options?.refreshToken) {
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

    options.withCredentials = true;
  }

  const res = await api<T>({
    method,
    url: endpoint,
    data,
    withCredentials: options?.withCredentials,
    headers: options?.headers,
  });

  return res.data;
}
