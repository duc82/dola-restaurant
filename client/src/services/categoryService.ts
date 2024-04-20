import {
  CategoriesResponse,
  CategoryDto,
  CategoryResponse,
} from "@/types/category";
import apiRequest from "./api";
import { Filter } from "@/types";

const categoryService = {
  getAll: (filter?: Filter) => {
    let query = `?search=${filter?.search ?? ""}`;

    if (filter?.page) {
      query += `&page=${filter.page}`;
    }

    if (filter?.limit) {
      query += `&limit=${filter.limit}`;
    }

    return apiRequest<CategoriesResponse>("/categories" + query, "GET");
  },

  create: (data: CategoryDto) => {
    return apiRequest<CategoryResponse>("/categories/create", "POST", {
      refreshToken: true,
      data,
    });
  },

  update: (id: string, formData: FormData) => {
    return apiRequest<CategoryResponse>(`/categories/update/${id}`, "PUT", {
      refreshToken: true,
      data: formData,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(
      `/categories/delete/${id}`,
      "DELETE",
      {
        refreshToken: true,
      }
    );
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>(
      "/categories/delete-many",
      "DELETE",
      {
        refreshToken: true,
        data: { ids },
      }
    );
  },
};

export default categoryService;
