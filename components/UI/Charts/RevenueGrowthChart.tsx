"use client";
import dynamic from "next/dynamic";
import ChartHeader from "./chart-header";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { ApexOptions } from "apexcharts";
import { TimeUnit } from "@/types/charts";
import { Button } from "../button";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface SeriesData {
  name: string;
  data: number[];
}

interface ChartData {
  categories: string[];
  series: number[];
  amount: string;
  date: string;
}
const timeRanges: { label: string; value: TimeUnit }[] = [
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Quarterly", value: "quarterly" },
];

const chartData: Record<TimeUnit, ChartData> = {
  daily: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [1500, 3200, 2800, 5000, 6200, 7000, 4500],
    amount: "$30,200.00",
    date: "Last 7 Days",
  },
  yearly: {
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
    series: [
      1500, 3200, 2800, 5000, 6200, 7000, 4500, 1500, 3200, 2800, 5000, 6200,
    ],
    amount: "$120,200.00",
    date: "Last 12 Months",
  },
  weekly: {
    categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    series: [1500, 3200, 2800, 5000, 6200, 7000, 4500],
    amount: "$30,200.00",
    date: "Last 7 Days",
  },
  monthly: {
    categories: [
      "Apr 01",
      "Apr 05",
      "Apr 10",
      "Apr 15",
      "Apr 20",
      "Apr 25",
      "Apr 30",
    ],
    series: [5000, 8000, 12000, 15000, 20000, 25000, 30000],
    amount: "$115,000.00",
    date: "Last 30 Days",
  },
  quarterly: {
    categories: ["Feb", "Mar", "Apr"],
    series: [40000, 85000, 120000],
    amount: "$245,000.00",
    date: "Last 3 Months",
  },
};

// Mapping from button value to chartData key
const rangeToChartKey: Record<string, TimeUnit> = {
  weekly: "weekly",
  monthly: "monthly",
  quarterly: "quarterly",
};

const FinanceCharts = () => {
  const [timeUnit, setTimeUnit] = useState<TimeUnit>("monthly");
  const [currentPeriod, setCurrentPeriod] = useState<Date>(new Date());

  const currentData = chartData[rangeToChartKey[timeUnit]];

  const series: SeriesData[] = [
    {
      name: "Revenue",
      data: currentData.series,
    },
  ];

  const options: ApexOptions = {
    chart: {
      id: "revenue-chart",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 5,
        left: 0,
        blur: 7,
        opacity: 0.5,
        color: "#2ba149",
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: ["#2ba149"],
    },
    fill: {
      type: "solid",
      colors: ["#2ba149"],
    },
    grid: {
      show: true,
      borderColor: "#E0E0E0",
      strokeDashArray: 5,
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
      categories: currentData.categories,
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
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: "#78909C",
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
        formatter: (value) => {
          if (value >= 1000000) return `${(value / 1000000).toFixed(0)}m`;
          if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
          return value.toString();
        },
      },
      min: 0,
      max: Math.max(...currentData.series) * 1.2, // 20% padding
      tickAmount: 7,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ["#2ba149"],
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
      y: {
        formatter: (value) => {
          if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
          if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
          return value.toString();
        },
      },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="max-w-72 font-bold">
          Revenue GrowthChart
        </CardTitle>
        <CardDescription>
          Monthly revenue over the last 12 months
        </CardDescription>
      </CardHeader>
      <CardHeader className="flex w-full justify-center gap-2 px-3">
        <ChartHeader
          timeUnit={timeUnit}
          currentPeriod={currentPeriod}
          setCurrentPeriod={setCurrentPeriod}
        />
        <div className="bg-accent flex justify-center gap-1 rounded-md p-1">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              size="xs"
              variant={timeUnit === range.value ? "secondary" : "text"}
              onClick={() => setTimeUnit(range.value)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-90px)] w-full pl-0">
        <Chart
          options={options}
          series={series}
          type="line"
          width="100%"
          height="100%"
        />
      </CardContent>
    </Card>
  );
};

export default FinanceCharts;
