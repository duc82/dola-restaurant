import { StartFill } from "@/icons";
import reviewService from "@/services/reviewService";
import { useAppSelector } from "@/store/hooks";
import { FullReview } from "@/types/review";
import cn from "@/utils/cn";
import formatDate from "@/utils/formatDate";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface ReviewProps {
  productId: string;
}

const Review = ({ productId }: ReviewProps) => {
  const [content, setContent] = useState("");
  const [indexStar, setIndexStar] = useState(-1);
  const [activeIndexStar, setActiveIndexStar] = useState(-1);
  const [reviews, setReviews] = useState<FullReview[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { accessToken } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = {
        content,
        rating: activeIndexStar + 1,
        product: productId,
      };

      const res = await reviewService.create(data);
      setReviews((prev) => [res.review, ...prev]);

      toast.success(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setContent("");
      setActiveIndexStar(-1);
    }
  };

  const fetchMoreReviews = async (page: number) => {
    const data = await reviewService.getAll({ product: productId, page });
    setReviews((prev) => [...prev, ...data.reviews]);
    setPage(data.page);
  };

  useEffect(() => {
    reviewService.getAll({ product: productId }).then((data) => {
      setReviews(data.reviews);
      setTotalPage(Math.ceil(data.total / data.limit));
    });
  }, [productId]);

  if (!accessToken) {
    return <Link to="/dang-nhap">Đăng nhập để đánh giá</Link>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-8">
        <h1 className="mb-4 text-xl">Để lại đánh giá</h1>
        <div className="flex items-center mb-4 space-x-1">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setActiveIndexStar(i)}
              onMouseEnter={() => setIndexStar(i)}
              onMouseLeave={() => setIndexStar(-1)}
            >
              <StartFill
                className={cn(
                  "w-7 h-7 hover:text-yellow-500 transition-colors",
                  i <= (indexStar === -1 ? activeIndexStar : indexStar) &&
                    "text-yellow-500"
                )}
              />
            </button>
          ))}
        </div>
        <textarea
          rows={3}
          className="text-black resize-none w-full mb-4 px-5 py-2 rounded-md outline-none"
          placeholder="Nội dung"
          autoComplete="off"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="bg-yellow-primary hover:bg-yellow-secondary px-5 rounded-lg text-white leading-9"
        >
          Gửi
        </button>
      </form>

      <ul>
        {reviews.map((review) => (
          <li key={review._id} className="rounded-md mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-lg">{review.user.fullName}</h3>
              <p>{formatDate(review.createdAt)}</p>
            </div>
            <div className="flex items-center space-x-1 mb-2">
              {Array.from({ length: review.rating }, (_, i) => (
                <StartFill
                  key={i}
                  className="w-6 h-6 text-yellow-500 transition-colors"
                />
              ))}
            </div>
            <div>{review.content}</div>
          </li>
        ))}
      </ul>

      {page < totalPage && (
        <button
          type="button"
          className="block mx-auto"
          onClick={() => fetchMoreReviews(page + 1)}
        >
          Xem thêm đánh giá
        </button>
      )}
    </div>
  );
};

export default Review;
