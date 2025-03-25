import Modal from "@/components/Modal/Modal";
import { useFormik } from "formik";
import Input from "../Input";
import { CreateModalProps } from "@/types/admin";
import Select from "../Select";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { createUserSchema } from "@/schemas/userSchema";
import { FullUser } from "@/types/user";
import userService from "@/services/userService";

interface CreateUserModalProps extends CreateModalProps {
  setUsers: React.Dispatch<React.SetStateAction<FullUser[]>>;
}

const CreateModal = ({ show, onClose, setUsers }: CreateUserModalProps) => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      role: "user" as "user" | "admin",
    },
    validationSchema: createUserSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { message, user } = await userService.create(values);
        setUsers((prev) => [user, ...prev]);
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
        <Modal.Title className="text-xl">Thêm người dùng</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-auto">
          <Input
            type="text"
            label="Họ và tên"
            name="fullName"
            id="createFullName"
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
            id="createEmail"
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
            id="createPhone"
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
            id="createPassword"
            autoComplete="off"
            placeholder="********"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Select
            label="Vai trò"
            id="createRole"
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
            className="flex items-center bg-blue-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-blue-700 text-center focus:ring-4 focus:ring-blue-900 transition"
          >
            Thêm mới
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateModal;
