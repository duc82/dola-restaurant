import { useFormik } from "formik";
import InputGroup from "../Form/InputGroup";
import TextArea from "../TextArea";
import { ContactDTO } from "@/types/contact";
import handlingAxiosError from "@/utils/handlingAxiosError";
import toast from "react-hot-toast";
import contactService from "@/services/contactService";
import { contactSchema } from "@/schemas/contactSchema";

const ContactForm = () => {
  const formik = useFormik<ContactDTO>({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: contactSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await contactService.create(values);
        toast.success(res.message);
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      } finally {
        resetForm();
      }
    },
  });

  return (
    <div className="flex-1">
      <h1 className="text-base text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        Liên hệ với chúng tôi
      </h1>
      <form
        className="border border-yellow-primary py-2.5 px-4 rounded-b-lg w-full lg:h-[306px]"
        onSubmit={formik.handleSubmit}
      >
        <InputGroup
          type="text"
          name="fullName"
          id="fullName"
          placeholder="Họ và tên"
          autoComplete="off"
          className="py-1.5 px-5"
          wrapperClassName="mb-2.5"
          value={formik.values.fullName}
          onChange={formik.handleChange}
        />
        <InputGroup
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          className="py-1.5 px-5"
          wrapperClassName="mb-2.5"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <InputGroup
          type="text"
          name="phone"
          id="phone"
          placeholder="Điện thoại"
          autoComplete="off"
          className="py-1.5 px-5"
          wrapperClassName="mb-2.5"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        <TextArea
          placeholder="Nội dung"
          id="message"
          name="message"
          autoComplete="off"
          rows={3}
          required
          className="py-1.5 px-5"
          value={formik.values.message}
          onChange={formik.handleChange}
        ></TextArea>
        <button
          type="submit"
          className="bg-yellow-primary hover:bg-yellow-secondary px-5 rounded-lg text-white leading-9"
        >
          Gửi thông tin
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
