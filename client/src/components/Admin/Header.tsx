import { Account, MenuBar, Search } from "../../icons";
import { Link } from "react-router-dom";
import AccountDropdown from "../Header/AccountDropdown";

const Header = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <header className="fixed top-0 left-0 z-10 w-full bg-emerald-secondary py-2 px-4 border-b border-b-gray-600">
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
              src={"/logo.webp"}
              width={172}
              height={50}
              alt="Dola Restaurant"
              className="min-w-[111px] min-h-[50px] max-h-[50px] md:max-h-[65px] w-auto"
            />
          </Link>
          {/* <form className="hidden relative lg:w-96 lg:block ml-4">
            <input
              type="text"
              id="searchUser"
              name="search"
              autoComplete="off"
              placeholder="Tìm kiếm"
              className="bg-emerald-primary rounded-md pl-10 pr-4 py-2.5 w-full text-sm border border-gray-600 placeholder:text-gray-400"
            />
            <Search className="absolute top-1/2 left-4 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </form> */}
        </div>
        <div className="relative hover:text-yellow-primary lg:py-6">
          <Account className="cursor-pointer" />
          <AccountDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
