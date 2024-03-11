import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { string, object } from "yup";
import FacebookLogin from "../components/Login/FacebookLogin";
import GoogleLogin from "../components/Login/GoogleLogin";
import InputGroup from "../components/Form/InputGroup";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import {
  authStart,
  authSuccess,
  loginSuccess,
} from "@/store/reducers/authSlice";
import handlingAxiosError from "../utils/handlingAxiosError";
import ForgotPassword from "../components/Form/ForgotPassword";
import { useState } from "react";
import Button from "../components/Form/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import authService from "@/services/authService";
import { Spinner } from "@/icons";
import { LoginDTO } from "@/types/auth";
import { setUser } from "@/store/reducers/userSlice";

const title = "Đăng nhập tài khoản";

export const loginSchema = object().shape({
  email: string()
    .email("Địa chỉ email không hợp lệ.")
    .required("Địa chỉ email là bắt buộc."),
  password: string()
    .min(6, "Mật khẩu phải tối thiểu 6 kí tự.")
    .max(50, "Mật khẩu tối đa 50 kí tự.")
    .required("Mật khẩu là bắt buộc."),
});

const Login = () => {
  const [isActiveForgotPassword, setActiveForgotPassword] = useState(false);
  const { isLoading } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginDTO>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(authStart());
      try {
        const data = await authService.login(values);
        dispatch(loginSuccess());
        dispatch(setUser(data.user));
        navigate("/tai-khoan");
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      } finally {
        dispatch(authSuccess());
        resetForm();
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb
        breadcrumbs={[
          {
            name: title,
          },
        ]}
      />
      <Container className="px-0">
        <div className="p-6 bg-white/[0.06] rounded-lg md:max-w-[50%] xl:max-w-[35%] mx-auto mb-10">
          <ul className="flex w-full h-[50px] mb-[30px]">
            <li className="flex-1">
              <Link
                title="Đăng nhập"
                to="/dang-nhap"
                className="flex w-full h-full justify-center items-center text-base border-b border-b-yellow-primary text-yellow-primary"
              >
                Đăng nhập
              </Link>
            </li>
            <li className="flex-1">
              <Link
                title="Đăng ký"
                to="/dang-ky"
                className="flex w-full h-full justify-center items-center text-base border-b border-b-white hover:text-yellow-primary"
              >
                Đăng ký
              </Link>
            </li>
          </ul>
          <h1 className="text-2xl text-center mb-6">Đăng nhập</h1>
          <form onSubmit={formik.handleSubmit}>
            <InputGroup
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
            />
            <InputGroup
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              error={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              inactive={isLoading ? "cursorNotAllowed" : "primaryHover"}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Spinner className="w-5 h-5 animate-spin" />
                  <span>Đang tải</span>
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => setActiveForgotPassword((prev) => !prev)}
                className="my-4 text-center block hover:text-yellow-secondary"
              >
                Quên mật khẩu
              </button>
            </div>
          </form>
          {/* Forgot Password */}
          <ForgotPassword active={isActiveForgotPassword} />
          <div className="flex flex-col items-center">
            <p className="text-center mb-4">Hoặc đăng nhập bằng</p>
            <div className="flex flex-wrap space-x-2">
              <FacebookLogin />
              <GoogleLogin />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
