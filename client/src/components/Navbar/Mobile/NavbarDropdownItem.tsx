import { useState } from "react";
import { Link } from "react-router-dom";
import NavbarDropdown from "./NavbarDropdown";
import { Minus, Plus } from "@/icons";
import cn from "@/utils/cn";
import { FullCategory } from "@/types/category";

interface NavbarDropdownItemProps {
  category: FullCategory;
  depthLevel: number;
  className?: string;
  linkClassName?: string;
  onClose?: () => void;
}

const NavbarDropdownItem = ({
  category,
  depthLevel,
  className,
  linkClassName,
  onClose,
}: NavbarDropdownItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const levelPadding = depthLevel > 0 ? "pl-2.5" : "";

  const toggleOpen = () => setIsOpen(!isOpen);

  const childrens = category.childrens;

  return (
    <li className={className}>
      <div className="flex items-center justify-between w-full hover:text-yellow-primary">
        <Link
          to={`/danh-muc-san-pham/${category.slug}`}
          onClick={onClose}
          title={category.name}
          className={cn(
            "flex items-center w-full leading-9",
            linkClassName,
            levelPadding
          )}
        >
          {category.name}
        </Link>
        {childrens.length > 0 && (
          <button
            title={isOpen ? "Đóng" : "Mở"}
            onClick={toggleOpen}
            className="p-2.5"
          >
            {isOpen ? (
              <Minus className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {childrens.length > 0 && (
        <NavbarDropdown
          active={isOpen}
          dropdowns={childrens}
          depthLevel={depthLevel}
        />
      )}
    </li>
  );
};

export default NavbarDropdownItem;
