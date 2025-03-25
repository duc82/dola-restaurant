import { useRef, useState } from "react";
import Breadcrumb from "../components/Breadcrumb/index";
import { Link, useLoaderData } from "react-router-dom";
import Container from "../components/Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import formatVnd from "../utils/formatVnd";
import useQuantity from "../hooks/useQuantity";
import { Helmet } from "@dr.pogodin/react-helmet";
import Tab from "../components/ProductDetail/Tab";
import { useAppDispatch } from "@/store/hooks";
import { increaseQuantity } from "@/store/reducers/cartSlice";
import ProductRelate from "@/components/ProductDetail/ProductRelate";
import ProductViewed from "@/components/ProductDetail/ProductViewed";
import Fancybox from "@/components/Fancybox";
import Voucher from "@/components/Voucher";
import { useModalCart } from "@/providers/CartProvider";
import BlogRelate from "@/components/Blog/BlogRelate";
import { FullProduct } from "@/types/product";
import { Blog } from "@/types/blog";

interface ProductDetailLoaderData {
  product: FullProduct;
  suggestions: FullProduct[];
  blogs: Blog[];
}

const ProductDetail = () => {
  const dispatch = useAppDispatch();
  const { product, suggestions, blogs } =
    useLoaderData<ProductDetailLoaderData>();
  const { updateAddedCart } = useModalCart();

  const {
    quantity,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleChangeQuantity,
    resetQuantity,
  } = useQuantity({ max: product?.stock });

  const [indexActiveImage, setIndexActiveImage] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);

  const handleChangeActiveImage = (index: number) => {
    setIndexActiveImage(index);
    swiperRef.current?.slideTo(index);
  };

  const handleAddQuantity = () => {
    if (!product) return;
    if (!quantity) {
      resetQuantity();
    }

    const cart = {
      ...product,
      price: product.discountedPrice,
      quantity: quantity ? +quantity : 1,
    };

    dispatch(increaseQuantity(cart));

    updateAddedCart(cart);
  };

  return (
    <>
      <Helmet>
        <title>{product?.title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        {product?.category.parent && (
          <Breadcrumb.Item
            href={`/danh-muc-san-pham/${product?.category.parent.slug}`}
          >
            {product?.category.parent.name}
          </Breadcrumb.Item>
        )}
        <Breadcrumb.Item href={`/danh-muc-san-pham/${product?.category.slug}`}>
          {product?.category.name}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{product?.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="lg:w-3/4">
          <div className="md:flex">
            {/* Image */}
            <div className="relative md:max-w-[50%] lg:max-w-[41%] md:pr-4 w-full">
              <Fancybox className="sticky top-4 mb-4">
                <Swiper
                  modules={[Navigation]}
                  navigation
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) =>
                    setIndexActiveImage(swiper.activeIndex)
                  }
                >
                  {product?.images.map((image) => (
                    <SwiperSlide key={image._id}>
                      <Link data-fancybox="product-images" to={image.url}>
                        <LazyLoadImage
                          src={image.url}
                          alt={product.title}
                          effect="opacity"
                          wrapperClassName="!block"
                          className="w-full"
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
                {product && product.images.length > 1 && (
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    className="mt-2.5"
                  >
                    {product.images.map((image, i) => (
                      <SwiperSlide
                        key={image._id}
                        className="overflow-hidden cursor-pointer"
                        onClick={() => handleChangeActiveImage(i)}
                      >
                        {i === indexActiveImage && (
                          <>
                            <span className="absolute top-0 h-0.5 bg-yellow-primary w-full animate-prod-x"></span>
                            <span className="absolute top-0 right-0 h-full bg-yellow-primary w-0.5 animate-prod-y"></span>
                            <span
                              style={{ animationDirection: "reverse" }}
                              className="absolute bottom-0 h-0.5 bg-yellow-primary w-full animate-prod-x"
                            ></span>
                            <span
                              className="absolute bottom-0 left-0 h-full rotate-180 bg-yellow-primary w-0.5 animate-prod-y"
                              style={{ animationDirection: "reverse" }}
                            ></span>
                          </>
                        )}
                        <LazyLoadImage
                          src={image.url}
                          alt={product.title}
                          effect="opacity"
                          wrapperClassName="!block"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </Fancybox>
            </div>
            <div className="block relative w-full md:pl-4">
              <h1 className="text-[40px] leading-[48px] font-medium mb-1 font-dancing_script">
                {product?.title}
              </h1>
              <span className="text-3xl text-red-600 font-bold leading-[48px]">
                {formatVnd(product?.discountedPrice)}
              </span>
              {product && product?.discountPercent > 0 && (
                <div>
                  <span className="text-base">
                    Giá gốc: {formatVnd(product?.price)}
                  </span>
                  <br />
                  <span className="text-red-600">
                    Tiết kiệm:{" "}
                    {formatVnd(product.price - product.discountedPrice)}
                  </span>
                </div>
              )}
              {/* Quantity */}
              <div className="mt-5">
                <div>
                  <label htmlFor="quantity" className="mb-2 block">
                    Số lượng:
                  </label>
                  <div className="flex items-center space-x-1.5 mb-4">
                    <button
                      type="button"
                      title="Giảm"
                      className="w-10 h-10 text-xl rounded-md bg-yellow-primary"
                      onClick={handleDecreaseQuantity}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={handleChangeQuantity}
                      autoComplete="off"
                      className="no-spin w-10 h-10 p-0 text-black text-center outline-none rounded-md text-[15px] border border-yellow-primary"
                    />
                    <button
                      type="button"
                      title="Thêm"
                      className="w-10 h-10 text-xl rounded-md bg-yellow-primary"
                      onClick={handleIncreaseQuantity}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="mt-5 flex flex-col lg:flex-row space-y-1.5 lg:space-y-0 lg:space-x-2">
                  <button
                    type="button"
                    onClick={handleAddQuantity}
                    className="w-full uppercase text-center rounded-lg text-white bg-yellow-primary py-2.5 hover:bg-yellow-secondary"
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <Link
                    to="/dat-ban"
                    className="w-full uppercase text-center rounded-lg text-white bg-red-600 py-2.5 hover:bg-red-700"
                  >
                    Đặt bàn tại đây
                  </Link>
                </div>
              </div>
              {/* Voucher */}
              <Voucher />
            </div>
          </div>
          <Tab product={product} />
          {/* Product relate */}
          <ProductRelate categorySlug={product?.category.parent?.slug} />
          {/* Product viewed  */}
          {product && <ProductViewed product={product} />}
        </div>

        <div className="mb-10 lg:w-1/4">
          <div className="sticky top-4">
            <div className="mb-4">
              <h1 className="text-[15px] text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
                Có thể bạn đang tìm
              </h1>
              <ul className="py-2.5 px-4 border border-yellow-primary rounded-b-lg">
                {suggestions.map((product) => (
                  <li
                    key={product._id}
                    className="flex lg:flex-col xl:flex-row lg:space-y-2.5 xl:space-y-0 items-center py-2.5 space-x-2.5 "
                  >
                    <Link to={`/`}>
                      <LazyLoadImage
                        src={product.images[0].url}
                        alt="Random"
                        effect="opacity"
                        wrapperClassName="!block"
                        className="rounded-lg"
                        width={100}
                        height={100}
                      />
                    </Link>
                    <div className="flex-1 lg:flex xl:block flex-col items-center">
                      <Link
                        to="/"
                        className="text-base font-semibold line-clamp-1 mb-1.5 hover:text-yellow-primary"
                      >
                        {product.title}
                      </Link>
                      <p className="text-red-600 text-base font-semibold">
                        {formatVnd(product.discountedPrice)}
                      </p>
                      <button
                        type="button"
                        className="py-1 px-4 mt-1 bg-yellow-primary shadow-card2 rounded-md"
                      >
                        Đặt món
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <BlogRelate blogs={blogs} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default ProductDetail;
