import { Helmet } from "react-helmet-async";
import Breadcrumb from "../components/Breadcrumb";
import { Outlet } from "react-router-dom";

const title = "Hướng dẫn thanh toán";

const PaymentInstructionLayout = () => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Breadcrumb breadcrumbs={[{ name: title }]} />
      <Outlet />
    </>
  );
};

export default PaymentInstructionLayout;
