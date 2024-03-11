import InputGroup from "../Form/InputGroup";
import TextArea from "../TextArea";

const ContactForm = () => {
  return (
    <div className="flex-1">
      <h1 className="text-base text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        Liên hệ với chúng tôi
      </h1>
      <form className="border border-yellow-primary py-2.5 px-4 rounded-b-lg w-full">
        <InputGroup
          type="text"
          name="name"
          id="name"
          placeholder="Họ và tên"
          autoComplete="off"
          className="py-1.5"
        />
        <InputGroup
          type="text"
          name="email"
          id="email"
          placeholder="Email"
          autoComplete="off"
          className="py-1.5"
        />
        <InputGroup
          type="text"
          name="phone"
          id="phone"
          placeholder="Điện thoại"
          autoComplete="off"
          className="py-1.5"
        />
        <TextArea
          placeholder="Nội dung"
          id="content"
          name="content"
          autoComplete="off"
          rows={3}
          required
          className="py-1.5"
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
