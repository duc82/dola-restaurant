import Breadcrumb from "@/components/Breadcrumb/index";
import Container from "@/components/Container";
import { Helmet } from "react-helmet-async";
import { LazyLoadImage } from "react-lazy-load-image-component";

const infos = [
  {
    id: 1,
    title: "Hệ thống 8 cửa hàng",
    description: "Trên toàn quốc",
    icon: "/icon_hethong1.webp"
  },
  {
    id: 2,
    title: "Hơn 100 nhân viên",
    description: "Để phục vụ quý khách",
    icon: "/icon_hethong2.webp"
  },
  {
    id: 3,
    title: "Mở cửa 8-22h cả",
    description: "CN & Lễ tết",
    icon: "/icon_hethong3.webp"
  }
];

const Showroom = () => {
  const title = "Hệ thống nhà hàng";

  return (
    <Container>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>

      <div className="flex items-center bg-emerald-secondary rounded-md border border-white py-2.5 mb-7">
        {infos.map((info) => (
          <div
            key={info.id}
            className="flex items-center justify-center flex-1"
          >
            <div className="rounded-full bg-yellow-primary w-16 h-16 flex items-center justify-center mr-2.5">
              <LazyLoadImage
                width={36}
                height={36}
                src={info.icon}
                alt={info.title}
                effect="opacity"
              />
            </div>

            <div className="text-base">
              <p>{info.title}</p>
              <p>{info.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex space-x-8">
        <div className="flex-[30%] bg-emerald-primary p-2.5">
          <div className="flex space-x-2.5">
            <select className="w-full">
              <option value="1">1</option>
            </select>
            <select className="w-full">
              <option value="1">1</option>
            </select>
          </div>
        </div>
        <div className="flex-[70%]"></div>
      </div>
    </Container>
  );
};

export default Showroom;
