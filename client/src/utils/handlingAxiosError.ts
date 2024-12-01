import { AxiosError } from "axios";

export default function handlingAxiosError(error: unknown): {
  message: string;
} {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    return data;
  } else {
    return error as { message: string };
  }
}
