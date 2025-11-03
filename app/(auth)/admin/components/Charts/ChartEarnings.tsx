import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartEarningsProps = {
  labelX: string;
};
// Define the ChartEarnings component
const ChartEarnings: React.FC<ChartEarningsProps> = ({ labelX }) => {
  const options: ApexOptions = {
    chart: {
      type: "bar" as const,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "#f1f1f1",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "8px",
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    colors: ["#2ba149e5"],
  };

  const series = [
    {
      name: labelX,
      data: [
        2423, 2200, 2100, 2500, 1900, 2300, 2500, 1200, 800, 500, 1800, 650,
      ],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={250}
      width="100%"
      className="flex-1"
    />
  );
};

export default ChartEarnings;
