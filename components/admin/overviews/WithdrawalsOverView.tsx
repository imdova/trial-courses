"use client";

import { Card } from "@/components/UI/card";
import {
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Wallet,
} from "lucide-react";
import { AdvancedColumnConfig } from "@/types";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";

type StatusCardType = {
  title: string;
  value: string;
  icon: React.ReactElement;
  trend?: {
    value: string;
    description: string;
    trendDirection: "up" | "down";
  };
};

type InstructorWithdrawal = {
  id: string;
  instructorName: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  requestDate: string;
  completedDate?: string;
  coursesCount: number;
};

const statusCards: StatusCardType[] = [
  {
    title: "Total Withdrawals",
    value: "$125,400",
    icon: (
      <Wallet className="block h-11 w-11 rounded-full bg-blue-100 p-2 text-blue-800" />
    ),
    trend: {
      value: "+18%",
      description: "vs last month",
      trendDirection: "up",
    },
  },
  {
    title: "Pending Requests",
    value: "$12,500",
    icon: (
      <Clock className="block h-11 w-11 rounded-full bg-yellow-100 p-2 text-yellow-800" />
    ),
    trend: {
      value: "8 requests",
      description: "Awaiting approval",
      trendDirection: "up",
    },
  },
  {
    title: "Approved Withdrawals",
    value: "$98,200",
    icon: (
      <CheckCircle className="block h-11 w-11 rounded-full bg-green-100 p-2 text-green-800" />
    ),
    trend: {
      value: "+22%",
      description: "This month",
      trendDirection: "up",
    },
  },
  {
    title: "Active Instructors",
    value: "42",
    icon: (
      <Users className="block h-11 w-11 rounded-full bg-purple-100 p-2 text-purple-800" />
    ),
    trend: {
      value: "+5",
      description: "New this month",
      trendDirection: "up",
    },
  },
  {
    title: "Avg. Withdrawal Amount",
    value: "$2,850",
    icon: (
      <TrendingUp className="block h-11 w-11 rounded-full bg-indigo-100 p-2 text-indigo-800" />
    ),
    trend: {
      value: "+12%",
      description: "vs last month",
      trendDirection: "up",
    },
  },
];

// Mock data for top instructors
const topInstructors: InstructorWithdrawal[] = [
  {
    id: "1",
    instructorName: "Dr. Sarah Johnson",
    amount: 8500,
    status: "completed",
    requestDate: "2025-01-15",
    completedDate: "2025-01-18",
    coursesCount: 12,
  },
  {
    id: "2",
    instructorName: "Prof. Michael Chen",
    amount: 6200,
    status: "approved",
    requestDate: "2025-01-20",
    coursesCount: 8,
  },
  {
    id: "3",
    instructorName: "Dr. Emily Rodriguez",
    amount: 5800,
    status: "pending",
    requestDate: "2025-01-22",
    coursesCount: 10,
  },
  {
    id: "4",
    instructorName: "James Wilson",
    amount: 4500,
    status: "completed",
    requestDate: "2025-01-10",
    completedDate: "2025-01-14",
    coursesCount: 6,
  },
  {
    id: "5",
    instructorName: "Dr. Lisa Anderson",
    amount: 3900,
    status: "pending",
    requestDate: "2025-01-23",
    coursesCount: 7,
  },
];

const generateTopInstructorsColumns =
  (): AdvancedColumnConfig<InstructorWithdrawal>[] => [
    {
      header: "Rank",
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {parseInt(row.original.id)}
          </span>
        </div>
      ),
      size: 80,
    },
    {
      header: "Instructor Name",
      accessorKey: "instructorName",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">
          {row.original.instructorName}
        </div>
      ),
      size: 200,
    },
    {
      header: "Amount",
      accessorKey: "amount",
      cell: ({ row }) => (
        <div className="font-semibold text-green-600">
          ${row.original.amount.toLocaleString()}
        </div>
      ),
      size: 120,
    },
    {
      header: "Courses",
      accessorKey: "coursesCount",
      cell: ({ row }) => (
        <div className="text-center text-gray-700">
          {row.original.coursesCount}
        </div>
      ),
      size: 100,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusConfig = {
          pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
          approved: { bg: "bg-blue-100", text: "text-blue-800", label: "Approved" },
          completed: { bg: "bg-green-100", text: "text-green-800", label: "Completed" },
          rejected: { bg: "bg-red-100", text: "text-red-800", label: "Rejected" },
        };
        const config = statusConfig[status];
        return (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${config.bg} ${config.text}`}
          >
            {config.label}
          </span>
        );
      },
      size: 120,
    },
    {
      header: "Request Date",
      accessorKey: "requestDate",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">{row.original.requestDate}</div>
      ),
      size: 120,
    },
  ];

const WithdrawalsOverView = () => {
  return (
    <div className="space-y-6 py-6">
      {/* Status Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {statusCards.map((card, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900">
                  {card.value}
                </p>
                {card.trend && (
                  <div className="mt-2 flex items-center gap-1">
                    <span
                      className={`text-sm font-medium ${
                        card.trend.trendDirection === "up"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {card.trend.value}
                    </span>
                    <span className="text-xs text-gray-500">
                      {card.trend.description}
                    </span>
                  </div>
                )}
              </div>
              <div>{card.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Top Instructors Table */}
      <Card>
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Top Withdrawal Requests
          </h2>
          <p className="text-sm text-gray-600">
            Recent withdrawal requests from instructors
          </p>
        </div>
        <div className="p-4">
          <AdvancedDataTable
            columns={generateTopInstructorsColumns()}
            data={topInstructors}
            hidePagination
            hideSearch
            hideExport
            hideColumnManager
            cellClassName="text-sm"
            tableClassName="border-none"
          />
        </div>
      </Card>

      {/* Withdrawal Statistics */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Withdrawal Status Distribution
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-700">Completed</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                65% ($81,210)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-700">Approved</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                20% ($25,080)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm text-gray-700">Pending</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                10% ($12,540)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-sm text-gray-700">Rejected</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                5% ($6,270)
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">
            Processing Time
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Average Processing Time</span>
              <span className="text-sm font-semibold text-gray-900">2.3 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Fastest Processing</span>
              <span className="text-sm font-semibold text-green-600">1 day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Longest Processing</span>
              <span className="text-sm font-semibold text-red-600">5 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Requests This Month</span>
              <span className="text-sm font-semibold text-gray-900">44</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WithdrawalsOverView;

