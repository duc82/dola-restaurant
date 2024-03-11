import { FullType } from ".";

interface Category {
  name: string;
  slug: string;
  image?: string;
  description?: string;
  parentCategory?: string;
}

interface FullCategory extends Omit<Category, "parentCategory">, FullType {
  parentCategory?: FullCategory;
}

interface CategoryResponse {
  message: string;
  category: FullCategory;
}

interface CategoriesResponse {
  message: string;
  categories: FullCategory[];
}

export type { Category, FullCategory, CategoryResponse, CategoriesResponse };
