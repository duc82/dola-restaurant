import Breadcrumb from "@/components/Breadcrumb/index";
import Container from "@/components/Container";
import { Helmet } from "@dr.pogodin/react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import showrooms from "@/data/showrooms.json";
import { useMemo, useState } from "react";
import icon_hethong1 from "@/assets/images/icon_hethong1.webp";
import icon_hethong2 from "@/assets/images/icon_hethong2.webp";
import icon_hethong3 from "@/assets/images/icon_hethong3.webp";

const infos = [
  {
    id: 1,
    title: "Hệ thống 8 cửa hàng",
    description: "Trên toàn quốc",
    icon: icon_hethong1,
  },
  {
    id: 2,
    title: "Hơn 100 nhân viên",
    description: "Để phục vụ quý khách",
    icon: icon_hethong2,
  },
  {
    id: 3,
    title: "Mở cửa 8-22h cả",
    description: "CN & Lễ tết",
    icon: icon_hethong3,
  },
];

const provinces = [...new Set(showrooms.map((showroom) => showroom.province))];

const Showroom = () => {
  const title = "Hệ thống nhà hàng";
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [iframeSrc, setIframeSrc] = useState(
    showrooms.find((showroom) => showroom.main)?.iframeSrc
  );

  const districts = useMemo(() => {
    return [
      ...new Set(
        showrooms
          .filter((showroom) => showroom.province === province)
          .map((showroom) => showroom.district)
      ),
    ];
  }, [province]);

  const newShowrooms = showrooms.filter((showroom) => {
    if (district) {
      return showroom.district === district;
    }
    if (province) {
      return showroom.province === province;
    }
    return true;
  });

  const handleChangeProvince = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setProvince(value);
    setDistrict("");
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="mb-[30px]">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-2.5 lg:space-y-0 bg-emerald-secondary rounded-lg border border-white py-2.5 mb-7">
            {infos.map((info) => (
              <div
                key={info.id}
                className="flex items-center flex-1 px-2.5 lg:p-0 lg:justify-center"
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

          <div className="flex flex-col lg:flex-row space-y-[30px] lg:space-y-0 lg:space-x-8">
            <div className="lg:flex-[30%] bg-emerald-secondary rounded-lg p-2.5">
              <div className="flex space-x-2.5">
                <select
                  className="w-full text-white appearance-none bg-yellow-primary text-sm font-medium h-9 rounded-lg border border-yellow-primary px-3 py-1 bg-select bg-auto mb-2.5"
                  onChange={handleChangeProvince}
                >
                  <option value="" className="text-black bg-white">
                    Chọn tỉnh thành
                  </option>
                  {provinces.map((province) => (
                    <option
                      key={province}
                      value={province}
                      className="text-black bg-white"
                    >
                      {province}
                    </option>
                  ))}
                </select>
                <select
                  className="w-full text-black appearance-none bg-white text-sm font-medium h-9 rounded-lg border border-yellow-primary px-3 py-1 bg-select2 bg-auto mb-2.5"
                  disabled={!province}
                  onChange={(e) => setDistrict(e.target.value)}
                >
                  <option value="">Chọn quận/huyện</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <ul className="mt-4 overflow-y-auto scrollbar max-h-[220px] lg:max-h-[400px]">
                {newShowrooms.map((showroom, i) => (
                  <li
                    key={i}
                    className="px-3 py-2 mb-2.5 mr-2.5 rounded-lg border border-b-2 border-b-yellow-primary leading-6 cursor-pointer hover:bg-[rgb(1,2,2)]"
                    onClick={() => setIframeSrc(showroom.iframeSrc)}
                  >
                    <h2 className="font-bold text-yellow-primary">
                      {showroom.name}
                    </h2>
                    <p>
                      <strong>Địa chỉ: </strong> {showroom.address}
                    </p>
                    <p>
                      <strong>Hotline: </strong>{" "}
                      <span className="text-yellow-primary">
                        {showroom.hotline}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:flex-[70%]">
              <iframe
                src={iframeSrc}
                className="h-[474px] w-full rounded-lg"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Showroom;
