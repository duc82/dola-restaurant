import {
  FullUser,
  User,
  UserResponse,
  UserUpdateCurrentDTO,
  UsersResponse
} from "@/types/user";
import apiRequest from "./api";
import { Filter } from "@/types";

const userService = {
  getAll: (filter?: Filter) => {
    let query = "";

    if (filter?.page) {
      query += query ? `&page=${filter.page}` : `?page=${filter.page}`;
    }

    if (filter?.limit) {
      query += query ? `&limit=${filter.limit}` : `?limit=${filter.limit}`;
    }

    if (filter?.search) {
      query += query ? `&search=${filter.search}` : `?search=${filter.search}`;
    }

    return apiRequest<UsersResponse>("/users" + query, {
      refreshToken: true
    });
  },

  getCurrent: () => {
    return apiRequest<FullUser>("/users/current", {
      refreshToken: true
    });
  },

  create: (user: User) => {
    return apiRequest<UserResponse>("/users/create", {
      method: "POST",
      refreshToken: true,
      data: user
    });
  },

  updateCurrent: (data: UserUpdateCurrentDTO) => {
    return apiRequest<UserResponse>("/users/update/current", {
      method: "PUT",
      refreshToken: true,
      data
    });
  },

  update: (id: string, data: Partial<User>) => {
    return apiRequest<UserResponse>(`/users/update/${id}`, {
      method: "PUT",
      refreshToken: true,
      data
    });
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return apiRequest<UserResponse>("/users/changePassword", {
      method: "POST",
      refreshToken: true,
      data
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/users/delete/${id}`, {
      method: "DELETE",
      refreshToken: true
    });
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>("/users/delete-many", {
      method: "DELETE",
      refreshToken: true,
      data: { ids }
    });
  }
};

export default userService;
