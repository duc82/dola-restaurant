import CartItem from "@/components/Admin/Dashboard/CartItem";
import { Bag, Cart, Eyes, Users } from "@/icons";
import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <main className="py-6 px-4 lg:px-6 w-full">
      <Helmet>
        <title>Admin - Bảng điều khiển</title>
      </Helmet>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <CartItem
          title="Doanh thu"
          icon={<Eyes />}
          percentage={{
            value: 2.59,
            increase: true,
          }}
          total="2.450"
        />
        <CartItem
          title="Tổng cộng đơn hàng"
          icon={<Cart />}
          percentage={{
            value: 2.59,
            increase: true,
          }}
          total="2.450"
        />
        <CartItem
          title="Tổng cộng sản phẩm"
          icon={<Bag />}
          percentage={{
            value: 2.59,
            increase: true,
          }}
          total="2.450"
        />
        <CartItem
          title="Tổng cộng người dùng"
          icon={<Users />}
          percentage={{
            value: 2.59,
            increase: false,
          }}
          total="2.450"
        />
      </div>
    </main>
  );
};

export default Dashboard;
