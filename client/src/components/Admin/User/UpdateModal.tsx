import Modal from "@/components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { UpdateModalProps } from "@/types/admin";
import { useFormik } from "formik";
import Input from "../Input";
import Select from "../Select";
import handlingAxiosError from "@/utils/handlingAxiosError";
import toast from "react-hot-toast";
import { updateUser } from "@/store/reducers/userSlice";

const UpdateModal = ({ show, onClose, id }: UpdateModalProps) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);

  const user = users.find((user) => user._id === id);

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      password: "" as string | undefined,
      role: user?.role || "user",
    },
    enableReinitialize: true,

    onSubmit: async (values, { resetForm }) => {
      if (!values.password) {
        delete values.password;
      }

      try {
        const { message } = await dispatch(
          updateUser({ id, data: values })
        ).unwrap();
        onClose();
        resetForm();
        toast.success(message);
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
  });

  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="bg-emerald-secondary text-white"
    >
      <Modal.Header>
        <Modal.Title className="text-xl">Sửa người dùng</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-auto">
          <Input
            type="text"
            label="Họ và tên"
            name="fullName"
            id="updateFullName"
            autoComplete="off"
            placeholder="Dola"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.errors.fullName}
          />
          <Input
            type="text"
            label="Email"
            name="email"
            id="updateEmail"
            autoComplete="off"
            placeholder="example@gmail.com"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Input
            type="text"
            label="Số điện thoại"
            name="phone"
            id="updatePhone"
            autoComplete="off"
            placeholder="0123456789"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}
          />
          <Input
            type="password"
            label="Mật khẩu"
            name="password"
            id="updatePassword"
            autoComplete="off"
            placeholder="Để trống nếu không muốn thay đổi mật khẩu"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Select
            label="Vai trò"
            id="updateRole"
            name="role"
            value={formik.values.role}
            onChange={formik.handleChange}
            wrapperClassName="col-span-2"
          >
            <Select.Option value="user">Người dùng</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
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
};

export default UpdateModal;
