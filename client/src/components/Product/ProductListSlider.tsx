import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useAppSelector } from "@/store/hooks";
import ProductCard from "./ProductCard";
import { FullProduct } from "@/types/product";

interface ProductListSliderProps {
  products: FullProduct[];
}

const ProductListSlider = ({ products }: ProductListSliderProps) => {
  const { isLoading } = useAppSelector((state) => state.product);
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={12}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      breakpoints={{
        640: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
      }}
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <ProductCard {...product} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductListSlider;
