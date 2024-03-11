import CreateModal from "@/components/Admin/Category/CreateModal";
import UpdateModal from "@/components/Admin/Category/UpdateModal";
import DeleteModal from "@/components/Admin/DeleteModal";
import useAdminModal from "@/hooks/useAdminModal";
import useSearch from "@/hooks/useSearch";
import { Dustbin, Edit } from "@/icons";
import categoryService from "@/services/categoryService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategories } from "@/store/reducers/categorySlice";
import formatDate from "@/utils/formatDate";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Category = () => {
  const { search, handleSearch } = useSearch();
  const {
    activeModal,
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    closeModal,
    id,
    ids,
    isDeleteMany,
    selectedAllRef,
    handleSelect,
    handleSelectAll,
    clearDeleteMany,
  } = useAdminModal();
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector((state) => state.category);

  const handleDelete = async () => {
    try {
      if (isDeleteMany) {
        const data = await categoryService.deleteMany(ids);
        dispatch(
          setCategories(
            categories.filter((category) => !ids.includes(category._id))
          )
        );
        toast.success(data.message);
        clearDeleteMany();
      } else {
        const data = await categoryService.delete(id);
        dispatch(
          setCategories(categories.filter((category) => category._id !== id))
        );
        toast.success(data.message);
      }
      closeModal();
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  useEffect(() => {
    if (categories.length > 0) return;

    categoryService.getAll().then((data) => {
      if (data.length) {
        dispatch(setCategories(data));
      }
    });
  }, [dispatch, categories]);

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
                name="email"
                autoComplete="off"
                placeholder="Tìm kiếm danh mục sản phẩm"
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
              Thêm danh mục sản phẩm
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
              <th scope="col" className="px-2 py-4">
                Tên danh mục
              </th>
              <th scope="col" className="px-2 py-4">
                Danh mục cha
              </th>
              <th scope="col" className="px-2 py-4">
                Hình ảnh
              </th>
              <th scope="col" className="px-2 py-4">
                Mô tả
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
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-emerald-secondary">
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="categoryId"
                      id={category._id}
                      checked={ids.includes(category._id)}
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
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  ) : (
                    "Không có"
                  )}
                </td>
                <td className="px-2 py-4">
                  {category.description || "Không có"}
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

      <CreateModal show={activeModal.create} onClose={closeModal} />
      <UpdateModal show={activeModal.update} onClose={closeModal} id={id} />
      <DeleteModal
        show={activeModal.delete}
        onClose={closeModal}
        handleDelete={handleDelete}
        alert="Bạn có muốn xóa mã giảm giá này không?"
      />
    </div>
  );
};

export default Category;
