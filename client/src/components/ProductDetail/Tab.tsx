import { useState } from "react";
import Review from "./Review";
import cn from "@/utils/cn";
import { FullProduct } from "@/types/product";

enum TabName {
  DESCRIPTION = "Mô tả món ăn",
  REVIEW = "Đánh giá",
}

const Tab = ({ product }: { product: FullProduct | null }) => {
  const [currentTab, setCurrentTab] = useState<string>(TabName.DESCRIPTION);

  return (
    <div className="my-[30px]">
      <ul className="uppercase font-semibold md:flex justify-center">
        {Object.values(TabName).map((tab) => (
          <li
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={cn(
              "py-2.5 px-4 cursor-pointer hover:border-b-[3px] hover:border-yellow-primary hover:text-yellow-primary",
              tab === currentTab &&
                "border-b-[3px] border-yellow-primary text-yellow-primary"
            )}
          >
            {tab}
          </li>
        ))}
      </ul>

      {product && (
        <div className="py-6 -mt-[1px] border-t border-t-[rgb(225,225,225)]">
          {currentTab === TabName.DESCRIPTION && product?.description && (
            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              id="description"
            ></div>
          )}
          {currentTab === TabName.REVIEW && <Review productId={product._id} />}
        </div>
      )}
    </div>
  );
};

export default Tab;
