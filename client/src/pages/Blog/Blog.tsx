import Breadcrumb from "../../components/Breadcrumb";
import Category from "../../components/ProductCategory/Category";
import Container from "../../components/Container";
import BlogCard from "../../components/Blog/BlogCard";
import Prominent from "../../components/Blog/Prominent";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllBlog } from "@/store/reducers/blogSlice";

const title = "Tin tức";

const Blog = () => {
  const dispatch = useAppDispatch();
  const { blogs } = useAppSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb
        breadcrumbs={[
          {
            name: title,
          },
        ]}
      />
      <Container className="block lg:flex space-y-12 lg:space-y-0 mb-8">
        <div className="flex-[75%] order-2 lg:pl-4">
          <h1 className="uppercase text-yellow-primary font-bold text-base py-2.5 mb-4 border-b border-b-yellow-primary">
            Tin tức
          </h1>
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {blogs.map((blog, i) => (
              <BlogCard key={i} {...blog} />
            ))}
          </ul>
        </div>
        <aside className="flex-[25%] lg:pr-4">
          <Category title="Danh mục tin tức" />
          <Prominent />
        </aside>
      </Container>
    </>
  );
};

export default Blog;
