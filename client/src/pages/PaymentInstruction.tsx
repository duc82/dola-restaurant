import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import { Helmet } from "react-helmet-async";

const title = "Hướng dẫn thanh toán";

const PaymentInstruction = () => {
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
        <div className="min-h-96">
          <p className="mb-4">
            <strong>Lựa chọn thông tin tài khoản thanh toán</strong>
          </p>
          <p className="mb-4">
            Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng nhập là
            email và mật khẩu vào mục đã có tài khoản trên hệ thống
          </p>

          <p className="mb-4">
            <strong>+</strong> Điền các thông tin của bạn để nhận đơn hàng, lựa
            chọn hình thức thanh toán và vận chuyển cho đơn hàng của mình
          </p>
          <p className="mb-4">
            <strong>+</strong> Xem lại thông tin đặt hàng, điền chú thích và gửi
            đơn hàng
          </p>
          <p className="mb-4">
            Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ liên hệ bằng cách
            gọi điện lại để xác nhận lại đơn hàng và địa chỉ của bạn.
          </p>
          <p className="mb-4">Trân trọng cảm ơn.</p>
        </div>
      </Container>
    </>
  );
};

export default PaymentInstruction;
