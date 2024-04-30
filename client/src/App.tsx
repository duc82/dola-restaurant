import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Showroom from "./pages/Showroom";
import About from "./pages/About";
import ProductList from "./pages/ProductList";
import SignUp from "./pages/SignUp";
import Blog from "./pages/Blog/Blog";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Orders from "./pages/Account/Orders";
import AccountLayout from "./layouts/AccountLayout";
import AccountInfo from "./pages/Account/AccountInfo";
import AuthLayout from "./layouts/AuthLayout";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import BuyingGuide from "./pages/BuyingGuide";
import PaymentInstruction from "./pages/PaymentInstruction";
import MembershipPolicy from "./pages/MembershipPolicy";
import PaymentPolicy from "./pages/PaymentPolicy";
import GratitudeGifts from "./pages/GratitudeGifts";
import RootLayout from "./layouts/RootLayout";
import PrivateLayout from "./layouts/PrivateLayout";
import Checkout from "./pages/Checkout/Checkout";
import AdminLayout from "./layouts/AdminLayout";
import ResetPassword from "./pages/ResetPassword";
import User from "./pages/Admin/User";
import Product from "./pages/Admin/Product";
import Dashboard from "./pages/Admin/Dashboard";
import Logout from "./pages/Logout";
import Security from "./pages/Security";
import ChangePassword from "./pages/Account/ChangePassword";
import NotFound from "./pages/NotFound";
import BlogDetail from "./pages/Blog/BlogDetail";
import Address from "./pages/Account/Address";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess";
import Order from "./pages/Account/Order";
import Voucher from "./pages/Admin/Voucher";
import Category from "./pages/Admin/Category";
import CheckoutLayout from "./layouts/CheckoutLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="dang-nhap" element={<Login />} />
          <Route path="dang-ky" element={<SignUp />} />
          <Route
            path="doi-mat-khau/:email/:token"
            element={<ResetPassword />}
          />
        </Route>

        <Route element={<PrivateLayout redirect="/dang-nhap" />}>
          <Route path="tai-khoan" element={<AccountLayout />}>
            <Route index element={<AccountInfo />} />
            <Route path="don-hang" element={<Orders />} />
            <Route path="don-hang/:id" element={<Order />} />
            <Route path="doi-mat-khau" element={<ChangePassword />} />
            <Route path="dia-chi" element={<Address />} />
          </Route>

          <Route path="dang-xuat" element={<Logout />} />
        </Route>

        <Route path="gioi-thieu" element={<About />} />
        <Route path="tin-tuc" element={<Blog />} />
        <Route path="tin-tuc/:title" element={<BlogDetail />} />
        <Route path="he-thong-nha-hang" element={<Showroom />} />
        <Route path="lien-he" element={<Contact />} />
        <Route path="dat-ban" element={<Booking />} />
        <Route path="danh-muc-san-pham/:category" element={<ProductList />} />
        <Route path="san-pham/:slug" element={<ProductDetail />} />
        <Route path="gio-hang" element={<Cart />} />

        <Route path="huong-dan-mua-hang" element={<BuyingGuide />} />
        <Route path="huong-dan-thanh-toan" element={<PaymentInstruction />} />
        <Route path="chinh-sach-thanh-vien" element={<MembershipPolicy />} />
        <Route path="chinh-sach-thanh-toan" element={<PaymentPolicy />} />
        <Route path="bao-mat-thong-tin-ca-nhan" element={<Security />} />
        <Route path="qua-tang-tri-an" element={<GratitudeGifts />} />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/thanh-toan" element={<CheckoutLayout />}>
        <Route index element={<Checkout />} />
        <Route path="thanh-cong/:id" element={<CheckoutSuccess />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="nguoi-dung" element={<User />} />
        <Route path="san-pham" element={<Product />} />
        <Route path="danh-muc-san-pham" element={<Category />} />
        <Route path="ma-giam-gia" element={<Voucher />} />
      </Route>
    </Routes>
  );
};

export default App;
