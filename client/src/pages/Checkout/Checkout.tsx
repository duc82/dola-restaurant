import FloatingLabel from "@/components/Form/FloatingLabel";
import Radio from "@/components/Form/Radio";
import Select from "@/components/Form/Select";
import { CreditCart, IdCard, Truck } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import VnPay from "@/utils/VnPay";
import formatVnd from "@/utils/formatVnd";
import { useFormik } from "formik";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import paymentMethods from "@/data/paymentMethods.json";
import Button from "@/components/Form/Button";
import Sidebar from "@/components/Checkout/Sidebar";
import { useEffect, useState } from "react";
import orderService from "@/services/orderService";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { resetCart } from "@/store/reducers/cartSlice";
import formatAddress from "@/utils/formatAddress";

const shippingFee = 40000;

const Checkout = () => {
  const [isSuccess, setSuccess] = useState(false);
  const { subTotal, carts, count } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { addresses } = useAppSelector((state) => state.address);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [urlSearchParams] = useSearchParams();

  const defaultAddress = addresses.find((address) => address.isDefault);

  const formik = useFormik({
    initialValues: {
      fullName: defaultAddress?.fullName,
      phone: defaultAddress?.phone,
      shippingAddress: defaultAddress?._id ?? "",
      user: user?._id ?? "",
      total: subTotal + shippingFee,
      shippingFee,
      products: carts.map((cart) => ({
        product: cart._id,
        quantity: cart.quantity,
      })),
      note: "",
      paymentMethod: paymentMethods[0].name,
      isPaid: false,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (values.paymentMethod === "VnPay") {
        const url = await VnPay.createPaymentUrl(values);
        window.location.href = url;
      } else if (values.paymentMethod === "Thanh toán khi giao hàng (COD)") {
        delete values.fullName;
        delete values.phone;

        orderService
          .create(values)
          .then((data) => {
            navigate(`/thanh-toan/cam-on/${data.order._id}`);
            setSuccess(true);
            dispatch(resetCart());
          })
          .catch((error) => {
            toast.error(handlingAxiosError(error).message);
          });
      }
    },
  });

  useEffect(() => {
    if (urlSearchParams.get("vnp_ResponseCode") !== "00" || !user) {
      return;
    }

    const values = {
      ...formik.values,
      isPaid: true,
      paidAt: new Date().toISOString(),
    };

    orderService
      .create(values)
      .then((data) => {
        navigate(`/thanh-toan/cam-on/${data.order._id}`);
        setSuccess(true);
      })
      .catch((error) => {
        toast.error(handlingAxiosError(error).message);
      });
  }, [navigate, dispatch, urlSearchParams, user]);

  if (count < 1 && !isSuccess) return <Navigate to="/gio-hang" />;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col lg:flex-row-reverse max-w-6xl lg:px-4 mx-auto text-sm"
    >
      <Sidebar />
      <main className="lg:p-6 lg:w-2/3 px-4">
        <header className="hidden lg:block">
          <h1 className="text-[28px] leading-none text-blue-500 font-normal">
            <Link to="/thanh-toan">Dola Restaurant</Link>
          </h1>
        </header>
        <div className="pt-6 lg:flex lg:space-x-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="flex-1 flex items-center font-semibold text-lg">
                <IdCard className="w-7 h-7 text-[rgb(51,51,51)] mr-2" />
                Thông tin nhận hàng
              </h2>
              <Link to="/dang-xuat" className="text-blue-500">
                Đăng xuất
              </Link>
            </div>
            <div>
              <FloatingLabel
                type="text"
                id="email"
                name="email"
                label="Email"
                disabled
                wrapperClassName="mb-3"
                value={user?.email ?? ""}
              />

              <FloatingLabel
                type="text"
                id="fullName"
                name="fullName"
                label="Họ và tên"
                disabled
                wrapperClassName="mb-3"
                value={formik.values?.fullName ?? ""}
              />

              <FloatingLabel
                type="text"
                id="phone"
                name="phone"
                label="Số điện thoại"
                disabled
                wrapperClassName="mb-3"
                value={formik.values?.phone ?? ""}
              />
              <Select
                label="Địa chỉ"
                name="shippingAddress"
                id="shippingAddress"
                wrapperClassName="mb-3"
                value={formik.values.shippingAddress}
                onChange={(e) => {
                  const address = addresses.find(
                    (address) => address._id === e.target.value
                  );
                  if (address) {
                    formik.setFieldValue("fullName", address.fullName);
                    formik.setFieldValue("phone", address.phone);
                  }
                  formik.handleChange(e);
                }}
              >
                {addresses.map((address) => (
                  <Select.Option key={address._id} value={address._id}>
                    {formatAddress(address)}
                  </Select.Option>
                ))}
              </Select>
              <FloatingLabel
                type="text"
                id="note"
                name="note"
                label="Ghi chú (tùy chọn)"
                wrapperClassName="mb-2"
                onChange={formik.handleChange}
              />
            </div>
          </div>

          <div className="flex-1 pt-6 lg:pt-0">
            <div className="mb-6">
              <h2 className="flex items-center mb-3 text-[rgb(51,51,51)] text-lg font-semibold">
                <Truck className="w-6 h-6 mr-2 -scale-x-100" />
                Vận chuyển
              </h2>
              <Radio
                id="delivery"
                name="delivery"
                defaultChecked
                wrapperClassName="border border-[rgb(206,205,205)] rounded-md"
                label={
                  <div className="flex items-center">
                    <span className="flex-1">Giao hàng tận nơi</span>
                    <span className="ml-2">{formatVnd(40000)}</span>
                  </div>
                }
              />
            </div>
            <div>
              <h2 className="flex items-center mb-3 text-[rgb(51,51,51)] text-lg font-semibold">
                <CreditCart className="w-6 h-6 mr-2 -scale-x-100" />
                Phương thức thanh toán
              </h2>
              {paymentMethods.map((method) => (
                <Radio
                  key={method.name}
                  id={method.name}
                  name="paymentMethod"
                  value={method.name}
                  checked={formik.values.paymentMethod === method.name}
                  onChange={formik.handleChange}
                  wrapperClassName="border border-[rgb(206,205,205)] rounded-md mb-3"
                  label={
                    <div className="flex items-center">
                      <span className="flex-1">{method.name}</span>
                      <img
                        src={method.image}
                        alt={method.name}
                        className="ml-2"
                        width={22}
                      />
                    </div>
                  }
                />
              ))}
            </div>

            <div className="py-4 lg:hidden">
              <Button
                type="submit"
                intent={"secondary"}
                size={"medium"}
                className="w-full mb-4"
                inactive={"noOpacity"}
              >
                ĐẶT HÀNG
              </Button>
              <Link to="/gio-hang" className="text-center text-blue-500 block">
                <span> Quay lại giỏ hàng</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </form>
  );
};

export default Checkout;
