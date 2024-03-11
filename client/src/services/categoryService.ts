import { CategoryResponse, FullCategory } from "@/types/category";
import apiRequest from "./api";

const categoryService = {
  getAll: () => {
    return apiRequest<FullCategory[]>("/categories", "GET");
  },

  create: (formData: FormData) => {
    return apiRequest<CategoryResponse>(
      "/categories/create",
      "POST",
      formData,
      { refreshToken: true }
    );
  },

  update: (id: string, formData: FormData) => {
    return apiRequest<CategoryResponse>(
      `/categories/update/${id}`,
      "PUT",
      formData,
      {
        refreshToken: true,
      }
    );
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(
      `/categories/delete/${id}`,
      "DELETE",
      null,
      {
        refreshToken: true,
      }
    );
  },

  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>(
      "/categories/delete-many",
      "DELETE",
      { ids },
      {
        refreshToken: true,
      }
    );
  },
};

export default categoryService;
