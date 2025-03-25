import orderService from "@/services/orderService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllOrders, getOrder } from "@/store/reducers/orderSlice";
import formatAddress from "@/utils/formatAddress";
import formatDate from "@/utils/formatDate";
import formatVnd from "@/utils/formatVnd";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    orderService.getAll({ userId: user?._id }).then((data) => {
      dispatch(getAllOrders({ orders: data.orders }));
    });
  }, [dispatch, user?._id]);

  return (
    <div>
      <h1 className="uppercase text-lg mb-7">Đơn hàng của bạn</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="bg-yellow-primary text-white border border-gray-200 p-1">
              Đơn hàng
            </th>
            <th className="bg-yellow-primary text-white border border-gray-200 p-1">
              Thời gian
            </th>
            <th className="bg-yellow-primary text-white border border-gray-200 p-1">
              Địa chỉ
            </th>
            <th className="bg-yellow-primary text-white border border-gray-200 p-1">
              Giá trị đơn hàng
            </th>
            <th className="bg-yellow-primary text-white border border-gray-200 p-1">
              PT thanh toán
            </th>
            <th className="bg-yellow-primary text-white border border-gray-200 p-1">
              TT thanh toán
            </th>
            <th className="bg-yellow-primary text-white border border-gray-200 p-1">
              TT vận chuyển
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="text-center py-5 px-1 border border-gray-200">
                <Link
                  to={`/tai-khoan/don-hang/${order._id}`}
                  onClick={() => dispatch(getOrder({ order }))}
                  className="text-blue-500 hover:text-white"
                >
                  #{order._id}
                </Link>
              </td>
              <td className="text-center py-5 px-1 border border-gray-200">
                {formatDate(order.createdAt, {
                  dateStyle: "short",
                  timeStyle: "short",
                })}
              </td>
              <td className="text-center py-5 px-1 border border-gray-200">
                {formatAddress(order.shippingAddress)}
              </td>
              <td className="text-center py-5 px-1 border border-gray-200">
                {formatVnd(order.total)}
              </td>
              <td className="text-center py-5 px-1 border border-gray-200">
                {order.paymentMethod}
              </td>
              <td className="text-center py-5 px-1 border border-gray-200">
                {order.paidAt ? "Đã thanh toán" : "Chưa thu tiền"}
              </td>
              <td className="text-center py-5 px-1 border border-gray-200">
                {order.deliveredAt ? "Đã chuyển" : "Chưa chuyến"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
