import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const Prominent = () => {
  return (
    <div className="pt-4">
      <h1 className="text-base text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        Tin tức liên quan
      </h1>
      <ul className="border border-yellow-primary rounded-b-lg py-2.5 px-4">
        <li className="flex space-x-2.5 pb-2.5 mb-2.5 border-b border-b-white">
          <Link to="/">
            <LazyLoadImage
              src="https://picsum.photos/1000/700?random=1"
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
              Mách bạn công thức làm canh cá nấu mẻ thơm ngon đậm vị
            </Link>
          </div>
        </li>
        <li className="flex space-x-2.5 pb-2.5 mb-2.5 border-b border-b-white">
          <Link to="/">
            <LazyLoadImage
              src="https://picsum.photos/1000/700?random=1"
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
              Mách bạn công thức làm canh cá nấu mẻ thơm ngon đậm vị
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Prominent;
