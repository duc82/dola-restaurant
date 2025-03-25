import { useState } from "react";
import Container from "../Container";
import { Link, useLocation } from "react-router-dom";
import { Account, Cart, Geo, MenuBar, Search } from "@/icons";
import useWindowResize from "@/hooks/useWindowResize";
import HeaderSearchMobile from "./HeaderSearchMobile";
import HeaderSearchDesktop from "./HeaderSearchDesktop";
import AccountDropdown from "./AccountDropdown";
import HeaderCart from "./HeaderCart";
import { useAppSelector } from "@/store/hooks";
import cn from "@/utils/cn";
import Menu from "../Navbar/Desktop/Menu";
import NavbarMobile from "../Navbar/Mobile/NavbarMobile";
import logo from "@/assets/images/logo.webp";

const Header = () => {
  const [isActiveNavbar, setIsActiveNavbar] = useState(false);
  const [isOpenSearchMobile, setIsOpenSearchMobile] = useState(false);
  const windowWidth = useWindowResize();
  const isDesktop = windowWidth >= 992;
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const { count: cartCount } = useAppSelector((state) => state.cart);

  const openNavbar = () => {
    setIsActiveNavbar(true);
    document.body.style.overflow = "hidden";
  };

  const closeNavbar = () => {
    setIsActiveNavbar(false);
    document.body.style.overflow = "";
  };

  return (
    <header
      className={cn(
        "w-full bg-emerald-primary lg:bg-emerald-blur",
        isHomePage && "lg:absolute lg:top-0 lg:z-50"
      )}
    >
      <Container className="px-0 lg:px-4">
        <div className="flex flex-wrap items-center justify-between relative">
          {/* Logo */}
          <div className="mx-auto py-2.5 lg:m-0 lg:p-0">
            <Link to="/" title="Logo">
              <img
                src={logo}
                width={172}
                height={50}
                alt="Dola Restaurant"
                className="max-h-[65px] w-auto mx-auto lg:m-0"
              />
            </Link>
          </div>
          {/* Menu */}
          {isDesktop && <Menu />}

          {/* Navbar Mobile */}
          {!isDesktop && (
            <NavbarMobile active={isActiveNavbar} onClose={closeNavbar} />
          )}

          {/* Control */}
          <div className="w-full flex items-center justify-between lg:w-auto lg:inline-flex lg:justify-end bg-emerald-secondary lg:bg-inherit px-2.5 md:px-4 lg:px-0">
            <button onClick={openNavbar} type="button" className="lg:hidden">
              <MenuBar className="w-6 h-6 text-white" />
            </button>
            <div className="inline-flex items-center space-x-4 h-11 lg:h-auto">
              <div
                onClick={() => setIsOpenSearchMobile(!isOpenSearchMobile)}
                className="relative hover:text-yellow-primary lg:py-6 group"
              >
                <Search className="w-5 h-5 cursor-pointer" />
                <HeaderSearchDesktop />
              </div>
              <div className="lg:py-6 group">
                <Link to="/gio-hang" className="relative block">
                  <Cart />
                  <span className="absolute w-5 h-5 text-center -top-2.5 -right-2.5 bg-yellow-primary text-xs leading-5 rounded-full">
                    {cartCount}
                  </span>
                </Link>
                <HeaderCart />
              </div>

              <div className="relative hover:text-yellow-primary hidden lg:block group lg:py-6">
                <Account className="cursor-pointer" />
                <AccountDropdown />
              </div>

              <Link
                to="/he-thong-nha-hang"
                className="hover:text-yellow-primary lg:py-6"
              >
                <Geo className="w-5 h-5" />
              </Link>

              {/* <Link
                to="/dat-ban"
                title="Đặt bàn"
                className="py-2 px-5 text-lg lg:text-sm leading-relaxed lg:leading-relaxed rounded-lg bg-yellow-primary hover:bg-yellow-secondary flex justify-center items-center lg:py-1 lg:px-2.5 2xl:px-5 2xl:text-lg"
              >
                Đặt bàn
              </Link> */}
            </div>
          </div>
          {/* Search Mobile */}
          <HeaderSearchMobile active={isOpenSearchMobile} />
        </div>
      </Container>
    </header>
  );
};

export default Header;
