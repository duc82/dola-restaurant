import { FullType } from ".";
import { Category, FullCategory } from "./category";

interface Image {
  url: string;
}

interface FullImage extends FullType, Image {}

interface Review {
  rating: number;
  comment: string;
  user: string;
}

interface FullReview extends FullType, Review {}

interface Product {
  title: string;
  slug: string;
  images: Image[];
  taste: string;
  size: string;
  description: string;
  price: number;
  discountedPrice: number;
  stock: number;
  reviews: Review[];
  childCategory: Category;
  parentCategory: Category;
  discountPercent: number;
  avgRating: number;
}

interface FullProduct
  extends FullType,
    Omit<Product, "images" | "reviews" | "childCategory" | "parentCategory"> {
  images: FullImage[];
  reviews: FullReview[];
  childCategory: FullCategory;
  parentCategory: FullCategory;
}

interface ProductResponse {
  product: FullProduct;
  message: string;
}

interface ProductsResponse {
  products: FullProduct[];
  skip: number;
  limit: number;
  total: number;
}

export type {
  Product,
  FullProduct,
  Review,
  FullReview,
  Image,
  FullImage,
  ProductResponse,
  ProductsResponse,
};
