import { Helmet } from "react-helmet-async";
import Container from "../components/Container";
import Breadcrumb from "@/components/Breadcrumb";

const title = "Hướng dẫn mua hàng";

const BuyingGuide = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <h1 className="font-medium text-[40px] mb-2">{title}</h1>
        <p className="mb-4">
          <strong>Bước 1:</strong> Truy cập website và lựa chọn món ăn cần mua
        </p>
        <p className="mb-4">
          <strong>Bước 2:</strong> Click và sản phẩm muốn mua, màn hình hiển thị
          ra pop up với các lựa chọn sau
        </p>
        <p className="mb-4">
          Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua hàng để lựa
          chọn thêm sản phẩm vào giỏ hàng
        </p>
        <p className="mb-4">
          Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem giỏ hàng
        </p>
        <p className="mb-4">
          Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui lòng bấm vào:
          Đặt hàng và thanh toán
        </p>
        <p className="mb-4">
          <strong>Bước 3:</strong> Lựa chọn thông tin tài khoản thanh toán
        </p>
        <p className="mb-4">
          Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là email
          và mật khẩu vào mục đã có tài khoản trên hệ thống
        </p>
        <p className="mb-4">
          <strong>Bước 4:</strong> Điền các thông tin của bạn để nhận đơn hàng,
          lựa chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình
        </p>
        <p className="mb-4">
          <strong>Bước 5:</strong> Xem lại thông tin đặt hàng, điền chú thích và
          gửi đơn hàng
        </p>
        <p className="mb-4">
          Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách gọi
          điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.
        </p>
        <p className="mb-4">Trân trọng cảm ơn.</p>
      </Container>
    </>
  );
};

export default BuyingGuide;
