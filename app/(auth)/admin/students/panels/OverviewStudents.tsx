"use client";

import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
import StatCardItem from "@/components/UI/StatCardItem";
import CountriesTable from "@/components/UI/tables/CountriesTable";
import StudentOverviewTable from "@/components/UI/tables/StudentOverviewTable";
import {
  Play,
  Users,
  UsersRound,
} from "lucide-react";
import { useAdminStudents } from "@/hooks/useAdminStudents";
import { useAdminStudentsList } from "@/hooks/useAdminStudentsList";
import { PeriodFilter } from "@/store/slices/admin-students.slice";
import Loading from "@/components/loading/loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

export default function OverviewStudentsPage() {
  const { overview, geoStats, period, loading, changePeriod } = useAdminStudents(true);
  const { students } = useAdminStudentsList(true, 10);

  if (loading || !overview) {
    return <Loading />;
  }

  const stats = [
    {
      id: 1,
      title: "Total Students",
      value: overview.totalStudents.toString(),
      change: "",
      icon: <UsersRound size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
    {
      id: 2,
      title: "Total Courses",
      value: overview.totalCourses.toString(),
      change: "",
      icon: <Play size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
    {
      id: 3,
      title: "Total Enrollments",
      value: overview.totalEnrollments.toString(),
      change: "",
      icon: <UsersRound size={20} />,
      bgColor: "#E4F8FFE5",
      textColor: "#55BEE6",
    },
  ];

  // Transform time series data for the chart format expected by DynamicStatisticsChart
  const transformedTimeSeries = overview.timeSeries.map((item) => ({
    date: item.date,
    value: item.count,
  }));

  const chartData = {
    yearly: period === "yearly" ? { students: transformedTimeSeries } : undefined,
    monthly: period === "monthly" ? { students: transformedTimeSeries } : undefined,
    weekly: period === "weekly" ? { students: transformedTimeSeries } : undefined,
  };

  const handlePeriodChange = (value: string) => {
    changePeriod(value as PeriodFilter);
  };

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCardItem key={stat.id} {...stat} />
          ))}
        </div>
        
        {/* Period Filter */}
        <div className="ml-4">
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

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-9">
        <div className="col-span-1 md:col-span-6">
          <div className="mb-4 overflow-hidden">
            <DynamicStatisticsChart
              data={chartData}
              metrics={[
                {
                  key: "students",
                  label: "Students",
                  icon: <Users size={20} />,
                  color: "#FFB543",
                },
              ]}
              chartTitle="Students Statistics"
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
        {/* Students Table  */}
        <StudentOverviewTable students={students} />
      </div>
    </div>
  );
}
