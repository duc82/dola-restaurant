import Modal from "@/components/Modal/Modal";
import { productSchema, sizes, tastes } from "@/schemas/productSchema";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateProduct } from "@/store/reducers/productSlice";
import { FilePreview } from "@/types";
import { UpdateModalProps } from "@/types/admin";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useFormik } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Input from "../Input";
import Select from "../Select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Upload } from "@/icons";
import EditorText from "@/components/EditorText";

const UpdateModal = ({ show, onClose, id }: UpdateModalProps) => {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const { products } = useAppSelector((state) => state.product);
  const { categories } = useAppSelector((state) => state.category);
  const childCategories = categories.filter(
    (category) => category.parentCategory
  );

  const dispatch = useAppDispatch();

  const product = products.find((product) => product._id === id);

  const formik = useFormik({
    initialValues: {
      title: product?.title || "",
      category: product?.childCategory._id || "",
      description: product?.description || "",
      taste: product?.taste || "",
      size: product?.size || "",
      price: product?.price.toString() || "0",
      discountPercent: product?.discountPercent || 0,
      stock: product?.stock || 0,
      images: product?.images || [],
      imagesToDelete: [],
    },
    validationSchema: productSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("category", values.category);
        formData.append("taste", values.taste);
        formData.append("size", values.size);
        formData.append("price", values.price.replace(/\D/g, ""));
        formData.append("discountPercent", values.discountPercent.toString());
        formData.append("stock", values.stock.toString());
        formData.append("description", values.description);
        files.forEach((file) => {
          formData.append("image[]", file);
        });
        values.imagesToDelete.forEach((image) => {
          formData.append("imagesToDelete[]", image);
        });

        dispatch(updateProduct({ id, formData }));
        setFiles([]);
        onClose();
        toast.success("Cập nhật sản phẩm thành công");
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 10485760, // 10MB
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        const filePreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        return filePreview;
      });

      setFiles(files);
    },
  });

  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="bg-emerald-secondary text-white"
    >
      <Modal.Header>
        <Modal.Title className="text-xl">Chỉnh sửa sản phẩm</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-96 overflow-auto">
          <Input
            type="text"
            label="Tiêu đề"
            name="title"
            id="title"
            autoComplete="off"
            placeholder="Món ăn"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.errors.title}
          />
          <Input
            type="currency"
            label="Giá"
            name="price"
            id="price"
            maxLength={13}
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.errors.price}
          />
          <Input
            type="number"
            label="Giảm giá (%)"
            name="discountPercent"
            id="discountPercent"
            min={0}
            max={99}
            value={formik.values.discountPercent}
            onChange={formik.handleChange}
            error={formik.errors.discountPercent}
          />
          <Input
            type="number"
            label="Tồn kho"
            name="stock"
            id="stock"
            min={1}
            max={1000000}
            value={formik.values.stock}
            onChange={formik.handleChange}
            error={formik.errors.stock}
          />
          <Select
            label="Hương vị"
            name="taste"
            onChange={formik.handleChange}
            defaultValue={formik.values.taste}
          >
            {tastes.map((taste) => (
              <option key={taste} value={taste}>
                {taste.charAt(0).toUpperCase() + taste.slice(1)}
              </option>
            ))}
          </Select>
          <Select
            label="Kích cỡ"
            name="size"
            onChange={formik.handleChange}
            defaultValue={formik.values.size}
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </option>
            ))}
          </Select>
          <Select
            name="category"
            label="Danh mục sản phẩm"
            onChange={formik.handleChange}
            defaultValue={formik.values.category}
            wrapperClassName="col-span-2"
          >
            {childCategories.map((childCate) => (
              <option key={childCate._id} value={childCate._id}>
                {childCate.name}
              </option>
            ))}
          </Select>
          <div className="col-span-2">
            <label htmlFor="description" className="mb-2 inline-block">
              Mô tả
            </label>
            <EditorText
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue("description", value)}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="images" className="mb-2 inline-block">
              Hình ảnh
            </label>

            <div className="flex flex-wrap items-center mb-2 space-x-2">
              {formik.values.images.map((image) => (
                <LazyLoadImage
                  key={image._id}
                  src={image.url}
                  alt={formik.values.title}
                  width={100}
                  id="image"
                  effect="opacity"
                  className="rounded-md"
                />
              ))}
              {files.map((file) => (
                <LazyLoadImage
                  key={file.name}
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  id="image"
                  effect="opacity"
                  className="rounded-md"
                  onLoad={() => URL.revokeObjectURL(file.preview)}
                />
              ))}
            </div>

            <div
              {...getRootProps()}
              className="py-4 flex flex-col justify-center items-center border-2 border-dashed border-gray-600 rounded-md cursor-pointer h-32 hover:bg-emerald-primary"
            >
              <Upload className="text-gray-400 w-10 h-10" />
              <p className="text-sm py-1 text-gray-500">
                Tải ảnh lên hoặc kéo và thả
              </p>
              <p className="text-gray-400 text-xs">
                PNG, JPG, GIF lên đến 10MB
              </p>
              <input {...getInputProps()} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-blue-700 text-center focus:ring-4 focus:ring-blue-800 transition"
          >
            Cập nhật
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
