import { FullType, Pagination } from ".";
import { FullCategory } from "./category";
import { FullReview } from "./review";

interface Image {
  url: string;
}

interface FullImage extends FullType, Image {}

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
  Image,
  FullImage,
  ProductResponse,
  ProductsResponse,
};
