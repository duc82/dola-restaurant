import {
  Dashboard,
  Menu,
  ShoppingBag,
  CartFill,
  Users,
  Voucher,
  Notification,
  News,
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
    icon: CartFill,
  },
  {
    label: "Mã giảm giá",
    link: "/admin/ma-giam-gia",
    icon: Voucher,
  },
  {
    label: "Tin tức",
    link: "/admin/blog",
    icon: News,
  },
  {
    label: "Liên hệ",
    link: "/admin/lien-he",
    icon: Notification,
  },
];

export default admins;
