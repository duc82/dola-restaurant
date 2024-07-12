import { FullType, Pagination } from ".";

export interface Review {
  rating: number;
  comment: string;
  user: string;
}

export interface FullReview extends FullType, Review {}

export interface ReviewsResponse extends Pagination {
  reviews: Review[];
}

export interface ReviewRequest extends Review {
  product: string;
}
