import { StartFill } from "@/icons";
import cn from "@/utils/cn";
import { useEffect, useState } from "react";

interface ReviewProps {
  productId: string;
}

const Review = ({ productId }: ReviewProps) => {
  const [indexStar, setIndexStar] = useState(-1);
  const [activeIndexStar, setActiveIndexStar] = useState(-1);

  useEffect(() => {}, [productId]);

  return (
    <div>
      <form>
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
        ></textarea>

        <button
          type="submit"
          className="bg-yellow-primary hover:bg-yellow-secondary px-5 rounded-lg text-white leading-9"
        >
          Gửi
        </button>
      </form>
    </div>
  );
};

export default Review;
