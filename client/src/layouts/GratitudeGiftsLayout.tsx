import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";

const title = "Quà tặng tri ân";

const GratitudeGiftsLayout = () => {
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

export default GratitudeGiftsLayout;
