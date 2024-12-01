import { object, string } from "yup";

const loginSchema = object().shape({
  email: string()
    .email("Địa chỉ email không hợp lệ.")
    .required("Địa chỉ email là bắt buộc."),
  password: string()
    .min(6, "Mật khẩu phải tối thiểu 6 kí tự.")
    .max(50, "Mật khẩu tối đa 50 kí tự.")
    .required("Mật khẩu là bắt buộc."),
});

const signUpSchema = loginSchema.clone().shape({
  fullName: string().required("Họ và tên là bắt buộc."),
  phone: string()
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ.",
    })
    .required("Số điện thoại là bắt buộc."),
  password: string()
    .min(6, "Mật khẩu phải tối thiểu 6 kí tự.")
    .max(50, "Mật khẩu tối đa 50 kí tự.")
    .required("Mật khẩu là bắt buộc."),
});

export { loginSchema, signUpSchema };
