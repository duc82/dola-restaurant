import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet-async";

const ChartProducts = lazy(
  () => import("@/components/Admin/Dashboard/ChartProducts")
);

const Dashboard = () => {
  return (
    <main className="pt-6 px-4 w-full">
      <Helmet>
        <title>Admin - Bảng điều khiển</title>
      </Helmet>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          <ChartProducts />
        </div>
      </Suspense>
    </main>
  );
};

export default Dashboard;
