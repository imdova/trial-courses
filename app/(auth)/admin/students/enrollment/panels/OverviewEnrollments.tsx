/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
import StatCardItem from "@/components/UI/StatCardItem";
import CountriesTable from "@/components/UI/tables/CountriesTable";
import EnrollmentOverviewTable from "@/components/UI/tables/EnrollmentOverviewTable";
import { useAdminEnrollmentsOverview } from "@/hooks/useAdminEnrollmentsOverview";
import { useAdminStudents } from "@/hooks/useAdminStudents";
import { PeriodFilter } from "@/store/slices/admin-enrollments-overview.slice";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import {
  BookOpen,
  DollarSign,
  Play,
  UserCog,
  Users,
  UsersRound,
  GraduationCap,
  Calendar,
  TrendingUp,
} from "lucide-react";

export default function OverviewEnrollmentsPage() {
  const { overview, period, loading, error, changePeriod } = useAdminEnrollmentsOverview(true);
  const { geoStats } = useAdminStudents(true);

  // Transform the stats based on API data
  const stats = useMemo(() => {
    if (!overview) {
      return [
        {
          id: 1,
          title: "Total Enrollments",
          value: "0",
          change: "",
          icon: <GraduationCap size={20} />,
          bgColor: "#E4F8FFE5",
          textColor: "#55BEE6",
        },
        {
          id: 2,
          title: "Active Enrollments",
          value: "0",
          change: "",
          icon: <UsersRound size={20} />,
          bgColor: "#DCFCE7",
          textColor: "#008236",
        },
        {
          id: 3,
          title: "Completed Enrollments",
          value: "0",
          change: "",
          icon: <Play size={20} />,
          bgColor: "#FEF3C7",
          textColor: "#F59E0B",
        },
        {
          id: 5,
          title: "This Month Enrollments",
          value: "0",
          change: "",
          icon: <Calendar size={20} />,
          bgColor: "#F3E8FF",
          textColor: "#8B5CF6",
        },
        {
          id: 6,
          title: "Enrollment Rate",
          value: "0%",
          change: "",
          icon: <TrendingUp size={20} />,
          bgColor: "#FEF2F2",
          textColor: "#EF4444",
        },
      ];
    }

    return [
      {
        id: 1,
        title: "Total Enrollments",
        value: overview.totalEnrollments.toLocaleString(),
        change: "",
        icon: <GraduationCap size={20} />,
        bgColor: "#E4F8FFE5",
        textColor: "#55BEE6",
      },
      {
        id: 2,
        title: "Active Enrollments",
        value: overview.activeEnrollments.toLocaleString(),
        change: "",
        icon: <UsersRound size={20} />,
        bgColor: "#DCFCE7",
        textColor: "#008236",
      },
      {
        id: 3,
        title: "Completed Enrollments",
        value: overview.completedEnrollments.toLocaleString(),
        change: "",
        icon: <Play size={20} />,
        bgColor: "#FEF3C7",
        textColor: "#F59E0B",
      },
      {
        id: 5,
        title: "This Month Enrollments",
        value: overview.thisMonthEnrollments.toLocaleString(),
        change: "",
        icon: <Calendar size={20} />,
        bgColor: "#F3E8FF",
        textColor: "#8B5CF6",
      },
      {
        id: 6,
        title: "Enrollment Rate",
        value: `${overview.enrollmentRate.toFixed(1)}%`,
        change: "",
        icon: <TrendingUp size={20} />,
        bgColor: "#FEF2F2",
        textColor: "#EF4444",
      },
    ];
  }, [overview]);

  // Transform enrollment time series data for the chart
  const chartData = useMemo(() => {
    if (!overview?.enrollmentTimeSeries || overview.enrollmentTimeSeries.length === 0) {
      return {
        yearly: period === "yearly" ? { enrollments: [] } : undefined,
        monthly: period === "monthly" ? { enrollments: [] } : undefined,
        weekly: period === "weekly" ? { enrollments: [] } : undefined,
      };
    }

    const enrollmentsData = overview.enrollmentTimeSeries.map((item) => ({
      date: item.date,
      value: item.count,
    }));

    return {
      yearly: period === "yearly" ? { enrollments: enrollmentsData } : undefined,
      monthly: period === "monthly" ? { enrollments: enrollmentsData } : undefined,
      weekly: period === "weekly" ? { enrollments: enrollmentsData } : undefined,
    };
  }, [overview, period]);

  const handlePeriodChange = (value: string) => {
    changePeriod(value as PeriodFilter);
  };

  if (loading && !overview) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading enrollments overview...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-red-500">Error loading enrollments overview: {error}</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {stats.map((stat) => (
              <StatCardItem key={stat.id} {...stat} />
            ))}
          </div>
          
          {/* Period Filter */}
          <div className="flex-shrink-0">
            <Select value={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-9">
        <div className="col-span-1 md:col-span-6">
          <div className="mb-4 overflow-hidden">
            <DynamicStatisticsChart
              data={chartData}
              metrics={[
                {
                  key: "enrollments",
                  label: "Enrollments",
                  icon: <GraduationCap size={20} />,
                  color: "#EC4899",
                }
              ]}
              chartTitle="Enrollment Statistics"
            />
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <div className="rounded-lg border border-gray-200 bg-white">
            {/* Countries Table  */}
            <CountriesTable geoStats={geoStats} />
          </div>
        </div>
      </div>
      <div className="bg-white">
        {/* Enrollments Table  */}
        <EnrollmentOverviewTable />
      </div>
    </div>
  );
}
