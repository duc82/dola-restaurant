import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import userService from "@/services/userService";
import { setUser } from "@/store/reducers/userSlice";

const CheckoutLayout = () => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      userService
        .getCurrent()
        .then((data) => {
          dispatch(setUser(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, dispatch]);

  if (!isLoggedIn) return <Navigate to="/dang-nhap" />;

  return (
    <div className="bg-white text-[rgb(51,51,51)]">
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
  );
};

export default CheckoutLayout;
