import { useCallback, useState } from "react";
import { Dustbin, Edit, Plus2, Search, Spinner } from "@/icons";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/Pagination";
import useAdminModal from "@/hooks/useAdminModal";
import formatDate from "@/utils/formatDate";
import CreateModal from "@/components/Admin/User/CreateModal";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import UpdateModal from "@/components/Admin/User/UpdateModal";
import cn from "@/utils/cn";
import Limit from "@/components/Limit";
import useLimit from "@/hooks/useLimit";
import { FullUser } from "@/types/user";
import userService from "@/services/userService";
import useFetchPagination from "@/hooks/useFetchPagination";

const title = "Quản lý người dùng";

const User = () => {
  const {
    activeModal,
    openCreateModal,
    openUpdateModal,
    closeModal,
    selectedRows,
    handleSelect,
    handleSelectAll,
    selectAllRowsRef,
  } = useAdminModal();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { currentLimit, handleChangeLimit } = useLimit();
  const [user, setUser] = useState<FullUser | null>(null);

  const search = urlSearchParams.get("search") ?? "";
  const page = +(urlSearchParams.get("page") ?? "1");

  const onPageChange = (page: number) => {
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm(
        "Bạn có chắc chắn muốn xóa người dùng này?"
      );
      if (!confirm) return;
      const { message } = await userService.delete(id);
      setUsers((prev) => prev.filter((user) => user._id !== id));
      toast.success(message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const handleDeleteMany = async (selectedRows: string[]) => {
    try {
      const confirm = window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedRows.length} người dùng này?`
      );
      if (!confirm) return;
      const { message } = await userService.deleteMany(selectedRows);
      setUsers((prev) =>
        prev.filter((user) => !selectedRows.includes(user._id))
      );
      toast.success(message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const getUsers = useCallback(async () => {
    const res = await userService.getAll({
      limit: currentLimit,
      page,
      search,
    });

    return {
      data: res.users,
      total: res.total,
      skip: res.skip,
    };
  }, [currentLimit, page, search]);

  const {
    data: users,
    skip,
    total,
    setData: setUsers,
    isLoading,
  } = useFetchPagination<FullUser[]>(getUsers, []);

  const pageCount = Math.ceil(total / currentLimit);

  const hasSelected = selectedRows.size > 0;

  if (isLoading) {
    return (
      <div className="w-full p-4 lg:px-6">
        <Spinner className="w-10 h-10 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto w-full">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="p-4 lg:px-6 lg:pt-6">
        <h1 className="text-2xl font-semibold mb-4">Danh sách người dùng</h1>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <form className="relative w-64 xl:w-96 mr-2">
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
              className="w-full bg-emerald-secondary py-2.5 pl-10 pr-4 border border-gray-600 rounded-lg text-sm placeholder:text-gray-400 transition"
            />
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
          >
            <Plus2 className="w-6 h-6 mr-1" />
            <span>Thêm mới</span>
          </button>
        </div>
      </div>

      <div className="p-4 lg:px-6 flex items-center">
        <button
          type="button"
          onClick={() => handleDeleteMany(Array.from(selectedRows.keys()))}
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
          {hasSelected ? `Đã chọn ${selectedRows.size} hàng` : ""}
        </span>
      </div>

      <table className="table-admin">
        <thead>
          <tr className="text-base">
            <th>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  ref={selectAllRowsRef}
                  onChange={(e) =>
                    handleSelectAll(
                      e,
                      users.map((user) => user._id)
                    )
                  }
                  className="w-4 h-4 cursor-pointer rounded bg-emerald-primary focus:ring-2 focus:ring-offset-emerald-primary"
                />
                <label htmlFor="all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Vai trò</th>
            <th>Ngày tạo</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className={cn(
                "hover:bg-emerald-secondary transition",
                selectedRows.has(user._id) && "bg-emerald-secondary"
              )}
            >
              <td>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="userId"
                    id={user._id}
                    checked={selectedRows.has(user._id)}
                    onChange={(e) => handleSelect(e, user._id, users.length)}
                    className="w-4 h-4 cursor-pointer bg-emerald-primary rounded focus:ring-2 focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor={user._id} className="sr-only">
                    userId
                  </label>
                </div>
              </td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.phone ? user.phone : "Không có"}</td>
              <td className="capitalize">
                {user.role === "user" ? "Người dùng" : user.role}
              </td>
              <td>
                {formatDate(user.createdAt, {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="whitespace-nowrap space-x-2.5">
                <button
                  type="button"
                  onClick={() => {
                    openUpdateModal();
                    setUser(user);
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

      <div className="p-4 lg:px-6 flex items-center justify-between border-t border-t-gray-600">
        <span className="text-sm text-gray-400">
          Hiển thị {skip + 1 > total ? 0 : skip + 1} -{" "}
          {skip + users.length > total ? 0 : skip + users.length} trên tổng số{" "}
          {total}
        </span>
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          onPageChange={onPageChange}
          variant="blue"
        />
        <Limit
          currentLimit={currentLimit}
          handleClick={(limit) => handleChangeLimit(limit, total, page)}
          variant="blue"
        />
      </div>

      <CreateModal
        onClose={closeModal}
        show={activeModal.create}
        setUsers={setUsers}
      />
      {user && (
        <UpdateModal
          onClose={closeModal}
          show={activeModal.update}
          user={user}
          setUsers={setUsers}
        />
      )}
    </div>
  );
};

export default User;
