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

    return apiRequest<UsersResponse>(endpoint, "GET", null, {
      refreshToken: true,
    });
  },

  getCurrent: () => {
    return apiRequest<FullUser>("/users/current", "GET", null, {
      refreshToken: true,
    });
  },

  create: (user: User) => {
    return apiRequest<UserResponse>("/users/create", "POST", user, {
      refreshToken: true,
    });
  },

  updateCurrent: (data: UserUpdateCurrentDTO) => {
    return apiRequest<UserResponse>("/users/update/current", "PUT", data, {
      refreshToken: true,
    });
  },

  changePassword: (data: { oldPassword: string; newPassword: string }) => {
    return apiRequest<UserResponse>("/users/changePassword", "POST", data, {
      refreshToken: true,
    });
  },
};

export default userService;
