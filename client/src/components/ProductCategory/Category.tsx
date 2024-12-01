import menus from "@/data/menus.json";
import NavbarMobileItem from "../Navbar/Mobile/NavbarMobileItem";

const Category = ({ title }: { title: string }) => {
  return (
    <div className="block w-full mb-4">
      <h1 className="text-[15px] text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        {title}
      </h1>
      <nav className="border border-yellow-primary py-2.5 px-4 rounded-b-lg w-full">
        <ul>
          {menus.map((menu) => (
            <NavbarMobileItem
              key={menu.id}
              url={menu.url}
              title={menu.name}
              hasChild={menu.hasChild}
            >
              {menu.name}
            </NavbarMobileItem>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Category;
