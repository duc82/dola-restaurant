import { useCallback, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import { Dustbin, Edit, Plus2, Search, Spinner } from "@/icons";
import { useAppDispatch } from "@/store/hooks";
import {
  deleteManyProduct,
  deleteProduct,
} from "@/store/reducers/productSlice";
import formatVnd from "@/utils/formatVnd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import useAdminModal from "@/hooks/useAdminModal";
import formatDate from "@/utils/formatDate";
import CreateModal from "@/components/Admin/Product/CreateModal";
import handlingAxiosError from "@/utils/handlingAxiosError";
import toast from "react-hot-toast";
import UpdateModal from "@/components/Admin/Product/UpdateModal";
import useLimit from "@/hooks/useLimit";
import cn from "@/utils/cn";
import Limit from "@/components/Limit";
import Fancybox from "@/components/Fancybox";
import { Link } from "react-router-dom";
import useFetchPagination from "@/hooks/useFetchPagination";
import { FullProduct } from "@/types/product";
import productService from "@/services/productService";

const title = "Quản lý sản phẩm";

const ProductAdmin = () => {
  const {
    activeModal,
    closeModal,
    openCreateModal,
    openUpdateModal,
    selectedRows,
    selectAllRowsRef,
    handleSelect,
    handleSelectAll,
    clearSelectedRows,
  } = useAdminModal();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [product, setProduct] = useState<FullProduct | null>(null);

  const dispatch = useAppDispatch();
  const { currentLimit, handleChangeLimit } = useLimit();

  const search = urlSearchParams.get("search") ?? "";
  const page = +(urlSearchParams.get("page") ?? "1");

  const getProducts = useCallback(async () => {
    const data = await productService.getAll({
      limit: currentLimit,
      page,
      search,
      sort: "createdAt-desc",
    });
    return {
      data: data.products,
      total: data.total,
      skip: data.skip,
    };
  }, [currentLimit, page, search]);

  const {
    data: products = [],
    total,
    skip,
    setData: setProducts,
    isLoading,
  } = useFetchPagination<FullProduct[]>(getProducts, []);

  const onPageChange = (page: number) => {
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?");
      if (!confirm) return;
      const data = await dispatch(deleteProduct(id)).unwrap();
      toast.success(data.message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const handleDeleteMany = async (selectedRows: string[]) => {
    try {
      const confirm = window.confirm(
        `Bạn có chắc chắn muốn xóa ${selectedRows.length} sản phẩm này?`
      );
      if (!confirm) return;
      const data = await dispatch(deleteManyProduct(selectedRows)).unwrap();
      clearSelectedRows();
      toast.success(data.message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

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
        <h1 className="text-2xl font-semibold mb-4">Danh sách sản phẩm</h1>
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
                      products.map((product) => product._id)
                    )
                  }
                  className="w-4 h-4 cursor-pointer rounded bg-emerald-primary focus:ring-2 focus:ring-offset-emerald-primary"
                />
                <label htmlFor="all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Danh mục</th>
            <th>Giảm giá</th>
            <th>Giá</th>
            <th>Tồn kho</th>
            <th>Ngày tạo</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product._id}
              className={cn(
                "hover:bg-emerald-secondary transition",
                selectedRows.has(product._id) && "bg-emerald-secondary"
              )}
            >
              <td>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="productId"
                    id={product._id}
                    checked={selectedRows.has(product._id)}
                    onChange={(e) =>
                      handleSelect(e, product._id, products.length)
                    }
                    className="w-4 h-4 cursor-pointer rounded bg-emerald-primary focus:ring-2 focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor={product._id} className="sr-only">
                    productId
                  </label>
                </div>
              </td>
              <td>{product.title}</td>
              <td>
                <Fancybox>
                  {product.images.map((image, i) => (
                    <Link
                      data-fancybox="imageGallery"
                      to={image.url}
                      hidden={i !== 0}
                      key={image._id}
                    >
                      <LazyLoadImage
                        src={image.url}
                        alt={product.title}
                        width={60}
                        height={60}
                        effect="opacity"
                        className="rounded-md"
                      />
                    </Link>
                  ))}
                </Fancybox>
              </td>
              <td>{product.category.name}</td>
              <td>{`${product.discountPercent}%`}</td>
              <td>{formatVnd(product.discountedPrice)}</td>
              <td>{product.stock}</td>
              <td>
                {formatDate(product.createdAt, {
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
                    setProduct(product);
                  }}
                  className="px-3 py-2 bg-amber-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product._id)}
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
          {skip + products.length > total ? 0 : skip + products.length} trên
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

      <CreateModal
        show={activeModal.create}
        onClose={closeModal}
        setProducts={setProducts}
      />
      {product && (
        <UpdateModal
          show={activeModal.update}
          onClose={closeModal}
          product={product}
          setProducts={setProducts}
        />
      )}
    </div>
  );
};

export default ProductAdmin;
