import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import ProductList from "@/components/Product/ProductList";
import productService from "@/services/productService";
import { FullProduct } from "@/types/product";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

const title = "Tìm kiếm";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<FullProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    productService
      .getAll({
        search: query,
      })
      .then((res) => {
        setProducts(res.products);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  return (
    <>
      <Helmet>{title}</Helmet>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Trang chủ</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <h1 className="my-4 text-2xl">
          Có {products.length} kết quả tìm kiếm phù hợp
        </h1>
        <ProductList
          products={products}
          isLoading={isLoading}
          skeletonCount={12}
        />
      </Container>
    </>
  );
}
