import Modal from "@/components/Modal/Modal";
import { useAppSelector } from "@/store/hooks";
import { UpdateModalProps } from "@/types/admin";
import { useFormik } from "formik";

const UpdateModal = ({ show, onClose, id }: UpdateModalProps) => {
  const { users } = useAppSelector((state) => state.user);

  const user = users.find((user) => user._id === id);

  const formik = useFormik({
    initialValues: {
      fullName: user?.fullName ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      password: "",
      role: "user" as "user" | "admin",
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="bg-emerald-secondary text-white"
    >
      <Modal.Header>
        <Modal.Title className="text-xl">Chỉnh sửa sản phẩm</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Footer>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-blue-700 text-center focus:ring-4 focus:ring-blue-800 transition"
          >
            Cập nhật
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
