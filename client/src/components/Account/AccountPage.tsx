import { Link, useLocation } from "react-router-dom";
import cn from "@/utils/cn";
import { useAppSelector } from "@/store/hooks";

const AccountPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const { addresses } = useAppSelector((state) => state.address);
  const { pathname } = useLocation();

  const accounts = [
    {
      name: "Thông tin tài khoản",
      url: "/tai-khoan",
    },
    {
      name: "Đơn hàng của bạn",
      url: "/tai-khoan/don-hang",
    },

    {
      name: "Đổi mật khẩu",
      url: "/tai-khoan/doi-mat-khau",
    },
    {
      name: "Sổ địa chỉ",
      url: "/tai-khoan/dia-chi",
    },
  ];

  return (
    <div className="flex-[0_0_25%]">
      <h1 className="uppercase text-lg mb-1">Trang tài khoản</h1>
      <p className="font-bold mb-7">
        Xin chào, <span className="text-red-500">{user?.fullName}</span> !
      </p>
      <ul className="flex flex-col space-y-4">
        {accounts.map((account) => (
          <li key={account.url}>
            <Link
              to={account.url}
              className={cn(
                "hover:text-yellow-primary",
                pathname === account.url && "text-yellow-primary"
              )}
            >
              {account.name}{" "}
              {account.url === "/tai-khoan/dia-chi" && `(${addresses.length})`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccountPage;
