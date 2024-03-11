import { Fragment } from "react";
import Container from "./Container";
import { Link } from "react-router-dom";
import { Right } from "../icons";
import { BreadcrumbItem } from "../types";

interface BreadcrumbProps {
  breadcrumbs: BreadcrumbItem[];
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbProps) => {
  return (
    <section className="bg-black-primary mb-[30px] lg:mb-10">
      <Container>
        <ul className="flex items-center py-4">
          <li className="flex items-center">
            <Link to="/" className="hover:text-yellow-primary">
              Trang chủ
            </Link>
          </li>
          {breadcrumbs.map((breadcrumb, i) => (
            <Fragment key={i}>
              {breadcrumbs.length - 1 !== i ? (
                <li className="flex items-center">
                  <Right className="w-2.5 h-2.5 mx-2.5" />
                  <Link
                    className="hover:text-yellow-primary"
                    to={breadcrumb.url ?? "/"}
                  >
                    {breadcrumb.name}
                  </Link>
                </li>
              ) : (
                <li className="flex items-center">
                  <Right className="w-2.5 h-2.5 mx-2.5" />
                  <p className="text-yellow-primary">{breadcrumb.name}</p>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Breadcrumb;
