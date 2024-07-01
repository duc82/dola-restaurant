import Modal from "@/components/Modal/Modal";
import type { UpdateModalProps } from "@/types/admin";
import { useFormik } from "formik";
import Input from "../Input";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useState } from "react";
import type { FilePreview } from "@/types";
import { useDropzone } from "react-dropzone";
import { Upload } from "@/icons";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import categoryService from "@/services/categoryService";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase";
import { FullCategory } from "@/types/category";

interface UpdateModalCategoryProps extends UpdateModalProps {
  category: FullCategory | null;
  setCategories: React.Dispatch<React.SetStateAction<FullCategory[]>>;
}

const UpdateModal = ({
  show,
  onClose,
  category,
  setCategories,
}: UpdateModalCategoryProps) => {
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
        const filePreview = Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
        setFile(filePreview);
      }
    },
  });

  const formik = useFormik({
    initialValues: {
      name: category?.name || "",
      description: category?.description || "",
      image: category?.image || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (!category) return;

        const storageRef = ref(storage, `categories/${file?.name}`);

        if (file) {
          await uploadBytes(storageRef, file as File)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
              values.image = url;
            });
        }

        const data = await categoryService.update(category._id, values);

        setCategories((prev) => {
          const index = prev.findIndex((item) => item._id === category._id);
          if (index !== -1) {
            prev[index] = data.category;
          }
          return prev;
        });

        setFile(null);
        onClose();
        toast.success(data.message);
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      }
    },
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
              autoComplete="off"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name}
              wrapperClassName="col-span-2"
            />

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
