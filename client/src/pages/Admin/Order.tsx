import UpdateModal from "@/components/Admin/Order/UpdateModal";
import Limit from "@/components/Limit";
import Pagination from "@/components/Pagination";
import useAdminModal from "@/hooks/useAdminModal";
import useFetchPagination from "@/hooks/useFetchPagination";
import useLimit from "@/hooks/useLimit";
import { Dustbin, Edit, Search, Spinner } from "@/icons";
import orderService from "@/services/orderService";
import { FullOrder } from "@/types/order";
import cn from "@/utils/cn";
import formatAddress from "@/utils/formatAddress";
import formatDate from "@/utils/formatDate";
import formatVnd from "@/utils/formatVnd";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useCallback, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function Order() {
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
  const [order, setOrder] = useState<FullOrder | null>(null);

  const { currentLimit, handleChangeLimit } = useLimit();
  const search = urlSearchParams.get("search") ?? "";
  const page = +(urlSearchParams.get("page") ?? "1");

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
      if (!confirm) return;

      const data = await orderService.delete(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      closeModal();
      toast.success(data.message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const handleDeleteMany = async (selectedRows: string[]) => {
    try {
      const confirm = window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedRows.length} danh mục này?`
      );
      if (!confirm) return;

      const data = await orderService.deleteMany(selectedRows);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => !selectedRows.includes(order._id))
      );
      clearSelectedRows();
      toast.success(data.message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const onPageChange = (page: number) => {
    clearSelectedRows();
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  const getOrders = useCallback(async () => {
    const res = await orderService.getAll({
      search,
      limit: currentLimit,
      page,
    });

    return {
      data: res.orders,
      total: res.total,
      skip: res.skip,
    };
  }, [page, search, currentLimit]);

  const {
    data: orders,
    total,
    skip,
    setData: setOrders,
    isLoading,
  } = useFetchPagination<FullOrder[]>(getOrders, []);

  const hasSelected = selectedRows.size > 0;
  const pageCount = Math.ceil(total / currentLimit);

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
        <title>Quản lý đơn hàng</title>
      </Helmet>
      <div className="p-4 lg:px-6 lg:pt-6">
        <h1 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h1>
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
                      orders.map((order) => order._id)
                    )
                  }
                  className="w-4 h-4 cursor-pointer rounded bg-emerald-primary focus:ring-2 focus:ring-offset-emerald-primary"
                />
              </div>
            </th>
            <th>Id</th>
            <th>Tổng cộng</th>
            <th>Địa chỉ giao hàng</th>
            <th>Phí vận chuyển</th>
            <th>PT thanh toán</th>
            <th>TT thanh toán</th>
            <th>TT vận chuyển</th>
            <th>Thời gian tạo</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className={cn(
                "hover:bg-emerald-secondary transition",
                selectedRows.has(order._id) && "bg-emerald-secondary"
              )}
            >
              <td>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="categoryId"
                    id={order._id}
                    checked={selectedRows.has(order._id)}
                    onChange={(e) => handleSelect(e, order._id, orders.length)}
                    className="w-4 h-4 cursor-pointer bg-emerald-primary rounded focus:ring-2 focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor={order._id} className="sr-only">
                    orderId
                  </label>
                </div>
              </td>
              <td>{order._id}</td>
              <td>{formatVnd(order.total)}</td>
              <td>{formatAddress(order.shippingAddress)}</td>
              <td>{formatVnd(order.shippingFee)}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.paidAt ? "Đã thanh toán" : "Chưa thanh toán"}</td>
              <td>{order.deliveredAt ? "Đã giao hàng" : "Chưa giao hàng"}</td>
              <td>
                {formatDate(order.createdAt, {
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
                    setOrder(order);
                  }}
                  className="px-3 py-2 bg-amber-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(order._id)}
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
          {skip + orders.length > total ? 0 : skip + orders.length} trên tổng số{" "}
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

      {order && (
        <UpdateModal
          show={activeModal.update}
          onClose={closeModal}
          order={order}
          setOrders={setOrders}
        />
      )}
    </div>
  );
}
