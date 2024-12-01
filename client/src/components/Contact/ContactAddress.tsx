import { Link } from "react-router-dom";
import showrooms from "@/data/showrooms.json";

const showroom = showrooms.find((showroom) => showroom.main);

const Address = () => {
  return (
    <div className="flex-1">
      <h1 className="text-base text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        Nhà hàng Dola Restaurant
      </h1>
      <div className="border border-yellow-primary py-2.5 px-4 rounded-b-lg w-full lg:h-[306px]">
        <p className="mt-2.5">
          Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục
          vụ, mang lại cho khách hàng những trãi nghiệm tuyệt với nhất. Các món
          ăn với công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực khách.
          Dola Restaurant xin chân thành cảm ơn.
        </p>
        <h2 className="text-[17px] font-bold mt-2.5">Cửa hàng chính</h2>
        <ul className="mt-2.5 mb-4">
          <li className="mb-1.5">
            <b>Địa chỉ:</b> {showroom?.address}
          </li>
          <li className="text-yellow-primary mb-1.5">
            <b className="text-white">Điện thoại:</b>{" "}
            <a
              title={showroom?.hotline}
              href={`tel:${showroom?.hotline}`}
              className="hover:text-yellow-secondary"
            >
              {showroom?.hotline}
            </a>
          </li>
          <li className="text-yellow-primary mb-1.5">
            <b className="text-white">Email:</b>{" "}
            <a
              title={showroom?.email}
              href={`mailto:${showroom?.email}`}
              className="hover:text-yellow-secondary"
            >
              {showroom?.email}
            </a>
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
    </div>
  );
};

export default Address;
