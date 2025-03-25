import UpdateModal from "@/components/Admin/Contact/UpdateModal";
import Limit from "@/components/Limit";
import Pagination from "@/components/Pagination";
import useAdminModal from "@/hooks/useAdminModal";
import useFetchPagination from "@/hooks/useFetchPagination";
import useLimit from "@/hooks/useLimit";
import { Dustbin, Edit, Search, Spinner } from "@/icons";
import contactService from "@/services/contactService";
import { Contact } from "@/types/contact";
import cn from "@/utils/cn";
import formatDate from "@/utils/formatDate";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function ContactAdmin() {
  const {
    activeModal,
    openUpdateModal,
    closeModal,
    selectedRows,
    selectAllRowsRef,
    handleSelect,
    handleSelectAll,
    clearSelectedRows,
  } = useAdminModal();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { currentLimit, handleChangeLimit } = useLimit();
  const [contact, setContact] = useState<Contact | null>(null);

  const search = urlSearchParams.get("search") ?? "";
  const page = +(urlSearchParams.get("page") ?? "1");

  const handleDelete = (id: string) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
    if (!confirm) return;
    contactService
      .delete(id)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => contact._id !== id)
        );
      })
      .catch((error) => {
        toast.error(handlingAxiosError(error).message);
      });
  };

  const handleDeleteMany = (selectedRows: string[]) => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xóa những danh mục này?"
    );
    if (!confirm) return;
    contactService
      .deleteMany(selectedRows)
      .then(() => {
        setContacts((prevContacts) =>
          prevContacts.filter((contact) => !selectedRows.includes(contact._id))
        );
        clearSelectedRows();
      })
      .catch((error) => {
        toast.error(handlingAxiosError(error).message);
      });
  };

  const onPageChange = (page: number) => {
    clearSelectedRows();
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  const getContacts = useCallback(async () => {
    const res = await contactService.getAll({
      search,
      page,
      limit: currentLimit,
    });

    return {
      data: res.contacts,
      total: res.total,
      skip: res.skip,
    };
  }, [search, page, currentLimit]);

  const {
    data: contacts,
    total,
    skip,
    setData: setContacts,
    isLoading,
  } = useFetchPagination<Contact[]>(getContacts, []);

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
        <title>Quản lý liên hệ</title>
      </Helmet>

      <div className="p-4 lg:px-6 lg:pt-6">
        <h1 className="text-2xl font-semibold mb-4">Danh sách liên hệ</h1>
        <div className="flex flex-wrap justify-between items-center gap-y-4">
          <div className="flex items-center">
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
          </div>
        </div>
      </div>

      <div className="p-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center">
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
            {hasSelected && `Đã chọn ${selectedRows.size} hàng`}
          </span>
        </div>
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
                      contacts.map((contact) => contact._id)
                    )
                  }
                  className="w-4 h-4 cursor-pointer rounded bg-emerald-primary focus:ring-2 focus:ring-offset-emerald-primary"
                />
                <label htmlFor="all" className="sr-only">
                  Chọn tất cả
                </label>
              </div>
            </th>

            <th>Họ và tên</th>
            <th>Email</th>
            <th>Điện thoại</th>
            <th>Nội dung</th>
            <th>Thời gian tạo</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact._id}
              className={cn(
                "hover:bg-emerald-secondary transition",
                selectedRows.has(contact._id) && "bg-emerald-secondary"
              )}
            >
              <td>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="contactId"
                    id={contact._id}
                    checked={selectedRows.has(contact._id)}
                    onChange={(e) =>
                      handleSelect(e, contact._id, contacts.length)
                    }
                    className="w-4 h-4 cursor-pointer bg-emerald-primary rounded focus:ring-2 focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor={contact._id} className="sr-only">
                    contactId
                  </label>
                </div>
              </td>
              <td>{contact.fullName}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.message}</td>
              <td>
                {formatDate(contact.createdAt, {
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
                    setContact(contact);
                  }}
                  className="px-3 py-2 bg-amber-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(contact._id)}
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
          {skip + contacts.length > total ? 0 : skip + contacts.length} trên
          tổng số {total}
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

      <UpdateModal
        show={activeModal.update}
        onClose={closeModal}
        contact={contact}
        setContacts={setContacts}
      />
    </div>
  );
}
