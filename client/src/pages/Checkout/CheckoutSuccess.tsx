import orderService from "@/services/orderService";
import { FullOrder } from "@/types/order";
import formatAddress from "@/utils/formatAddress";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const CheckoutSuccess = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<FullOrder | null>(null);

  useEffect(() => {
    if (!id) return;
    orderService.getById(id).then((data) => {
      setOrder(data.order);
    });
  }, [id]);

  return (
    <div className="bg-[rgb(230,232,234)]">
      <div className="md:max-w-3xl lg:max-w-7xl lg:px-8 mx-auto">
        <main className="py-6 lg:p-8">
          <header className="hidden lg:block mb-6">
            <h1 className="text-[28px] leading-none text-blue-500 font-normal">
              <Link to="/">Dola Restaurant</Link>
            </h1>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="flex-[1_1_60%]">
              <div className="flex flex-wrap items-center justify-center lg:justify-start text-center lg:text-left">
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
                <div className="lg:max-w-[75%]">
                  <h2 className="font-semibold text-lg">
                    Cảm ơn bạn đã đặt hàng
                  </h2>
                  <p className="my-3">
                    Một email xác nhận đã được gửi tới {order?.user.email}.
                    <br></br> Xin vui lòng kiểm tra email của bạn
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap p-3 m-4 border border-gray-300 space-y-6 lg:space-y-0">
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
            </div>
            <div className="flex-[1_1_40%]"></div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
