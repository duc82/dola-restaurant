import CartItem from "@/components/Admin/Dashboard/CartItem";
import { Bag, Cart, Eyes, ShoppingBag, Users } from "@/icons";
import statisticService from "@/services/statisticService";
import { Statistic } from "@/types/statistic";
import formatVnd from "@/utils/formatVnd";
import { Suspense, lazy, useEffect, useState } from "react";
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
          percentage={{
            value: 10,
            increase: true,
          }}
          total={formatVnd(statistics?.totalProfit)}
        />
        <CartItem
          title="Tổng cộng đơn hàng"
          icon={<Cart />}
          percentage={{
            value: 20,
            increase: true,
          }}
          total={statistics?.totalOrder || 0}
        />
        <CartItem
          title="Tổng cộng sản phẩm"
          icon={<Bag />}
          percentage={{
            value: 30,
            increase: true,
          }}
          total={statistics?.totalProduct || 0}
        />
        <CartItem
          title="Tổng cộng người dùng"
          icon={<Users />}
          percentage={{
            value: 40,
            increase: false,
          }}
          total={statistics?.totalUser || 0}
        />
        <Suspense fallback={<p>Loading...</p>}>
          <ChartSales className="col-span-4" />
          <ChartProducts total={statistics?.totalProduct || 0} />
        </Suspense>
      </div>
    </main>
  );
};

export default Dashboard;
