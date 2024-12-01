import { Search } from "../../icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate } from "react-router-dom";
import formatVnd from "../../utils/formatVnd";
import useSearchProduct from "../../hooks/useSearchProduct";
import { FormEvent } from "react";

const HeaderSearchDesktop = () => {
  const { search, products, handleSearchChange, resetSearch } =
    useSearchProduct();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/tim-kiem?query=${search}`);
  };

  return (
    <div className="hidden lg:block absolute transition-[visibility,opacity,transform] duration-300 top-full right-0 bg-white w-[420px] z-[9999] rounded-md p-5 pt-2.5 invisible opacity-0 scale-90 group-hover:visible group-hover:opacity-100 group-hover:scale-100">
      <h1 className="uppercase text-gray-700 mb-4 text-base py-1.5 font-medium text-left border-b border-b-gray-200">
        Tìm kiếm món ăn của bạn
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            className="w-full pl-2.5 pr-8 h-10 leading-10 rounded-md border border-yellow-primary outline-none text-black placeholder:text-neutral-500"
            placeholder="Nhập tên món ăn..."
            name="search"
            id="search"
            autoComplete="off"
            onChange={handleSearchChange}
          />
          <button
            title="Search"
            type="submit"
            className="absolute top-1/2 right-2.5 -translate-y-1/2 text-black"
          >
            <Search />
          </button>
        </div>

        {products.length > 0 && (
          <div className="p-2.5 mt-2.5 border border-gray-200">
            <h1 className="uppercase text-gray-700 py-1.5 border-b border-b-gray-200 text-base font-medium">
              Kết quả tìm kiếm:
            </h1>
            <ul>
              {products.map((product) => (
                <li
                  key={product._id}
                  className="my-2 border-b border-b-gray-200 flex space-x-2.5"
                >
                  <Link
                    to={`/san-pham/${product.slug}`}
                    onClick={resetSearch}
                    className="flex-none"
                  >
                    <LazyLoadImage
                      src={product.images[0].url}
                      alt={product.title}
                      effect="opacity"
                      width={60}
                      height={60}
                    />
                  </Link>
                  <div className="my-1">
                    <h3 className="line-clamp-1">
                      <Link
                        onClick={resetSearch}
                        to={`/san-pham/${product.slug}`}
                        className="mb-1 text-black hover:text-yellow-primary"
                      >
                        {product.title}
                      </Link>
                    </h3>

                    <span className="text-red-600 font-medium">
                      {formatVnd(
                        product.price -
                          (product.price * product.discountPercent) / 100
                      )}
                    </span>
                    {product.discountPercent > 0 && (
                      <span className="text-gray-400 text-xs font-light line-through pl-1.5">
                        {formatVnd(product.price)}
                      </span>
                    )}
                  </div>
                </li>
              ))}
              <li className="text-center leading-5">
                <Link
                  to={`/tim-kiem?query=${search}`}
                  className="text-center text-gray-800 hover:text-yellow-primary"
                >
                  Xem tất cả
                </Link>
              </li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default HeaderSearchDesktop;
