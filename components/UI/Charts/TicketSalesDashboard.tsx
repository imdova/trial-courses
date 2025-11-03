import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import Dropdown from "../DropDownMenu";

// Dynamically import ApexCharts to prevent SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type TimeRange = "week" | "month" | "year";

const TicketSalesDashboard: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [timeRange, setTimeRange] = useState<TimeRange>("week");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle time range change
  const handleTimeRangeChange = (range: TimeRange) => {
    setTimeRange(range);
    // In a real app, fetch data here
  };

  const timeRangeOptions = [
    { id: "week", name: "This Week" },
    { id: "month", name: "This Month" },
    { id: "year", name: "This Year" },
  ];

  // Donut chart options
  const donutChartOptions: ApexOptions = {
    chart: {
      type: "donut",
      height: 220,
      toolbar: {
        show: false,
      },
    },
    colors: ["#ef4444", "#f59e0b", "#22c55e"], // Red, Amber, Green
    plotOptions: {
      pie: {
        donut: {
          size: "80%",
          background: "transparent",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              color: "#6B7280",
            },
            value: {
              show: true,
              fontSize: "24px",
              color: "#111827",
              fontWeight: "bold",
            },
            total: {
              show: true,
              label: "Total Tickets",
              color: "#6B7280",
              formatter: () => "2,780",
            },
          },
        },
      },
    },
    labels: ["Sold Out", "Fully Booked", "Available"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
  };

  // Donut chart data
  const donutChartSeries: number[] = [1251, 834, 695];

  // Stats data
  const statsData: Record<
    TimeRange,
    {
      total: string;
      soldOut: { count: string; percentage: string };
      fullyBooked: { count: string; percentage: string };
      available: { count: string; percentage: string };
    }
  > = {
    week: {
      total: "2,780",
      soldOut: { count: "1,251", percentage: "45%" },
      fullyBooked: { count: "834", percentage: "30%" },
      available: { count: "695", percentage: "25%" },
    },
    month: {
      total: "12,450",
      soldOut: { count: "5,602", percentage: "45%" },
      fullyBooked: { count: "3,735", percentage: "30%" },
      available: { count: "3,113", percentage: "25%" },
    },
    year: {
      total: "145,230",
      soldOut: { count: "65,353", percentage: "45%" },
      fullyBooked: { count: "43,569", percentage: "30%" },
      available: { count: "36,307", percentage: "25%" },
    },
  };

  return (
    <div>
      <div className="overflow-hidde w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Ticket Sales
            </h2>
          </div>

          {/* Time Range Selector */}
          <div className="max-w-xs">
            <Dropdown
              options={timeRangeOptions}
              selected={timeRange}
              onSelect={(value) => handleTimeRangeChange(value as TimeRange)}
              placeholder="Select Range"
            />
          </div>
        </div>

        <div className="grid grid-cols-1">
          {/* Donut Chart */}

          {isMounted && (
            <Chart
              options={donutChartOptions}
              series={donutChartSeries}
              type="donut"
              height={220}
            />
          )}

          {/* Stats Cards */}
          <div className="space-y-2 p-3">
            {/* Sold Out Card */}
            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2">
              <div className="flex items-center">
                <div className="mr-3 h-8 w-2 rounded-full bg-red-500"></div>
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    Sold Out
                  </span>
                  <div className="text-xs font-semibold text-gray-800">
                    {statsData[timeRange].soldOut.count}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="rounded-lg bg-gray-200 p-2 text-sm text-black">
                  {statsData[timeRange].soldOut.percentage}
                </div>
              </div>
            </div>

            {/* Fully Booked Card */}
            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2">
              <div className="flex items-center">
                <div className="mr-3 h-8 w-2 rounded-full bg-amber-500"></div>
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    Fully Booked
                  </span>
                  <div className="text-xs font-semibold text-gray-800">
                    {statsData[timeRange].fullyBooked.count}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="rounded-lg bg-gray-200 p-2 text-sm text-black">
                  {statsData[timeRange].fullyBooked.percentage}
                </div>
              </div>
            </div>

            {/* Available Card */}
            <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-white p-2">
              <div className="flex items-center">
                <div className="mr-3 h-8 w-2 rounded-full bg-green-500"></div>
                <div>
                  <span className="text-sm font-medium text-gray-800">
                    Available
                  </span>{" "}
                  <div className="text-xs font-semibold text-gray-800">
                    {statsData[timeRange].available.count}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="rounded-lg bg-gray-200 p-2 text-sm text-black">
                  {statsData[timeRange].available.percentage}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSalesDashboard;
