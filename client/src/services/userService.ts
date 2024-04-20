import {
  FullUser,
  User,
  UserResponse,
  UserUpdateCurrentDTO,
  UsersResponse,
} from "@/types/user";
import apiRequest from "./api";
import { Filter } from "@/types";

const userService = {
  getAll: (filter?: Filter) => {
    let query = "";

    if (filter?.query) {
      query += `?${filter.query}`;
    }

    if (filter?.search) {
      query += query ? `&search=${filter.search}` : `?search=${filter.search}`;
    }

    if (filter?.limit) {
      query += query ? `&limit=${filter.limit}` : `?limit=${filter.limit}`;
    }

    return apiRequest<UsersResponse>("/users" + query, "GET", {
      refreshToken: true,
    });
  },

  getCurrent: () => {
    return apiRequest<FullUser>("/users/current", "GET", {
      refreshToken: true,
    });
  },

  create: (user: User) => {
    return apiRequest<UserResponse>("/users/create", "POST", {
      refreshToken: true,
      data: user,
    });
  },

  updateCurrent: (data: UserUpdateCurrentDTO) => {
    return apiRequest<UserResponse>("/users/update/current", "PUT", {
      refreshToken: true,
      data,
    });
  },

  update: (id: string, data: Partial<User>) => {
    return apiRequest<UserResponse>(`/users/update/${id}`, "PUT", {
      refreshToken: true,
      data,
    });
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return apiRequest<UserResponse>("/users/changePassword", "POST", {
      refreshToken: true,
      data,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/users/delete/${id}`, "DELETE", {
      refreshToken: true,
    });
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>("/users/delete-many", "DELETE", {
      refreshToken: true,
      data: { ids },
    });
  },
};

export default userService;
