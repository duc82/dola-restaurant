import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import ProductList from "@/components/Product/ProductList";
import Category from "@/components/ProductCategory/Category";
import { useAppSelector } from "@/store/hooks";
import cn from "@/utils/cn";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

const title = "Món ăn yêu thích";

export default function ProductFavorite() {
  const topProductsRef = useRef<HTMLDivElement>(null);
  const [isOpenFilterMobile, setIsOpenFilterMobile] = useState(false);

  const { favoriteProducts } = useAppSelector((state) => state.product);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="block lg:flex relative" ref={topProductsRef}>
        <aside
          className={cn(
            "sidebar translate-x-full lg:translate-x-0",
            isOpenFilterMobile && "translate-x-0"
          )}
        >
          <Category title="Danh mục sản phẩm" />
        </aside>
        <div className="flex-[0_0_75%] lg:pl-4">
          <h1 className="uppercase text-yellow-primary font-bold text-base py-2.5 mb-4 border-b border-b-yellow-primary">
            {title}
          </h1>
          <ProductList products={favoriteProducts} isLoading={false} />
        </div>
      </Container>
    </>
  );
}
