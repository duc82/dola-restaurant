import { Close, Warning } from "@/icons";
import Modal from "../Modal/Modal";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  alert: string;
  handleDelete: () => void;
}

const DeleteModal = ({
  show,
  onClose,
  alert,
  handleDelete,
}: DeleteModalProps) => {
  return (
    <Modal
      onHide={onClose}
      show={show}
      dialogClassName="md:max-w-md"
      contentClassName="bg-emerald-secondary text-white"
    >
      <div className="flex justify-end p-2">
        <button
          type="button"
          onClick={onClose}
          className="hover:bg-emerald-primary p-1.5 transition rounded-lg group"
        >
          <Close className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
      </div>
      <div className="pt-0 p-6 text-center">
        <Warning className="w-16 h-16 text-red-600 mx-auto" />
        <h3 className="text-lg mt-5 mb-6 text-gray-400">{alert}</h3>
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex mr-4 px-3 py-2.5 bg-red-600 text-white rounded-lg text-base font-medium hover:bg-red-800 transition"
        >
          Có, Tôi chắc chắn
        </button>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex px-3 py-2.5 rounded-lg text-base font-medium text-white border border-gray-600 hover:bg-gray-600 transition"
        >
          Không, hủy bỏ
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
