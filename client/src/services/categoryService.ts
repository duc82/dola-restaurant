import {
  CategoriesResponse,
  CategoryDto,
  CategoryResponse,
  FullCategory,
} from "@/types/category";
import apiRequest from "./api";
import { QueryOptions } from "@/types";

interface GetAllOptions extends QueryOptions {
  nested?: boolean;
}

const categoryService = {
  getAll: (filter?: GetAllOptions) => {
    let query = "";

    if (filter?.limit) {
      query += query ? `&limit=${filter.limit}` : `?limit=${filter.limit}`;
    }

    if (filter?.page) {
      query += query ? `&page=${filter.page}` : `?page=${filter.page}`;
    }

    if (filter?.search) {
      query += query ? `&search=${filter.search}` : `?search=${filter.search}`;
    }

    if (filter?.nested !== undefined) {
      query += query ? `&nested=${filter.nested}` : `?nested=${filter.nested}`;
    }

    return apiRequest<FullCategory[] | CategoriesResponse>(
      "/categories" + query
    );
  },

  getChildrens: () => {
    return apiRequest<FullCategory[]>("/categories/childrens");
  },

  create: (data: CategoryDto) => {
    return apiRequest<CategoryResponse>("/categories/create", {
      method: "POST",
      token: true,
      data,
    });
  },

  update: (id: string, data: CategoryDto) => {
    return apiRequest<CategoryResponse>(`/categories/update/${id}`, {
      method: "PUT",
      token: true,
      data,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/categories/delete/${id}`, {
      method: "DELETE",
      token: true,
    });
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>("/categories/delete-many", {
      method: "DELETE",
      token: true,
      data: { ids },
    });
  },
};

export default categoryService;
