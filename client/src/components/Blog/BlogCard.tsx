import { Link } from "react-router-dom";
import formatDate from "@/utils/formatDate";
import clsx from "clsx";
import { Blog } from "@/types/blog";

interface BlogCardProps {
  blog: Blog;
  reverse?: boolean;
}

const BlogCard = ({ blog, reverse = false }: BlogCardProps) => {
  return (
    <li
      className={clsx(
        "bg-black rounded-lg flex",
        reverse ? "flex-col-reverse" : "flex-col"
      )}
    >
      <div className="relative">
        <Link
          to={`/tin-tuc/${blog.slug}`}
          className={clsx(
            "overflow-hidden block",
            reverse ? "rounded-b-xl" : "rounded-t-lg"
          )}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="hover:scale-110 transition-all ease-ease duration-1000 object-contain w-full"
          />
        </Link>
        <div className="absolute top-4 left-4 text-center py-1 px-4 bg-yellow-primary rounded-lg">
          {formatDate(blog.createdAt, {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>
      <div className="p-4 pb-0">
        <p className="mb-2.5 text-base">Đăng bởi: Admin Dola</p>
        <Link
          title="test"
          to={`/tin-tuc/${blog.slug}`}
          className="line-clamp-2 hover:text-yellow-primary text-lg mb-2.5 font-bold"
        >
          {blog.title}
        </Link>
        <div
          dangerouslySetInnerHTML={{ __html: blog.description }}
          className="mb-4 text-base line-clamp-2 text-gray-300"
        ></div>
        <div className="block w-full text-base leading-none text-yellow-primary relative py-5 border-t border-t-white">
          <Link
            to="/"
            title="Xem thêm"
            className="inline-flex items-center group"
          >
            <span className="absolute top-1/2 left-0 h-[1px] bg-yellow-primary transition-all duration-500 w-0 opacity-0 group-hover:w-[30px] group-hover:opacity-100"></span>
            <span className="transition-all duration-500 translate-x-0 group-hover:translate-x-[46px]">
              Xem thêm
            </span>
            <span className="w-[30px] h-[1px] bg-yellow-primary transition-all duration-500 ml-4 group-hover:opacity-0"></span>
          </Link>
        </div>
      </div>
    </li>
  );
};

export default BlogCard;
