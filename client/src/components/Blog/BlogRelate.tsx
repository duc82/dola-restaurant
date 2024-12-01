import { Blog } from "@/types/blog";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export default function BlogRelate({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="pt-4">
      <h1 className="text-base text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        Tin tức liên quan
      </h1>
      <ul className="border border-yellow-primary rounded-b-lg py-2.5 px-4">
        {blogs.map((blog) => (
          <li
            key={blog._id}
            className="flex space-x-2.5 pb-2.5 mb-2.5 border-b border-b-white last:border-none last:m-0 last:p-0"
          >
            <Link to="/">
              <LazyLoadImage
                src={blog.image}
                alt="image"
                effect="opacity"
                width={90}
              />
            </Link>
            <div className="line-clamp-3">
              <Link
                to="/"
                className="font-bold leading-snug hover:text-yellow-primary"
              >
                {blog.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
