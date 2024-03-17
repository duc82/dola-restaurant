import { CategoryResponse, FullCategory } from "@/types/category";
import apiRequest from "./api";

const categoryService = {
  getAll: () => {
    return apiRequest<FullCategory[]>("/categories", "GET");
  },

  create: (formData: FormData) => {
    return apiRequest<CategoryResponse>("/categories/create", "POST", {
      refreshToken: true,
      data: formData,
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
