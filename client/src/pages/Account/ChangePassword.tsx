import InputGroup from "@/components/Form/InputGroup";
import userService from "@/services/userService";
import { useAppSelector } from "@/store/hooks";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { object, ref, string } from "yup";

const validationSchema = object().shape({
  oldPassword: string(),
  newPassword: string()
    .min(6, "Mật khẩu phải tối thiểu 6 kí tự.")
    .max(50, "Mật khẩu tối đa 50 kí tự.")
    .required("Mật khẩu là bắt buộc."),
  confirmPassword: string()
    .oneOf([ref("newPassword")], "Xác nhận mật khẩu phải trùng với mật khẩu")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

const ChangePassword = () => {
  const { user } = useAppSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = await userService.changePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        });

        toast.success(data.message);
        resetForm();
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
  });

  return (
    <div>
      <h1 className="uppercase text-lg mb-7">Đổi mật khẩu</h1>
      <p className="mb-4">
        Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 6 kí
        tự
      </p>
      <form className="w-1/2" onSubmit={formik.handleSubmit}>
        {user?.isHavePassword && (
          <fieldset>
            <label
              htmlFor="oldPassword"
              className="text-base mb-2 inline-block"
            >
              Mật khẩu cũ <span>*</span>
            </label>
            <InputGroup
              type="password"
              name="oldPassword"
              id="oldPassword"
              value={formik.values.oldPassword}
              onChange={formik.handleChange}
              error={formik.errors.oldPassword && formik.errors.oldPassword}
            />
          </fieldset>
        )}
        <fieldset>
          <label htmlFor="password" className="text-base mb-2 inline-block">
            Mật khẩu mới <span>*</span>
          </label>
          <InputGroup
            type="password"
            name="newPassword"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            error={formik.errors.newPassword && formik.errors.newPassword}
          />
        </fieldset>
        <fieldset>
          <label
            htmlFor="confirmPassword"
            className="text-base mb-2 inline-block"
          >
            Xác nhận lại mật khẩu <span>*</span>
          </label>
          <InputGroup
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.errors.confirmPassword && formik.errors.confirmPassword
            }
          />
        </fieldset>
        <button
          type="submit"
          className="inline-block px-5 mt-2.5 bg-yellow-primary hover:bg-yellow-secondary text-white rounded-md h-10 leading-10"
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
