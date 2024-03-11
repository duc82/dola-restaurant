import { useAppSelector } from "@/store/hooks";
import NavbarMobileItem from "../Navbar/Mobile/NavbarMobileItem";

interface CategoryProps {
  title: string;
}

const Category = ({ title }: CategoryProps) => {
  const { categories } = useAppSelector((state) => state.category);

  return (
    <div className="block w-full mb-4">
      <h1 className="text-[15px] text-white py-2.5 px-4 rounded-t-lg uppercase font-bold bg-yellow-primary">
        {title}
      </h1>
      <nav className="border border-yellow-primary py-2.5 px-4 rounded-b-lg w-full">
        <ul>
          {categories.map((category) => (
            <NavbarMobileItem
              category={category}
              key={category._id}
              depthLevel={0}
              linkClassName="text-base py-2"
            />
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Category;
