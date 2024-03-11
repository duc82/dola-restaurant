import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const title = "Bảo mật thông tin cá nhân";

const SecurityLayout = () => {
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

export default SecurityLayout;
