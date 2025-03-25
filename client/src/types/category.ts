import { FullType, Pagination } from ".";

interface Category {
  name: string;
  slug: string;
  image: string;
  description?: string;
  parent?: string;
}

type CategoryDto = Omit<Category, "slug">;

interface FullCategory extends Omit<Category, "parent">, FullType {
  parent?: FullCategory;
  childrens: FullCategory[];
}

interface CategoryResponse {
  message: string;
  category: FullCategory;
}

interface CategoriesResponse extends Pagination {
  categories: FullCategory[];
}

export type {
  Category,
  FullCategory,
  CategoryResponse,
  CategoriesResponse,
  CategoryDto,
};
