import CreateModal from "@/components/Address/CreateModal";
import EditModal from "@/components/Address/EditModal";
import Button from "@/components/Form/Button";
import addressService from "@/services/addressService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeAddress } from "@/store/reducers/addressSlice";
import formatAddress from "@/utils/formatAddress";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useState } from "react";
import toast from "react-hot-toast";

const Address = () => {
  const dispatch = useAppDispatch();
  const { addresses } = useAppSelector((state) => state.address);
  const [openModal, setOpenModal] = useState({
    create: false,
    edit: false,
  });

  const [id, setId] = useState("");

  const handleOpenCreateModal = () => {
    setOpenModal({ ...openModal, create: true });
  };

  const handleCloseCreateModal = () => {
    setOpenModal({ ...openModal, create: false });
  };

  const handleOpenEditModal = () => {
    setOpenModal({ ...openModal, edit: true });
  };

  const handleCloseEditModal = () => {
    setOpenModal({ ...openModal, edit: false });
  };

  const handleDeleteAddress = async (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
    if (!confirm) return;

    try {
      const { message } = await addressService.deleteOne(id);
      dispatch(removeAddress(id));
      toast.success(message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
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

      <CreateModal show={openModal.create} onClose={handleCloseCreateModal} />
      <EditModal show={openModal.edit} onClose={handleCloseEditModal} id={id} />

      <div>
        {addresses.map((address) => (
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
                  setId(address._id);
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
