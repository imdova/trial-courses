import React from "react";
import NestedMenu from "../NestedMenu";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

// Dynamically import ReactApexChart to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ChartEmployersProps = {
  labelX: string;
  labelY: string;
  months: string[];
  newEmployers: number[];
  jobApplicants: number[];
};

const ChartEmployerReport: React.FC<ChartEmployersProps> = ({
  labelX,
  labelY,
  months = [],
  newEmployers = [],
  jobApplicants = [],
}) => {
  const hasData =
    months.length > 0 && newEmployers.length > 0 && jobApplicants.length > 0;
  const options: ApexOptions = {
    chart: {
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    markers: {
      size: 4,
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
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "10px",
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
      fontSize: "10px",
      markers: {},
    },
    colors: ["#FF8743", "#0884FF"],
  };
  const series = [
    {
      name: labelX,
      data: newEmployers,
    },
    {
      name: labelY,
      data: jobApplicants,
    },
  ];

  return (
    <>
      <div className="flex w-full items-center justify-between p-4">
        <div>
          <span className="mb-2 text-muted-foreground">Statistics</span>
          <h2>User Report</h2>
        </div>
        <NestedMenu />
      </div>
      {hasData ? (
        <ReactApexChart
          options={options}
          series={series}
          type="line"
          height={400}
        />
      ) : (
        <p className="text-center text-muted-foreground">No data available</p>
      )}
    </>
  );
};

export default ChartEmployerReport;
