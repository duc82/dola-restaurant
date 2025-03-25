import { useState, useCallback, useRef } from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb/index";
import Sort from "../components/ProductCategory/Sort";
import FilterGroup from "../components/ProductCategory/FilterGroup";
import Pagination from "../components/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import Overlay from "../components/Overlay";
import filter from "../data/filter.json";
import Category from "../components/ProductCategory/Category";
import { Helmet } from "@dr.pogodin/react-helmet";
import SelectedFilter from "../components/ProductCategory/SelectedFilter";
import cn from "../utils/cn";
import ProductList from "@/components/Product/ProductList";
import clsx from "clsx";
import { useAppSelector } from "@/store/hooks";

const queryArray = (searchParams: URLSearchParams, name: string): string[] => {
  const query = searchParams.get(name);
  if (query) {
    return query.split("-");
  }
  return [];
};

const Products = () => {
  const { products, isLoading, total, limit } = useAppSelector(
    (state) => state.product
  );
  const topProductsRef = useRef<HTMLDivElement>(null);
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedFilter, setSelectedFilter] = useState<
    Record<string, string[]>
  >({
    price: queryArray(searchParams, "price"),
    taste: queryArray(searchParams, "taste"),
    size: queryArray(searchParams, "size"),
  });
  const [isOpenFilterMobile, setIsOpenFilterMobile] = useState(false);

  const page = parseInt(searchParams.get("page") ?? "1");

  const updateSelectedFilter = useCallback(
    (value: string, name: string) => {
      const index = selectedFilter[name].findIndex((f) => f === value);
      const arr = selectedFilter[name].slice();

      if (index === -1) {
        arr.push(value);
      } else {
        arr.splice(index, 1);
      }

      setSelectedFilter({ ...selectedFilter, [name]: arr });

      if (arr.length > 0) {
        searchParams.set(name, arr.join("-"));
      } else {
        searchParams.delete(name);
      }
      setSearchParams(searchParams);
      topProductsRef.current?.scrollIntoView();
    },
    [selectedFilter, searchParams, setSearchParams]
  );

  const clearSelectedFilter = () => {
    setSelectedFilter({
      price: [],
      taste: [],
      size: [],
    });
    setSearchParams();
  };

  const toggelFilterMobile = () => setIsOpenFilterMobile(!isOpenFilterMobile);

  const handlePageChange = (page: number) => {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
    topProductsRef.current?.scrollIntoView();
  };

  const pageCount = limit > 0 ? Math.ceil(total / limit) : 0;

  const isCategoryAllProduct = category === "tat-ca-san-pham";

  const title = isCategoryAllProduct
    ? "Tất cả sản phẩm"
    : products[0]?.category.name ?? products[0]?.category.parent?.name;

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
          {(searchParams.has("price") ||
            searchParams.has("taste") ||
            searchParams.has("size")) && (
            <SelectedFilter
              selected={selectedFilter}
              update={updateSelectedFilter}
              clear={clearSelectedFilter}
            />
          )}
          <FilterGroup
            title="Chọn mức giá"
            items={filter.prices}
            name="price"
            selected={selectedFilter.price}
            onChange={updateSelectedFilter}
          />
          <FilterGroup
            title="Hương vị"
            items={filter.taste}
            name="taste"
            selected={selectedFilter.taste}
            onChange={updateSelectedFilter}
          />
          <FilterGroup
            title="Kích cỡ"
            items={filter.sizes}
            name="size"
            selected={selectedFilter.size}
            onChange={updateSelectedFilter}
          />
        </aside>
        <div className="flex-[0_0_75%] lg:pl-4">
          <h1 className="uppercase text-yellow-primary font-bold text-base py-2.5 mb-4 border-b border-b-yellow-primary">
            {isCategoryAllProduct ? "Tất cả món ăn" : title}
          </h1>
          <Sort />
          <ProductList
            products={products}
            isLoading={isLoading}
            skeletonCount={12}
          />
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
            currentPage={page}
            wrapperClassName="mb-[30px]"
          />
        </div>

        <button
          type="button"
          id="openFilterMobile"
          className={clsx(
            "fixed top-[35%] right-0 z-[999] cursor-pointer bg-center bg-[length:16px] bg-no-repeat text-white bg-yellow-primary rounded-l-lg w-11 h-10 shadow-card2 transition-[visibility,right] ease-ease duration-300 lg:hidden",
            isOpenFilterMobile ? "bg-filterClose right-64" : "right-0 bg-filter"
          )}
          onClick={toggelFilterMobile}
        ></button>
      </Container>
      <Overlay
        show={isOpenFilterMobile}
        onClick={toggelFilterMobile}
        className="ease-ease duration-300 z-[99]"
      />
    </>
  );
};

export default Products;
