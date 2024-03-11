import { Dashboard, Products, Settings, Users, Voucher } from "../icons";

const admins = [
  {
    label: "Bảng điều khiển",
    link: "/admin",
    icon: Dashboard,
  },
  {
    label: "Người dùng",
    link: "/admin/nguoi-dung",
    icon: Users,
  },
  {
    label: "Sản phẩm",
    link: "/admin/san-pham",
    icon: Products,
  },
  {
    label: "Danh mục sản phẩm",
    link: "/admin/danh-muc-san-pham",
    icon: Products,
  },
  {
    label: "Mã giảm giá",
    link: "/admin/ma-giam-gia",
    icon: Voucher,
  },
  {
    label: "Cài đặt",
    link: "/admin/cai-dat",
    icon: Settings,
  },
];

export default admins;
