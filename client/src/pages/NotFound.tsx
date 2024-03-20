import Breadcrumb from "@/components/Breadcrumb";
import { Link } from "react-router-dom";

const title = "404 Không tìm thấy trang";

const NotFound = () => {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <section className="mb-[30px] lg:mb-10 text-center">
        <h1 className="text-5xl mb-2">404</h1>
        <p className="mb-4">
          Trang này đang bị lỗi bạn vui lòng quay trở lại trang chủ
        </p>
        <Link
          to="/"
          className="inline-block px-5 bg-yellow-primary hover:bg-yellow-secondary text-white rounded-md h-10 leading-10"
        >
          Về trang chủ
        </Link>
      </section>
    </>
  );
};

export default NotFound;
