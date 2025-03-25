import { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Category from "@/components/ProductCategory/Category";
import Container from "@/components/Container";
import BlogCard from "@/components/Blog/BlogCard";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import blogService from "@/services/blogService";
import { getAllBlogs } from "@/store/reducers/blogSlice";
import BlogRelate from "@/components/Blog/BlogRelate";

const title = "Tin tức";

const Blog = () => {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blog);

  useEffect(() => {
    blogService.getAll({ limit: 12 }).then((res) => dispatch(getAllBlogs(res)));
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="block lg:flex space-y-12 lg:space-y-0 mb-8">
        <div className="flex-[75%] order-2 lg:pl-4">
          <h1 className="uppercase text-yellow-primary font-bold text-base py-2.5 mb-4 border-b border-b-yellow-primary">
            Tin tức
          </h1>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {blogs.map((blog, i) => (
              <BlogCard key={i} blog={blog} />
            ))}
          </ul>
        </div>
        <aside className="flex-[25%] lg:pr-4">
          <Category title="Danh mục tin tức" />
          <BlogRelate blogs={blogs} />
        </aside>
      </Container>
    </>
  );
};

export default Blog;
