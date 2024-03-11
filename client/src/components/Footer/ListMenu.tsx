import { Link } from "react-router-dom";

interface FooterMenu {
  name: string;
  url: string;
}

interface ListMenuProps {
  menus: FooterMenu[];
}

const ListMenu = ({ menus }: ListMenuProps) => {
  return (
    <ul>
      {menus.map((menu) => (
        <li key={menu.name} className="mb-4">
          <Link to={menu.url} className="hover:text-yellow-primary">
            {menu.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ListMenu;
