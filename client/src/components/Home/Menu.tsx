import { useEffect, useRef, useState } from "react";
import Title from "./Title";
import Container from "../Container";
import { useAppSelector } from "@/store/hooks";
import cn from "@/utils/cn";
import ProductList from "../Product/ProductList";
import useInView from "@/hooks/useInView";
import productService from "@/services/productService";
import { FullProduct } from "@/types/product";

const Menu = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });
  const { categories } = useAppSelector((state) => state.category);

  const [categorySlug, setCategorySlug] = useState("");
  const [products, setProducts] = useState<FullProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!categorySlug) return;

    if (isInView) {
      setIsLoading(true);
      productService
        .getByParentCategory(categorySlug, { limit: 10 })
        .then((value) => {
          setProducts(value.products);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [categorySlug, isInView]);

  useEffect(() => {
    if (categories.length > 0 && !categorySlug) {
      setCategorySlug(categories[0].slug);
    }
  }, [categories, categorySlug]);

  return (
    <section className="py-[60px]">
      <Container>
        <Title>Thực đơn của chúng tôi</Title>
        <ul
          ref={ref}
          className="space-x-2.5 flex w-full mb-4 overflow-x-auto lg:justify-center"
        >
          {categories.map((menu) => (
            <li
              key={menu._id}
              onClick={() => setCategorySlug(menu.slug)}
              className={cn(
                "p-2.5 mb-2.5 border border-white rounded-lg cursor-pointer lg:text-base font-semibold hover:bg-yellow-primary hover:border-yellow-primary transition-all whitespace-nowrap",
                categorySlug === menu.slug &&
                  "bg-yellow-primary border-yellow-primary"
              )}
            >
              {menu.name}
            </li>
          ))}
        </ul>
        <ProductList
          products={products}
          wrapperClassName="xl:grid-cols-5"
          isLoading={isLoading}
          skeletonCount={5}
        />
      </Container>
    </section>
  );
};

export default Menu;
