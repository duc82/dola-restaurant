import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cn from "@/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import authService from "@/services/authService";
import { resetAuth } from "@/store/reducers/authSlice";
import menus from "@/data/menus.json";
import NavbarMobileItem from "./NavbarMobileItem";
import Overlay from "@/components/Overlay";

interface NavbarProps {
  active: boolean;
  onClose: () => void;
}

const Navbar = ({ active, onClose }: NavbarProps) => {
  const { accessToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(resetAuth());
      window.location.replace("/dang-nhap");
    });
  };

  const activeClasses = active
    ? "translate-x-0 visible"
    : "-translate-x-full invisible";

  return (
    <>
      <Overlay show={active} onClick={onClose} />
      <nav
        className={cn(
          "fixed top-0 left-0 h-full z-[99999] w-64 transition-[transform,visibility] duration-500 bg-emerald-primary",
          activeClasses
        )}
      >
        <ul className="overflow-y-auto max-h-screen">
          <li>
            <Link
              to="/"
              className="py-5 flex justify-center border-b border-b-white"
              title="Logo"
            >
              <LazyLoadImage
                src="/logo.webp"
                alt="Dola Restaurant"
                width={172}
                effect="opacity"
              />
            </Link>
          </li>

          {menus.map((menu) => (
            <NavbarMobileItem
              key={menu.url}
              url={menu.url}
              hasChild={menu.hasChild}
              title={menu.name}
            >
              {menu.name}
            </NavbarMobileItem>
          ))}

          {!accessToken && (
            <>
              <li>
                <Link
                  to="/dang-nhap"
                  title="Đăng nhập"
                  onClick={onClose}
                  className="pl-2.5 pr-7 block text-sm leading-9 text-yellow-primary font-bold"
                >
                  Đăng nhập
                </Link>
              </li>
              <li>
                <Link
                  to="/dang-ky"
                  title="Đăng ký"
                  onClick={onClose}
                  className="pl-2.5 pr-7 block text-sm leading-9 text-yellow-primary font-bold"
                >
                  Đăng ký
                </Link>
              </li>
            </>
          )}

          {accessToken && (
            <>
              <li>
                <Link
                  to="/tai-khoan"
                  title="Tài khoản"
                  onClick={onClose}
                  className="pl-2.5 pr-7 block text-sm leading-9 text-yellow-primary font-bold"
                >
                  Tài khoản
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  title="Đăng xuất"
                  className="pl-2.5 pr-7 block text-sm leading-9 text-yellow-primary font-bold"
                >
                  Đăng xuất
                </button>
              </li>
            </>
          )}

          <li>
            <Link
              to="/mon-an-yeu-thich"
              title="Món ăn yêu thích"
              onClick={onClose}
              className="pl-2.5 pr-7 block text-sm leading-9 text-yellow-primary font-bold"
            >
              Món ăn yêu thích
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
