import Breadcrumb from "@/components/Breadcrumb";
import Container from "@/components/Container";
import { Helmet } from "@dr.pogodin/react-helmet";

const MembershipPolicy = () => {
  const title = "Chính sách thành viên";

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
          <p className="mb-4">Điều kiện chính sách thành viên</p>
          <p className="mb-4">
            <strong>1. Thẻ thành viên</strong>
          </p>
          <p className="mb-4">
            Điều kiện cấp thẻ thành viên: Khi khách hàng mua hàng trên hệ thống
            nhà hàng Dola Restaurant&nbsp;sẽ được cấp thẻ thành viên.
          </p>
          <p className="mb-4">
            <strong>2. Thẻ VIP</strong>
          </p>
          <p className="mb-4">
            <strong>Điều kiện nhận thẻ VIP:</strong>
          </p>
          <p className="mb-4">
            + Có giá trị tổng đơn hàng lớn hơn 15&nbsp;triệu/ tháng
          </p>
          <p className="mb-4">+ Mua hàng với giá trị 3&nbsp;triệu trợ lên</p>
          <p className="mb-4">
            + Tham gia các hoạt động, chương trình khuyến mãi của Dola
          </p>
          <p className="mb-4">
            <strong>Lưu ý:&nbsp;</strong>Hạn mức 10,&nbsp;20,&nbsp;30, 50,100
            triệu đồng&nbsp;là tính từ thời điểm bắt đầu mua tới khi lên thẻ.
            Khi lên thẻ VIP&nbsp;và tích tiếp lên 20 đến&nbsp;100&nbsp;triệu,
            tổng&nbsp;tiền này là tính từ khi khách hàng&nbsp;mua lần đầu và
            cộng dồn lên.
          </p>
        </div>
      </Container>
    </>
  );
};

export default MembershipPolicy;
