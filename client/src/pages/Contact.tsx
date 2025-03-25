import Breadcrumb from "../components/Breadcrumb/index";
import Container from "../components/Container";
import ContactAddress from "../components/Contact/ContactAddress";
import ContactForm from "../components/Contact/ContactForm";
import { Helmet } from "react-helmet-async";
import showrooms from "@/data/showrooms.json";

const title = "Liên hệ";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="mb-[30px]">
        <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-8 mb-10">
          <ContactAddress />
          <ContactForm />
        </div>
        <iframe
          src={showrooms.find((showroom) => showroom.main)?.iframeSrc}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full border-0 h-[450px] rounded-lg"
        ></iframe>
      </Container>
    </>
  );
};

export default Contact;
