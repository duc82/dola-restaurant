import Button from "@/components/Form/Button";
import Checkbox from "@/components/Form/Checkbox";
import FloatingLabel from "@/components/Form/FloatingLabel";
import Select from "@/components/Form/Select";
import Modal from "@/components/Modal/Modal";
import useProvince from "@/hooks/useProvince";
import addressService from "@/services/addressService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addAddress,
  removeAddress,
  updateAddress,
} from "@/store/reducers/addressSlice";
import { formatAddress } from "@/utils/formatAddress";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { string, object } from "yup";

const addressSchema = object().shape({
  fullName: string().required("Họ tên là bắt buộc."),
  phone: string()
    .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
      message: "Số điện thoại không hợp lệ.",
    })
    .min(10, "Số điện thoại phải tối thiểu 10 số.")
    .max(10, "Số điện thoại tối đa 10 số.")
    .required("Số điện thoại là bắt buộc."),
  province: string().required("Tỉnh thành là bắt buộc."),
  district: string().required("Quận huyện là bắt buộc."),
  ward: string().required("Phường xã là bắt buộc."),
  detail: string().required("Địa chỉ là bắt buộc."),
});

const Address = () => {
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector((state) => state.address);
  const [activeModal, setActiveModal] = useState({
    create: false,
    edit: false,
  });

  const [addressId, setAddressId] = useState("");

  const handleOpenCreateModal = () => {
    setActiveModal({ ...activeModal, create: true });
  };

  const handleCloseCreateModal = () => {
    setActiveModal({ ...activeModal, create: false });
    formik.resetForm();
  };

  const handleOpenEditModal = () => {
    setActiveModal({ ...activeModal, edit: true });
  };

  const handleCloseEditModal = () => {
    setActiveModal({ ...activeModal, edit: false });
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      phone: "",
      province: "",
      district: "",
      ward: "",
      detail: "",
      isDefault: false,
    },
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      try {
        if (activeModal.create) {
          const data = await addressService.create(values);
          dispatch(addAddress(data.address));
          handleCloseCreateModal();
          toast.success(data.message);
        } else {
          const data = await addressService.update(addressId, values);
          dispatch(updateAddress(data.address));
          handleCloseEditModal();
          toast.success(data.message);
        }
      } catch (error) {
        toast.error(
          activeModal.create
            ? "Thêm địa chỉ thất bại"
            : "Cập nhật địa chỉ thất bại"
        );
      }
    },
  });

  const { provinces, districts, wards } = useProvince({
    province: formik.values.province,
    district: formik.values.district,
  });

  const handleDeleteAddress = async (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
    if (!confirm) return;

    try {
      const { message } = await addressService.deleteOne(id);
      dispatch(removeAddress(id));
      toast.success(message);
    } catch (error) {
      toast.error("Xóa địa chỉ thất bại");
    }
  };

  return (
    <div>
      <h1 className="uppercase text-lg mb-7">Địa chỉ của bạn</h1>
      <Button
        type="button"
        size={"medium"}
        onClick={handleOpenCreateModal}
        className="hover:opacity-60 rounded px-4"
      >
        Thêm địa chỉ
      </Button>

      {/* Create Modal */}
      <Modal show={activeModal.create} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm địa chỉ mới</Modal.Title>
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

            {addresses && addresses.length > 0 && (
              <Checkbox
                label="Đặt là địa chỉ mặc định"
                id="defaultAddress"
                name="isDefault"
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
                onClick={handleCloseCreateModal}
                className="hover:bg-[rgb(158,158,158)] hover:text-white rounded px-4 mr-2"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                size="medium"
                className="hover:opacity-60 rounded px-4"
              >
                Thêm địa chỉ
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>

      {/* Edit Modal */}
      <Modal show={activeModal.edit} onHide={handleCloseEditModal}>
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

            {addresses && addresses.length > 0 && (
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
                onClick={handleCloseCreateModal}
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

      <div>
        {addresses?.map((address) => (
          <div
            key={address._id}
            className="mt-5 pt-4 border-t border-t-[rgb(235,235,235)] flex items-center justify-between"
          >
            <div className="flex-[75%] py-5" key={address._id}>
              <p>
                <strong>Họ tên: </strong>
                <span>{address.fullName}</span>
                {address.isDefault && (
                  <span className="text-[10px] pl-2.5 text-green-500">
                    Địa chỉ mặc định
                  </span>
                )}
              </p>
              <p>
                <strong>Địa chỉ: </strong>
                <span>{formatAddress(address)}</span>
              </p>
              <p>
                <strong>Số điện thoại: </strong>
                <span>{address.phone}</span>
              </p>
            </div>
            <div className="flex-[25%] flex justify-center items-center space-x-4">
              <Button
                type="button"
                intent={"outline"}
                size={"none"}
                className="text-blue-600 hover:text-blue-500"
                onClick={() => {
                  formik.setValues({
                    fullName: address.fullName,
                    phone: address.phone,
                    province: address.province,
                    district: address.district,
                    ward: address.ward,
                    detail: address.detail,
                    isDefault: address.isDefault,
                  });
                  setAddressId(address._id);
                  handleOpenEditModal();
                }}
              >
                Chỉnh sửa địa chỉ
              </Button>
              {!address.isDefault && (
                <Button
                  type="button"
                  intent={"outline"}
                  size="none"
                  className="text-red-600 hover:text-red-500"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  Xóa
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Address;
