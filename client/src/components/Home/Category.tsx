import Container from "../Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";
import Title from "./Title";
import { useAppSelector } from "@/store/hooks";
import cac_mon_khac from "@/assets/images/cac-mon-khac.webp";

const Category = () => {
  const { categories } = useAppSelector((state) => state.category);

  const mainDishes = categories.find(
    (category) => category.slug === "mon-chinh"
  )?.childrens;

  return (
    <section className="py-[60px] bg-emerald-secondary">
      <Container>
        <Title>Danh mục nổi bật</Title>

        <LazyLoadComponent>
          <Swiper
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              992: {
                slidesPerView: 4,
              },
            }}
          >
            {mainDishes?.map((dish) => (
              <SwiperSlide
                className="py-7 px-6 relative border border-white rounded-lg group"
                key={dish._id}
              >
                <Link
                  to={`/danh-muc-san-pham/${dish.slug}`}
                  title={dish.name}
                  className="text-center block"
                >
                  <div>
                    <LazyLoadImage
                      src={dish.image}
                      alt={dish.name}
                      width={160}
                      height={160}
                      effect="opacity"
                      className="mx-auto"
                    />
                  </div>
                  <h2 className="mt-5 mb-1.5 text-[26px] leading-[34px]">
                    {dish.name}
                  </h2>
                  <p className="font-light text-base leading-[30px]">
                    {dish.description}
                  </p>
                </Link>
                <div className="absolute inset-2.5 border border-yellow-primary transition-all duration-[800ms] ease-ease w-[calc(100%-20px)] h-[calc(100%-20px)] opacity-0 group-hover:opacity-100 z-[-1] rounded-lg"></div>
              </SwiperSlide>
            ))}

            <SwiperSlide className="py-7 px-6 relative border border-white rounded-lg group">
              <Link
                to="/danh-muc-san-pham/tat-ca-san-pham"
                title="Các món khác"
                className="text-center block"
              >
                <div>
                  <LazyLoadImage
                    src={cac_mon_khac}
                    alt={"Các món khác"}
                    width={160}
                    height={160}
                    effect="opacity"
                    className="mx-auto"
                  />
                </div>
                <h2 className="mt-5 mb-1.5 text-[26px] leading-[34px]">
                  Các món khác
                </h2>
                <p className="font-light text-base leading-[30px]">
                  Các món ăn được chế biến tinh tế với hương vị đặc biệt nhất
                </p>
              </Link>
              <div className="absolute inset-2.5 border border-yellow-primary transition-all duration-[800ms] ease-ease w-[calc(100%-20px)] h-[calc(100%-20px)] opacity-0 group-hover:opacity-100 z-[-1] rounded-lg"></div>
            </SwiperSlide>
          </Swiper>
        </LazyLoadComponent>
      </Container>
    </section>
  );
};

export default Category;
