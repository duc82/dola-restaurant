import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import { Helmet } from "react-helmet-async";

const GratitudeGifts = () => {
  const title = "Quà tặng tri ân";

  return (
    <>
      <Helmet>{title}</Helmet>

      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <Container>
        <h1 className="font-medium text-[40px] mb-2">{title}</h1>
        <div className="min-h-96">
          <p className="mb-4">
            Chương trình tri ân diễn ra vào ngày cuối tuần của tuần cuối hàng
            tháng
          </p>
          <p className="mb-4">
            + Với mong muốn mang đến cho Quý khách hàng những sản&nbsp;phẩm chất
            lượng tốt nhất đồng thời đi kèm với&nbsp;dịch vụ tốt nhất và chính
            sách chăm sóc khách hàng tuyệt vời nhất.&nbsp;&nbsp;
          </p>
          <p className="mb-4">
            + Chương trình thẻ hội viên được xây dựng để tạo nên chính sách tri
            ân khách hàng đã tin chọn sản phẩm của chúng tôi. Quý khách mua sản
            phẩm của Bean sẽ được cộng dồn điểm tương ứng doanh số mua hàng với
            mỗi 100.000 VNĐ tương ứng với 1 điểm.
          </p>
          <p className="mb-4">
            <strong>
              1. Điều kiện để trở thành khách hàng thân thiết trong chính sách
              tri ân khách hàng
            </strong>
          </p>
          <p className="mb-4">
            + Có mua ít nhất 01 sản phẩm bất kỳ có giá trị từ 1.000.000 VNĐ trở
            lên tại hệ thống và các gian hàng của Bean.
          </p>
          <p className="mb-4">
            + Cung cấp đầy đủ và chính xác thông tin cá nhân.
          </p>
          <p className="mb-4">
            <strong>Dola&nbsp;</strong>xin thân tặng Quý khách hàng Chương
            trình&nbsp;
            <strong>‘’ TRI ÂN&nbsp;KHÁCH HÀNG THÂN THIẾT&nbsp;</strong>’’ như
            một lời tri ân sâu sắc cảm ơn sự tin yêu của quý khách dành
            cho&nbsp;<strong>Dola.</strong>
          </p>
        </div>
      </Container>
    </>
  );
};

export default GratitudeGifts;
