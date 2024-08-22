import { FullType } from ".";

interface BlogDTO {
  title: string;
  description: string;
  image: string;
}

interface Blog extends BlogDTO, FullType {
  slug: string;
}

interface BlogResponse {
  blog: Blog;
  message: string;
}

interface BlogsResponse {
  blogs: Blog[];
  limit: number;
  total: number;
  skip: number;
}

export type { BlogDTO, BlogsResponse, BlogResponse, Blog };
