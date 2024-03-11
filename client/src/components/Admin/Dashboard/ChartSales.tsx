import { useState } from "react";
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

const ChartSales = () => {
  const [chartSales, setChartSales] = useState(
    getChartOptions({
      categories: [
        "01 tháng 10",
        "02 tháng 10",
        "03 tháng 10",
        "04 tháng 10",
        "05 tháng 10",
        "06 tháng 10",
        "07 tháng 10",
      ],
      series: [
        {
          name: "Doanh thu",
          data: [6356, 6218, 6156, 6526, 6356, 6256, 6056],
          color: "#1A56DB",
        },
        {
          name: "Doanh thu (kỳ trước)",
          data: [6556, 6725, 6424, 6356, 6586, 6756, 6616],
          color: "#FDBA8C",
        },
      ],
    })
  );

  return (
    <ChartWrapper
      quantity={formatVnd(1000000)}
      title="Doanh số bán hàng tuần này"
      percent={{ value: 12.5, isGrowing: true }}
      report="bán hàng"
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
