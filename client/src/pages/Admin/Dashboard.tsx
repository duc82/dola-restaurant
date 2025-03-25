import CartItem from "@/components/Admin/Dashboard/CartItem";
import { Bag, Cart, Eyes, Spinner, Users } from "@/icons";
import statisticService from "@/services/statisticService";
import { Statistic } from "@/types/statistic";
import { lazy, useEffect, useState } from "react";
import { Helmet } from "@dr.pogodin/react-helmet";

const ChartProducts = lazy(
  () => import("@/components/Admin/Dashboard/ChartProducts")
);

const ChartSales = lazy(
  () => import("@/components/Admin/Dashboard/ChartSales")
);

const ChartUsers = lazy(
  () => import("@/components/Admin/Dashboard/ChartUsers")
);

const Dashboard = () => {
  const [statistics, setStatistics] = useState<Statistic | null>(null);

  useEffect(() => {
    statisticService
      .getStatistics()
      .then((data) => setStatistics(data))
      .catch((error) => console.log(error));
  }, []);

  if (!statistics) {
    return (
      <div className="w-full py-6 px-4 lg:px-6">
        <Spinner className="w-10 h-10 animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <main className="py-6 px-4 lg:px-6 w-full">
      <Helmet>
        <title>Bảng điều khiển</title>
      </Helmet>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <CartItem
          title="Doanh thu"
          icon={<Eyes />}
          total={statistics.totalProfit}
          suffix="₫"
        />
        <CartItem
          title="Tổng cộng đơn hàng"
          icon={<Cart />}
          total={statistics.totalOrder}
        />
        <CartItem
          title="Tổng cộng sản phẩm"
          icon={<Bag />}
          total={statistics.totalProduct}
        />
        <CartItem
          title="Tổng cộng người dùng"
          icon={<Users />}
          total={statistics.totalUser}
        />
      </div>

      <div className="pt-4">
        <ChartSales
          datas={statistics.profitDatas}
          lastMonthProfit={statistics.lastMonthProfit}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <ChartProducts
            total={statistics.totalProduct}
            datas={statistics.products}
          />
          <ChartUsers total={statistics.totalUser} datas={statistics.users} />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
