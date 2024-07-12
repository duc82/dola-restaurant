import Modal from "@/components/Modal/Modal";
import { productSchema, sizes, tastes } from "@/schemas/productSchema";
import { FilePreview } from "@/types";
import { UpdateModalProps } from "@/types/admin";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useFormik } from "formik";
import { Suspense, lazy, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Input from "../Input";
import Select from "../Select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Upload } from "@/icons";
import { FullCategory } from "@/types/category";
import categoryService from "@/services/categoryService";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase";
import { FullProduct } from "@/types/product";
import productService from "@/services/productService";

const TextEditor = lazy(() => import("@/components/TextEditor"));

interface UpdateModalProductProps extends UpdateModalProps {
  product: FullProduct;
  setProducts: React.Dispatch<React.SetStateAction<FullProduct[]>>;
}

const UpdateModal = ({
  show,
  onClose,
  product,
  setProducts,
}: UpdateModalProductProps) => {
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [childCategories, setChildCategories] = useState<FullCategory[]>([]);

  const formik = useFormik({
    initialValues: {
      title: product.title,
      category: product.category._id,
      description: product.description,
      taste: product.taste,
      size: product.size,
      price: product.price.toLocaleString(),
      discountPercent: product.discountPercent,
      stock: product.stock,
      images: product.images,
    },
    validationSchema: productSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const images: string[] = [];

        for (const file of files) {
          const storageRef = ref(storage, `products/${file?.name}`);
          const snapshot = await uploadBytes(storageRef, file as File);
          const url = await getDownloadURL(snapshot.ref);
          images.push(url);
        }

        const data = {
          ...values,
          price: parseInt(values.price.replace(/\D/g, "")),
          images,
        };

        const res = await productService.update(product._id, data);

        setProducts((prev) => {
          const index = prev.findIndex((p) => p._id === product._id);
          if (index !== -1) {
            prev[index] = res.product;
          }
          return prev;
        });
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
    maxSize: 20 * 1024 * 1024, // 20 MB
    multiple: true,
    onDrop: (acceptedFiles) => {
      const files = acceptedFiles.map((file) => {
        const preview = URL.createObjectURL(file);
        return Object.assign(file, { preview });
      });
      setFiles(files);
    },
  });

  useEffect(() => {
    categoryService.getChildrens().then((data) => {
      setChildCategories(data);
    });
  }, []);

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
            value={formik.values.taste}
          >
            {tastes.map((taste) => (
              <Select.Option key={taste} value={taste}>
                {taste.charAt(0).toUpperCase() + taste.slice(1)}
              </Select.Option>
            ))}
          </Select>
          <Select
            label="Kích cỡ"
            name="size"
            onChange={formik.handleChange}
            value={formik.values.size}
          >
            {sizes.map((size) => (
              <Select.Option key={size} value={size}>
                {size.charAt(0).toUpperCase() + size.slice(1)}
              </Select.Option>
            ))}
          </Select>
          <Select
            name="category"
            label="Danh mục sản phẩm"
            onChange={formik.handleChange}
            wrapperClassName="col-span-2"
            value={formik.values.category}
          >
            {childCategories.map((childCate) => (
              <Select.Option key={childCate._id} value={childCate._id}>
                {childCate.name}
              </Select.Option>
            ))}
          </Select>
          <Suspense fallback={null}>
            <div className="col-span-2">
              <label htmlFor="description" className="mb-2 inline-block">
                Mô tả
              </label>
              <TextEditor
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue("description", value)}
              />
            </div>
          </Suspense>

          <div className="col-span-2">
            <label htmlFor="images" className="mb-2 inline-block">
              Hình ảnh
            </label>

            <div className="flex flex-wrap items-center mb-2 space-x-2">
              {files.length === 0 &&
                formik.values.images.map((image) => (
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
        <Modal.Footer className="flex justify-end">
          <button
            type="submit"
            className="bg-amber-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-amber-700 text-center focus:ring-4 focus:ring-amber-900 transition"
          >
            Cập nhật
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default UpdateModal;
