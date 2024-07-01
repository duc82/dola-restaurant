import { useState } from "react";
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
            value: 1,
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
}: {
  className?: string;
  total: number;
}) => {
  const [chartProducts, setChartProducts] = useState(
    getChartOptions([
      { x: "Ngày 1 Tháng 3", y: 170 },
      { x: "Ngày 2 Tháng 3", y: 180 },
      { x: "Ngày 3 Tháng 3", y: 164 },
      { x: "Ngày 4 Tháng 3", y: 145 },
      { x: "Ngày 5 Tháng 3", y: 194 },
      { x: "Ngày 6 Tháng 3", y: 170 },
      { x: "Ngày 7 Tháng 3", y: 155 },
    ])
  );

  return (
    <ChartWrapper
      quantity={total}
      title="Số lượng sản phẩm"
      percent={{ value: 14.6, isGrowing: true }}
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
