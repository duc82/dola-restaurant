import { FullType } from ".";

interface Blog {
  title: string;
  description: string;
  image: string;
  slug: string;
}

interface FullBlog extends FullType, Omit<Blog, "user"> {}

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
