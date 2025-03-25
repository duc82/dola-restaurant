import Button from "@/components/Form/Button";
import { Down, Print, Up } from "@/icons";
import orderService from "@/services/orderService";
import { FullOrder } from "@/types/order";
import cn from "@/utils/cn";
import formatAddress from "@/utils/formatAddress";
import formatVnd from "@/utils/formatVnd";
import { useEffect, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate, useParams } from "react-router-dom";

const CheckoutSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<FullOrder | null>(null);
  const [isShowProducts, setIsShowProducts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    orderService.getById(id).then((data) => {
      setOrder(data.order);
    });
  }, [id]);

  return (
    <div className="bg-[rgb(230,232,234)]">
      <Helmet>
        <title>Dola Restaurant - Cảm ơn</title>
      </Helmet>
      <div className="md:max-w-3xl lg:max-w-7xl lg:px-8 mx-auto">
        <main className="py-6 lg:p-8">
          <header className="hidden lg:block mb-6">
            <h1 className="text-[28px] leading-none text-blue-500 font-normal">
              <Link to="/">Dola Restaurant</Link>
            </h1>
          </header>
          <article className="after:content-[''] after:clear-both after:table">
            <div className="w-full float-left lg:w-3/5 px-4 lg:pl-0">
              <div className="flex items-center justify-center flex-col lg:flex-row lg:justify-start text-center lg:text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={72}
                  height={72}
                  className="mb-2 lg:mr-4"
                >
                  <g fill="none" stroke="#8EC343" strokeWidth="2">
                    <circle cx="36" cy="36" r="35"></circle>
                    <path d="M17.417,37.778l9.93,9.909l25.444-25.393"></path>
                  </g>
                </svg>
                <div>
                  <h2 className="font-semibold text-lg">
                    Cảm ơn bạn đã đặt hàng
                  </h2>
                  <p className="my-3">
                    Một email xác nhận đã được gửi tới {order?.user.email}.
                    <br /> Xin vui lòng kiểm tra email của bạn
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full float-right pt-6 lg:pt-0 lg:w-2/5 lg:pl-4">
              <aside className="bg-zinc-50 border border-zinc-200">
                <div className="py-2 px-4 flex justify-between">
                  <h2 className="font-semibold">
                    Đơn hàng {order?._id} ({order?.products.length})
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsShowProducts(!isShowProducts)}
                    className="text-blue-500 focus:text-blue-700 flex items-center space-x-1 lg:hidden"
                  >
                    <span>Xem chi tiết</span>
                    {isShowProducts ? (
                      <Up className="w-2.5 h-2.5" />
                    ) : (
                      <Down className="w-2.5 h-2.5" />
                    )}
                  </button>
                </div>
                <div
                  className={cn(
                    "border-t border-t-zinc-200 px-4 hidden lg:block",
                    isShowProducts && "block"
                  )}
                >
                  <ul className="max-h-60 overflow-y-auto">
                    {order?.products.map(({ product, quantity }) => (
                      <li
                        key={product._id}
                        className="flex items-center justify-between py-4"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <LazyLoadImage
                              src={product.images[0].url}
                              alt={product.title}
                              effect="opacity"
                              className="w-14 h-14 rounded-lg"
                              wrapperClassName="!block"
                            />
                            <span className="text-sm rounded-full w-5 h-5 leading-5 text-center absolute -top-2 -right-2 text-white bg-blue-500">
                              {quantity}
                            </span>
                          </div>

                          <p className="text-[rgb(51,51,51)] font-medium">
                            {product.title}
                          </p>
                        </div>
                        <span className="pl-4">
                          {formatVnd(product.discountedPrice * quantity)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-t border-t-zinc-200 py-2 px-4">
                  <div className="flex justify-between mb-2">
                    <span>Tạm tính</span>
                    <span>{formatVnd((order?.total || 0) - 40000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>{formatVnd(40000)}</span>
                  </div>
                </div>
                <div className="border-t border-t-zinc-200 py-2 px-4 flex justify-between text-base">
                  <span>Tổng cộng</span>
                  <span className="font-medium text-xl text-blue-500">
                    {formatVnd(order?.total)}
                  </span>
                </div>
              </aside>
            </div>
            <div className="w-full float-left pt-6 lg:pt-0 lg:w-3/5 lg:pr-4">
              <div className="flex flex-wrap p-3 m-4 border border-gray-300 space-y-6 md:space-y-0">
                <div className="basis-full md:basis-1/2">
                  <h2 className="text-xl font-semibold">Thông tin mua hàng</h2>
                  <p className="my-3">{order?.shippingAddress.fullName}</p>

                  <p className="my-3">{order?.user.email}</p>

                  <p className="my-3">{order?.shippingAddress.phone}</p>
                </div>
                <div className="basis-full md:basis-1/2">
                  <h2 className="text-xl font-semibold">Địa chỉ nhận hàng</h2>
                  <p className="my-3">{order?.shippingAddress.detail}</p>

                  <p className="my-3">
                    {formatAddress(order?.shippingAddress, { medium: true })}
                  </p>

                  <p className="my-3">{order?.shippingAddress.phone}</p>
                </div>
                <div className="basis-full md:basis-1/2">
                  <h2 className="text-xl font-semibold">
                    Phương thức thanh toán
                  </h2>
                  <p className="my-3">{order?.paymentMethod}</p>
                </div>
                <div className="basis-full md:basis-1/2">
                  <h2 className="text-xl font-semibold">
                    Phương thức vận chuyển
                  </h2>
                  <p className="my-3">Giao hàng tận nơi</p>
                </div>
              </div>
              <div className="pt-6 flex items-center justify-center lg:justify-end">
                <Button
                  size={"medium"}
                  intent={"secondary"}
                  inactive={"noOpacity"}
                  onClick={() => navigate("/")}
                >
                  Tiếp tục mua hàng
                </Button>
                <button
                  type="button"
                  className="flex items-center space-x-2 text-blue-500 mx-8 text-2xl"
                  onClick={() => window.print()}
                >
                  <Print className="w-6 h-6" />
                  <span>In </span>
                </button>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
