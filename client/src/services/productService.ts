import {
  FullProduct,
  Product,
  ProductResponse,
  ProductsResponse,
} from "@/types/product";
import apiRequest from "./api";
import { QueryOptions } from "@/types";
import queryString from "query-string";

export interface GetAllProductParams extends QueryOptions {
  categorySlug?: string | null;
  sort?: string | null;
  price?: string | null;
  taste?: string | null;
  size?: string | null;
}

const productService = {
  getAll: (queryOptions?: GetAllProductParams) => {
    const query = queryString.stringify(queryOptions || {}, {
      skipEmptyString: true,
      skipNull: true,
    });
    return apiRequest<ProductsResponse>(`/products?${query}`);
  },

  getByParentCategory: async (
    slug: string,
    queryOptions?: Omit<QueryOptions, "search">
  ) => {
    const query = queryString.stringify(queryOptions || {}, {
      skipEmptyString: true,
    });

    return apiRequest<ProductsResponse>(
      `/products/parent-category/${slug}?${query}`
    );
  },

  getBySlug: (slug: string) => {
    return apiRequest<FullProduct>(`/products/by-slug/${slug}`);
  },

  create: (data: Product) => {
    return apiRequest<ProductResponse>("/products/create", {
      method: "POST",
      token: true,
      data,
    });
  },

  update: (id: string, data: Partial<Product>) => {
    return apiRequest<ProductResponse>(`/products/update/${id}`, {
      method: "PUT",
      token: true,
      data,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/products/delete/${id}`, {
      method: "DELETE",
      token: true,
    });
  },

  deleteMany: (selectedRows: string[]) => {
    return apiRequest<{ message: string }>("/products/delete-many", {
      method: "DELETE",
      token: true,
      data: { selectedRows },
    });
  },
};

export default productService;
