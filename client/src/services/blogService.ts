import { Blog, BlogResponse, BlogsResponse } from "@/types/blog";
import apiRequest from "./api";

const blogService = {
  getAll: () => {
    return apiRequest<BlogsResponse>("/blogs");
  },
  getByTitle: (title: string) => {
    return apiRequest<BlogResponse>(`/blogs/by-title/${title}`);
  },
  create: (blog: Omit<Blog, "user">) => {
    return apiRequest<BlogResponse>("/blogs/create", {
      method: "POST",
      refreshToken: true,
      data: blog
    });
  },
  update: (id: string, blog: Omit<Blog, "user">) => {
    return apiRequest<BlogResponse>(`/blogs/update/${id}`, {
      method: "PATCH",
      refreshToken: true,
      data: blog
    });
  },
  delete: (id: string) => {
    return apiRequest<{ message: string }>(`/blogs/delete/${id}`, {
      method: "DELETE"
    });
  }
};

export default blogService;
