import Modal from "@/components/Modal/Modal";
import contactService from "@/services/contactService";
import { UpdateModalProps } from "@/types/admin";
import { Contact } from "@/types/contact";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Input from "../Input";

interface UpdateModalContactProps extends UpdateModalProps {
  contact: Contact | null;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

export default function UpdateModal({
  show,
  onClose,
  contact,
  setContacts,
}: UpdateModalContactProps) {
  const formik = useFormik({
    initialValues: {
      fullName: contact?.fullName || "",
      email: contact?.email || "",
      phone: contact?.phone || "",
      message: contact?.message || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (!contact) return;

        const res = await contactService.update(contact._id, values);
        setContacts((prev) => {
          const index = prev.findIndex((item) => item._id === contact._id);
          if (index !== -1) {
            prev[index] = res.contact;
          }
          return prev;
        });
        onClose();
        toast.success(res.message);
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
        <Modal.Title className="text-xl">Chỉnh sửa liên hệ</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="Họ và tên"
              name="fullName"
              id="fullName"
              autoComplete="off"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.errors.fullName}
              wrapperClassName="col-span-2"
            />
            <Input
              type="text"
              label="Email"
              name="email"
              id="email"
              autoComplete="off"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
              wrapperClassName="col-span-2"
            />
            <Input
              type="text"
              label="Điện thoại"
              name="phone"
              id="phone"
              autoComplete="off"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone}
              wrapperClassName="col-span-2"
            />
            <Input
              type="text"
              label="Nội dung"
              name="message"
              id="message"
              autoComplete="off"
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.errors.message}
              wrapperClassName="col-span-2"
            />
          </div>
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
}
