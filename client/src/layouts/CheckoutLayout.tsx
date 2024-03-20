import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setAddress } from "@/store/reducers/addressSlice";
import { resetAuth } from "@/store/reducers/authSlice";
import { getCurrentUser } from "@/store/reducers/userSlice";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const CheckoutLayout = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser())
        .unwrap()
        .then((data) => {
          dispatch(setAddress(data.addresses));
        })
        .catch(() => {
          dispatch(resetAuth());
          window.location.replace("/dang-nhap");
        });
    }
  }, [dispatch, user]);

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
