import Container from "../Container";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import aboutImage from "@/assets/images/about_image.webp";

const About = () => {
  return (
    <section className="py-10">
      <Container className="px-0">
        <div className="lg:flex">
          <div className="px-4 lg:flex-1">
            <h2 className="font-medium text-lg leading-7 tracking-widest text-yellow-primary mb-1.5 italic capitalize">
              Về chúng tôi
            </h2>
            <h1 className="text-[48px] leading-[56px] font-dancing_script">
              Dola Restaurant
            </h1>
            <p className="my-5 text-base font-light">
              Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm
              phục vụ, mang lại cho khách hàng những trãi nghiệm tuyệt với nhất.
              Các món ăn với công thức độc quyền sẽ mang lại hương vị mới mẻ cho
              thực khách. Dola Restaurant xin chân thành cảm ơn.
            </p>
            <Link
              to="/gioi-thieu"
              title="Xem thêm"
              className="text-base inline-flex items-center text-yellow-primary relative group"
            >
              <span className="absolute top-1/2 left-0 h-[1px] bg-yellow-primary transition-all duration-500 w-0 opacity-0 group-hover:w-[30px] group-hover:opacity-100"></span>
              <span className="transition-all duration-500 translate-x-0 group-hover:translate-x-[46px]">
                Xem thêm
              </span>
              <span className="w-[30px] h-[1px] bg-yellow-primary transition-all duration-500 ml-4 group-hover:opacity-0"></span>
            </Link>
          </div>
          <div className="px-4 mt-5 lg:flex-1 lg:mt-0">
            <div className="overflow-hidden">
              <LazyLoadImage
                src={aboutImage}
                effect="opacity"
                alt="Về chúng tôi"
                title="Về chúng tôi"
                className="scale-100 hover:scale-105 transition-all duration-500 ease-ease"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
