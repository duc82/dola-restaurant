import Modal from "../Modal/Modal";
import { useFormik } from "formik";
import { addressSchema } from "@/schemas/addressSchema";
import addressService from "@/services/addressService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateAddress } from "@/store/reducers/addressSlice";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import FloatingLabel from "../Form/FloatingLabel";
import Select from "../Form/Select";
import useProvince from "@/hooks/useProvince";
import Checkbox from "../Form/Checkbox";
import Button from "../Form/Button";

interface EditModalProps {
  show: boolean;
  onClose: () => void;
  id: string;
}

const EditModal = ({ show, onClose, id }: EditModalProps) => {
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector((state) => state.address);

  const address = addresses.find((address) => address._id === id);

  const formik = useFormik({
    initialValues: {
      fullName: address?.fullName || "",
      phone: address?.phone || "",
      province: address?.province || "",
      district: address?.district || "",
      ward: address?.ward || "",
      detail: address?.detail || "",
      isDefault: address?.isDefault || false,
    },
    enableReinitialize: true,
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      try {
        const data = await addressService.update(id, values);
        dispatch(updateAddress(data.address));
        onClose();
        toast.success(data.message);
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
  });

  const { provinces, districts, wards } = useProvince({
    province: formik.values.province,
    district: formik.values.district,
  });

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa địa chỉ</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <FloatingLabel
            type="text"
            label="Họ tên"
            id="fullName"
            name="fullName"
            wrapperClassName="mb-4"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.errors.fullName}
          />
          <FloatingLabel
            type="text"
            label="Số điện thoại"
            id="phone"
            name="phone"
            wrapperClassName="mb-4"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}
          />
          <FloatingLabel
            type="text"
            label="Địa chỉ"
            id="detail"
            name="detail"
            wrapperClassName="mb-4"
            value={formik.values.detail}
            onChange={formik.handleChange}
            error={formik.errors.detail}
          />
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-2.5 mb-4">
            <Select
              id="province"
              name="province"
              label="Tỉnh thành"
              value={formik.values.province}
              onChange={formik.handleChange}
              disabled={provinces.length < 1}
              wrapperClassName="flex-1"
            >
              {provinces.map((province) => (
                <Select.Option key={province.code} value={province.name}>
                  {province.name}
                </Select.Option>
              ))}
            </Select>

            <Select
              id="district"
              name="district"
              label="Quận huyện"
              value={formik.values.district}
              onChange={formik.handleChange}
              disabled={districts.length < 1}
              wrapperClassName="flex-1"
            >
              {districts.map((district) => (
                <Select.Option key={district.code} value={district.name}>
                  {district.name}
                </Select.Option>
              ))}
            </Select>

            <Select
              id="ward"
              name="ward"
              label="Phường xã"
              value={formik.values.ward}
              onChange={formik.handleChange}
              disabled={wards.length < 1}
              wrapperClassName="flex-1"
            >
              {wards.map((ward) => (
                <Select.Option key={ward.code} value={ward.name}>
                  {ward.name}
                </Select.Option>
              ))}
            </Select>
          </div>

          {addresses.length > 1 && (
            <Checkbox
              label="Đặt là địa chỉ mặc định"
              id="defaultAddress"
              name="isDefault"
              checked={formik.values.isDefault}
              onChange={formik.handleChange}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end">
            <Button
              type="button"
              intent={"outline"}
              size="medium"
              onClick={onClose}
              className="hover:bg-[rgb(158,158,158)] hover:text-white rounded px-4 mr-2"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              size="medium"
              className="hover:opacity-60 rounded px-4"
            >
              Cập nhật địa chỉ
            </Button>
          </div>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditModal;
