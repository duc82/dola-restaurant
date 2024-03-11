import { useEffect, useRef, useState } from "react";
import { Dustbin, Edit } from "@/icons";
import { Helmet } from "react-helmet-async";
import Overlay from "@/components/Overlay";
import DeleteModal from "@/components/Admin/DeleteModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useSearchParams } from "react-router-dom";
import Pagination from "@/components/Pagination";
import useSearch from "@/hooks/useSearch";
import useAdminModal from "@/hooks/useAdminModal";
import { FullUser } from "@/types/user";
import { getAllUser } from "@/store/reducers/userSlice";
import formatDate from "@/utils/formatDate";

const title = "Admin - Quản lý danh sách người dùng";

const User = () => {
  const { users, total, limit } = useAppSelector((state) => state.user);
  const [userUpdate, setUserUpdate] = useState<FullUser | null>(null);
  const { search, handleSearch } = useSearch();
  const {
    activeModal,
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    closeModal,
    ids,
    handleSelect,
    handleSelectAll,
    clearDeleteMany,
  } = useAdminModal();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const selectedAllRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const page = parseInt(urlSearchParams.get("page") ?? "1");

  const onPageChange = (page: number) => {
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  useEffect(() => {
    const limit = 2;

    const query = urlSearchParams.toString();
    if (search) {
      const timeoutId = setTimeout(() => {
        dispatch(getAllUser({ search, limit }));
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    } else {
      dispatch(getAllUser({ query, limit }));
    }
  }, [dispatch, search, urlSearchParams]);

  const pageCount = limit > 0 ? Math.ceil(total / limit) : 0;

  return (
    <div className="overflow-y-auto w-full">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">Danh sách người dùng</h1>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <div className="flex items-center">
            <form className="w-64 xl:w-96 mr-2">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                name="email"
                autoComplete="off"
                placeholder="Tìm kiếm người dùng"
                value={search}
                onChange={handleSearch}
                className="w-full bg-emerald-secondary p-2.5 border border-gray-600 rounded-lg text-sm placeholder:text-gray-400 transition"
              />
            </form>
            <button
              type="button"
              onClick={() => openDeleteModal(ids)}
              className="p-1 group hover:bg-emerald-secondary rounded cursor-pointer transition"
            >
              <Dustbin className="w-6 h-6 text-gray-400 group-hover:text-white transition" />
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={openCreateModal}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
            >
              Thêm người dùng
            </button>
          </div>
        </div>
      </div>
      <div className="mb-[30px]">
        <table className="w-full text-left divide-y divide-gray-600">
          <thead className="bg-emerald-secondary">
            <tr className="text-base">
              <th scope="col" className="px-2 py-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="all"
                    id="all"
                    ref={selectedAllRef}
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
              <th scope="col" className="px-2 py-4">
                Họ tên
              </th>
              <th scope="col" className="px-2 py-4">
                Email
              </th>
              <th scope="col" className="px-2 py-4">
                Số điện thoại
              </th>
              <th scope="col" className="px-2 py-4">
                Vai trò
              </th>
              <th scope="col" className="px-2 py-4">
                Địa chỉ
              </th>
              <th scope="col" className="px-2 py-4">
                Ngày tạo
              </th>
              <th scope="col" className="px-2 py-4">
                Chức năng
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-600">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-emerald-secondary">
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="userId"
                      id={user._id}
                      checked={ids.includes(user._id)}
                      onChange={(e) => handleSelect(e, user._id, users.length)}
                      className="w-3.5 h-3.5 bg-emerald-primary rounded focus:ring-offset-emerald-primary"
                    />
                    <label htmlFor={user._id} className="sr-only">
                      userId
                    </label>
                  </div>
                </td>
                <td className="px-2 py-4">{user.fullName}</td>
                <td className="px-2 py-4">{user.email}</td>
                <td className="px-2 py-4">
                  {user.phone ? user.phone : "Không có"}
                </td>
                <td className="px-2 py-4 capitalize">
                  {user.role === "user" ? "Người dùng" : user.role}
                </td>
                <td className="px-2 py-4"></td>
                <td className="px-2 py-4">{formatDate(user.createdAt)}</td>
                <td className="px-2 py-4 whitespace-nowrap space-x-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      openUpdateModal(user._id);
                      setUserUpdate(user);
                    }}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      openDeleteModal(user._id);
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
      </div>

      {total > 0 && (
        <Pagination
          pageCount={pageCount}
          onPageChange={onPageChange}
          currentPage={page}
          pageClassName="hover:bg-blue-600 hover:border-blue-600"
          pageActiveClassName="bg-blue-600 border-blue-600"
        />
      )}

      <DeleteModal
        show={activeModal.delete}
        onClose={closeModal}
        alert={"Bạn có chắc chắn bạn muốn xóa người dùng này?"}
        handleDelete={clearDeleteMany}
      />
    </div>
  );
};

export default User;
