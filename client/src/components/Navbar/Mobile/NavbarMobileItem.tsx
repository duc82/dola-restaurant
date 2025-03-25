import { Minus, Plus } from "@/icons";
import { Link } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";

interface NavbarItemsProps {
  children: React.ReactNode;
  url: string;
  title?: string;
  hasChild?: boolean;
}

const NavbarMobileItem = ({
  children,
  url,
  title,
  hasChild,
}: NavbarItemsProps) => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const { categories } = useAppSelector((state) => state.category);
  const toggleDropdown = () => setIsOpenDropdown(!isOpenDropdown);

  if (hasChild) {
    return (
      <li>
        <div className="flex items-center justify-between w-full hover:text-yellow-primary">
          <Link
            to={url}
            className="flex items-center w-full leading-9 pl-2.5"
            title={title}
          >
            {children}
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
          dropdowns={categories}
          active={isOpenDropdown}
          depthLevel={1}
        />
      </li>
    );
  }

  return (
    <li className="flex items-center justify-between w-full hover:text-yellow-primary">
      <Link
        to={url}
        className="flex items-center w-full leading-9 pl-2.5"
        title={title}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavbarMobileItem;
