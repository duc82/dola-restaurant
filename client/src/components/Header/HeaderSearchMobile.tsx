import { Search } from "../../icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import formatVnd from "../../utils/formatVnd";
import useSearchProduct from "../../hooks/useSearchProduct";

const searchMobileVariants = {
  open: {
    height: "auto",
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      overflow: "visible",
    },
  },
  closed: {
    height: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
      overflow: "hidden",
    },
  },
};

const HeaderSearch = ({ active }: { active: boolean }) => {
  const { search, products, handleSearchChange, resetSearch } =
    useSearchProduct();

  return (
    <div className="lg:hidden w-full">
      <motion.div
        initial="closed"
        variants={searchMobileVariants}
        animate={active ? "open" : "closed"}
        className="bg-emerald-secondary"
      >
        <form className="p-2.5" action="/danh-muc-san-pham/tat-ca-san-pham">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-2.5 pr-8 h-10 leading-10 rounded-md border border-yellow-primary outline-none text-black placeholder:text-neutral-500"
              placeholder="Nhập tên món ăn..."
              name="search"
              id="searchMobile"
              autoComplete="off"
              value={search}
              onChange={handleSearchChange}
            />
            <button
              title="Search"
              type="submit"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 text-black"
            >
              <Search />
            </button>

            {active && products.length > 0 && (
              <div className="absolute top-full bg-white border border-gray-300 w-full p-2.5 pb-0 text-black z-[999]">
                <h1 className="text-base font-bold border-b border-b-black mb-2.5 inline-block">
                  Kết quả tìm kiếm:
                </h1>
                <ul>
                  {products.map((product) => (
                    <li
                      key={product._id}
                      className="my-2 border-b border-b-gray-200 flex space-x-2.5"
                    >
                      <Link
                        onClick={resetSearch}
                        to={`/san-pham/${product.slug}`}
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
                </ul>
                <Link
                  to={`/tim-kiem?title=${search}`}
                  className="text-center block -mt-1 pb-1 hover:text-yellow-primary"
                >
                  Xem tất cả
                </Link>
              </div>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default HeaderSearch;
