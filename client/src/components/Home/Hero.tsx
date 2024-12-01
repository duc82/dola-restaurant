import { Link } from "react-router-dom";
import "animate.css";
import slider_mb_1 from "@/assets/images/slider_mb_1.webp";
import slider_1 from "@/assets/images/slider_mb_1.webp";

const Hero = () => {
  return (
    <section className="relative overflow-hidden lg:h-screen">
      <picture>
        <source media="(min-width: 992px)" srcSet={slider_1} />
        <img
          src={slider_mb_1}
          alt="Slide 1"
          width={1920}
          height={930}
          className="animate__animated animate__bounceIn animate__slow mx-auto"
        />
      </picture>

      <div className="absolute left-0 right-0 mx-auto top-1/2 -translate-y-1/2 flex flex-col items-center">
        <h1 className="text-center block text-white text-[30px] font-dancing_script md:text-[50px] font-semibold animate__animated animate__backInLeft animate__custom">
          Dola Restaurant
        </h1>
        <p className="text-center text-sm mb-1.5 md:text-xl md:mb-4 block tracking-widest animate__animated animate__backInRight animate__custom">
          Món ăn đa dạng
        </p>
        <Link
          to="/danh-muc-san-pham/tat-ca-san-pham"
          className="bg-yellow-primary text-center text-xs md:text-[15px] min-w-[120px] h-[30px] leading-[30px] uppercase hover:bg-yellow-secondary rounded-lg md:h-[45px] md:leading-[45px] md:min-w-[180px] transition-colors ease-ease duration-[400ms] animate__animated animate__backInUp animate__custom"
        >
          Xem thực đơn
        </Link>
      </div>
    </section>
  );
};

export default Hero;
