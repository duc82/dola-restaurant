import { createBrowserRouter, data } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import PrivateLayout from "./layouts/PrivateLayout";
import AccountLayout from "./layouts/AccountLayout";
import Logout from "./pages/Logout";
import Order from "./pages/Account/Order";
import Orders from "./pages/Account/Orders";
import ChangePassword from "./pages/Account/ChangePassword";
import Address from "./pages/Account/Address";
import About from "./pages/About";
import BlogDetail from "./pages/Blog/BlogDetail";
import Showroom from "./pages/Showroom";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import ProductList from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import BuyingGuide from "./pages/BuyingGuide";
import PaymentInstruction from "./pages/PaymentInstruction";
import PaymentPolicy from "./pages/PaymentPolicy";
import Security from "./pages/Security";
import GratitudeGifts from "./pages/GratitudeGifts";
import NotFound from "./pages/NotFound";
import CheckoutLayout from "./layouts/CheckoutLayout";
import Checkout from "./pages/Checkout/Checkout";
import CheckoutSuccess from "./pages/Checkout/CheckoutSuccess";
import AdminLayout from "./layouts/AdminLayout";
import UserAdmin from "./pages/Admin/User";
import Dashboard from "./pages/Admin/Dashboard";
import ProductAdmin from "./pages/Admin/Product";
import CategoryAdmin from "./pages/Admin/Category";
import ContactAdmin from "./pages/Admin/Contact";
import Cart from "./pages/Cart";
import AccountInfo from "./pages/Account/AccountInfo";
import ProductFavorite from "./pages/ProductFavorite";
import OrderAdmin from "./pages/Admin/Order";
import VoucherAdmin from "./pages/Admin/Voucher";
import Blog from "./pages/Blog";
import BlogAdmin from "./pages/Admin/Blog";
import MembershipPolicy from "./pages/MembershipPolicy";
import Search from "./pages/Search";
import categoryService from "./services/categoryService";
import { setCategories } from "./store/reducers/categorySlice";
import { FullCategory } from "./types/category";
import { getAllProduct } from "./store/reducers/productSlice";
import productService from "./services/productService";
import blogService from "./services/blogService";
import handlingAxiosError from "./utils/handlingAxiosError";
import { AxiosError } from "axios";
import { store } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: async () => {
      const categories = await categoryService.getAll();
      store.dispatch(setCategories(categories as FullCategory[]));
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: "dang-nhap",
            element: <Login />,
          },
          {
            path: "dang-ky",
            element: <SignUp />,
          },
          {
            path: "doi-mat-khau/:email/:token",
            element: <ResetPassword />,
          },
        ],
      },
      {
        element: <PrivateLayout redirect="/dang-nhap" />,
        children: [
          {
            path: "tai-khoan",
            element: <AccountLayout />,
            children: [
              {
                index: true,
                element: <AccountInfo />,
              },
              {
                path: "don-hang",
                element: <Orders />,
              },
              {
                path: "don-hang/:id",
                element: <Order />,
              },
              {
                path: "doi-mat-khau",
                element: <ChangePassword />,
              },
              {
                path: "dia-chi",
                element: <Address />,
              },
            ],
          },
          {
            path: "dang-xuat",
            element: <Logout />,
          },
        ],
      },
      {
        path: "gioi-thieu",
        element: <About />,
      },
      {
        path: "tin-tuc",
        element: <Blog />,
      },
      {
        path: "tin-tuc/:title",
        element: <BlogDetail />,
      },
      {
        path: "he-thong-nha-hang",
        element: <Showroom />,
      },
      {
        path: "lien-he",
        element: <Contact />,
      },
      {
        path: "dat-ban",
        element: <Booking />,
      },
      {
        path: "danh-muc-san-pham/:category",
        element: <ProductList />,
        loader: async ({ params, request }) => {
          const { category } = params;
          const searchParams = new URL(request.url).searchParams;
          const page = Number(searchParams.get("page") || "1");
          const limit = 12;
          const sort = searchParams.get("sort");
          const price = searchParams.get("price");
          const taste = searchParams.get("taste");
          const size = searchParams.get("size");

          store.dispatch(
            getAllProduct({
              categorySlug: category === "tat-ca-san-pham" ? null : category,
              limit,
              sort,
              page,
              price,
              taste,
              size,
            })
          );
        },
      },
      {
        path: "san-pham/:slug",
        element: <ProductDetail />,
        loader: async ({ params }) => {
          const { slug } = params;

          if (!slug) {
            throw data({ message: "Slug is required" }, { status: 400 });
          }

          try {
            const [product, suggestionRes, blogRes] = await Promise.all([
              productService.getBySlug(slug),
              productService.getByParentCategory("banh-va-trang-mieng"),
              blogService.getAll({ limit: 5 }),
            ]);

            return {
              product,
              suggestions: suggestionRes.products,
              blogs: blogRes.blogs,
            };
          } catch (error) {
            throw data(handlingAxiosError(error), {
              status: (error as AxiosError).response?.status,
            });
          }
        },
        errorElement: <NotFound />,
      },
      {
        path: "mon-an-yeu-thich",
        element: <ProductFavorite />,
      },
      {
        path: "gio-hang",
        element: <Cart />,
      },
      {
        path: "huong-dan-mua-hang",
        element: <BuyingGuide />,
      },
      {
        path: "huong-dan-thanh-toan",
        element: <PaymentInstruction />,
      },
      {
        path: "chinh-sach-thanh-vien",
        element: <MembershipPolicy />,
      },
      {
        path: "chinh-sach-thanh-toan",
        element: <PaymentPolicy />,
      },
      {
        path: "bao-mat-thong-tin-ca-nhan",
        element: <Security />,
      },
      {
        path: "qua-tang-tri-an",
        element: <GratitudeGifts />,
      },
      {
        path: "tim-kiem",
        element: <Search />,
        loader: async ({ request }) => {
          const searchParams = new URL(request.url).searchParams;
          const query = searchParams.get("query");

          if (!query) {
            throw data({ message: "Query is required" }, { status: 400 });
          }

          const productRes = await productService.getAll({
            search: query,
          });

          return productRes.products;
        },
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/thanh-toan",
    element: <CheckoutLayout />,

    children: [
      {
        index: true,
        element: <Checkout />,
      },
      {
        path: "vnpay-return",
        element: <Checkout />,
      },
      {
        path: "thanh-cong/:id",
        element: <CheckoutSuccess />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "nguoi-dung",
        element: <UserAdmin />,
      },
      {
        path: "san-pham",
        element: <ProductAdmin />,
      },
      {
        path: "danh-muc-san-pham",
        element: <CategoryAdmin />,
      },
      {
        path: "don-hang",
        element: <OrderAdmin />,
      },
      {
        path: "ma-giam-gia",
        element: <VoucherAdmin />,
      },
      {
        path: "blog",
        element: <BlogAdmin />,
      },
      {
        path: "lien-he",
        element: <ContactAdmin />,
      },
    ],
  },
]);

export default router;
