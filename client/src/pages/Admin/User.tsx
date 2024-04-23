import { useEffect } from "react";
import { Dustbin, Edit, Plus2 } from "@/icons";
import { Helmet } from "react-helmet-async";
import DeleteModal from "@/components/Admin/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/Pagination";
import useAdminModal from "@/hooks/useAdminModal";
import {
  deleteManyUser,
  deleteUser,
  getAllUser,
} from "@/store/reducers/userSlice";
import formatDate from "@/utils/formatDate";
import CreateModal from "@/components/Admin/User/CreateModal";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import UpdateModal from "@/components/Admin/User/UpdateModal";
import cn from "@/utils/cn";
import Limit from "@/components/Limit";
import useLimit from "@/hooks/useLimit";

const title = "Quản lý người dùng";

const User = () => {
  const { users, total, limit, skip } = useAppSelector((state) => state.user);
  const {
    activeModal,
    openCreateModal,
    openUpdateModal,
    closeModal,
    id,
    selectedRows,
    handleSelect,
    handleSelectAll,
    selectedRowsRef,
  } = useAdminModal();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { activeLimit, handleChangeLimit } = useLimit();

  const dispatch = useAppDispatch();

  const search = urlSearchParams.get("search") ?? "";
  const page = +(urlSearchParams.get("page") ?? "1");

  const onPageChange = (page: number) => {
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  const handleDelete = async (id: string) => {
    try {
      const { message } = await dispatch(deleteUser(id)).unwrap();
      closeModal();
      toast.success(message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const handleDeleteMany = async (selectedRows: string[]) => {
    try {
      const { message } = await dispatch(deleteManyUser(selectedRows)).unwrap();
      closeModal();
      toast.success(message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  useEffect(() => {
    dispatch(getAllUser({ limit: activeLimit, page, search }));
  }, [dispatch, page, search, activeLimit]);

  const pageCount = Math.ceil(total / limit);

  const hasSelected = selectedRows.length > 0;

  return (
    <div className="overflow-y-auto w-full">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Danh sách người dùng</h1>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <form className="w-64 xl:w-96 mr-2">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="search"
              name="search"
              autoComplete="off"
              placeholder="Tìm kiếm"
              defaultValue={search}
              className="w-full bg-emerald-secondary p-2.5 border border-gray-600 rounded-lg text-sm placeholder:text-gray-400 transition"
            />
          </form>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
          >
            <Plus2 className="w-6 h-6 mr-1" />
            <span>Thêm người dùng</span>
          </button>
        </div>
      </div>

      <div className="p-4 flex items-center">
        <button
          type="button"
          onClick={() => handleDeleteMany(selectedRows)}
          disabled={!hasSelected}
          className={cn(
            "px-3 py-2 bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition",
            !hasSelected && "hover:bg-red-600 opacity-50 cursor-not-allowed"
          )}
        >
          <Dustbin className="mr-2" />
          <span>Xóa</span>
        </button>
        <span className="ml-2">
          {hasSelected ? `Đã chọn ${selectedRows.length} hàng` : ""}
        </span>
      </div>

      <table className="w-full text-left divide-y divide-gray-600">
        <thead className="bg-emerald-secondary">
          <tr className="text-base">
            <th className="px-2 py-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  ref={selectedRowsRef}
                  onChange={(e) =>
                    handleSelectAll(
                      e,
                      users.map((user) => user._id)
                    )
                  }
                  className="w-3.5 h-3.5 rounded bg-emerald-primary focus:ring-offset-emerald-primary"
                />
                <label htmlFor="all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th className="px-2 py-4">Id</th>
            <th className="px-2 py-4">Họ tên</th>
            <th className="px-2 py-4">Email</th>
            <th className="px-2 py-4">Số điện thoại</th>
            <th className="px-2 py-4">Vai trò</th>
            <th className="px-2 py-4">Địa chỉ IP</th>
            <th className="px-2 py-4">Ngày tạo</th>
            <th className="px-2 py-4">Chức năng</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {users.map((user) => (
            <tr
              key={user._id}
              className={cn(
                "hover:bg-emerald-secondary",
                selectedRows.includes(user._id) && "bg-emerald-secondary"
              )}
            >
              <td className="px-2 py-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="userId"
                    id={user._id}
                    checked={selectedRows.includes(user._id)}
                    onChange={(e) => handleSelect(e, user._id, users.length)}
                    className="w-3.5 h-3.5 bg-emerald-primary rounded focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor={user._id} className="sr-only">
                    userId
                  </label>
                </div>
              </td>
              <td className="px-2 py-4">{user._id}</td>
              <td className="px-2 py-4">{user.fullName}</td>
              <td className="px-2 py-4">{user.email}</td>
              <td className="px-2 py-4">
                {user.phone ? user.phone : "Không có"}
              </td>
              <td className="px-2 py-4 capitalize">
                {user.role === "user" ? "Người dùng" : user.role}
              </td>
              <td className="px-2 py-4">{user.ipAddress}</td>
              <td className="px-2 py-4">{formatDate(user.createdAt)}</td>
              <td className="px-2 py-4 whitespace-nowrap space-x-2.5">
                <button
                  type="button"
                  onClick={() => {
                    openUpdateModal(user._id);
                  }}
                  className="px-3 py-2 bg-amber-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(user._id);
                  }}
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

      <div className="p-4 flex items-center justify-between border-t border-t-gray-600">
        <div>
          <span className="text-sm text-gray-400">
            Hiển thị {skip + 1} - {skip + users.length} trên tổng số {total}
          </span>
        </div>
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          onPageChange={onPageChange}
          variant="blue"
        />
        <Limit
          activeLimit={activeLimit}
          handleClick={(limit) => handleChangeLimit(limit, total, page)}
          variant="blue"
        />
      </div>

      <CreateModal onClose={closeModal} show={activeModal.create} />
      <UpdateModal onClose={closeModal} show={activeModal.update} id={id} />
    </div>
  );
};

export default User;
