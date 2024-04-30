import CreateModal from "@/components/Admin/Category/CreateModal";
import UpdateModal from "@/components/Admin/Category/UpdateModal";
import Pagination from "@/components/Pagination";
import useAdminModal from "@/hooks/useAdminModal";
import { Dustbin, Edit, Plus2 } from "@/icons";
import categoryService from "@/services/categoryService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteCategory,
  setCategories,
  setCategoriesPagination
} from "@/store/reducers/categorySlice";
import formatDate from "@/utils/formatDate";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router-dom";
import Limit from "@/components/Limit";
import cn from "@/utils/cn";
import useLimit from "@/hooks/useLimit";
import CategoryProvider from "@/providers/CategoryProvider";
import Fancybox from "@/libs/Fancybox";
import { Link } from "react-router-dom";

const Category = () => {
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
    clearSelectedRows
  } = useAdminModal();

  const dispatch = useAppDispatch();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();

  const { currentLimit, handleChangeLimit } = useLimit();

  const search = urlSearchParams.get("search") ?? "";
  const page = +(urlSearchParams.get("page") ?? "1");

  const {
    categories,
    total,
    skip,
    page: currentPage
  } = useAppSelector((state) => state.category);

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
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  useEffect(() => {
    categoryService
      .getAllPaginate({
        search,
        page,
        limit: currentLimit
      })
      .then((data) => {
        dispatch(setCategories(data.categories));
        dispatch(
          setCategoriesPagination({
            total: data.total,
            skip: data.skip,
            limit: data.limit,
            page: data.page
          })
        );
      });
  }, [dispatch, search, page, currentLimit]);

  const pageCount = Math.ceil(total / currentLimit);

  const hasSelected = selectedRows.length > 0;

  return (
    <div className="overflow-y-auto w-full">
      <Helmet>
        <title>Danh mục sản phẩm</title>
      </Helmet>

      <div className="p-4 lg:px-6 lg:pt-6">
        <h1 className="text-2xl font-semibold mb-4">
          Danh sách danh mục sản phẩm
        </h1>
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
                placeholder="Tìm kiếm danh mục sản phẩm"
                defaultValue={search}
                className="w-full bg-emerald-secondary p-2.5 border border-gray-600 rounded-lg text-sm placeholder:text-gray-400 transition"
              />
            </form>
          </div>
          <button
            type="button"
            onClick={openCreateModal}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
          >
            <Plus2 className="w-6 h-6 mr-1" />
            <span>Thêm danh mục</span>
          </button>
        </div>
      </div>

      <div className="p-4 lg:px-6 flex items-center">
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

      <table className="table-admin">
        <thead>
          <tr className="text-base">
            <th>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="all"
                  id="all"
                  ref={selectedRowsRef}
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
                selectedRows.includes(category._id) && "bg-emerald-secondary"
              )}
            >
              <td>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="categoryId"
                    id={category._id}
                    checked={selectedRows.includes(category._id)}
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
              <td>{category.parentCategory?.name || "Không có"}</td>
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
                  "Không có"
                )}
              </td>
              <td>
                <p className="truncate w-56" title={category.description}>
                  {category.description || "Không có"}
                </p>
              </td>

              <td>{formatDate(category.createdAt)}</td>
              <td className="whitespace-nowrap space-x-2.5">
                <button
                  type="button"
                  onClick={() => openUpdateModal(category._id)}
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
          currentPage={currentPage}
          onPageChange={onPageChange}
          variant="blue"
        />
        <Limit
          currentLimit={currentLimit}
          handleClick={(limit) => handleChangeLimit(limit, total, page)}
          variant="blue"
        />
      </div>

      <CategoryProvider>
        <CreateModal show={activeModal.create} onClose={closeModal} />
        <UpdateModal show={activeModal.update} onClose={closeModal} id={id} />
      </CategoryProvider>
    </div>
  );
};

export default Category;
