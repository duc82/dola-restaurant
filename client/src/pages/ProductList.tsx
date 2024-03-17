import { useEffect, useState, useCallback, useRef } from "react";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb/index";
import Sort from "../components/ProductCategory/Sort";
import FilterGroup from "../components/ProductCategory/FilterGroup";
import Pagination from "../components/Pagination";
import { useParams, useSearchParams } from "react-router-dom";
import Overlay from "../components/Overlay";
import filter from "../data/filter.json";
import Category from "../components/ProductCategory/Category";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllProduct } from "@/store/reducers/productSlice";
import { Helmet } from "react-helmet-async";
import SelectedFilter from "../components/ProductCategory/SelectedFilter";
import cn from "../utils/cn";
import classNames from "classnames";
import Products from "../components/Product/ProductList";

// ???
const queryArray = (
  urlSearchParams: URLSearchParams,
  name: string
): string[] => {
  const query = urlSearchParams.get(name);
  if (query) {
    return query.split("-");
  }
  return [];
};

const ProductList = () => {
  const dispatch = useAppDispatch();
  const topProductsRef = useRef<HTMLDivElement>(null);
  const { category } = useParams();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<
    Record<string, string[]>
  >({
    cost: queryArray(urlSearchParams, "cost"),
    taste: queryArray(urlSearchParams, "taste"),
    size: queryArray(urlSearchParams, "size"),
  });
  const [isActiveFilterMobile, setIsActiveFilterMobile] = useState(false);
  const { products, total, limit } = useAppSelector((state) => state.product);
  const page = parseInt(urlSearchParams.get("page") ?? "1");

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
        urlSearchParams.set(name, arr.join("-"));
      } else {
        urlSearchParams.delete(name);
      }

      setUrlSearchParams(urlSearchParams);
      topProductsRef.current?.scrollIntoView();
    },
    [selectedFilter, urlSearchParams, setUrlSearchParams]
  );

  const clearSelectedFilter = () => {
    setSelectedFilter({
      cost: [],
      taste: [],
      size: [],
    });
    setUrlSearchParams();
  };

  const toggelFilterMobile = () =>
    setIsActiveFilterMobile(!isActiveFilterMobile);

  const handlePageChange = (page: number) => {
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
    topProductsRef.current?.scrollIntoView();
  };

  useEffect(() => {
    if (!category) return;
    const query = urlSearchParams.toString();

    dispatch(
      getAllProduct({
        category: category === "tat-ca-san-pham" ? undefined : category,
        query,
        limit: 12,
      })
    );
  }, [urlSearchParams, category, dispatch]);

  const pageCount = limit > 0 ? Math.ceil(total / limit) : 0;

  const isCategoryAllProduct = category === "tat-ca-san-pham";

  const title = isCategoryAllProduct
    ? "Tất cả sản phẩm"
    : products[0]?.childCategory.name;

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
            isActiveFilterMobile && "translate-x-0"
          )}
        >
          <Category title="Danh mục sản phẩm" />
          {(urlSearchParams.has("cost") ||
            urlSearchParams.has("taste") ||
            urlSearchParams.has("size")) && (
            <SelectedFilter
              selected={selectedFilter}
              update={updateSelectedFilter}
              clear={clearSelectedFilter}
            />
          )}
          <FilterGroup
            title="Chọn mức giá"
            items={filter.costs}
            name="cost"
            selected={selectedFilter.cost}
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
          <Products products={products} />
          {total > 0 && (
            <Pagination
              pageCount={pageCount}
              onPageChange={handlePageChange}
              currentPage={page}
            />
          )}
        </div>

        <button
          type="button"
          id="openFilterMobile"
          className={classNames(
            "fixed top-[35%] right-0 z-[999] cursor-pointer bg-center bg-[length:16px] bg-no-repeat text-white bg-yellow-primary rounded-l-lg w-11 h-10 shadow-card2 transition-[visibility,right] ease-ease duration-300 lg:hidden",
            isActiveFilterMobile
              ? "bg-filterClose right-64"
              : "right-0 bg-filter"
          )}
          onClick={toggelFilterMobile}
        ></button>
      </Container>
      <Overlay
        active={isActiveFilterMobile}
        onClick={toggelFilterMobile}
        className="ease-ease duration-300 z-[99]"
      />
    </>
  );
};

export default ProductList;
