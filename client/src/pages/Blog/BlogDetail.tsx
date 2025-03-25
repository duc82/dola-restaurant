import Breadcrumb from "@/components/Breadcrumb";
import { Helmet } from "react-helmet-async";

const title = "Chi tiết bài viết";

const BlogDetail = () => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Breadcrumb>
        <Breadcrumb.Item href="/">Trang chủ</Breadcrumb.Item>
        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default BlogDetail;
