import Modal from "@/components/Modal/Modal";
import { useFormik } from "formik";
import Input from "../Input";
import voucherService from "@/services/voucherService";
import handlingAxiosError from "@/utils/handlingAxiosError";
import toast from "react-hot-toast";
import Select from "../Select";
import { useAppDispatch } from "@/store/hooks";
import { addVoucher } from "@/store/reducers/voucherSlice";
import { CreateModalProps } from "@/types/admin";

const CreateModal = ({ show, onClose }: CreateModalProps) => {
  const dispatch = useAppDispatch();

  const formik = useFormik({
    initialValues: {
      code: "",
      discount: "0",
      minimumCost: "0",
      isActive: true,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const newValues = {
          code: values.code,
          discount: +values.discount.replace(/\D/g, ""),
          minimumCost: +values.minimumCost.replace(/\D/g, ""),
          isActive: values.isActive,
        };

        const data = await voucherService.create(newValues);
        dispatch(addVoucher(data.voucher));
        onClose();
        toast.success(data.message);
        resetForm();
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
        <Modal.Title className="text-xl">Thêm mã giảm giá</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="Mã giảm giá"
              name="code"
              id="code"
              placeholder="FREESHIP"
              autoComplete="off"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={formik.errors.code}
            />
            <Input
              type="currency"
              label="Giảm giá"
              name="discount"
              id="discount"
              placeholder="40000"
              autoComplete="off"
              value={formik.values.discount}
              onChange={formik.handleChange}
              error={formik.errors.discount}
            />
            <Input
              type="currency"
              label="Chi phí tối thiểu"
              name="minimumCost"
              id="minimumCost"
              placeholder="300000"
              autoComplete="off"
              value={formik.values.minimumCost}
              onChange={formik.handleChange}
              error={formik.errors.minimumCost}
            />
            <Select
              label="Trạng thái"
              name="isActive"
              onChange={formik.handleChange}
              defaultValue={formik.values.isActive.toString()}
            >
              <option value="true">Kích hoạt</option>
              <option value="false">Không kích hoạt</option>
            </Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-blue-700 text-center focus:ring-4 focus:ring-blue-800 transition"
          >
            Thêm mới
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateModal;
