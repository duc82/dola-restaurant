import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";
import { createPortal } from "react-dom";
import ModalCart from "../components/Cart/ModalCart";
import { Helmet } from "react-helmet-async";
import ProductQuickview from "@/components/Product/ProductQuickview";

const RootLayout = () => {
  return (
    <>
      <Helmet>
        <title>Dola Restaurant</title>
      </Helmet>
      <Header />
      <div>
        <Outlet />
        <Footer />
      </div>
      <ScrollTop />
      {createPortal(
        <>
          <ProductQuickview />
          <ModalCart />
        </>,
        document.body
      )}
    </>
  );
};

export default RootLayout;
