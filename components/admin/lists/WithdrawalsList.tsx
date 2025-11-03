"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Input } from "@/components/UI/input";
import { Label } from "@/components/UI/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import {
  Check,
  X,
  Eye,
  Download,
  Search,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";

interface Withdrawal {
  id: string;
  instructorId: string;
  instructorName: string;
  instructorEmail: string;
  instructorPhotoUrl?: string;
  amount: number;
  requestDate: string;
  status: "pending" | "approved" | "rejected" | "completed";
  paymentMethod: string;
  bankAccount?: string;
  notes?: string;
  approvedBy?: string;
  approvedDate?: string;
  completedDate?: string;
  coursesEarnings: number;
}

// Mock withdrawal data
const withdrawalData: Withdrawal[] = [
  {
    id: "WD001",
    instructorId: "INS001",
    instructorName: "Dr. Sarah Johnson",
    instructorEmail: "sarah.johnson@email.com",
    instructorPhotoUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    amount: 8500,
    requestDate: "2025-01-20",
    status: "completed",
    paymentMethod: "Bank Transfer",
    bankAccount: "****1234",
    approvedBy: "Admin John",
    approvedDate: "2025-01-21",
    completedDate: "2025-01-22",
    coursesEarnings: 12000,
  },
  {
    id: "WD002",
    instructorId: "INS002",
    instructorName: "Prof. Michael Chen",
    instructorEmail: "michael.chen@email.com",
    instructorPhotoUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    amount: 6200,
    requestDate: "2025-01-22",
    status: "approved",
    paymentMethod: "Bank Transfer",
    bankAccount: "****5678",
    approvedBy: "Admin Sarah",
    approvedDate: "2025-01-23",
    coursesEarnings: 8800,
  },
  {
    id: "WD003",
    instructorId: "INS003",
    instructorName: "Dr. Emily Rodriguez",
    instructorEmail: "emily.rodriguez@email.com",
    instructorPhotoUrl: "https://randomuser.me/api/portraits/women/3.jpg",
    amount: 5800,
    requestDate: "2025-01-23",
    status: "pending",
    paymentMethod: "Bank Transfer",
    bankAccount: "****9012",
    coursesEarnings: 7200,
  },
  {
    id: "WD004",
    instructorId: "INS004",
    instructorName: "James Wilson",
    instructorEmail: "james.wilson@email.com",
    instructorPhotoUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    amount: 4500,
    requestDate: "2025-01-18",
    status: "completed",
    paymentMethod: "PayPal",
    approvedBy: "Admin John",
    approvedDate: "2025-01-19",
    completedDate: "2025-01-20",
    coursesEarnings: 6000,
  },
  {
    id: "WD005",
    instructorId: "INS005",
    instructorName: "Dr. Lisa Anderson",
    instructorEmail: "lisa.anderson@email.com",
    instructorPhotoUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    amount: 3900,
    requestDate: "2025-01-24",
    status: "rejected",
    paymentMethod: "Bank Transfer",
    bankAccount: "****3456",
    notes: "Insufficient documentation",
    coursesEarnings: 5500,
  },
];

const WithdrawalsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const columns: ColumnDef<Withdrawal>[] = [
    {
      accessorKey: "id",
      header: "Withdrawal ID",
      cell: ({ row }) => (
        <span className="font-mono text-xs text-gray-600">
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "instructorName",
      header: "Instructor",
      cell: ({ row }) => {
        const withdrawal = row.original;
        const nameParts = withdrawal.instructorName.split(" ");
        const initials =
          nameParts.length >= 2
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
            : withdrawal.instructorName.substring(0, 2);

        return (
          <Link
            href={`/admin/instructors/${withdrawal.instructorId}`}
            className="flex items-center gap-3 hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={withdrawal.instructorPhotoUrl}
                alt={withdrawal.instructorName}
              />
              <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
                {initials.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                {withdrawal.instructorName}
              </div>
              <div className="text-xs text-gray-500">
                {withdrawal.instructorEmail}
              </div>
            </div>
          </Link>
        );
      },
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <div className="font-semibold text-green-600">
          ${row.original.amount.toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      cell: ({ row }) => (
        <div className="text-sm text-gray-700">
          {row.original.paymentMethod}
          {row.original.bankAccount && (
            <div className="text-xs text-gray-500">{row.original.bankAccount}</div>
          )}
        </div>
      ),
    },
    {
      accessorKey: "requestDate",
      header: "Request Date",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          {new Date(row.original.requestDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status;
        const statusConfig = {
          pending: {
            className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
            label: "Pending",
          },
          approved: {
            className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
            label: "Approved",
          },
          completed: {
            className: "bg-green-100 text-green-800 hover:bg-green-100",
            label: "Completed",
          },
          rejected: {
            className: "bg-red-100 text-red-800 hover:bg-red-100",
            label: "Rejected",
          },
        };
        const config = statusConfig[status];
        return <Badge className={config.className}>{config.label}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const withdrawal = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem asChild>
                <Link href={`/admin/withdrawals/${withdrawal.id}`}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {withdrawal.status === "pending" && (
                <>
                  <DropdownMenuItem
                    className="text-green-600 focus:text-green-700 focus:bg-green-50"
                    onClick={() => console.log("Approve:", withdrawal.id)}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve Request
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600 focus:text-red-700 focus:bg-red-50"
                    onClick={() => console.log("Reject:", withdrawal.id)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject Request
                  </DropdownMenuItem>
                </>
              )}
              {withdrawal.status === "approved" && (
                <DropdownMenuItem
                  className="text-blue-600 focus:text-blue-700 focus:bg-blue-50"
                  onClick={() => console.log("Mark Completed:", withdrawal.id)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Mark as Completed
                </DropdownMenuItem>
              )}
              {(withdrawal.status === "completed" || withdrawal.status === "rejected") && (
                <DropdownMenuItem
                  onClick={() => console.log("Download Receipt:", withdrawal.id)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const filteredData = withdrawalData.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.instructorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.instructorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      withdrawal.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || withdrawal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <Card className="mt-6">
      <CardHeader className="border-b">
        <CardTitle className="text-lg">Withdrawal Requests</CardTitle>
        <CardDescription>
          Manage and process instructor withdrawal requests
        </CardDescription>
      </CardHeader>

      {/* Filters */}
      <div className="border-b p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                placeholder="Search by instructor or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 flex items-end">
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <CardContent className="p-0">
        <AdvancedDataTable
          columns={columns}
          data={filteredData}
          hidePagination={false}
          hideSearch={true}
          hideExport={true}
          hideColumnManager={true}
          cellClassName="text-sm"
          tableClassName="border-none"
          initialPagination={{
            pageIndex: 0,
            pageSize: 10,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default WithdrawalsList;

