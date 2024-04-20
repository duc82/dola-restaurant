import Container from "../Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Pagination } from "swiper/modules";

const Testimonial = () => {
  return (
    <section className="py-[50px] bg-rating bg-cover bg-no-repeat bg-center">
      <Container>
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          spaceBetween={10}
          slidesPerView={1}
          className="lg:max-w-[58%] xl:max-w-[50%] mx-0"
        >
          {[...Array(3)].map((_, i) => (
            <SwiperSlide
              key={i}
              className="rounded-lg p-[45px] bg-emerald-primary"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-4">
                  <div>
                    <LazyLoadImage
                      width={80}
                      height={80}
                      effect="opacity"
                      src={`https://picsum.photos/500?random=${i + 1}`}
                      className="rounded-full"
                    />
                  </div>
                  <div>
                    <h1 className="text-[26px] leading-[34px] mb-2">
                      Lorem Ipsum
                    </h1>
                    <h2 className="capitalize text-yellow-primary text-lg tracking-widest">
                      Nhân viên văn phòng
                    </h2>
                  </div>
                </div>
                <svg
                  className="w-[70px] h-[70px] text-yellow-primary hidden md:block"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                >
                  <path d="M96 96C42.98 96 0 138.1 0 192s42.98 96 96 96c11.28 0 21.95-2.305 32-5.879V288c0 35.3-28.7 64-64 64c-17.67 0-32 14.33-32 32s14.33 32 32 32c70.58 0 128-57.42 128-128V192C192 138.1 149 96 96 96zM448 192c0-53.02-42.98-96-96-96s-96 42.98-96 96s42.98 96 96 96c11.28 0 21.95-2.305 32-5.879V288c0 35.3-28.7 64-64 64c-17.67 0-32 14.33-32 32s14.33 32 32 32c70.58 0 128-57.42 128-128V192z"></path>
                </svg>
              </div>
              <p className="font-light text-base">
                Món ăn ở đây hầu hết đều rất ngon, khẩu vị phù hợp với tôi, tôi
                sẽ luôn ủng hộ nhà hàng Dola Restaurant
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Testimonial;
