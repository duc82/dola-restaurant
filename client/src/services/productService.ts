import {
  FullProduct,
  ProductResponse,
  ProductsResponse
} from "@/types/product";
import apiRequest from "./api";

const productService = {
  getAll: (param?: { category?: string; query?: string; limit?: number }) => {
    let endpoint = "/products";

    if (param) {
      let query = "";

      if (param.category) {
        query += `?categorySlug=${param.category}`;
      }

      if (param.query) {
        query += query ? `&${param.query}` : `?${param.query}`;
      }

      if (param.limit) {
        query += query ? `&limit=${param.limit}` : `?limit=${param.limit}`;
      }

      endpoint += query;
    }

    return apiRequest<ProductsResponse>(endpoint);
  },

  getBySlug: (slug: string) => {
    return apiRequest<FullProduct>(`/products/by-slug/${slug}`);
  },

  create: (formData: FormData) => {
    return apiRequest<ProductResponse>("/products/create", {
      method: "POST",
      refreshToken: true,
      data: formData
    });
  },

  update: (id: string, formData: FormData) => {
    return apiRequest<ProductResponse>(`/products/update/${id}`, {
      method: "PUT",
      refreshToken: true,
      data: formData
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/products/delete/${id}`, {
      method: "DELETE",
      refreshToken: true
    });
  }
};

export default productService;
