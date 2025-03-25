import ChartWrapper from "./ChartWrapper";
import ApexCharts, { Props } from "react-apexcharts";
import formatVnd from "@/utils/formatVnd";

function getChartOptions({
  categories,
  series,
}: {
  categories?: ApexXAxis["categories"];
  series: Props["series"];
}) {
  const mainChartColors = {
    borderColor: "rgb(55, 65, 81)",
    labelColor: "rgb(156, 163, 175)",
  };

  const chart: Props = {
    height: 420,
    options: {
      chart: {
        id: "main-chart",
        type: "area",
        foreColor: mainChartColors.labelColor,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        theme: "dark",
        style: {
          fontSize: "14px",
        },
      },

      grid: {
        show: true,
        borderColor: mainChartColors.borderColor,
        strokeDashArray: 1,
        padding: {
          left: 35,
          bottom: 15,
        },
      },

      xaxis: {
        categories,
        labels: {
          style: {
            colors: [mainChartColors.labelColor],
            fontSize: "14px",
            fontWeight: 500,
          },
        },
        axisBorder: {
          color: mainChartColors.borderColor,
        },
        axisTicks: {
          color: mainChartColors.borderColor,
        },
        crosshairs: {
          show: true,
          position: "back",
          stroke: {
            color: mainChartColors.borderColor,
            width: 1,
            dashArray: 10,
          },
        },
      },

      yaxis: {
        labels: {
          style: {
            colors: [mainChartColors.labelColor],
            fontSize: "14px",
            fontWeight: 500,
          },
          formatter: (value) => formatVnd(value),
        },
      },

      legend: {
        fontSize: "14px",
        fontWeight: 500,
        labels: {
          colors: [mainChartColors.labelColor],
        },
        itemMargin: {
          horizontal: 10,
        },
      },

      markers: {
        size: 5,
        strokeColors: "white",
        hover: {
          size: undefined,
          sizeOffset: 3,
        },
      },
    },

    series,
  };

  return chart;
}

const ChartSales = ({
  className,
  datas,
  lastMonthProfit,
}: {
  className?: string;
  datas: any[];
  lastMonthProfit: number;
}) => {
  const chartSales = getChartOptions({
    categories: datas.map(
      (data) =>
        `${data._id.day.toString().padStart(2, "0")} tháng ${data._id.month
          .toString()
          .padStart(2, "0")}`
    ),
    series: [
      {
        name: "Doanh thu",
        data: datas.map((data) => data.total),
        color: "#1A56DB",
      },
    ],
  });

  const total = datas.reduce((acc, data) => acc + data.total, 0);

  const percent = ((total - lastMonthProfit) / lastMonthProfit) * 100 || 0;

  return (
    <ChartWrapper
      quantity={formatVnd(total)}
      title="Doanh số bán hàng tháng này"
      percent={{
        value: percent,
        isGrowing: percent > 0,
      }}
      report="bán hàng"
      className={className}
    >
      <ApexCharts
        options={chartSales.options}
        series={chartSales.series}
        height={chartSales.height}
      />
    </ChartWrapper>
  );
};

export default ChartSales;
