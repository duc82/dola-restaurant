import Container from "../Container";
import Title from "./Title";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useRef } from "react";
import blogService from "@/services/blogService";
import { getAllBlogs } from "@/store/reducers/blogSlice";
import BlogCard from "../Blog/BlogCard";
import useInView from "@/hooks/useInView";

const Blog = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { triggerOnce: true });
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blog);

  useEffect(() => {
    if (isInView) {
      blogService
        .getAll({ limit: 12 })
        .then((res) => dispatch(getAllBlogs(res)));
    }
  }, [dispatch, isInView]);

  return (
    <section className="py-[60px] bg-emerald-secondary">
      <Container ref={ref}>
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
          {blogs.map((blog, i) => (
            <SwiperSlide key={blog._id}>
              <BlogCard blog={blog} reverse={i % 2 !== 0} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default Blog;
