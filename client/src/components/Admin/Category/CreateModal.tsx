import Modal from "@/components/Modal/Modal";
import { useAppDispatch } from "@/store/hooks";
import { createCategory } from "@/store/reducers/categorySlice";
import { FilePreview } from "@/types";
import { CreateModalProps } from "@/types/admin";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Input from "../Input";
import Select from "../Select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Upload } from "@/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase";
import categoryService from "@/services/categoryService";
import { FullCategory } from "@/types/category";

const CreateModal = ({ show, onClose }: CreateModalProps) => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<FilePreview | null>(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 10485760, // 10MB
    multiple: false,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const filePreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFile(filePreview);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      parent: "" as string | undefined,
      image: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        if (!values.parent) {
          delete values.parent;
        }

        if (file) {
          const storageRef = ref(storage, `categories/${file?.name}`);
          const snapshot = await uploadBytes(storageRef, file as File);
          const url = await getDownloadURL(snapshot.ref);
          values.image = url;
        }

        const data = await dispatch(createCategory(values)).unwrap();

        resetForm();
        setFile(null);
        onClose();

        toast.success(data.message);
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
  });

  const [categories, setCategories] = useState<FullCategory[]>([]);

  useEffect(() => {
    if (show) {
      categoryService
        .getAll()
        .then((data) => setCategories(data as FullCategory[]));
    }
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={onClose}
      contentClassName="bg-emerald-secondary text-white"
    >
      <Modal.Header>
        <Modal.Title className="text-xl">Thêm danh mục sản phẩm</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="Tên danh mục"
              name="name"
              id="name"
              autoComplete="off"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name}
            />
            <Select
              label="Danh mục cha"
              name="parent"
              id="parent"
              onChange={formik.handleChange}
              value={formik.values.parent}
            >
              <option value="">Không có</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Select>

            <Input
              type="text"
              label={
                <>
                  Mô tả <span className="text-gray-400">(không bắt buộc)</span>
                </>
              }
              name="description"
              id="description"
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
              {file && (
                <LazyLoadImage
                  src={file.preview}
                  alt={formik.values.name}
                  width={100}
                  id="image"
                  effect="opacity"
                  wrapperClassName="mb-2"
                  className="rounded-md"
                  onLoad={() => URL.revokeObjectURL(file.preview)}
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
            className="bg-blue-600 text-white font-medium py-2.5 px-5 text-sm rounded-lg hover:bg-blue-700 text-center focus:ring-4 focus:ring-blue-900 transition"
          >
            Thêm mới
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default CreateModal;
