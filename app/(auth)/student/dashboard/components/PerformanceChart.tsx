"use client";
import React from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

const PerformanceChart = () => {
  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#3f51b5"],
    series: [
      {
        name: "Performance",
        data: [65, 60, 70, 75, 80, 40], // Sample data matching your screenshot
      },
    ],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          fontSize: "12px",
          fontWeight: 500,
          colors: "#6B7280",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
        formatter: (value: number) => `${value}%`,
        style: {
          colors: "#6B7280",
          fontSize: "12px",
        },
      },
      min: 0,
      max: 100,
    },
    grid: {
      show: true,
      borderColor: "#E5E7EB",
      strokeDashArray: 5,
      position: "back",
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    markers: {
      size: 5,
      colors: ["#3f51b5"],
      strokeWidth: 0,
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value}%`,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Performance</h2>

      <div className="min-h-[240px] h-full">
        <ApexCharts
          options={chartOptions}
          series={chartOptions.series}
          type="line"
          height="100%"
        />
      </div>

      <div className="mt-4 p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <span className="font-bold text-black">40%</span> Your productivity is
          40% higher
        </p>
      </div>
    </div>
  );
};

export default PerformanceChart;
