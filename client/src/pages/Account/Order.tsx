import AccountPage from "@/components/Account/AccountPage";
import Breadcrumb from "@/components/Breadcrumb/index";
import Container from "@/components/Container";
import orderService from "@/services/orderService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getOrder } from "@/store/reducers/orderSlice";
import { formatAddress } from "@/utils/formatAddress";
import formatDate from "@/utils/formatDate";
import formatVnd from "@/utils/formatVnd";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Order = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (!order && id) {
      orderService.getById(id).then((data) => {
        dispatch(getOrder({ order: data.order }));
      });
    }
  }, [id, dispatch, order]);

  return (
    <>
      <Helmet>
        <title>Chi tiết đơn hàng</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item href="/tai-khoan">Tài khoản</Breadcrumb.Item>
        <Breadcrumb.Item href="/tai-khoan/don-hang">Đơn hàng</Breadcrumb.Item>
        <Breadcrumb.Item active>#{order?._id}</Breadcrumb.Item>
      </Breadcrumb>

      <Container className="mb-[30px] py-5 lg:flex">
        <AccountPage />
        <div className="flex-[0_0_75%]">
          <div className="flex items-center justify-between mb-7">
            <h1 className="text-lg">Chi tiết đơn hàng #{id}</h1>
            <p>Ngày tạo: {formatDate(order?.createdAt)}</p>
          </div>
          <div className="mr-8 inline-block">
            <span>Trạng thái thanh toán: </span>
            <i>
              <strong style={{ color: "red" }}>
                {order?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
              </strong>
            </i>
          </div>
          <div className="inline-block">
            <span>Trạng thái vận chuyển: </span>
            <i>
              <strong style={{ color: "red" }}>
                {order?.isDelivered ? "Đã giao hàng" : "Chưa giao hàng"}
              </strong>
            </i>
          </div>
          <div className="flex flex-wrap mt-8">
            <div className="pr-4 flex-[0_0_50%]">
              <h2 className="uppercase text-base mb-1.5">Địa chỉ giao hàng</h2>
              <div
                className="px-5 py-2.5 border border-gray-200 rounded-md"
                style={{ minHeight: "110px" }}
              >
                <p className="uppercase font-bold">
                  {order?.shippingAddress.fullName}
                </p>
                <p>Địa chỉ: {formatAddress(order?.shippingAddress)}</p>
                <p>Số điện thoại: {order?.shippingAddress.phone}</p>
              </div>
            </div>
            <div className="pr-4 pl-1 flex-[0_0_25%]">
              <h2 className="uppercase text-base mb-1.5">Thanh toán</h2>
              <div
                className="px-5 py-2.5 border border-gray-200 rounded-md"
                style={{ minHeight: "110px" }}
              >
                <p>{order?.paymentMethod}</p>
              </div>
            </div>
            <div className="pl-1 flex-[0_0_25%]">
              <h2 className="uppercase text-base mb-1.5">Ghi chú</h2>
              <div
                className="px-5 py-2.5 border border-gray-200 rounded-md"
                style={{ minHeight: "110px" }}
              >
                <p>{order?.note ? order.note : "Không có ghi chú"}</p>
              </div>
            </div>

            <div className="px-5 flex-1 border border-gary-200 mt-5 rounded-md">
              <table className="w-full text-base">
                <thead className="border-b border-b-gray-200">
                  <tr>
                    <th
                      style={{ width: "55%" }}
                      className="py-5 font-normal text-left"
                    >
                      Sản phẩm
                    </th>
                    <th style={{ width: "15%" }} className="py-5 font-normal">
                      Đơn giá
                    </th>
                    <th style={{ width: "15%" }} className="py-5 font-normal">
                      Số lượng
                    </th>
                    <th style={{ width: "15%" }} className="py-5 font-normal">
                      Tổng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order?.products.map((p) => (
                    <tr
                      key={p.product._id}
                      className="border-b border-b-gray-200"
                    >
                      <td className="py-4" style={{ width: "55%" }}>
                        <div className="flex items-center">
                          <Link to={`/san-pham/${p.product.slug}`}>
                            <LazyLoadImage
                              src={p.product.images[0].url}
                              alt={p.product.title}
                              effect="opacity"
                              width={90}
                              height={90}
                            />
                          </Link>
                          <Link
                            to={`/san-pham/${p.product.slug}`}
                            className="ml-4 text-sm"
                          >
                            {p.product.title}
                          </Link>
                        </div>
                      </td>
                      <td className="py-4 text-center" style={{ width: "15%" }}>
                        {formatVnd(p.product.price)}
                      </td>
                      <td className="py-4 text-center" style={{ width: "15%" }}>
                        {p.quantity}
                      </td>
                      <td className="py-4 text-center" style={{ width: "15%" }}>
                        {formatVnd(p.product.price * p.quantity)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="w-full text-base">
                <tfoot>
                  <tr>
                    <td className="py-4 w-3/4 text-end">Khuyến mại</td>
                    <td className="py-4 w-1/4 text-end">{formatVnd(0)}</td>
                  </tr>
                  <tr>
                    <td className="py-4 w-3/4 text-end">Phí vận chuyển</td>
                    <td className="py-4 w-1/4 text-end">
                      {formatVnd(40000)} (Giao hàng tận nơi)
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 w-3/4 text-end">Tổng tiền</td>
                    <td className="py-4 w-1/4 text-end">
                      <strong className="text-lg text-red-600">
                        {formatVnd(order?.total)}
                      </strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
