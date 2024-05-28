import Modal from "@/components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { UpdateModalProps } from "@/types/admin";
import { useFormik } from "formik";
import Input from "../Input";
import Select from "../Select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import type { FilePreview } from "@/types";
import { useDropzone } from "react-dropzone";
import { Upload } from "@/icons";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import categoryService from "@/services/categoryService";
import { updateCategory } from "@/store/reducers/categorySlice";
import useCategory from "@/hooks/useCategory";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase";

const UpdateModal = ({ show, onClose, id }: UpdateModalProps) => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);
  const { parentCategories } = useCategory();
  const [file, setFile] = useState<FilePreview | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": []
    },
    maxSize: 10485760, // 10MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const filePreview = Object.assign(file, {
          preview: URL.createObjectURL(file)
        });
        setFile(filePreview);
      }
    }
  });

  const category = categories.find((category) => category._id === id);

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
      image: category?.image || "",
      parentCategory: (category?.parentCategory?._id || "") as
        | string
        | undefined
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const storageRef = ref(storage, `categories/${file?.name}`);

        if (!values.parentCategory) {
          delete values.parentCategory;
        }

        if (file) {
          await uploadBytes(storageRef, file as File)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
              values.image = url;
            });
        }

        const data = await categoryService.update(id, values);

        dispatch(updateCategory(data.category));

        setFile(null);
        onClose();
        toast.success(data.message);
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    }
  });

  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="bg-emerald-secondary text-white"
    >
      <Modal.Header>
        <Modal.Title className="text-xl">
          Chỉnh sửa danh mục sản phẩm
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="Tên danh mục"
              name="name"
              id="name"
              placeholder="Món chính"
              autoComplete="off"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
            <Select
              label="Danh mục cha"
              name="parentCategory"
              id="parentCategory"
              onChange={formik.handleChange}
              value={formik.values.parentCategory}
            >
              <option value="">Không có</option>
              {parentCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>

            <Input
              type="text"
              label="Mô tả"
              name="description"
              id="description"
              placeholder="Mô tả danh mục"
              autoComplete="off"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.errors.description}
              wrapperClassName="col-span-2"
            />

            <div className="col-span-2">
              <label htmlFor="image" className="block font-medium text-sm mb-2">
                Hình ảnh
              </label>
              {(file || formik.values.image) && (
                <LazyLoadImage
                  src={file?.preview ?? formik.values.image}
                  alt={formik.values.name}
                  width={100}
                  id="image"
                  effect="opacity"
                  wrapperClassName="mb-2"
                  className="rounded-md"
                  onLoad={() => {
                    if (file) {
                      URL.revokeObjectURL(file.preview);
                    }
                  }}
                />
              )}
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
