import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import InputGroup from "../components/Form/InputGroup";
import FacebookLogin from "../components/Login/FacebookLogin";
import GoogleLogin from "../components/Login/GoogleLogin";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { authStart, authSuccess } from "@/store/reducers/authSlice";
import handlingAxiosError from "../utils/handlingAxiosError";
import authService from "@/services/authService";
import Button from "../components/Form/Button";
import { SignUpDTO } from "@/types/auth";
import { signUpSchema } from "@/schemas/authSchema";

const title = "Đăng ký tài khoản";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.auth);

  const formik = useFormik<SignUpDTO>({
    initialValues: {
      email: "",
      fullName: "",
      phone: "",
      password: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values, { resetForm }) => {
      dispatch(authStart());
      try {
        const data = await authService.signUp(values);
        toast.success(data.message);
        navigate("/dang-nhap");
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
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="px-0">
        <div className="p-6 bg-white/[0.06] rounded-lg md:max-w-[50%] xl:max-w-[35%] mx-auto mb-10">
          <ul className="flex w-full h-[50px] mb-[30px]">
            <li className="flex-1">
              <Link
                title="Đăng nhập"
                to="/dang-nhap"
                className="flex w-full h-full justify-center items-center text-base border-b border-b-white hover:text-yellow-primary"
              >
                Đăng nhập
              </Link>
            </li>
            <li className="flex-1">
              <Link
                title="Đăng ký"
                to="/dang-ky"
                className="flex w-full h-full justify-center items-center text-base border-b  border-b-yellow-primary text-yellow-primary"
              >
                Đăng ký
              </Link>
            </li>
          </ul>
          <h1 className="text-2xl text-center mb-6">Đăng ký</h1>
          <form onSubmit={formik.handleSubmit}>
            <InputGroup
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Họ và tên"
              value={formik.values.fullName}
              error={formik.errors.fullName}
              onChange={formik.handleChange}
            />
            <InputGroup
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              error={formik.errors.email}
              onChange={formik.handleChange}
            />
            <InputGroup
              type="text"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              value={formik.values.phone}
              error={formik.errors.phone}
              onChange={formik.handleChange}
            />
            <InputGroup
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              error={formik.errors.password}
              onChange={formik.handleChange}
            />
            <Button
              type="submit"
              inactive={isLoading ? "cursorNotAllowed" : "primaryHover"}
              disabled={isLoading}
            >
              Đăng ký
            </Button>
          </form>
          <div className="flex flex-col items-center mt-4">
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

export default SignUp;
