import * as yup from "yup";

const contactSchema = yup.object({
  fullName: yup.string().required("Họ và tên là bắt buộc"),
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  phone: yup.string().required("Số điện thoại là bắt buộc"),
  message: yup.string().required("Nội dung là bắt buộc"),
});

export { contactSchema };
