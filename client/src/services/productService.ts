import {
  FullProduct,
  ProductResponse,
  ProductsResponse,
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

    return apiRequest<ProductsResponse>(endpoint, "GET");
  },

  getBySlug: (slug: string) => {
    return apiRequest<FullProduct>(`/products/by-slug/${slug}`, "GET");
  },

  create: (formData: FormData) => {
    return apiRequest<ProductResponse>("/products/create", "POST", formData, {
      refreshToken: true,
    });
  },

  update: (id: string, formData: FormData) => {
    return apiRequest<ProductResponse>(
      `/products/update/${id}`,
      "PUT",
      formData,
      {
        refreshToken: true,
      }
    );
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(
      `/products/delete/${id}`,
      "DELETE",
      null,
      {
        refreshToken: true,
      }
    );
  },
};

export default productService;
