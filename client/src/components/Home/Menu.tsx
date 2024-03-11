import { useEffect, useRef, useState } from "react";
import Title from "./Title";
import Container from "../Container";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllProduct } from "@/store/reducers/productSlice";
import cn from "@/utils/cn";
import ProductList from "../Product/ProductList";
import useInView from "@/hooks/useInView";

const Menu = () => {
  const dispatch = useAppDispatch();
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });
  const { categories } = useAppSelector((state) => state.category);

  const parentCategories = categories.filter(
    (category) => !category.parentCategory
  );

  const [categorySlug, setCategorySlug] = useState("");

  const { products } = useAppSelector((state) => state.product);

  useEffect(() => {
    if (!categorySlug) return;

    if (isInView) {
      dispatch(getAllProduct({ category: categorySlug, limit: 10 }));
    }
  }, [categorySlug, dispatch, isInView]);

  useEffect(() => {
    if (parentCategories.length > 0 && !categorySlug) {
      setCategorySlug(parentCategories[0].slug);
    }
  }, [parentCategories, categorySlug]);

  return (
    <section className="py-[60px]">
      <Container>
        <Title>Thực đơn của chúng tôi</Title>
        <ul
          ref={ref}
          className="space-x-2.5 flex w-full mb-4 overflow-x-auto lg:justify-center"
        >
          {parentCategories.map((menu) => (
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
          page="Home"
        />
      </Container>
    </section>
  );
};

export default Menu;
