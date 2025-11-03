"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Import ApexCharts types
import { SeriesData } from "@/constants/charts/chart.data";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the type for the props
interface RevenueChartProps {
  series: SeriesData[];
  categories: string[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ series, categories }) => {
  // Line chart options
  const options: ApexOptions = {
    chart: {
      id: "line-chart",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 2,
        left: 0,
        blur: 5,
        opacity: 0.5,
        color: "#FEC64F",
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      width: 5,
    },
    markers: {
      size: 0,
      colors: ["#fff"],
      strokeColors: ["#3269D3"],
      strokeWidth: 2,
    },
    grid: {
      show: false,
      borderColor: "#E0E0E0",
      strokeDashArray: 5,
    },
    xaxis: {
      categories: categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        style: {
          colors: "#78909C",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "#78909C",
          fontSize: "12px",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#82c341"],
    legend: {
      show: false,
    },
  };

  return (
    <div className="overflow-hidden">
      <Chart
        options={options}
        series={series}
        type="area"
        width="100%"
        height={300}
      />
    </div>
  );
};

export default RevenueChart;
