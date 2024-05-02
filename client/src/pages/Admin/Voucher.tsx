import CreateModal from "@/components/Admin/Voucher/CreateModal";
import UpdateModal from "@/components/Admin/Voucher/UpdateModal";
import useAdminModal from "@/hooks/useAdminModal";
import { Dustbin, Edit } from "@/icons";
import voucherService from "@/services/voucherService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setVouchers } from "@/store/reducers/voucherSlice";
import formatDate from "@/utils/formatDate";
import formatVnd from "@/utils/formatVnd";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";

const Voucher = () => {
  const {
    activeModal,
    openCreateModal,
    openUpdateModal,
    closeModal,
    id,
    selectedRows,
    selectedRowsRef,
    handleSelect,
    handleSelectAll,
  } = useAdminModal();
  const dispatch = useAppDispatch();
  const { vouchers } = useAppSelector((state) => state.voucher);

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Bạn có chắc chắn muốn xóa mã giảm giá này?"
      );
      if (!confirm) return;

      const data = await voucherService.delete(id);

      toast.success(data.message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  useEffect(() => {
    voucherService
      .getAll()
      .then((data) => {
        dispatch(setVouchers(data));
      })
      .catch((error) => {
        toast.error(handlingAxiosError(error).message);
      });
  }, [dispatch]);

  return (
    <div className="overflow-y-auto w-full">
      <Helmet>
        <title>Quản lý mã giảm giá</title>
      </Helmet>

      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Danh sách mã giảm giá</h1>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <div className="flex items-center">
            <form className="w-64 xl:w-96 mr-2">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="search"
                autoComplete="off"
                placeholder="Tìm kiếm mã giảm giá"
                className="w-full bg-emerald-secondary p-2.5 border border-gray-600 rounded-lg text-sm placeholder:text-gray-400 transition"
              />
            </form>
          </div>
          <div>
            <button
              type="button"
              onClick={openCreateModal}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
            >
              Thêm mã giảm giá
            </button>
          </div>
        </div>
      </div>

      <table className="table-admin">
        <thead>
          <tr className="text-base">
            <th scope="col" className="px-2 py-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  ref={selectedRowsRef}
                  onChange={(e) =>
                    handleSelectAll(
                      e,
                      vouchers.map((voucher) => voucher._id)
                    )
                  }
                  className="w-3.5 h-3.5 rounded bg-emerald-primary focus:ring-offset-emerald-primary"
                />
                <label htmlFor="all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-2 py-4">
              Mã
            </th>
            <th scope="col" className="px-2 py-4">
              Giảm giá
            </th>
            <th scope="col" className="px-2 py-4">
              Chi phí tối thiểu
            </th>
            <th scope="col" className="px-2 py-4">
              Trạng thái
            </th>
            <th scope="col" className="px-2 py-4">
              Ngày tạo
            </th>
            <th scope="col" className="px-2 py-4">
              Chức năng
            </th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map((voucher) => (
            <tr key={voucher._id} className="hover:bg-emerald-secondary">
              <td className="px-2 py-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="userId"
                    id={voucher._id}
                    checked={selectedRows.includes(voucher._id)}
                    onChange={(e) =>
                      handleSelect(e, voucher._id, vouchers.length)
                    }
                    className="w-3.5 h-3.5 bg-emerald-primary rounded focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor={voucher._id} className="sr-only">
                    voucherId
                  </label>
                </div>
              </td>
              <td className="px-2 py-4">{voucher.code}</td>
              <td className="px-2 py-4">{formatVnd(voucher.discount)}</td>
              <td className="px-2 py-4">{formatVnd(voucher.minimumCost)}</td>
              <td className="px-2 py-4">
                {voucher.isActive ? "Kích hoạt" : "Chưa kích hoạt"}
              </td>
              <td className="px-2 py-4">{formatDate(voucher.createdAt)}</td>
              <td className="px-2 py-4 whitespace-nowrap space-x-2.5">
                <button
                  type="button"
                  onClick={() => openUpdateModal(voucher._id)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(voucher._id)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-900 rounded-lg inline-flex items-center justify-center font-medium text-sm transition"
                >
                  <Dustbin className="w-4 h-4 mr-2" />
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CreateModal show={activeModal.create} onClose={closeModal} />
      <UpdateModal show={activeModal.update} onClose={closeModal} id={id} />
    </div>
  );
};

export default Voucher;
