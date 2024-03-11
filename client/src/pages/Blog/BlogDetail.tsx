import Breadcrumb from "@/components/Breadcrumb";
import { Helmet } from "react-helmet-async";

const BlogDetail = () => {
  return (
    <div>
      <Helmet></Helmet>

      <Breadcrumb
        breadcrumbs={[
          {
            name: "Tin tuc",
          },
        ]}
      />
    </div>
  );
};

export default BlogDetail;
