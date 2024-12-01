import Container from "../Container";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import showrooms from "@/data/showrooms.json";
import ListMenu from "./ListMenu";
import guides from "@/data/guides.json";
import policies from "@/data/policies.json";
import logo from "@/assets/images/logo.webp";
import zalo from "@/assets/images/zalo.svg";
import facebook from "@/assets/images/facebook.svg";
import youtube from "@/assets/images/youtube.svg";
import payment_1 from "@/assets/images/payment_1.webp";
import payment_2 from "@/assets/images/payment_2.webp";
import payment_3 from "@/assets/images/payment_3.webp";

const showroom = showrooms.find((showroom) => showroom.main);

const Footer = () => {
  return (
    <footer className="border-t border-t-gray-200">
      <section className="py-[50px]">
        <Container className="px-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="px-4 col-span-2 md:col-span-3 lg:col-span-2 mb-5">
              <Link
                title="Dola Restaurant"
                to="/"
                className="inline-flex items-center"
              >
                <LazyLoadImage
                  width={172}
                  effect="opacity"
                  src={logo}
                  alt="Dola Restaurant"
                  className="rounded-full"
                />
              </Link>

              <p className="mt-2.5">
                Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận
                tâm phục vụ, mang lại cho khách hàng những trãi nghiệm tuyệt với
                nhất. Các món ăn với công thức độc quyền sẽ mang lại hương vị
                mới mẻ cho thực khách. Dola Restaurant xin chân thành cảm ơn.
              </p>
              <h2 className="text-[17px] font-bold mt-2.5">Cửa hàng chính</h2>
              <ul className="mt-2.5 mb-4">
                <li className="mb-1">
                  <b>Địa chỉ:</b> {showroom?.address}
                </li>
                <li className="text-yellow-primary mb-1">
                  <b className="text-white">Điện thoại:</b>{" "}
                  <Link
                    title={showroom?.hotline}
                    to={`tel:${showroom?.hotline}`}
                    className="hover:text-yellow-secondary"
                  >
                    {showroom?.hotline}
                  </Link>
                </li>
                <li className="text-yellow-primary mb-1">
                  <b className="text-white">Email:</b>{" "}
                  <Link
                    title={showroom?.email}
                    to={`mailto:${showroom?.email}`}
                    className="hover:text-yellow-secondary"
                  >
                    {showroom?.email}
                  </Link>
                </li>
              </ul>
              <Link
                to="/he-thong-nha-hang"
                title="Hệ thống nhà hàng"
                className="text-white py-2.5 px-4 inline-block bg-yellow-primary rounded-lg shadow-card2 hover:bg-yellow-secondary"
              >
                Hệ thống nhà hàng
              </Link>
            </div>
            <div className="px-4">
              <h2 className="uppercase text-white font-bold mb-5 text-base">
                Hướng dẫn
              </h2>
              <ListMenu menus={guides} />
            </div>
            <div className="px-4">
              <h2 className="uppercase text-white font-bold mb-5 text-base">
                Chính sách
              </h2>
              <ListMenu menus={policies} />
            </div>
            <div className="px-4 col-span-2 md:col-span-1">
              <h2 className="uppercase text-white font-bold mb-5 text-base">
                Mạng xã hội
              </h2>
              <ul className="flex items-center space-x-3 mb-4">
                <li>
                  <Link to="/">
                    <LazyLoadImage
                      width={32}
                      height={32}
                      src={zalo}
                      effect="opacity"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <LazyLoadImage
                      width={32}
                      height={32}
                      src={facebook}
                      effect="opacity"
                    />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <LazyLoadImage
                      width={32}
                      height={32}
                      src={youtube}
                      effect="opacity"
                    />
                  </Link>
                </li>
              </ul>
              <h2 className="uppercase text-white font-bold mb-5 text-base">
                Hình thức thanh toán
              </h2>
              <ul className="flex items-center space-x-3 mb-4">
                <li>
                  <LazyLoadImage src={payment_1} width={57} height={35} />
                </li>
                <li>
                  <LazyLoadImage src={payment_2} width={57} height={35} />
                </li>
                <li>
                  <LazyLoadImage src={payment_3} width={57} height={35} />
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
      <section className="text-center bg-emerald-secondary text-white py-2.5">
        <Container>
          <span className="block sm:inline-block">
            Bản quyền thuộc về <b>Dola Restaurant</b>.
          </span>{" "}
          <span>Cung cấp bởi Sopa</span>
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
