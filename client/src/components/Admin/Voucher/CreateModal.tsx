import Modal from "@/components/Modal/Modal";
import { CreateModalProps } from "@/types/admin";
import { useFormik } from "formik";
import Input from "../Input";
import Select from "../Select";
import { FullVoucher, VoucherType } from "@/types/voucher";
import voucherService from "@/services/voucherService";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";

interface CreateModalVoucherProps extends CreateModalProps {
  setVouchers: React.Dispatch<React.SetStateAction<FullVoucher[]>>;
}

export default function CreateModal({
  show,
  onClose,
  setVouchers,
}: CreateModalVoucherProps) {
  const formik = useFormik({
    initialValues: {
      code: "",
      discount: "0",
      minAmount: "0",
      quantity: 0,
      expireAt: "",
      type: "discount" as VoucherType,
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const data = {
          ...values,
          discount: parseInt(values.discount.replace(/\D/g, "")),
          minAmount: parseInt(values.minAmount.replace(/\D/g, "")),
        };
        const res = await voucherService.create(data);
        setVouchers((prev) => [...prev, res.voucher]);
        resetForm();
        onClose();
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
        <Modal.Title className="text-xl">Thêm sản phẩm</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-auto">
          <Input
            type="text"
            id="code"
            name="code"
            label="Mã giảm giá"
            value={formik.values.code}
            onChange={formik.handleChange}
            error={formik.errors.code}
          />
          <Input
            type="currency"
            id="discount"
            name="discount"
            label="Giảm giá"
            value={formik.values.discount}
            onChange={formik.handleChange}
            error={formik.errors.discount}
          />
          <Input
            type="currency"
            id="minAmount"
            name="minAmount"
            label="Số tiền tối thiểu"
            value={formik.values.minAmount}
            onChange={formik.handleChange}
            error={formik.errors.minAmount}
          />
          <Input
            type="number"
            id="quantity"
            name="quantity"
            label="Số lượng"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.errors.quantity}
          />
          <Input
            type="date"
            id="expireAt"
            name="expireAt"
            label="Ngày hết hạn"
            value={formik.values.expireAt}
            onChange={formik.handleChange}
            error={formik.errors.expireAt}
          />
          <Select
            id="type"
            name="type"
            label="Kiểu"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            {Object.values(VoucherType).map((type) => (
              <Select.Option key={type} value={type}>
                {type === "shipping" ? "Vận chuyển" : "Giảm giá"}
              </Select.Option>
            ))}
          </Select>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-blue-700 text-center focus:ring-4 focus:ring-blue-900 transition"
          >
            Thêm mới
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
