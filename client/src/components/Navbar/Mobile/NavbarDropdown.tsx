import { FullCategory } from "@/types/category";
import { motion } from "framer-motion";
import NavbarDropdownItem from "./NavbarDropdownItem";

interface NavbarDropdownProps {
  active?: boolean;
  dropdowns: FullCategory[];
  depthLevel: number;
}

const variants = {
  open: {
    height: "auto",
    display: "block",
    overflow: "hidden",
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  closed: {
    height: 0,
    overflow: "hidden",
    opacity: 0,
    transition: {
      duration: 0.3,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const NavbarDropdown = ({
  active,
  dropdowns,
  depthLevel,
}: NavbarDropdownProps) => {
  return (
    <motion.ul
      initial="closed"
      variants={variants}
      animate={active ? "open" : "closed"}
      className="pl-2.5"
    >
      {dropdowns.map((dropdown) => (
        <NavbarDropdownItem
          key={dropdown._id}
          category={dropdown}
          depthLevel={depthLevel}
        />
      ))}
    </motion.ul>
  );
};

export default NavbarDropdown;
