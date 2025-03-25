import { StatisticData } from "@/types/statistic";
import ChartWrapper from "./ChartWrapper";
import ApexCharts, { Props } from "react-apexcharts";

function getChartOptions(seriesData: ApexAxisChartSeries[0]["data"]) {
  const chart: Props = {
    height: 300,
    type: "area",
    options: {
      colors: ["#1A56DB", "#FDBA8C"],
      chart: {
        foreColor: "#4B5563",
        toolbar: {
          show: false,
        },
      },
      markers: {
        strokeWidth: 2,
        size: 0,
        hover: {
          size: 4,
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
        curve: "smooth",
        width: 5,
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
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        gradient: {
          gradientToColors: ["rgb(14,47,120)"],
        },
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

export default function ChartUsers({
  total,
  className,
  datas,
}: {
  total: number;
  className?: string;
  datas: StatisticData[];
}) {
  const chartUsers = getChartOptions(
    datas.map((data) => ({
      x: `Ngày ${data._id.day} Tháng ${data._id.month}`,
      y: data.total,
    }))
  );

  return (
    <ChartWrapper
      quantity={total}
      title="Số lượng người dùng"
      report="người dùng"
      className={className}
    >
      <ApexCharts
        type={chartUsers.type}
        options={chartUsers.options}
        series={chartUsers.series}
        height={chartUsers.height}
      />
    </ChartWrapper>
  );
}
