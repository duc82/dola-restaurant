import { Right } from "@/icons";
import { ChildrenProps } from "@/types";
import { Link } from "react-router-dom";

interface BreadcrumbItemProps extends ChildrenProps {
  href?: string;
  active?: boolean;
}

const BreadcrumbItem = ({ href, active, children }: BreadcrumbItemProps) => {
  return (
    <li className="flex items-center">
      {active ? (
        <p className="text-yellow-primary">{children}</p>
      ) : (
        <>
          <Link className="hover:text-yellow-primary" to={href ?? "/"}>
            {children}
          </Link>
          <Right className="w-2.5 h-2.5 mx-2.5" />
        </>
      )}
    </li>
  );
};

export default BreadcrumbItem;
