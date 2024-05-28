import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import ProductCard from "./ProductCard";
import { FullProduct } from "@/types/product";

interface ProductListSliderProps {
  products: FullProduct[];
}

const ProductListSlider = ({ products }: ProductListSliderProps) => {
  return (
    <Swiper
      slidesPerView={2}
      spaceBetween={12}
      grabCursor={true}
      roundLengths={true}
      slideToClickedSlide={true}
      pagination={{
        clickable: true
      }}
      modules={[Pagination]}
      breakpoints={{
        640: {
          slidesPerView: 3,
          spaceBetween: 24
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 24
        }
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
