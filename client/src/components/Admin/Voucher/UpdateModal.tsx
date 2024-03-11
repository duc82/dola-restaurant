import Modal from "@/components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useFormik } from "formik";
import Input from "../Input";
import Select from "../Select";
import { useEffect } from "react";
import voucherService from "@/services/voucherService";
import { setVoucher, updateVoucher } from "@/store/reducers/voucherSlice";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import type { UpdateModalProps } from "@/types/admin";

const UpdateModal = ({ show, onClose, id }: UpdateModalProps) => {
  const dispatch = useAppDispatch();
  const { voucher } = useAppSelector((state) => state.voucher);

  const formik = useFormik({
    initialValues: {
      code: voucher?.code || "",
      discount: voucher?.discount || 0,
      minimumCost: voucher?.minimumCost || 0,
      isActive: voucher?.isActive || true,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      dispatch(updateVoucher({ id, data: values }))
        .unwrap()
        .then((data) => {
          onClose();
          toast.success(data.message);
        })
        .catch((error) => {
          toast.error(handlingAxiosError(error).message);
        });
    },
  });

  useEffect(() => {
    if (!id) return;
    voucherService
      .getById(id)
      .then((voucher) => {
        dispatch(setVoucher(voucher));
      })
      .catch((error) => {
        toast.error(handlingAxiosError(error).message);
      });
  }, [id, dispatch]);

  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="bg-emerald-secondary text-white"
    >
      <Modal.Header>
        <Modal.Title className="text-xl">Chỉnh sửa mã giảm giá</Modal.Title>
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
              type="number"
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
              type="number"
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
            Cập nhật
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
