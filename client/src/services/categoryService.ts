import {
  CategoriesResponse,
  CategoryDto,
  CategoryResponse,
  FullCategory
} from "@/types/category";
import apiRequest from "./api";
import { QueryOptions } from "@/types";

const categoryService = {
  getAll: () => {
    return apiRequest<FullCategory[]>("/categories");
  },

  getAllPaginate: (filter?: QueryOptions) => {
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

    return apiRequest<CategoriesResponse>("/categories" + query);
  },

  create: (data: CategoryDto) => {
    return apiRequest<CategoryResponse>("/categories/create", {
      method: "POST",
      accessToken: true,
      refreshToken: true,
      data
    });
  },

  update: (id: string, formData: FormData) => {
    return apiRequest<CategoryResponse>(`/categories/update/${id}`, {
      method: "PUT",
      accessToken: true,
      refreshToken: true,
      data: formData
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/categories/delete/${id}`, {
      method: "DELETE",
      accessToken: true,
      refreshToken: true
    });
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>("/categories/delete-many", {
      method: "DELETE",
      accessToken: true,
      refreshToken: true,
      data: { ids }
    });
  }
};

export default categoryService;
