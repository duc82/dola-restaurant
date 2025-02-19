import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCurrentAddresses } from "@/store/reducers/addressSlice";
import { resetAuth } from "@/store/reducers/authSlice";
import { getCurrentUser } from "@/store/reducers/userSlice";
import cn from "@/utils/cn";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLIC_KEY as string
);

const CheckoutLayout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
        .unwrap()
        .then(() => {
          dispatch(getCurrentAddresses());
        })
        .catch((_error) => {
          dispatch(resetAuth());
          navigate("/dang-nhap");
        });
    }
  }, [dispatch, navigate, user]);

  return (
    <Elements stripe={stripePromise}>
      <div
        className={cn(
          "text-[rgb(51,51,51)] h-full",
          pathname.includes("/thanh-toan/thanh-cong") && "h-screen",
          pathname === "/thanh-toan" ? "bg-white" : "bg-[rgb(230,232,234)]"
        )}
      >
        <Helmet>
          <title>Thanh toán đơn hàng</title>
        </Helmet>
        {/* Header Mobile */}
        <header className="lg:hidden py-6 border-b border-b-gray-200">
          <h1 className="text-[28px] leading-none text-blue-500 text-center font-normal">
            <Link to="/">Dola Restaurant</Link>
          </h1>
        </header>
        <Outlet />
      </div>
    </Elements>
  );
};

export default CheckoutLayout;
