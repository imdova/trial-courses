import React from "react";
import NestedMenu from "../NestedMenu";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartUserProps = {
  labelX: string;
  category: string[];
  newEmployers: number[];
};

const ChartUserReport: React.FC<ChartUserProps> = ({
  labelX,
  category,
  newEmployers,
}) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        columnWidth: "40%", // Adjusts bar width (similar to categoryGapRatio)
        distributed: false,
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
      categories: category,
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
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
    },
    colors: ["#2ba149e5"],
  };

  const series = [
    {
      name: labelX,
      data: newEmployers,
    },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between p-4">
        <div>
          <span className="mb-2 text-muted-foreground">Statistics</span>
          <h2>Employer Report</h2>
        </div>
        <NestedMenu />
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={400}
      />
    </>
  );
};

export default ChartUserReport;
