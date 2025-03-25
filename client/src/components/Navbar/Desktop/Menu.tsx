import { Link, useLocation } from "react-router-dom";
import { CaretDown } from "@/icons";
import MenuDropdown from "./MenuDropdown";
import { useState } from "react";
import cn from "@/utils/cn";
import { useAppSelector } from "@/store/hooks";

const Menu = () => {
  const { pathname } = useLocation();
  const [isActiveHoverMenu, setIsActiveHoverMenu] = useState(false);
  const { categories } = useAppSelector((state) => state.category);

  const activeHoverMenu = () => {
    setIsActiveHoverMenu(true);
  };

  const closeMenuDropdown = () => {
    setIsActiveHoverMenu(false);
  };

  const mouseEvents = {
    onMouseEnter: activeHoverMenu,
    onMouseLeave: closeMenuDropdown,
    onMouseDown: closeMenuDropdown,
  };

  const activeClasses = (url: string) =>
    pathname.includes(url) ? "text-yellow-primary" : "";

  return (
    <ul className="flex items-center">
      <li
        className={cn(
          "py-[30px] mx-2.5 xl:mx-5 hover:text-yellow-primary",
          pathname === "/" && "text-yellow-primary"
        )}
      >
        <Link
          to="/"
          className="px-1.5 font-bold text-sm xl:text-base leading-relaxed flex items-center space-x-1.5"
        >
          <span>Trang chủ</span>
        </Link>
      </li>
      <li
        className={cn(
          "py-[30px] mx-2.5 xl:mx-5 hover:text-yellow-primary",
          activeClasses("/gioi-thieu")
        )}
      >
        <Link
          to="/gioi-thieu"
          className="px-1.5 font-bold text-sm xl:text-base leading-relaxed flex items-center space-x-1.5"
        >
          <span>Giới thiệu</span>
        </Link>
      </li>

      <li
        className={cn(
          "py-[30px] mx-2.5 xl:mx-5 hover:text-yellow-primary",
          activeClasses("/danh-muc-san-pham")
        )}
        {...mouseEvents}
      >
        <Link
          to={"/danh-muc-san-pham/tat-ca-san-pham"}
          className="px-1.5 font-bold text-sm xl:text-base leading-relaxed flex items-center space-x-1.5"
        >
          <span>Menu</span>
          <CaretDown
            className={cn(
              "w-2.5 h-2.5 transition-all ease-ease duration-500",
              isActiveHoverMenu && "rotate-180"
            )}
          />
        </Link>
        <MenuDropdown
          categories={categories}
          active={isActiveHoverMenu}
          onClose={closeMenuDropdown}
        />
      </li>

      <li
        className={cn(
          "py-[30px] mx-2.5 xl:mx-5 hover:text-yellow-primary",
          activeClasses("/tin-tuc")
        )}
      >
        <Link
          to="/tin-tuc"
          className="px-1.5 font-bold text-sm xl:text-base leading-relaxed flex items-center space-x-1.5"
        >
          <span>Tin tức</span>
        </Link>
      </li>
      <li
        className={cn(
          "py-[30px] mx-2.5 xl:mx-5 hover:text-yellow-primary",
          activeClasses("/lien-he")
        )}
      >
        <Link
          to="/lien-he"
          className="px-1.5 font-bold text-sm xl:text-base leading-relaxed flex items-center space-x-1.5"
        >
          <span>Liên hệ</span>
        </Link>
      </li>
    </ul>
  );
};

export default Menu;
