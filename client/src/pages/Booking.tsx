import Breadcrumb from "../components/Breadcrumb";
import Container from "../components/Container";
import Title from "../components/Home/Title";
import InputGroup from "../components/Form/InputGroup";
import { Helmet } from "@dr.pogodin/react-helmet";

const title = "Đặt bàn";

const formatZero = (n: number) => {
  if (n < 10) return `0${n}`;
  return n;
};

const date = new Date(Date.now());
const day = date.getDate(); // return day of 1 month
const month = date.getMonth() + 1; // return month from 0 to 11
const year = date.getFullYear();
const minDate = `${year}-${formatZero(month)}-${day}`;

const Booking = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
      <Container className="mb-5">
        <section className="bg-booking bg-center bg-no-repeat bg-cover rounded-2xl p-2.5 lg:p-[50px]">
          <div className="rounded-2xl bg-emerald-primary p-5 w-full xl:max-w-[50%] mx-auto">
            <Title className="mb-[30px]">Liên hệ đặt bàn</Title>
            <form className="md:grid lg:grid-cols-2 gap-x-5">
              <fieldset>
                <label
                  htmlFor="name"
                  className="text-white font-bold mb-2 block"
                >
                  Tên của bạn:
                </label>
                <InputGroup
                  type={"text"}
                  name="name"
                  id="name"
                  placeholder="Tên của bạn..."
                  className="py-1.5"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="email"
                  className="text-white font-bold mb-2 block"
                >
                  Email của bạn:
                </label>
                <InputGroup
                  type={"text"}
                  name="email"
                  id="email"
                  placeholder="Email của bạn..."
                  className="py-1.5"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="phone"
                  className="text-white font-bold mb-2 block"
                >
                  Số điện thoại của bạn:
                </label>
                <InputGroup
                  type={"text"}
                  name="phone"
                  id="phone"
                  placeholder="Số điện thoại..."
                  className="py-1.5"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="date"
                  className="text-white font-bold mb-2 block"
                >
                  Bạn có thể đến dùng ngày nào?
                </label>
                <InputGroup
                  type="date"
                  name="date"
                  id="date"
                  min={minDate}
                  placeholder="Chọn ngày"
                  className="py-1.5"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="people"
                  className="text-white font-bold mb-2 block"
                >
                  Bạn đi mấy người?
                </label>
                <InputGroup
                  type="number"
                  name="people"
                  id="people"
                  placeholder="Số người..."
                  className="py-1.5"
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="time"
                  className="text-white font-bold mb-2 block"
                >
                  Thời gian bạn đến?
                </label>
                <InputGroup
                  type="time"
                  name="time"
                  id="time"
                  className="py-1.5"
                />
              </fieldset>
              <div className="col-span-2">
                <p className="mb-6 text-center">
                  Khách đặt tiệc hội nghị, liên hoan vui lòng gọi trực tiếp:{" "}
                  <span className="text-yellow-primary">012 345 678</span>
                </p>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-yellow-primary hover:bg-yellow-secondary text-white rounded-lg font-bold text-base"
                  >
                    Đặt bàn ngay
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Booking;
