import Container from "../components/Container";
import AccountPage from "../components/Account/AccountPage";
import { Outlet, useLocation } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb/index";
import { Helmet } from "@dr.pogodin/react-helmet";
import { useEffect } from "react";
import addressService from "@/services/addressService";
import { useAppDispatch } from "@/store/hooks";
import { setAddress } from "@/store/reducers/addressSlice";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

const data: Record<string, { title: string; breadcrumbs: BreadcrumbItem[] }> = {
  "/tai-khoan": {
    title: "Trang khách hàng",
    breadcrumbs: [
      {
        name: "Trang khách hàng",
      },
    ],
  },
  "/tai-khoan/don-hang": {
    title: "Trang đơn hàng",
    breadcrumbs: [
      {
        name: "Tài khoản",
        url: "/tai-khoan",
      },
      {
        name: "Đơn hàng",
      },
    ],
  },
  "/tai-khoan/doi-mat-khau": {
    title: "Thay đổi mật khẩu",
    breadcrumbs: [
      {
        name: "Thay đổi mật khẩu",
      },
    ],
  },
  "/tai-khoan/dia-chi": {
    title: "Sổ địa chỉ",
    breadcrumbs: [
      {
        name: "Tài khoản",
        url: "/tai-khoan",
      },
      {
        name: "Địa chỉ khách hàng",
      },
    ],
  },
};

const AccountLayout = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    addressService
      .getCurrent()
      .then((data) => {
        dispatch(setAddress(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  if (!data[pathname]) return <Outlet />;

  return (
    <>
      <Helmet>
        <title>{data[pathname].title}</title>
      </Helmet>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        {data[pathname].breadcrumbs.map((item, index, items) => (
          <Breadcrumb.Item
            key={index}
            href={item.url}
            active={items.length - 1 === index}
          >
            {item.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
      <Container className="mb-[30px] py-5 lg:flex">
        <AccountPage />
        <div className="flex-[0_0_75%]">
          <Outlet />
        </div>
      </Container>
    </>
  );
};

export default AccountLayout;
