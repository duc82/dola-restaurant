import {
  Dashboard,
  Menu,
  Settings,
  ShoppingBag,
  Users,
  Voucher,
} from "../icons";

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
    icon: ShoppingBag,
  },
  {
    label: "Danh mục sản phẩm",
    link: "/admin/danh-muc-san-pham",
    icon: Menu,
  },
  {
    label: "Đơn hàng",
    link: "/admin/don-hang",
    icon: ShoppingBag,
  },
  {
    label: "Mã giảm giá",
    link: "/admin/ma-giam-gia",
    icon: Voucher,
  },
];

export default admins;
