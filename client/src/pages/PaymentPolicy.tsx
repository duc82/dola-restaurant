import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import { Helmet } from "react-helmet-async";

const PaymentPolicy = () => {
  const title = "Chính sách thanh toán";

  return (
    <>
      <Helmet>{title}</Helmet>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Trang chủ</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <Container>
        <h1 className="font-medium text-[40px] mb-2">{title}</h1>
        <div className="min-h-96">
          <p className="mb-4">
            <b>Khách hàng thanh toán trực tiếp tại cửa hàng&nbsp;</b>
          </p>
          <p className="mb-4">+ Nhận ưu đãi</p>
          <p className="mb-4">+ Nhận quà tặng kèm</p>
          <p className="mb-4">+ Checkin tại cửa hàng</p>
          <p className="mb-4">
            <b>Khách hàng thanh toán online</b>
          </p>
          <p className="mb-4">+ Chuyển khoản trước khi nhận hàng</p>
          <p className="mb-4">+ Quà tặng kèm bất kỳ</p>
          <p className="mb-4">
            Khách hàng có nhu cầu khiếu nại, đổi trả sản phẩm do lỗi của Dola có
            thể liên hệ qua Hotline 1900 6750 để được hỗ trợ sớm nhất.
          </p>
          <p className="mb-4">
            Tư vấn viên sẽ hướng dẫn khách hàng các bước cần thiết để tiến hành
            trả thanh toán.
          </p>
        </div>
      </Container>
    </>
  );
};

export default PaymentPolicy;
