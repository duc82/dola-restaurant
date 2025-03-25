import { object, string } from "yup";

const addressSchema = object().shape({
  fullName: string().required("Họ tên là bắt buộc."),
  phone: string()
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ."
    })
    .min(10, "Số điện thoại phải tối thiểu 10 số.")
    .max(10, "Số điện thoại tối đa 10 số.")
    .required("Số điện thoại là bắt buộc."),
  province: string().required("Tỉnh thành là bắt buộc."),
  district: string().required("Quận huyện là bắt buộc."),
  ward: string().required("Phường xã là bắt buộc."),
  detail: string().required("Địa chỉ là bắt buộc.")
});

export { addressSchema };
