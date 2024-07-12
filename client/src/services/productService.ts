import {
  FullProduct,
  Product,
  ProductResponse,
  ProductsResponse,
} from "@/types/product";
import apiRequest from "./api";
import { QueryOptions } from "@/types";

export interface GetAllProductParams extends QueryOptions {
  category?: string | null;
  sort?: string | null;
  price?: string | null;
  taste?: string | null;
  size?: string | null;
}

const productService = {
  getAll: (queryOptions?: GetAllProductParams) => {
    let query = "";

    if (queryOptions?.page) {
      query += query
        ? `&page=${queryOptions.page}`
        : `?page=${queryOptions.page}`;
    }

    if (queryOptions?.limit) {
      query += query
        ? `&limit=${queryOptions.limit}`
        : `?limit=${queryOptions.limit}`;
    }

    if (queryOptions?.category) {
      query += query
        ? `&categorySlug=${queryOptions.category}`
        : `?categorySlug=${queryOptions.category}`;
    }
    if (queryOptions?.search) {
      query += query
        ? `&search=${queryOptions.search}`
        : `?search=${queryOptions.search}`;
    }

    if (queryOptions?.sort) {
      query += query
        ? `&sort=${queryOptions.sort}`
        : `?sort=${queryOptions.sort}`;
    }

    if (queryOptions?.price) {
      query += query
        ? `&price=${queryOptions.price}`
        : `?price=${queryOptions.price}`;
    }

    if (queryOptions?.taste) {
      query += query
        ? `&taste=${queryOptions.taste}`
        : `?taste=${queryOptions.taste}`;
    }

    if (queryOptions?.size) {
      query += query
        ? `&size=${queryOptions.size}`
        : `?size=${queryOptions.size}`;
    }

    return apiRequest<ProductsResponse>("/products" + query);
  },

  getByParentCategory: async (
    slug: string,
    queryOptions?: Omit<QueryOptions, "search">
  ) => {
    let query = "";
    if (queryOptions?.page) {
      query += query
        ? `&page=${queryOptions.page}`
        : `?page=${queryOptions.page}`;
    }

    if (queryOptions?.limit) {
      query += query
        ? `&limit=${queryOptions.limit}`
        : `?limit=${queryOptions.limit}`;
    }

    return apiRequest<ProductsResponse>(
      `/products/parent-category/${slug}${query}`
    );
  },

  getBySlug: (slug: string) => {
    return apiRequest<FullProduct>(`/products/by-slug/${slug}`);
  },

  create: (data: Product) => {
    return apiRequest<ProductResponse>("/products/create", {
      method: "POST",
      accessToken: true,
      refreshToken: true,
      data,
    });
  },

  update: (id: string, data: Partial<Product>) => {
    return apiRequest<ProductResponse>(`/products/update/${id}`, {
      method: "PUT",
      accessToken: true,
      refreshToken: true,
      data,
    });
  },

  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/products/delete/${id}`, {
      method: "DELETE",
      accessToken: true,
      refreshToken: true,
    });
  },

  deleteMany: (selectedRows: string[]) => {
    return apiRequest<{ message: string }>("/products/delete-many", {
      method: "DELETE",
      accessToken: true,
      refreshToken: true,
      data: { selectedRows },
    });
  },
};

export default productService;
