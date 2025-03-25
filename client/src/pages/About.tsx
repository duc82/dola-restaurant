import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb/index";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Helmet } from "@dr.pogodin/react-helmet";
import about_image from "@/assets/images/about_image.webp";

const title = "Giới thiệu";

const About = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <section className="mb-10">
        <Container>
          <h1 className="mb-2 text-[2.5rem] leading-snug font-medium">
            Giới thiệu
          </h1>
          <p className="mb-14">
            <strong className="italic">DOLA RESTAURANT</strong> - Nhà hàng ẩm
            thực hiện đại kết hợp với truyền thống, tạo nên tính mới lạ cho thực
            khách. Được ra đời vào năm 2021 với tiêu chí "Khách hàng là trên
            hết" nên chúng tôi luôn tự hào về cách phục vụ cũng như các món ăn
            mà chúng tôi làm ra. Nhà hàng chúng tôi luôn luôn đặt khách hàng lên
            hàng đầu, tận tâm phục vụ, mang lại cho khách hàng những trãi nghiệm
            tuyệt với nhất. Các món ăn với công thức độc quyền sẽ mang lại hương
            vị mới mẻ cho thực khách. Dola Restaurant xin chân thành cảm ơn.
          </p>
          <div className="mb-4">
            <LazyLoadImage
              effect="opacity"
              src={about_image}
              alt="Về chúng tôi"
            />
          </div>
          <p>
            <strong className="italic">
              HÃY ĐẾN DOLA RESTAURANT ĐỂ THƯỞNG THỨC NGAY BẠN NHÉ!
            </strong>
          </p>
        </Container>
      </section>
    </>
  );
};

export default About;
