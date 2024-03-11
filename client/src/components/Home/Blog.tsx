import Container from "../Container";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const Blog = () => {
  return (
    <section className="py-[60px] bg-emerald-secondary">
      <Container>
        <Title url="/tin-tuc">Tin tức</Title>
        <Swiper
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          }}
        >
          <SwiperSlide></SwiperSlide>
        </Swiper>
      </Container>
    </section>
  );
};

export default Blog;
