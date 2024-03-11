import { Helmet } from "react-helmet-async";
import Breadcrumb from "../components/Breadcrumb";
import { Outlet } from "react-router-dom";

const CartLayout = () => {
  return (
    <>
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <Breadcrumb breadcrumbs={[{ name: "Giỏ hàng" }]} />
      <Outlet />
    </>
  );
};

export default CartLayout;
