import { FullCategory } from "@/types/category";
import NavbarDropdownItem from "./NavbarDropdownItem";
import cn from "@/utils/cn";

interface NavbarDropdownProps {
  active?: boolean;
  dropdowns: FullCategory[];
  depthLevel: number;
}

const NavbarDropdown = ({
  active,
  dropdowns,
  depthLevel,
}: NavbarDropdownProps) => {
  return (
    <ul className={cn("pl-2.5 hidden", active && "block")}>
      {dropdowns.map((dropdown) => (
        <NavbarDropdownItem
          key={dropdown._id}
          category={dropdown}
          depthLevel={depthLevel}
        />
      ))}
    </ul>
  );
};

export default NavbarDropdown;
