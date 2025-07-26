import FloatingLabel from "@/components/Form/FloatingLabel";
import Radio from "@/components/Form/Radio";
import Select from "@/components/Form/Select";
import { CreditCart, IdCard, Truck } from "@/icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import formatVnd from "@/utils/formatVnd";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import Button from "@/components/Form/Button";
import Sidebar from "@/components/Checkout/Sidebar";
import { ChangeEvent, useEffect, useState } from "react";
import orderService from "@/services/orderService";
import toast from "react-hot-toast";
import handlingAxiosError from "@/utils/handlingAxiosError";
import { resetCart } from "@/store/reducers/cartSlice";
import formatAddress from "@/utils/formatAddress";
import voucherService from "@/services/voucherService";
import { FullVoucher } from "@/types/voucher";
import moneyBill from "@/assets/images/money_bill.svg";
// import vnpay from "@/assets/images/vnpay.webp";

const shippingFee = 40000;

export interface VoucherDiscount {
  shipping: FullVoucher | null;
  discount: FullVoucher | null;
}

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { subTotal, carts } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { addresses } = useAppSelector((state) => state.address);
  const [isLoadingVoucher, setIsLoadingVoucher] = useState(false);
  const [voucher, setVoucher] = useState<VoucherDiscount>({
    shipping: null,
    discount: null,
  });
  const [voucherCode, setVoucherCode] = useState("");
  const [errorVoucher, setErrorVoucher] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultAddress = addresses.find((address) => address.isDefault);

  const formik = useFormik({
    initialValues: {
      fullName: defaultAddress?.fullName,
      phone: defaultAddress?.phone,
      shippingAddress: defaultAddress?._id || "",
      user: user?._id || "",
      total:
        subTotal +
        shippingFee -
        (voucher.shipping?.discount || 0) -
        (voucher.discount?.discount || 0),
      shippingFee: voucher.shipping ? 0 : shippingFee,
      products: carts.map((cart) => ({
        product: cart._id,
        quantity: cart.quantity,
      })),
      note: "",
      paymentMethod: "Thanh toán khi giao hàng (COD)",
      vouchers: [] as string[],
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      delete values.fullName;
      delete values.phone;

      const vouchers: string[] = Object.values(voucher)
        .filter((v) => v !== null)
        .map((v) => v._id);

      values.vouchers = vouchers;

      try {
        setIsLoading(false);
        const { order } = await orderService.create(values);

        if (values.paymentMethod === "VnPay") {
          const { url } = await orderService.createPaymentUrl({
            amount: values.total,
            orderDescription: `Thanh toán đơn hàng ${
              order._id
            } tại Dola Restaurant. Số tiền: ${formatVnd(order.total)}`,
            orderId: order._id,
          });

          window.location.href = url;
        } else {
          navigate(`/thanh-toan/thanh-cong/${order._id}`);
          dispatch(resetCart());
        }
      } catch (error) {
        toast.error(handlingAxiosError(error).message);
      } finally {
        setIsLoading(true);
      }
    },
  });

  const handleChangeAddress = (e: ChangeEvent<HTMLSelectElement>) => {
    const address = addresses.find((address) => address._id === e.target.value);
    if (address) {
      formik.setFieldValue("fullName", address.fullName);
      formik.setFieldValue("phone", address.phone);
    }
    formik.handleChange(e);
  };

  const handleChangeVoucherCode = (e: ChangeEvent<HTMLInputElement>) => {
    setVoucherCode(e.target.value);
  };

  const handleVoucher = async (code: string) => {
    setErrorVoucher("");
    setIsLoadingVoucher(true);
    try {
      const voucher = await voucherService.getByCode(code, subTotal);
      setVoucher((prev) => {
        if (voucher.type === "shipping") {
          return { ...prev, shipping: voucher };
        } else {
          return { ...prev, discount: voucher };
        }
      });
      setVoucherCode("");
    } catch (_error) {
      setErrorVoucher("Voucher không hợp lệ");
    }
    setIsLoadingVoucher(false);
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const pathname = window.location.pathname;

    if (pathname.includes("vnpay-return")) {
      orderService
        .vnpayReturn(urlSearchParams.toString())
        .then(() => {
          dispatch(resetCart());
          navigate(
            `/thanh-toan/thanh-cong/${urlSearchParams.get("vnp_TxnRef")}`
          );
        })
        .catch((error) => {
          toast.error(handlingAxiosError(error).message);
        });
    }
  }, [dispatch, navigate]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col lg:flex-row-reverse max-w-6xl lg:px-4 mx-auto text-sm"
    >
      <Sidebar
        shippingFee={shippingFee}
        total={formik.values.total}
        handleVoucher={handleVoucher}
        voucher={voucher}
        errorVoucher={errorVoucher}
        isLoadingVoucher={isLoadingVoucher}
        voucherCode={voucherCode}
        handleChangeVoucherCode={handleChangeVoucherCode}
      />
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
                onChange={handleChangeAddress}
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
                    <span className="ml-2">{formatVnd(shippingFee)}</span>
                  </div>
                }
              />
            </div>
            <div>
              <h2 className="flex items-center mb-3 text-[rgb(51,51,51)] text-lg font-semibold">
                <CreditCart className="w-6 h-6 mr-2 -scale-x-100" />
                Phương thức thanh toán
              </h2>

              <Radio
                id="Thanh toán khi giao hàng (COD)"
                name="paymentMethod"
                value="Thanh toán khi giao hàng (COD)"
                checked={
                  formik.values.paymentMethod ===
                  "Thanh toán khi giao hàng (COD)"
                }
                onChange={formik.handleChange}
                wrapperClassName="border border-[rgb(206,205,205)] rounded-md mb-3"
                label={
                  <div className="flex items-center">
                    <span className="flex-1">
                      Thanh toán khi giao hàng (COD)
                    </span>
                    <img
                      src={moneyBill}
                      alt="Image"
                      className="ml-2"
                      width={22}
                    />
                  </div>
                }
              />

              {/* <Radio
                id="VnPay"
                name="paymentMethod"
                value="VnPay"
                checked={formik.values.paymentMethod === "VnPay"}
                onChange={formik.handleChange}
                wrapperClassName="border border-[rgb(206,205,205)] rounded-md mb-3"
                label={
                  <div className="flex items-center">
                    <span className="flex-1">VnPay</span>
                    <img
                      src={vnpay}
                      alt={"Image"}
                      className="ml-2"
                      width={22}
                    />
                  </div>
                }
              /> */}
            </div>

            <div className="py-4 lg:hidden">
              <Button
                type="submit"
                intent={"secondary"}
                size={"medium"}
                className="w-full mb-4"
                inactive={"noOpacity"}
                disabled={isLoading}
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
