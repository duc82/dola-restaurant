import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const title = "Chính sách thành viên";

const MembershipPolicyLayout = () => {
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

export default MembershipPolicyLayout;
