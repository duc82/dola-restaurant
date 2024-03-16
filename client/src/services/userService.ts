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
    let endpoint = "/users";
    if (filter) {
      let query = "";

      if (filter.query) {
        query += `?${filter.query}`;
      }

      if (filter.search) {
        query += query
          ? `&search=${filter.search}`
          : `?search=${filter.search}`;
      }

      if (filter.limit) {
        query += query ? `&limit=${filter.limit}` : `?limit=${filter.limit}`;
      }

      endpoint += query;
    }

    return apiRequest<UsersResponse>(endpoint, "GET", {
      refreshToken: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  getCurrent: () => {
    return apiRequest<FullUser>("/users/current", "GET", {
      refreshToken: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  },

  create: (user: User) => {
    return apiRequest<UserResponse>("/users/create", "POST", {
      refreshToken: true,
      data: user,
    });
  },

  updateCurrent: (data: UserUpdateCurrentDTO) => {
    return apiRequest<UserResponse>("/users/update/current", "PUT", data, {
      refreshToken: true,
    });
  },

  update: (id: string, data: Partial<User>) => {
    return apiRequest<UserResponse>(`/users/update/${id}`, "PUT", data, {
      refreshToken: true,
    });
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return apiRequest<UserResponse>("/users/changePassword", "POST", data, {
      refreshToken: true,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(
      `/users/delete/${id}`,
      "DELETE",
      null,
      {
        refreshToken: true,
      }
    );
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>(
      "/users/delete-many",
      "DELETE",
      { ids },
      {
        refreshToken: true,
      }
    );
  },
};

export default userService;
