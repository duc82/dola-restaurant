import { BlogDTO, BlogResponse, BlogsResponse } from "@/types/blog";
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
  create: (blog: BlogDTO) => {
    return apiRequest<BlogResponse>("/blogs/create", {
      method: "POST",
      token: true,
      data: blog,
    });
  },
  update: (id: string, blog: BlogDTO) => {
    return apiRequest<BlogResponse>(`/blogs/update/${id}`, {
      method: "PUT",
      token: true,
      data: blog,
    });
  },
  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/blogs/delete/${id}`, {
      method: "DELETE",
      token: true,
    });
  },
  deleteMany: (ids: string[]) => {
    return apiRequest<{ message: string }>(`/blogs/delete-many`, {
      method: "DELETE",
      token: true,
      data: { ids },
    });
  },
};

export default blogService;
