import CreateModal from "@/components/Admin/Category/CreateModal";
import UpdateModal from "@/components/Admin/Category/UpdateModal";
import DeleteModal from "@/components/Admin/DeleteModal";
import Pagination from "@/components/Pagination";
import useAdminModal from "@/hooks/useAdminModal";
import { ArrowUp, Dustbin, Edit, Plus2 } from "@/icons";
import categoryService from "@/services/categoryService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  deleteCategory,
  setCategories,
  setCategoriesPagination,
  sortCategories
} from "@/store/reducers/categorySlice";
import formatDate from "@/utils/formatDate";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useSearchParams } from "react-router-dom";
import limits from "@/data/limits.json";
import Limit from "@/components/Limit";
import cn from "@/utils/cn";

interface Sort {
  key: "name" | "createdAt";
  order: "asc" | "desc";
}

const Category = () => {
  const {
    activeModal,
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    closeModal,
    id,
    selectedRows,
    isDeleteMany,
    selectedRowsRef,
    handleSelect,
    handleSelectAll,
    clearDeleteMany
  } = useAdminModal();
  const dispatch = useAppDispatch();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const [activeLimit, setActiveLimit] = useState(limits[0]);
  const [sort, setSort] = useState<Sort>({
    key: "createdAt",
    order: "asc"
  });
  const search = urlSearchParams.get("search") ?? "";
  const page = parseInt(urlSearchParams.get("page") ?? "1");

  const { categories, total, skip } = useAppSelector((state) => state.category);

  const handleDelete = async () => {
    try {
      if (isDeleteMany) {
        const data = await categoryService.deleteMany(selectedRows);
        for (const id of selectedRows) {
          dispatch(deleteCategory(id));
        }
        toast.success(data.message);
        clearDeleteMany();
      } else {
        const data = await categoryService.delete(id);
        dispatch(deleteCategory(id));
        toast.success(data.message);
      }
      closeModal();
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const onPageChange = (page: number) => {
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  const handleActiveLimit = (limit: number) => {
    setActiveLimit(limit);
    const pageCount = Math.ceil(total / limit);
    if (page > pageCount) {
      urlSearchParams.set("page", pageCount.toString());
      setUrlSearchParams(urlSearchParams);
    }
  };

  useEffect(() => {
    categoryService
      .getAllPaginate({
        search,
        page,
        limit: activeLimit
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
  }, [dispatch, search, page, activeLimit]);

  useEffect(() => {
    dispatch(sortCategories(sort));
  }, [sort, dispatch]);

  const pageCount = Math.ceil(total / activeLimit);

  return (
    <div className="overflow-y-auto w-full">
      <Helmet>
        <title>Quản lý danh mục sản phẩm</title>
      </Helmet>

      <div className="p-4">
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
            <button
              type="button"
              onClick={() => openDeleteModal(selectedRows)}
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
              <Plus2 className="w-6 h-6 mr-2" />
              <span>Thêm danh mục</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <table className="w-full text-left divide-y divide-gray-600">
          <thead className="bg-emerald-secondary">
            <tr className="text-base">
              <th className="p-4">
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
                    className="w-3.5 h-3.5 rounded bg-emerald-primary focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor="all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>

              <th className="px-2 py-4">Id</th>
              <th className="px-2 py-4">
                <button
                  type="button"
                  className="flex items-center space-x-1"
                  onClick={() => {
                    setSort((prev) => ({
                      key: "name",
                      order: prev.order === "asc" ? "desc" : "asc"
                    }));
                  }}
                >
                  <span>Tên danh mục</span>
                  <ArrowUp
                    className={cn(
                      "w-5 h-5 transition-transform",
                      sort.key === "name" &&
                        sort.order === "desc" &&
                        "rotate-180"
                    )}
                  />
                </button>
              </th>
              <th className="px-2 py-4">Danh mục cha</th>
              <th className="px-2 py-4">Hình ảnh</th>
              <th className="px-2 py-4">Mô tả</th>
              <th className="px-2 py-4">
                <button
                  type="button"
                  className="flex items-center space-x-1"
                  onClick={() => {
                    setSort((prev) => ({
                      key: "createdAt",
                      order: prev.order === "asc" ? "desc" : "asc"
                    }));
                  }}
                >
                  <span>Thời gian tạo</span>
                  <ArrowUp
                    className={cn(
                      "w-5 h-5 transition-transform",
                      sort.key === "createdAt" &&
                        sort.order === "desc" &&
                        "rotate-180"
                    )}
                  />
                </button>
              </th>
              <th className="px-2 py-4">Chức năng</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-600">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-emerald-secondary">
                <td className="p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="categoryId"
                      id={category._id}
                      checked={selectedRows.includes(category._id)}
                      onChange={(e) =>
                        handleSelect(e, category._id, categories.length)
                      }
                      className="w-3.5 h-3.5 bg-emerald-primary rounded focus:ring-offset-emerald-primary"
                    />
                    <label htmlFor={category._id} className="sr-only">
                      categoryId
                    </label>
                  </div>
                </td>
                <td className="px-2 py-4">
                  <p className="truncate w-48">{category._id}</p>
                </td>
                <td className="px-2 py-4">{category.name}</td>
                <td className="px-2 py-4">
                  {category.parentCategory?.name || "Không có"}
                </td>
                <td className="px-2 py-4">
                  {category.image ? (
                    <LazyLoadImage
                      src={category.image}
                      alt={category.slug}
                      effect="opacity"
                      width={60}
                      height={60}
                      className="rounded-md"
                    />
                  ) : (
                    "Không có"
                  )}
                </td>
                <td className="px-2 py-4">
                  <p className="truncate w-64" title={category.description}>
                    {category.description || "Không có"}
                  </p>
                </td>

                <td className="px-2 py-4">{formatDate(category.createdAt)}</td>
                <td className="px-2 py-4 whitespace-nowrap space-x-2.5">
                  <button
                    type="button"
                    onClick={() => openUpdateModal(category._id)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(category._id)}
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

      <div className="p-4 flex items-center justify-between border-t border-t-gray-600">
        <div>
          <span className="text-sm text-gray-400">
            Hiển thị {skip + 1} - {skip + categories.length} trên tổng số{" "}
            {total}
          </span>
        </div>
        <Pagination
          pageCount={pageCount}
          currentPage={page}
          onPageChange={onPageChange}
        />
        <Limit activeLimit={activeLimit} handleClick={handleActiveLimit} />
      </div>

      <CreateModal show={activeModal.create} onClose={closeModal} />
      <UpdateModal show={activeModal.update} onClose={closeModal} id={id} />
      <DeleteModal
        show={activeModal.delete}
        onClose={closeModal}
        handleDelete={handleDelete}
        alert="Bạn có muốn xóa danh mục sản phẩm này không?"
      />
    </div>
  );
};

export default Category;
