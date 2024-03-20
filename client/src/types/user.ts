import { FullType } from ".";
import { FullAddress } from "./address";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

interface FullUser extends FullType, User {
  ipAddress: string;
  isHavePassword: boolean;
  addresses: FullAddress[];
}

interface UserResponse {
  user: FullUser;
  message: string;
}

interface UsersResponse {
  users: FullUser[];
  skip: number;
  limit: number;
  total: number;
}

interface UserUpdateCurrentDTO {
  fullName: string;
  email: string;
  phone: string;
}

export type {
  User,
  FullUser,
  UserResponse,
  UsersResponse,
  UserUpdateCurrentDTO,
};
