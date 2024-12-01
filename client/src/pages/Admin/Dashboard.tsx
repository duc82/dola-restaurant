import CartItem from "@/components/Admin/Dashboard/CartItem";
import { Bag, Cart, Eyes, Users } from "@/icons";
import statisticService from "@/services/statisticService";
import { Statistic } from "@/types/statistic";
import formatVnd from "@/utils/formatVnd";
import { lazy, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const ChartProducts = lazy(
  () => import("@/components/Admin/Dashboard/ChartProducts")
);

const ChartSales = lazy(
  () => import("@/components/Admin/Dashboard/ChartSales")
);

const Dashboard = () => {
  const [statistics, setStatistics] = useState<Statistic | null>(null);

  useEffect(() => {
    statisticService
      .getStatistics()
      .then((data) => setStatistics(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main className="py-6 px-4 lg:px-6 w-full">
      <Helmet>
        <title>Bảng điều khiển</title>
      </Helmet>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7">
        <CartItem
          title="Doanh thu"
          icon={<Eyes />}
          total={formatVnd(statistics?.totalProfit)}
        />
        <CartItem
          title="Tổng cộng đơn hàng"
          icon={<Cart />}
          total={statistics?.totalOrder || 0}
        />
        <CartItem
          title="Tổng cộng sản phẩm"
          icon={<Bag />}
          total={statistics?.totalProduct || 0}
        />
        <CartItem
          title="Tổng cộng người dùng"
          icon={<Users />}
          total={statistics?.totalUser || 0}
        />
      </div>
    </main>
  );
};

export default Dashboard;
