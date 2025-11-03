"use client";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts"; // Import ApexCharts types
import { SeriesData } from "@/constants/charts/chart.data";

// Dynamically import ApexCharts to prevent SSR issues in Next.js
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the type for the props
interface StudentChartProps {
  series: SeriesData[];
}
const StudentChart: React.FC<StudentChartProps> = ({ series }) => {
  // Bar chart options
  const options: ApexOptions = {
    grid: {
      show: false,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
        color: "#78909C",
        offsetX: 0,
        offsetY: 0,
      },
      labels: {
        show: false,
      },

      crosshairs: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    stroke: {
      show: true,
      curve: "straight",
      width: 2, // Adjusted for better visibility
    },
    plotOptions: {
      bar: {
        barHeight: "50%",
        borderRadius: 2, // Supported in newer ApexCharts versions
        columnWidth: "50%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3269D3", "#FEC64F"],
    legend: {
      show: false,
    },
  };

  return (
    <div className="overflow-hidden mb-4">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={120}
      />
    </div>
  );
};

export default StudentChart;
