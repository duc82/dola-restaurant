import admins from "@/data/admins";
import cn from "@/utils/cn";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { pathname } = useLocation();

  return (
    <aside
      className={cn(
        "block h-full fixed top-0 left-0 bg-emerald-secondary border-r border-r-gray-600 pt-[66px] md:pt-20 lg:pt-[88px] flex-none group w-72 overflow-y-auto transition duration-500 -translate-x-full lg:translate-x-0 z-40",
        isOpen && "translate-x-0"
      )}
    >
      <ul className="px-4 pt-4 lg:px-6 lg:pt-6">
        {admins.map((admin, i) => (
          <li key={i} className="mb-2 last:mb-0">
            <Link
              to={admin.link}
              className={cn(
                "flex items-center font-medium text-base hover:bg-emerald-primary transition rounded-md p-2",
                pathname === admin.link ? "bg-emerald-primary" : "text-gray-400"
              )}
            >
              <admin.icon className="w-6 h-6" />
              <span className="ml-3">{admin.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
