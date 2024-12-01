import Container from "../Container";
import BreadcrumbItem from "./BreadcrumbItem";

const Breadcrumb = ({ children }: React.PropsWithChildren) => {
  return (
    <section className="bg-black-primary mb-[30px] lg:mb-10">
      <Container>
        <ol className="flex items-center py-4">{children}</ol>
      </Container>
    </section>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
