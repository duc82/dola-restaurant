import Modal from "@/components/Modal/Modal";
import voucherService from "@/services/voucherService";
import { UpdateModalProps } from "@/types/admin";
import { FullVoucher, VoucherType } from "@/types/voucher";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import Select from "../Select";
import Input from "../Input";

interface UpdateModalVoucherProps extends UpdateModalProps {
  voucher: FullVoucher;
  setVouchers: React.Dispatch<React.SetStateAction<FullVoucher[]>>;
}

export default function UpdateModal({
  voucher,
  show,
  onClose,
  setVouchers,
}: UpdateModalVoucherProps) {
  const formik = useFormik({
    initialValues: {
      code: voucher.code,
      discount: voucher.discount.toLocaleString(),
      minAmount: voucher.minAmount.toLocaleString(),
      quantity: voucher.quantity,
      expireAt: voucher.expireAt.split("T")[0],
      type: voucher.type,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const data = {
          ...values,
          discount: parseInt(values.discount.replace(/\D/g, "")),
          minAmount: parseInt(values.minAmount.replace(/\D/g, "")),
        };
        const res = await voucherService.update(voucher._id, data);
        setVouchers((prev) => {
          const index = prev.findIndex((v) => v._id === voucher._id);
          if (index !== -1) {
            prev[index] = res.voucher;
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
        <Modal.Title className="text-xl">Chỉnh sửa sản phẩm</Modal.Title>
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
            className="bg-amber-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-amber-700 text-center focus:ring-4 focus:ring-amber-900 transition"
          >
            Cập nhật
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
}
