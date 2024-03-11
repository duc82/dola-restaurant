import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const title = "Hướng dẫn mua hàng";

const BuyingGuideLayout = () => {
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

export default BuyingGuideLayout;
