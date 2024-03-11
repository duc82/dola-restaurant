import { FullType } from ".";
import { User } from "./user";

interface Blog {
  title: string;
  description: string;
  image: string;
  user?: string;
}

interface FullBlog extends FullType, Omit<Blog, "user"> {
  user?: User;
}

interface BlogResponse {
  blog: FullBlog;
  message: string;
}

interface BlogsResponse {
  blogs: FullBlog[];
  limit: number;
  total: number;
  skip: number;
}

export type { Blog, BlogsResponse, BlogResponse, FullBlog };
