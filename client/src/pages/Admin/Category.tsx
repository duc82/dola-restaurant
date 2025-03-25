import CreateModal from "@/components/Admin/Category/CreateModal";
import UpdateModal from "@/components/Admin/Category/UpdateModal";
import Pagination from "@/components/Pagination";
import useAdminModal from "@/hooks/useAdminModal";
import { Dustbin, Edit, Plus2, Search, Spinner } from "@/icons";
import categoryService from "@/services/categoryService";
import { useAppDispatch } from "@/store/hooks";
import { deleteCategory } from "@/store/reducers/categorySlice";
import formatDate from "@/utils/formatDate";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useCallback, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router-dom";
import Limit from "@/components/Limit";
import cn from "@/utils/cn";
import useLimit from "@/hooks/useLimit";
import Fancybox from "@/components/Fancybox";
import { Link } from "react-router-dom";
import { CategoriesResponse, FullCategory } from "@/types/category";
import useFetchPagination from "@/hooks/useFetchPagination";

const Category = () => {
  const {
    activeModal,
    openCreateModal,
    openUpdateModal,
    closeModal,
    selectedRows,
    selectAllRowsRef,
    handleSelect,
    handleSelectAll,
    clearSelectedRows,
  } = useAdminModal();

  const dispatch = useAppDispatch();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { currentLimit, handleChangeLimit } = useLimit();
  const [category, setCategory] = useState<FullCategory | null>(null);

  const search = urlSearchParams.get("search") ?? "";
  const page = +(urlSearchParams.get("page") ?? "1");

  const handleDelete = async (id: string) => {
    try {
      const confirm = window.confirm("Bạn có chắc chắn muốn xóa danh mục này?");
      if (!confirm) return;

      const data = await categoryService.delete(id);
      dispatch(deleteCategory(id));
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

      const data = await categoryService.deleteMany(selectedRows);
      for (const id of selectedRows) {
        dispatch(deleteCategory(id));
      }
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

  const getCategories = useCallback(async () => {
    const res = await categoryService.getAll({
      search,
      page,
      limit: currentLimit,
    });

    const newData = res as CategoriesResponse;

    return {
      data: newData.categories,
      total: newData.total,
      skip: newData.skip,
    };
  }, [search, page, currentLimit]);

  const {
    data: categories,
    total,
    skip,
    setData: setCategories,
    isLoading,
  } = useFetchPagination<FullCategory[]>(getCategories, []);

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
        <title>Quản lý sản phẩm</title>
      </Helmet>

      <div className="p-4 lg:px-6 lg:pt-6">
        <h1 className="text-2xl font-semibold mb-4">
          Danh sách danh mục sản phẩm
        </h1>
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
                      categories.map((category) => category._id)
                    )
                  }
                  className="w-4 h-4 cursor-pointer rounded bg-emerald-primary focus:ring-2 focus:ring-offset-emerald-primary"
                />
                <label htmlFor="all" className="sr-only">
                  Chọn tất cả
                </label>
              </div>
            </th>

            <th>Tên danh mục</th>
            <th>Danh mục cha</th>
            <th>Hình ảnh</th>
            <th>Mô tả</th>
            <th>Thời gian tạo</th>
            <th>Chức năng</th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category._id}
              className={cn(
                "hover:bg-emerald-secondary transition",
                selectedRows.has(category._id) && "bg-emerald-secondary"
              )}
            >
              <td>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="categoryId"
                    id={category._id}
                    checked={selectedRows.has(category._id)}
                    onChange={(e) =>
                      handleSelect(e, category._id, categories.length)
                    }
                    className="w-4 h-4 cursor-pointer bg-emerald-primary rounded focus:ring-2 focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor={category._id} className="sr-only">
                    categoryId
                  </label>
                </div>
              </td>
              <td>{category.name}</td>
              <td>{category.parent?.name || "Trống"}</td>
              <td>
                {category.image ? (
                  <Fancybox>
                    <Link data-fancybox="categoryImage" to={category.image}>
                      <LazyLoadImage
                        src={category.image}
                        alt={category.slug}
                        effect="opacity"
                        width={60}
                        height={60}
                        className="rounded-md"
                      />
                    </Link>
                  </Fancybox>
                ) : (
                  "Trống"
                )}
              </td>
              <td>
                <p className="truncate w-56" title={category.description}>
                  {category.description || "Trống"}
                </p>
              </td>

              <td>
                {formatDate(category.createdAt, {
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
                    setCategory(category);
                  }}
                  className="px-3 py-2 bg-amber-600 hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Sửa
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(category._id)}
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
          {skip + categories.length > total ? 0 : skip + categories.length} trên
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

      <CreateModal show={activeModal.create} onClose={closeModal} />
      <UpdateModal
        show={activeModal.update}
        onClose={closeModal}
        category={category}
        setCategories={setCategories}
      />
    </div>
  );
};

export default Category;
