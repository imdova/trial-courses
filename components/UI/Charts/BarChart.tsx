"use client";
import dynamic from "next/dynamic";

import { ApexOptions } from "apexcharts"; // Import ApexCharts types
import { SeriesData } from "@/constants/charts/chart.data";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the type for the props
interface StudentChartProps {
  series: SeriesData[];
}

const BarChart: React.FC<StudentChartProps> = ({ series }) => {
  // Bar chart options
  const options: ApexOptions = {
    grid: {
      show: true,
      borderColor: "#eee",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    chart: {
      id: "basic-bar",
      toolbar: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontSize: "10px",
          fontWeight: 400,
          colors: "gray",
        },
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
        show: true,
        style: {
          fontSize: "10px",
          fontWeight: 400,
          colors: "gray",
          cssClass: "",
        },
      },
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
        barHeight: "80%",
        borderRadius: 2, // Supported in newer ApexCharts versions
        columnWidth: "60%",
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#3269D3", "#FEC64F"],
  };

  return (
    <div className="w-full  overflow-hidden">
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height={300}
      />
    </div>
  );
};

export default BarChart;
