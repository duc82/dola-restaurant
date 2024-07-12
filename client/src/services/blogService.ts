import { Blog, BlogResponse, BlogsResponse } from "@/types/blog";
import apiRequest from "./api";
import { QueryOptions } from "@/types";

const blogService = {
  getAll: (queryOptions?: QueryOptions) => {
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

    if (queryOptions?.search) {
      query += query
        ? `&search=${queryOptions.search}`
        : `?search=${queryOptions.search}`;
    }

    return apiRequest<BlogsResponse>(`/blogs${query}`);
  },
  getBySlug: (slug: string) => {
    return apiRequest<BlogResponse>(`/blogs/by-slug/${slug}`);
  },
  create: (blog: Omit<Blog, "user">) => {
    return apiRequest<BlogResponse>("/blogs/create", {
      method: "POST",
      refreshToken: true,
      data: blog,
    });
  },
  update: (id: string, blog: Omit<Blog, "user">) => {
    return apiRequest<BlogResponse>(`/blogs/update/${id}`, {
      method: "PATCH",
      refreshToken: true,
      data: blog,
    });
  },
  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/blogs/delete/${id}`, {
      method: "DELETE",
    });
  },
};

export default blogService;
