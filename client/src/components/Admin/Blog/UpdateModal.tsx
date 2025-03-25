import Modal from "@/components/Modal/Modal";
import { storage } from "@/libs/firebase";
import blogService from "@/services/blogService";
import { FilePreview } from "@/types";
import { UpdateModalProps } from "@/types/admin";
import { Blog } from "@/types/blog";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useFormik } from "formik";
import { Suspense, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import Input from "../Input";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Upload } from "@/icons";
import TextEditor from "@/components/TextEditor";

interface UpdateBlogModalProps extends UpdateModalProps {
  blog: Blog | null;
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}

export default function UpdateModal({
  show,
  onClose,
  blog,
  setBlogs,
}: UpdateBlogModalProps) {
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
      title: blog?.title || "",
      description: blog?.description || "",
      image: blog?.image || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        if (!blog) return;

        if (file) {
          const storageRef = ref(storage, `blogs/${file?.name}`);
          await uploadBytes(storageRef, file)
            .then((snapshot) => getDownloadURL(snapshot.ref))
            .then((url) => {
              values.image = url;
            });
        }

        const res = await blogService.update(blog._id, values);

        setBlogs((prev) => {
          const idx = prev.findIndex((item) => item._id === blog._id);
          if (idx !== -1) {
            prev[idx] = res.blog;
          }
          return prev;
        });

        setFile(null);
        onClose();

        toast.success(res.message);
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
        <Modal.Title className="text-xl">Chỉnh sửa tin tức</Modal.Title>
      </Modal.Header>
      <form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              type="text"
              label="Tiêu đề"
              name="title"
              id="title"
              autoComplete="off"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title}
              wrapperClassName="col-span-2"
            />

            <Suspense fallback={null}>
              <div className="col-span-2">
                <label htmlFor="description" className="mb-2 inline-block">
                  Mô tả
                </label>
                <TextEditor
                  value={formik.values.description}
                  onChange={(value) =>
                    formik.setFieldValue("description", value)
                  }
                  className="bg-emerald-primary"
                />
              </div>
            </Suspense>

            <div className="col-span-2">
              <label htmlFor="image" className="block font-medium text-sm mb-2">
                Hình ảnh
              </label>
              {(file || formik.values.image) && (
                <LazyLoadImage
                  src={file?.preview ?? formik.values.image}
                  alt={formik.values.title}
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
}
