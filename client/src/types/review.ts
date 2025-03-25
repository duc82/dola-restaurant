import { FullType, Pagination } from ".";
import { FullProduct } from "./product";
import { FullUser } from "./user";

export interface Review {
  rating: number;
  content: string;
  user: string;
  product: string;
}

export interface FullReview extends FullType, Omit<Review, "user" | "product"> {
  user: FullUser;
  product: FullProduct;
}

export interface ReviewsResponse extends Pagination {
  reviews: FullReview[];
}

export interface ReviewResponse {
  review: FullReview;
  message: string;
}

export interface ReviewRequest extends Omit<Review, "user"> {}
