"use client";
import { ApexOptions } from "apexcharts";
import {
  // ChevronDown,
  BarChart2,
  LineChart,
  Calendar as CalendarIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useRef, useEffect } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

type TimePeriod = "Yearly" | "Monthly" | "Weekly" | "Custom";
type ChartType = "line" | "bar" | "area";

interface DataPoint {
  date: string;
  value?: number; // Make optional
  count?: number; // Add this
}

interface ChartData {
  categories: string[];
  series: {
    name: string;
    data: number[];
    color: string;
  }[];
}

interface CardData {
  title: string;
  value: string;
  icon: React.ReactNode;
  metricKey: string;
}

interface TimePeriodData {
  [metricKey: string]: DataPoint[] | undefined;
}

interface Props {
  data: {
    yearly?: TimePeriodData;
    monthly?: TimePeriodData;
    weekly?: TimePeriodData;
    custom?: TimePeriodData;
  };
  chartTitle?: string;
  metrics: {
    key: string;
    label: string;
    icon: React.ReactNode;
    color: string;
    valueFormatter?: (value: number) => string;
  }[];
  defaultMetric?: string;
  onPeriodChange?: (period: "yearly" | "monthly" | "weekly") => void;
}

const DynamicStatisticsChart = ({
  data,
  chartTitle,
  metrics,
  defaultMetric,
}: Props) => {
  // State management
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("Yearly");
  const [selectedMetric, setSelectedMetric] = useState<string>(
    defaultMetric || metrics[0]?.key || "",
  );
  const [chartType, setChartType] = useState<ChartType>("line");
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const [tempDateRange, setTempDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });

  // Helper to format date as YYYY-MM-DD
  const formatDateString = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split("T")[0];
  };

  // Filter data by date range for custom period
  const filterDataByDateRange = (dataPoints: DataPoint[] | undefined) => {
    if (!dateRange.start || !dateRange.end || !dataPoints) return [];

    const startStr = formatDateString(dateRange.start);
    const endStr = formatDateString(dateRange.end);

    return dataPoints.filter((point) => {
      return point.date >= startStr && point.date <= endStr;
    });
  };

  // Get data for current time period
  const getCurrentData = () => {
    if (timePeriod === "Custom") {
      const allData = data.custom || {};
      const filteredData: TimePeriodData = {};

      Object.keys(allData).forEach((key) => {
        filteredData[key] = filterDataByDateRange(allData[key]);
      });

      return filteredData;
    }
    return data[timePeriod.toLowerCase() as keyof typeof data] || {};
  };

  const currentData = getCurrentData();

  // Generate x-axis categories based on time period
  const generateCategories = () => {
    const dataPoints = currentData[selectedMetric] || [];

    if (timePeriod === "Yearly") {
      // For yearly, show month abbreviations
      return Array.from({ length: 12 }, (_, i) =>
        new Date(0, i).toLocaleString("default", { month: "short" }),
      );
    }

    if (timePeriod === "Monthly") {
      // For monthly, show week numbers
      return Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`);
    }

    if (timePeriod === "Weekly") {
      // For weekly, show day names
      return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    }

    // For custom range, show all dates in range
    if (dateRange.start && dateRange.end) {
      const days = [];
      const current = new Date(dateRange.start);
      const end = new Date(dateRange.end);

      while (current <= end) {
        days.push(
          current.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }),
        );
        current.setDate(current.getDate() + 1);
      }
      return days;
    }

    // Fallback - use dates from data
    return dataPoints.map((point) =>
      new Date(point.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    );
  };

  // Prepare chart data
  const getChartData = (): ChartData => {
    const dataPoints = currentData[selectedMetric] || [];
    const categories = generateCategories();
    const currentMetric = metrics.find((m) => m.key === selectedMetric);

    // For non-custom periods, we need to aggregate data
    if (timePeriod !== "Custom") {
      const aggregatedData = categories.map((category, index) => {
        if (timePeriod === "Yearly") {
          // Filter data for this month (index + 1)
          const monthData = dataPoints.filter((point) => {
            const date = new Date(point.date);
            return date.getMonth() === index;
          });
          return monthData.reduce((sum, point) => sum + (point.value || 0), 0);
        }

        if (timePeriod === "Monthly") {
          // Filter data for this week (7-day chunks)
          const weekStart = index * 7;
          const weekEnd = weekStart + 6;
          const weekData = dataPoints.filter((point) => {
            const date = new Date(point.date);
            const day = date.getDate();
            return day >= weekStart && day <= weekEnd;
          });
          return weekData.reduce((sum, point) => sum + (point.value || 0), 0);
        }

        if (timePeriod === "Weekly") {
          // Filter data for this day of week (0-6)
          const dayData = dataPoints.filter((point) => {
            const date = new Date(point.date);
            return date.getDay() === index;
          });
          return dayData.reduce((sum, point) => sum + (point.value || 0), 0);
        }

        return 0;
      });

      return {
        categories,
        series: [
          {
            name: currentMetric?.label || selectedMetric,
            data: aggregatedData,
            color: currentMetric?.color || "#2BA149",
          },
        ],
      };
    }

    // For custom period, map directly to dates
    const seriesData = categories.map((displayDate) => {
      const point = dataPoints.find(
        (p) =>
          new Date(p.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          }) === displayDate,
      );
      return point?.value || 0;
    });

    return {
      categories,
      series: [
        {
          name: currentMetric?.label || selectedMetric,
          data: seriesData,
          color: currentMetric?.color || "#2BA149",
        },
      ],
    };
  };

  const { categories, series } = getChartData();
  const currentMetric = metrics.find((m) => m.key === selectedMetric);

  // Chart configuration
  const chartOptions: ApexOptions = {
    chart: {
      id: "dynamic-chart",
      toolbar: { show: false },
      animations: { enabled: true, speed: 800 },
    },
    stroke: {
      width: chartType === "line" ? [3] : [0],
      curve: "smooth",
    },
    markers: {
      size: chartType === "line" ? 5 : 0,
      hover: { size: chartType === "line" ? 7 : 0 },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: "#6b7280", fontSize: "12px" } },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => {
          if (currentMetric?.valueFormatter) {
            return currentMetric.valueFormatter(val);
          }
          return val.toString();
        },
        style: { colors: "#6b7280", fontSize: "12px" },
      },
      tickAmount: 4,
      min: 0,
    },
    grid: {
      borderColor: "#e5e7eb",
      strokeDashArray: 3,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    colors: series.map((s) => s.color),
    tooltip: {
      y: {
        formatter: (val: number) => {
          if (currentMetric?.valueFormatter) {
            return currentMetric.valueFormatter(val);
          }
          return val.toString();
        },
      },
    },
    legend: { show: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: "45%" } },
  };

  // Handle date range selection
  const handleApplyDateRange = () => {
    if (tempDateRange.start && tempDateRange.end) {
      setDateRange(tempDateRange);
      setTimePeriod("Custom");
      setIsSubMenuOpen(false);
    }
  };

  // Handle time period change
  // const handleTimePeriodChange = (value: TimePeriod) => {
  //   setTimePeriod(value);
  //   if (value !== "Custom") {
  //     setDateRange({ start: null, end: null });
  //   }
  // };

  // Generate metric cards
  const cards: CardData[] = metrics.map((metric) => ({
    title: metric.label,
    value: "0", // You might want to calculate this based on your data
    icon: metric.icon,
    metricKey: metric.key,
  }));

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-3">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <h1 className="text-2xl font-bold">
          {chartTitle || "Platform Statistics"}
        </h1>
        <div className="flex w-full justify-between gap-4 md:w-fit">
          {series.length > 0 && (
            <div className="flex items-center gap-4">
              <div className="flex space-x-4">
                {series.map((s) => (
                  <div key={s.name} className="flex items-center">
                    <div
                      className="mr-2 h-4 w-4 rounded-md"
                      style={{ backgroundColor: s.color }}
                    ></div>
                    <span className="text-xs">{s.name}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => setChartType("line")}
                  className={`rounded-md p-2 ${
                    chartType === "line" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  title="Line Chart"
                >
                  <LineChart size={16} />
                </button>
                <button
                  onClick={() => setChartType("bar")}
                  className={`rounded-md p-2 ${
                    chartType === "bar" ? "bg-gray-100" : "hover:bg-gray-50"
                  }`}
                  title="Bar Chart"
                >
                  <BarChart2 size={16} />
                </button>
              </div>
            </div>
          )}
          {/* <div className="relative">
            <select
              value={timePeriod}
              onChange={(e) =>
                handleTimePeriodChange(e.target.value as TimePeriod)
              }
              className="appearance-none rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 pr-8 leading-tight text-gray-700 focus:outline-none"
            >
              <option value="Yearly">Yearly</option>
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Custom">Custom Range</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div> */}
        </div>
      </div>

      {/* Date Range Selection */}
      {timePeriod === "Custom" && !isSubMenuOpen && (
        <div className="my-4 flex items-center gap-2">
          <div className="text-sm text-gray-600">
            {dateRange.start && dateRange.end
              ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}`
              : "Select date range"}
          </div>
          <button
            onClick={() => setIsSubMenuOpen(true)}
            className="text-sm text-green-600 hover:text-green-800"
          >
            {dateRange.start && dateRange.end ? "Change" : "Select"}
          </button>
        </div>
      )}

      {/* Date Picker Modal */}
      {isSubMenuOpen && (
        <div className="absolute z-20 mt-2 w-full max-w-xl rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Select Date Range</h3>
            <button
              onClick={() => setIsSubMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <h4 className="mb-2 text-sm font-medium">Start Date</h4>
              <DatePicker
                selected={tempDateRange.start}
                onChange={(date) =>
                  setTempDateRange({ ...tempDateRange, start: date })
                }
              />
            </div>
            <div className="flex-1">
              <h4 className="mb-2 text-sm font-medium">End Date</h4>
              <DatePicker
                selected={tempDateRange.end}
                onChange={(date) =>
                  setTempDateRange({ ...tempDateRange, end: date })
                }
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2 border-t border-gray-200 pt-4">
            <button
              onClick={() => {
                setTempDateRange({ start: null, end: null });
                setIsSubMenuOpen(false);
              }}
              className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyDateRange}
              disabled={!tempDateRange.start || !tempDateRange.end}
              className={`rounded-md px-4 py-2 text-sm text-white ${
                !tempDateRange.start || !tempDateRange.end
                  ? "cursor-not-allowed bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      )}

      {/* Metrics Cards */}
      <section className="mb-8">
        <h2 className="mb-6 text-sm text-gray-500">
          {timePeriod === "Custom" && dateRange.start && dateRange.end
            ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()} ${selectedMetric.toLowerCase()} overview`
            : `${timePeriod} ${selectedMetric.toLowerCase()} overview`}
        </h2>

        <div className="flex flex-col justify-center gap-4 md:flex-row">
          {cards.map((card) => (
            <div
              key={card.title}
              onClick={() => setSelectedMetric(card.metricKey)}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border p-2 shadow-sm transition ${
                selectedMetric === card.metricKey ? "border-green-500" : ""
              }`}
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-gray-500 ${
                  selectedMetric === card.metricKey
                    ? "bg-green-500 text-white"
                    : ""
                }`}
              >
                {card.icon}
              </div>
              <div>
                <span className="mb-2 text-xs text-gray-500">{card.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chart Display */}
      <div className="pt-6">
        <div className="h-72 w-full">
          <Chart
            options={chartOptions}
            series={series}
            type={chartType}
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

// DatePicker Component (unchanged from your original)
const DatePicker = ({
  selected,
  onChange,
  inline = false,
}: {
  selected: Date | null;
  onChange: (date: Date) => void;
  inline?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(inline);
  const [viewDate, setViewDate] = useState(selected || new Date());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(viewDate);
    const firstDay = getFirstDayOfMonth(viewDate);
    const blanks = Array(firstDay).fill(null);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    return [...blanks, ...daysArray].map((day, idx) => (
      <button
        key={idx}
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm ${day === null ? "invisible" : ""} ${
          selected &&
          day === selected.getDate() &&
          viewDate.getMonth() === selected.getMonth() &&
          viewDate.getFullYear() === selected.getFullYear()
            ? "bg-green-500 text-white"
            : "hover:bg-gray-100"
        } `}
        onClick={() => {
          if (day) {
            const newDate = new Date(viewDate);
            newDate.setDate(day);
            onChange(newDate);
            setIsOpen(false);
          }
        }}
        disabled={day === null}
      >
        {day}
      </button>
    ));
  };

  const prevMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setViewDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(viewDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setViewDate(newDate);
  };

  return (
    <div className="relative" ref={ref}>
      {!inline && (
        <div
          className="flex cursor-pointer items-center rounded-md border px-3 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
          <span className="text-sm">
            {selected ? selected.toLocaleDateString() : "Select date"}
          </span>
        </div>
      )}

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 rounded-md border bg-white p-2 shadow-lg">
          <div className="mb-2 flex items-center justify-between">
            <button
              onClick={prevMonth}
              className="rounded p-1 hover:bg-gray-100"
            >
              &lt;
            </button>
            <div className="font-medium">
              {months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
            <button
              onClick={nextMonth}
              className="rounded p-1 hover:bg-gray-100"
            >
              &gt;
            </button>
          </div>

          <div className="mb-2 grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
        </div>
      )}
    </div>
  );
};

export default DynamicStatisticsChart;
