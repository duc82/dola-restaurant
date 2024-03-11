import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import formatDate from "@/utils/formatDate";
import { FullBlog } from "@/types/blog";

const BlogCard = (blog: FullBlog) => {
  return (
    <li className="bg-black rounded-lg">
      <div className="relative">
        <Link to="/">
          <LazyLoadImage
            src={blog.image}
            effect="opacity"
            wrapperClassName="overflow-hidden rounded-tr-lg rounded-tl-lg !block"
            className="hover:scale-110 transition-all ease-ease duration-1000 object-cover"
            alt={blog.title}
          />
        </Link>
        <div className="absolute top-4 left-4 text-center py-1 px-4 bg-yellow-primary rounded-lg">
          {formatDate(blog.createdAt)}
        </div>
      </div>
      <div className="p-4 pb-0">
        <p className="mb-2.5 text-base">Đăng bởi: {blog.user?.fullName}</p>
        <Link
          title="test"
          to="/"
          className="line-clamp-2 hover:text-yellow-primary text-lg mb-2.5 font-bold"
        >
          {blog.title}
        </Link>
        <p className="mb-4 text-base line-clamp-2 text-gray-300">
          Canh cá nấu mẻ là món ăn dân dã, quen thuộc trong mỗi mâm cơm gia đình
          Việt. Mùa hè nắng...
        </p>
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
