import { UserResponse } from "./user";

interface LoginDTO {
  email: string;
  password: string;
}

interface SignUpDTO extends LoginDTO {
  fullName: string;
  phone: string;
}

interface LoginResponse extends UserResponse {
  accessToken: string;
}

export type { LoginDTO, SignUpDTO, LoginResponse };
