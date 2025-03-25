import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import ProductList from "@/components/Product/ProductList";
import { FullProduct } from "@/types/product";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useLoaderData, useNavigation } from "react-router-dom";

const title = "Tìm kiếm";

export default function Search() {
  const products = useLoaderData<FullProduct[]>();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

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
