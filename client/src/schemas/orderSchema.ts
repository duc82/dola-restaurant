import * as yup from "yup";

const orderSchema = yup.object({
  total: yup.string().test("required", "Vui lòng nhập tổng cộng", (value) => {
    const number = parseInt(value?.replace(/\D/g, "") ?? "0");
    return number >= 0;
  }),
  shippingAddress: yup.string().required("Vui lòng chọn địa chỉ giao hàng"),
  shippingFee: yup
    .string()
    .test("required", "Vui lòng nhập phí vận chuyển", (value) => {
      const number = parseInt(value?.replace(/\D/g, "") ?? "0");
      return number >= 0;
    }),
  paymentMethod: yup.string().required("Vui lòng chọn phương thức thanh toán"),
  isPaid: yup.boolean().required("Vui lòng chọn trạng thái thanh toán"),
  isDelivered: yup.boolean().required("Vui lòng chọn trạng thái vận chuyển"),
  note: yup.string().nullable(),
});

export default orderSchema;
