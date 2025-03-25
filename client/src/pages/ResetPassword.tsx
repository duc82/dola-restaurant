import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import InputGroup from "../components/Form/InputGroup";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import handlingAxiosError from "../utils/handlingAxiosError";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import authService from "@/services/authService";
import Button from "../components/Form/Button";

const title = "Đổi mật khẩu";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const resetPasswordSchema = object().shape({
  password: string()
    .min(6, "Mật khẩu phải tối thiểu 6 kí tự.")
    .max(50, "Mật khẩu tối đa 50 kí tự.")
    .required("Mật khẩu là bắt buộc."),
  confirmPassword: string().oneOf(
    [ref("password")],
    "Xác nhận mật khẩu phải trùng với mật khẩu"
  ),
});

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { email, token } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!email) return;
      try {
        setIsLoading(true);
        const data = await authService.resetPassword({
          email,
          password: values.password,
        });
        navigate("/dang-nhap");
        toast.success(data.message);
      } catch (error) {
        const err = handlingAxiosError(error);
        toast.error(err.message);
      } finally {
        setIsLoading(false);
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (!email || !token) {
      toast.error("Email hoặc token không hợp lệ");
      navigate("/dang-nhap");
      return;
    }
    authService.verifyPasswordResetToken({ email, token }).catch((error) => {
      const err = handlingAxiosError(error);
      navigate("/dang-nhap");
      toast.error(err.message);
    });
  }, [email, token, navigate]);

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="px-0">
        <div className="p-6 bg-white/[0.06] rounded-lg md:max-w-[50%] xl:max-w-[35%] mx-auto mb-10">
          <h1 className="text-2xl text-center mb-6">Đổi mật khẩu</h1>
          <form onSubmit={formik.handleSubmit}>
            <InputGroup
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password}
            />
            <InputGroup
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <Button
              type="submit"
              inactive={isLoading ? "cursorNotAllowed" : "primaryHover"}
              disabled={isLoading}
            >
              Đặt lại mật khẩu
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;
