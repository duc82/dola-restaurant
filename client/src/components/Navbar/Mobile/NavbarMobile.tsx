import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cn from "@/utils/cn";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import authService from "@/services/authService";
import { resetAuth } from "@/store/reducers/authSlice";
import Overlay from "@/components/Overlay";
import { useState } from "react";
import { Minus, Plus } from "@/icons";
import NavbarDropdown from "./NavbarDropdown";

interface NavbarProps {
  active: boolean;
  onClose: () => void;
}

const Navbar = ({ active, onClose }: NavbarProps) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { categories } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(resetAuth());
      window.location.href = "/dang-nhap";
    });
  };

  const parentCategories = categories.filter(
    (category) => !category.parentCategory
  );

  const activeClasses = active
    ? "translate-x-0 visible"
    : "-translate-x-full invisible";

  return (
    <>
      <Overlay active={active} onClick={onClose} />
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
          <li className="flex items-center justify-between w-full hover:text-yellow-primary">
            <Link
              to="/"
              className="flex items-center w-full leading-9 pl-2.5"
              title="Trang chủ"
            >
              Trang chủ
            </Link>
          </li>
          <li className="flex items-center justify-between w-full hover:text-yellow-primary">
            <Link
              to="/gioi-thieu"
              className="flex items-center w-full leading-9 pl-2.5"
              title="Giới thiệu"
            >
              Giới thiệu
            </Link>
          </li>

          <li>
            <div className="flex items-center justify-between w-full hover:text-yellow-primary">
              <Link
                to="/danh-muc-san-pham/tat-ca-san-pham"
                className="flex items-center w-full leading-9 pl-2.5"
                title="Menu"
              >
                Menu
              </Link>
              <button
                type="button"
                title={isOpenDropdown ? "Đóng" : "Mở"}
                onClick={toggleDropdown}
                className="p-2.5"
              >
                {isOpenDropdown ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </button>
            </div>
            <NavbarDropdown
              dropdowns={parentCategories}
              active={isOpenDropdown}
              depthLevel={1}
            />
          </li>

          <li className="flex items-center justify-between w-full hover:text-yellow-primary">
            <Link
              to="/tin-tuc"
              className="flex items-center w-full leading-9 pl-2.5"
              title="Tin tức"
            >
              Tin tức
            </Link>
          </li>
          <li className="flex items-center justify-between w-full hover:text-yellow-primary">
            <Link
              to="/lien-he"
              className="flex items-center w-full leading-9 pl-2.5"
              title="Liên hệ"
            >
              Liên hệ
            </Link>
          </li>
          {/* {parentCategories.map((category) => (
            <NavbarMobileItem
              key={category._id}
              category={category}
              depthLevel={1}
              onClose={onClose}
            />
          ))} */}

          {!isLoggedIn && (
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

          {isLoggedIn && (
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
