import Modal from "@/components/Modal/Modal";
import { UpdateModalProps } from "@/types/admin";
import { FullOrder } from "@/types/order";
import { useFormik } from "formik";
import Input from "../Input";
import Select from "../Select";
import useFetchPagination from "@/hooks/useFetchPagination";
import { FullAddress } from "@/types/address";
import addressService from "@/services/addressService";
import formatAddress from "@/utils/formatAddress";
import { useCallback } from "react";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import orderService from "@/services/orderService";
import orderSchema from "@/schemas/orderSchema";

interface UpdateModalOrderProps extends UpdateModalProps {
  order: FullOrder;
  setOrders: React.Dispatch<React.SetStateAction<FullOrder[]>>;
}

export default function UpdateModal({
  show,
  onClose,
  order,
  setOrders,
}: UpdateModalOrderProps) {
  const formik = useFormik({
    initialValues: {
      total: order.total.toLocaleString(),
      shippingAddress: order.shippingAddress._id,
      shippingFee: order.shippingFee.toLocaleString(),
      paymentMethod: order.paymentMethod,
      isPaid: order.paidAt ? true : false,
      isDelivered: order.deliveredAt ? true : false,
      note: order.note,
    },
    validationSchema: orderSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const data = {
          ...values,
          total: parseInt(values.total.replace(/\D/g, "")),
          shippingFee: parseInt(values.shippingFee.replace(/\D/g, "")),
        };

        const res = await orderService.update(order._id, data);

        setOrders((prevOrders) => {
          const index = prevOrders.findIndex((o) => o._id === order._id);
          if (index !== -1) {
            prevOrders[index] = res.order;
          }
          return prevOrders;
        });
        onClose();
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
  });

  const getAddresses = useCallback(async () => {
    const data = await addressService.getCurrent();
    return { data };
  }, []);

  const { data: addresses } = useFetchPagination<FullAddress[]>(
    getAddresses,
    []
  );

  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="bg-emerald-secondary text-white"
    >
      <Modal.Header>
        <Modal.Title className="text-xl">Chỉnh sửa đơn hàng</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="currency"
              label="Tổng cộng"
              name="total"
              id="total"
              autoComplete="off"
              value={formik.values.total}
              onChange={formik.handleChange}
              error={formik.errors.total}
            />
            <Select
              name="shippingAddress"
              id="shippingAddress"
              label="Địa chỉ giao hàng"
              value={formik.values.shippingAddress}
              onChange={formik.handleChange}
            >
              {addresses.map((address) => (
                <Select.Option key={address._id} value={address._id}>
                  {formatAddress(address)}
                </Select.Option>
              ))}
            </Select>
            <Input
              type="currency"
              label="Phí vận chuyển"
              name="shippingFee"
              id="shippingFee"
              value={formik.values.shippingFee}
              onChange={formik.handleChange}
            />
            <Select
              name="paymentMethod"
              id="paymentMethod"
              label="Phương thức thanh toán"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
            >
              <Select.Option value={"Thanh toán khi giao hàng (COD)"}>
                Thanh toán khi giao hàng (COD)
              </Select.Option>
            </Select>
            <Select
              name="isPaid"
              id="isPaid"
              label="Trạng thái thanh toán"
              value={formik.values.isPaid.toString()}
              onChange={formik.handleChange}
            >
              <Select.Option value="true">Đã thanh toán</Select.Option>
              <Select.Option value="false">Chưa thanh toán</Select.Option>
            </Select>
            <Select
              name="isDelivered"
              id="isDelivered"
              label="Trạng thái vận chuyển"
              value={formik.values.isDelivered.toString()}
              onChange={formik.handleChange}
            >
              <Select.Option value="true">Đã giao hàng</Select.Option>
              <Select.Option value="false">Chưa giao hàng</Select.Option>
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <button
            type="submit"
            className="bg-amber-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-amber-700 text-center focus:ring-4 focus:ring-amber-900 transition"
          >
            Cập nhật
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
