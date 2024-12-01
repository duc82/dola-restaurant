import { Account, MenuBar } from "@/icons";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.webp";
import AccountDropdown from "../Header/AccountDropdown";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="fixed top-0 left-0 w-full bg-emerald-secondary py-2 px-4 lg:px-6 border-b border-b-gray-600 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            type="button"
            onClick={toggleSidebar}
            className="hover:bg-emerald-primary transition p-2 rounded mr-3 text-white lg:hidden"
          >
            <MenuBar className="w-6 h-6" />
          </button>
          <Link to="/admin" title="Logo" className="md:mr-24">
            <img
              src={logo}
              width={172}
              height={50}
              alt="Dola Restaurant"
              className="min-w-[111px] min-h-[50px] max-h-[50px] md:max-h-[65px] w-auto"
            />
          </Link>
        </div>
        <div className="relative group hover:text-yellow-primary lg:py-6">
          <Account className="cursor-pointer" />
          <AccountDropdown isAdminPage={true} />
        </div>
      </div>
    </header>
  );
};

export default Header;
