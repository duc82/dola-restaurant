import Modal from "@/components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { CreateModalProps } from "@/types/admin";
import { useFormik } from "formik";
import Input from "../Input";
import ReactQuill from "react-quill";
import Select from "../Select";
import { useState } from "react";
import { FilePreview } from "@/types";
import { useDropzone } from "react-dropzone";
import { Upload } from "@/icons";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { createProduct } from "@/store/reducers/productSlice";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { productSchema, sizes, tastes } from "@/schemas/productSchema";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];

const CreateModal = ({ show, onClose }: CreateModalProps) => {
  const { categories } = useAppSelector((state) => state.category);
  const [files, setFiles] = useState<FilePreview[]>([]);
  const dispatch = useAppDispatch();

  const childCategories = categories.filter(
    (category) => category.parentCategory
  );

  const formik = useFormik({
    initialValues: {
      title: "",
      category: childCategories[0]._id,
      description: "",
      taste: tastes[0],
      size: sizes[0],
      price: "0",
      discountPercent: 0,
      stock: 0,
    },
    validationSchema: productSchema,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
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

        const data = await dispatch(createProduct(formData)).unwrap();
        resetForm();
        setFiles([]);
        onClose();
        toast.success(data.message);
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
        <Modal.Title className="text-xl">Thêm sản phẩm</Modal.Title>
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
            <ReactQuill
              value={formik.values.description}
              modules={modules}
              formats={formats}
              onChange={(description) => {
                formik.setFieldValue("description", description);
              }}
              className="bg-emerald-primary"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="images" className="mb-2 inline-block">
              Hình ảnh
            </label>

            <div className="flex flex-wrap items-center mb-2 space-x-2">
              {files.map((file, i) => (
                <LazyLoadImage
                  key={i}
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
            Thêm mới
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateModal;
