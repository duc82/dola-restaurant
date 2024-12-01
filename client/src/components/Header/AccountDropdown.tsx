import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { resetAuth } from "../../store/reducers/authSlice";
import authService from "@/services/authService";

interface AccountDropdownProps {
  isAdminPage?: boolean;
}

const AccountDropdown = ({ isAdminPage = false }: AccountDropdownProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(resetAuth());
      window.location.replace("/dang-nhap");
    });
  };

  return (
    <ul className="transition-[visibility,opacity,transform] bg-white duration-300 rounded-lg p-2.5 absolute top-full right-0 min-w-[196px] z-10 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 text-white will-change-transform shadow-dropdown">
      {!accessToken && (
        <>
          <li className="mb-2.5">
            <Link
              to="/dang-nhap"
              title="Đăng nhập"
              className="flex items-center justify-center bg-yellow-primary w-[236px] leading-[41px] rounded-md hover:bg-yellow-secondary"
            >
              Đăng nhập
            </Link>
          </li>
          <li className="mb-2.5">
            <Link
              to="/dang-ky"
              title="Đăng ký"
              className="flex items-center justify-center bg-yellow-primary w-[236px] leading-[41px] rounded-md hover:bg-yellow-secondary"
            >
              Đăng ký
            </Link>
          </li>
        </>
      )}

      {accessToken && (
        <>
          {isAdminPage && (
            <li className="mb-2.5 text-black">Xin chào, {user?.fullName} !</li>
          )}
          <li className="mb-2.5">
            <Link
              to="/tai-khoan"
              title="Tài khoản"
              className="flex items-center justify-center bg-yellow-primary w-[236px] leading-[41px] rounded-md hover:bg-yellow-secondary"
            >
              Tài khoản
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="flex items-center justify-center bg-yellow-primary w-[236px] leading-[41px] rounded-md hover:bg-yellow-secondary"
            >
              Đăng xuất
            </button>
          </li>
        </>
      )}
      {!isAdminPage && (
        <li className="mt-2.5">
          <Link
            to="/mon-an-yeu-thich"
            title="Món ăn yêu thích"
            className="flex items-center justify-center bg-yellow-primary w-[236px] leading-[41px] rounded-md hover:bg-yellow-secondary"
          >
            Món ăn yêu thích
          </Link>
        </li>
      )}
    </ul>
  );
};

export default AccountDropdown;
