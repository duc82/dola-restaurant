import { FullType } from ".";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
  addresses: string[];
  isHavePassword: boolean;
  ipAddress: string;
}

interface FullUser extends FullType, Omit<User, "addresses"> {}

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
