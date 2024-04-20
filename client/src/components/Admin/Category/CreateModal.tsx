import Modal from "@/components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createCategory } from "@/store/reducers/categorySlice";
import { FilePreview } from "@/types";
import { CreateModalProps } from "@/types/admin";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { useFormik } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Input from "../Input";
import Select from "../Select";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Upload } from "@/icons";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebase";

const CreateModal = ({ show, onClose }: CreateModalProps) => {
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<FilePreview | null>(null);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 10485760, // 10MB
    multiple: false,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const filePreview = Object.assign(file, {
            preview: reader.result as string,
          });
          setFile(filePreview);
        };
        reader.readAsDataURL(file);
      }
    },
  });
  const storageRef = ref(storage, `categories/${file?.name}`);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      parentCategory: "" as string | undefined,
      image: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        console.time("Upload file");
        if (!values.parentCategory) {
          delete values.parentCategory;
        }
        await uploadBytes(storageRef, file as File)
          .then((snapshot) => getDownloadURL(snapshot.ref))
          .then((url) => {
            values.image = url;
          });
        const data = await dispatch(createCategory(values)).unwrap();
        onClose();
        toast.success(data.message);
        resetForm();
        setFile(null);
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
  });

  const parentCategories = categories.filter(
    (category) => !category.parentCategory
  );

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
              {file && (
                <LazyLoadImage
                  src={file.preview}
                  alt={formik.values.name}
                  width={100}
                  id="image"
                  effect="opacity"
                  wrapperClassName="mb-2"
                  className="rounded-md"
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
