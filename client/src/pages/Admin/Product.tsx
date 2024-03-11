import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Dustbin, Edit, Search } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { deleteProduct, getAllProduct } from "@/store/reducers/productSlice";
import formatVnd from "@/utils/formatVnd";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Pagination from "@/components/Pagination";
import { useSearchParams } from "react-router-dom";
import useAdminModal from "@/hooks/useAdminModal";
import formatDate from "@/utils/formatDate";
import CreateModal from "@/components/Admin/Product/CreateModal";
import DeleteModal from "@/components/Admin/DeleteModal";
import handlingAxiosError from "@/utils/handlingAxiosError";
import toast from "react-hot-toast";
import UpdateModal from "@/components/Admin/Product/UpdateModal";

const title = "Admin - Danh sách sản phẩm";

const Product = () => {
  const {
    activeModal,
    closeModal,
    openCreateModal,
    openUpdateModal,
    openDeleteModal,
    id,
    ids,
    selectedAllRef,
    handleSelect,
    handleSelectAll,
  } = useAdminModal();
  const [urlSearchParams, setUrlSearchParams] = useSearchParams();
  const { products, total, limit } = useAppSelector((state) => state.product);

  const dispatch = useAppDispatch();

  const page = parseInt(urlSearchParams.get("page") ?? "1");
  const search = urlSearchParams.get("search") ?? "";

  const onPageChange = (page: number) => {
    urlSearchParams.set("page", page.toString());
    setUrlSearchParams(urlSearchParams);
  };

  const handleDelete = async () => {
    try {
      const data = await dispatch(deleteProduct(id)).unwrap();
      closeModal();
      toast.success(data.message);
    } catch (error) {
      toast.error(handlingAxiosError(error).message);
    }
  };

  const pageCount = limit > 0 ? Math.ceil(total / limit) : 0;

  useEffect(() => {
    const limit = 3;
    const query = urlSearchParams.toString();
    dispatch(getAllProduct({ query, limit }));
  }, [dispatch, urlSearchParams]);

  return (
    <div className="overflow-y-auto w-full">
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="p-4">
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
            <button
              type="button"
              className="p-1 group hover:bg-emerald-secondary rounded cursor-pointer transition"
            >
              <Dustbin className="w-6 h-6 text-gray-400 group-hover:text-white transition" />
            </button>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
          >
            Thêm sản phẩm
          </button>
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
                        products.map((product) => product._id)
                      )
                    }
                    className="w-3.5 h-3.5 rounded bg-emerald-primary focus:ring-offset-emerald-primary"
                  />
                  <label htmlFor="all" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-2 py-4"></th>
              <th scope="col" className="px-2 py-4">
                Tiêu đề
              </th>

              <th scope="col" className="px-2 py-4">
                Danh mục
              </th>

              <th scope="col" className="px-2 py-4">
                Giảm giá
              </th>
              <th scope="col" className="px-2 py-4">
                Giá
              </th>
              <th scope="col" className="px-2 py-4">
                Tồn kho
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
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-emerald-secondary">
                <td className="px-2 py-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="productId"
                      id={product._id}
                      checked={ids.includes(product._id)}
                      onChange={(e) =>
                        handleSelect(e, product._id, products.length)
                      }
                      className="w-3.5 h-3.5 bg-emerald-primary rounded focus:ring-offset-emerald-primary"
                    />
                    <label htmlFor={product._id} className="sr-only">
                      productId
                    </label>
                  </div>
                </td>

                <td className="px-2 py-4">
                  <LazyLoadImage
                    src={product.images[0]?.url}
                    alt={product.title}
                    width={50}
                    effect="opacity"
                    className="rounded-md"
                  />
                </td>
                <td className="px-2 py-4">{product.title}</td>
                <td className="px-2 py-4">
                  {product.childCategory.name} ({product.parentCategory.name})
                </td>
                <td className="px-2 py-4">
                  {product.discountPercent
                    ? `${product.discountPercent}%`
                    : "Không"}
                </td>
                <td className="px-2 py-4">
                  {formatVnd(
                    product.price -
                      (product.price * product.discountPercent) / 100
                  )}
                </td>
                <td className="px-2 py-4">{product.stock}</td>
                <td className="px-2 py-4">{formatDate(product.createdAt)}</td>
                <td className="p-4 whitespace-nowrap space-x-2.5">
                  <button
                    type="button"
                    onClick={() => openUpdateModal(product._id)}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-900 rounded-lg inline-flex items-center font-medium justify-center text-sm transition"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Sửa
                  </button>
                  <button
                    type="button"
                    onClick={() => openDeleteModal(product._id)}
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
          currentPage={page}
          onPageChange={onPageChange}
        />
      )}
      <CreateModal show={activeModal.create} onClose={closeModal} />
      <UpdateModal show={activeModal.update} onClose={closeModal} id={id} />
      <DeleteModal
        alert="Bạn có muốn xóa sản phẩm này không?"
        show={activeModal.delete}
        handleDelete={handleDelete}
        onClose={closeModal}
      />
    </div>
  );
};

export default Product;
