import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import cn from "@/utils/cn";
import { FullCategory } from "@/types/category";

interface MenuDropdownProps {
  active: boolean;
  onClose: () => void;
  categories: FullCategory[];
}

const MenuDropdown = ({ categories, active, onClose }: MenuDropdownProps) => {
  const [image, setImage] = useState("/mi.webp");

  const handleChangeImage = (image?: string) => {
    if (!image) return;
    setImage(image);
  };

  const activeHoverMenuClasses = active
    ? "translate-y-0 visible opacity-100"
    : "translate-y-5 invisible opacity-0";

  return (
    <div
      className={cn(
        "absolute top-full flex w-full left-0 bg-[rgb(16,20,24)] text-white shadow-dropdown2 z-50 rounded-lg border border-yellow-primary p-2.5 transition-all duration-300 ease-in",
        activeHoverMenuClasses
      )}
    >
      <div className="flex-[0_0_75%] w-full px-4 ">
        <ul className="grid grid-cols-3 xl:grid-cols-4 w-full">
          {categories.map((category) => {
            const childrens = category.childrens;

            return (
              <li
                key={category._id}
                className="p-2.5"
                onMouseEnter={() => handleChangeImage(category.image)}
                onMouseLeave={() => handleChangeImage("/mi.webp")}
                onClick={onClose}
              >
                <Link
                  to={`/danh-muc-san-pham/${category.slug}`}
                  className="uppercase block text-yellow-primary text-base font-semibold mb-2.5"
                >
                  {category.name}
                </Link>
                <ul className="mb-4">
                  {childrens.map((childCate) => (
                    <li key={childCate._id}>
                      <Link
                        to={`/danh-muc-san-pham/${childCate.slug}`}
                        onClick={onClose}
                        className="inline-block text-lg mb-1 hover:text-yellow-primary"
                      >
                        {childCate.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex-[0_0_25%] w-full flex items-center max-w-[25%]">
        <LazyLoadImage
          src={image}
          alt="Món chính"
          effect="opacity"
          width={328}
          height={328}
          className="h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MenuDropdown;
