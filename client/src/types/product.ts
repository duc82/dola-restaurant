import { FullType, Pagination } from ".";
import { FullCategory } from "./category";

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
  images: string[];
  taste: string;
  size: string;
  price: number;
  discountPercent: number;
  stock: number;
  description: string;
  category: string;
}

interface FullProduct extends FullType, Omit<Product, "images" | "category"> {
  slug: string;
  avgRating: number;
  discountedPrice: number;
  images: FullImage[];
  reviews: FullReview[];
  category: FullCategory;
}

interface ProductResponse {
  product: FullProduct;
  message: string;
}

interface ProductsResponse extends Pagination {
  products: FullProduct[];
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
