import { StatisticData } from "@/types/statistic";
import ChartWrapper from "./ChartWrapper";
import ApexCharts, { Props } from "react-apexcharts";

function getChartOptions(seriesData: ApexAxisChartSeries[0]["data"]) {
  const chart: Props = {
    height: 300,
    type: "bar",
    options: {
      colors: ["#1A56DB", "#FDBA8C"],
      chart: {
        foreColor: "#4B5563",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "90%",
          borderRadius: 3,
        },
      },
      tooltip: {
        theme: "dark",
        shared: false,
        intersect: false,
        style: {
          fontSize: "14px",
        },
      },
      states: {
        hover: {
          filter: {
            type: "darken",
          },
        },
      },
      stroke: {
        show: true,
        width: 5,
        colors: ["transparent"],
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        floating: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
    },
    series: [
      {
        name: "Số lượng",
        color: "#1A56DB",
        data: seriesData,
      },
    ],
  };

  return chart;
}

const ChartProducts = ({
  className,
  total,
  datas,
}: {
  className?: string;
  total: number;
  datas: StatisticData[];
}) => {
  const chartProducts = getChartOptions(
    datas.map((data) => ({
      x: `Ngày ${data._id.day} Tháng ${data._id.month}`,
      y: data.total,
    }))
  );

  return (
    <ChartWrapper
      quantity={total}
      title="Số lượng sản phẩm"
      report="sản phẩm"
      className={className}
    >
      <ApexCharts
        type={chartProducts.type}
        options={chartProducts.options}
        series={chartProducts.series}
        height={chartProducts.height}
      />
    </ChartWrapper>
  );
};

export default ChartProducts;
