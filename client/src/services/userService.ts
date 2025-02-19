import {
  FullUser,
  User,
  UserResponse,
  UserUpdateCurrentDTO,
  UsersResponse,
} from "@/types/user";
import apiRequest from "./api";
import { QueryOptions } from "@/types";

const userService = {
  getAll: (queryOptions?: QueryOptions) => {
    let query = "";

    if (queryOptions?.page) {
      query += query
        ? `&page=${queryOptions.page}`
        : `?page=${queryOptions.page}`;
    }

    if (queryOptions?.limit) {
      query += query
        ? `&limit=${queryOptions.limit}`
        : `?limit=${queryOptions.limit}`;
    }

    if (queryOptions?.search) {
      query += query
        ? `&search=${queryOptions.search}`
        : `?search=${queryOptions.search}`;
    }

    return apiRequest<UsersResponse>("/users" + query);
  },

  getCurrent: () => {
    return apiRequest<FullUser>("/users/current", {
      token: true,
    });
  },

  create: (user: User) => {
    return apiRequest<UserResponse>("/users/create", {
      method: "POST",
      token: true,
      data: user,
    });
  },

  updateCurrent: (data: UserUpdateCurrentDTO) => {
    return apiRequest<UserResponse>("/users/update/current", {
      method: "PUT",
      token: true,
      data,
    });
  },

  update: (id: string, data: Partial<User>) => {
    return apiRequest<UserResponse>(`/users/update/${id}`, {
      method: "PUT",
      token: true,
      data,
    });
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return apiRequest<UserResponse>("/users/changePassword", {
      method: "POST",
      token: true,
      data,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/users/delete/${id}`, {
      method: "DELETE",
      token: true,
    });
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>("/users/delete-many", {
      method: "DELETE",
      token: true,
      data: { ids },
    });
  },
};

export default userService;
