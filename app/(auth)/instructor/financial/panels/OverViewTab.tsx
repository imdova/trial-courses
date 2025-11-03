"use client";

import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import RevenueGrowthChart from "@/components/UI/Charts/RevenueGrowthChart";
import StatsCard from "@/components/UI/StatsCard";
import { ArrowDown, ArrowUp, DollarSign, Star } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { generateCourseTransactionsColumns } from "@/components/columns/generateCourseTransactionsColumns";
import { useCourseTransactions } from "@/hooks/useCourseTransactions";
import { useEffect } from "react";


type Item = {
  name: string;
  enrollments: number;
  revenue: string;
  rating: number;
};

const courses: Item[] = [
  { name: "Advanced React", enrollments: 245, revenue: "$8,2k", rating: 4.8 },
  {
    name: "Node.js Masterclass",
    enrollments: 189,
    revenue: "$6,8k",
    rating: 4.7,
  },
  {
    name: "JavaScript Basics",
    enrollments: 312,
    revenue: "$4,6k",
    rating: 4.6,
  },
  {
    name: "Python for Beginners",
    enrollments: 287,
    revenue: "$2,8k",
    rating: 4.8,
  },
  { name: "Advanced React", enrollments: 245, revenue: "$8,2k", rating: 4.8 },
];

export const generateTopCoursesColumns = (): ColumnDef<Item>[] => [
  {
    header: "Course",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="line-clamp-2 max-w-32 text-xs font-medium text-wrap">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    header: "Enrollments",
    accessorKey: "enrollments",
  },
  {
    header: "Revenue",
    accessorKey: "revenue",
  },
  {
    header: "Rate",
    accessorKey: "rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-xs font-medium">
        <Star className="size-3 text-orange-300" />
        {row.getValue("rating")}
      </div>
    ),
  },
];

const FinanceOverViewTab = () => {
  const topCoursesColumns = generateTopCoursesColumns();
  const { transactions, fetching, getCourseTransactions, cached } =
    useCourseTransactions();
  const recentTransactions = transactions.slice(5, 10);

  const courseTransactionsColumns = generateCourseTransactionsColumns();

  useEffect(() => {
    getCourseTransactions();
  }, [getCourseTransactions]);
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatsCard
          title="Total Earnings"
          value="$24,563.00"
          icon={<DollarSign size={20} />}
          iconBg="bg-sky-100"
          iconColor="text-sky-500"
        />
        <StatsCard
          title="Pending Earnings"
          value="$1,250.00"
          change="Available in 7 days"
          icon={<DollarSign size={20} />}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatsCard
          title="Available Balance"
          value="$3,428.50"
          change="Ready to withdraw"
          icon={<ArrowDown size={20} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-500"
        />
        <StatsCard
          title="This Month"
          value="$2,845.00"
          change="+18.2%"
          icon={<ArrowUp size={20} />}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-8">
        <div className="col-span-1 h-full lg:col-span-5">
          <RevenueGrowthChart />
        </div>
        <Card className="col-span-1 h-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Courses</CardTitle>
            <CardDescription>
              Top courses based on enrollments and revenue
            </CardDescription>
          </CardHeader>
          <AdvancedDataTable
            columns={topCoursesColumns}
            data={courses}
            defaultSorting={{
              id: "revenue",
              desc: true,
            }}
            headerClassName="text-xs"
            cellClassName="text-xs py-4"
            tableClassName="border-t border-b"
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
          />
        </Card>
      </div>
      <Card className="space-y-6 pb-0">
        <CardHeader>
          <CardTitle className="text-2xl">Recent Transactions </CardTitle>
          <CardDescription>
            Your latest ({recentTransactions.length}) transactions
          </CardDescription>
        </CardHeader>
        <AdvancedDataTable
          columns={courseTransactionsColumns}
          data={recentTransactions}
          loading={fetching || cached === null}
          defaultSorting={{
            id: "id",
            desc: true,
          }}
          initialPagination={{
            pageIndex: 0,
            pageSize: 10,
          }}
          headerClassName="py-3"
          cellClassName="py-2 text-xs"
          tableClassName="border-t border-b"
          filterClassName="px-5"
          hideSearch={false}
          hideExport={false}
        />
      </Card>
    </div>
  );
};
export default FinanceOverViewTab;
