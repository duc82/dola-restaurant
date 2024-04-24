import { FullType, Pagination } from ".";

interface User {
  fullName: string;
  email: string;
  phone?: string;
  role: "user" | "admin";
}

interface FullUser extends FullType, User {
  ip: string;
  isHavePassword: boolean;
}

interface UserResponse {
  user: FullUser;
  message: string;
}

interface UsersResponse extends Pagination {
  users: FullUser[];
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
  UserUpdateCurrentDTO
};
