import { Blog, BlogResponse, BlogsResponse } from "@/types/blog";
import apiRequest from "./api";

const blogService = {
  getAll: () => {
    return apiRequest<BlogsResponse>("/blogs", "GET");
  },
  getByTitle: (title: string) => {
    return apiRequest<BlogResponse>(`/blogs/by-title/${title}`, "GET");
  },
  create: (blog: Omit<Blog, "user">) => {
    return apiRequest<BlogResponse>("/blogs/create", "POST", {
      refreshToken: true,
      data: blog,
    });
  },
  update: (id: string, blog: Omit<Blog, "user">) => {
    return apiRequest<BlogResponse>(`/blogs/update/${id}`, "PATCH", {
      refreshToken: true,
      data: blog,
    });
  },
  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/blogs/delete/${id}`, "DELETE");
  },
};

export default blogService;
