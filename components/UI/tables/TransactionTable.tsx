"use client";

import {
  Archive,
  ChartPie,
  CreditCard,
  DollarSign,
  Edit,
  FileText,
  Send,
  SquarePen,
  Trash2,
} from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import { FilterConfigTable } from "@/types";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import { Suspense } from "react";
import Image from "next/image";

interface Transaction {
  id: number;
  InvoiceNumber: string;
  Date: string;
  StudentName: string;
  StudentAvatar?: string;
  Course: string;
  PaymentMethod: string;
  Amount: string;
  Status: "Paid" | "Pending" | "Failed" | "Refunded";
  [key: string]: unknown;
}

const TransactionsData: Transaction[] = [
  {
    id: 1,
    InvoiceNumber: "#EDU-5421",
    Date: "2023-10-15",
    StudentName: "Ahmed Mohamed",
    StudentAvatar: "/avatars/student1.jpg",
    Course: "Advanced Mathematics",
    PaymentMethod: "Credit Card",
    Amount: "1,200 EGP",
    Status: "Paid",
  },
  {
    id: 2,
    InvoiceNumber: "#EDU-5422",
    Date: "2023-10-16",
    StudentName: "Mariam Ali",
    StudentAvatar: "/avatars/student2.jpg",
    Course: "Physics 101",
    PaymentMethod: "Bank Transfer",
    Amount: "1,500 EGP",
    Status: "Pending",
  },
  {
    id: 3,
    InvoiceNumber: "#EDU-5423",
    Date: "2023-10-17",
    StudentName: "Omar Khaled",
    StudentAvatar: "/avatars/student3.jpg",
    Course: "Chemistry Lab",
    PaymentMethod: "Cash",
    Amount: "800 EGP",
    Status: "Paid",
  },
  {
    id: 4,
    InvoiceNumber: "#EDU-5424",
    Date: "2023-10-18",
    StudentName: "Lina Samir",
    StudentAvatar: "/avatars/student4.jpg",
    Course: "Biology Advanced",
    PaymentMethod: "Credit Card",
    Amount: "1,750 EGP",
    Status: "Failed",
  },
  {
    id: 5,
    InvoiceNumber: "#EDU-5425",
    Date: "2023-10-19",
    StudentName: "Karim Hassan",
    StudentAvatar: "/avatars/student5.jpg",
    Course: "Computer Science",
    PaymentMethod: "PayPal",
    Amount: "2,000 EGP",
    Status: "Refunded",
  },
];

const filterConfig: FilterConfigTable[] = [
  {
    id: "status",
    label: "Transaction Status",
    options: [
      { value: "completed", label: "Completed", count: 120 },
      { value: "pending", label: "Pending", count: 45 },
      { value: "failed", label: "Failed", count: 15 },
      { value: "refunded", label: "Refunded", count: 8 },
    ],
    placeholder: "Select status",
    icon: ChartPie,
  },
  {
    id: "amount",
    label: "Amount Range",
    options: [
      { value: "0-50", label: "$0 - $50" },
      { value: "50-200", label: "$50 - $200" },
      { value: "200-1000", label: "$200 - $1,000" },
      { value: "1000+", label: "$1,000+" },
    ],
    icon: DollarSign,
  },
  {
    id: "method",
    label: "Payment Method",
    options: [
      { value: "credit_card", label: "Credit Card", count: 70 },
      { value: "paypal", label: "PayPal", count: 40 },
      { value: "bank_transfer", label: "Bank Transfer", count: 25 },
      { value: "cash", label: "Cash", count: 12 },
    ],
    isSearchable: true,
    isMulti: true,
    icon: CreditCard,
  },
];

const TransactionsTable = () => {
  const columns = [
    {
      key: "InvoiceNumber",
      header: "Invoice #",
      sortable: true,
      width: "120px",
    },
    {
      key: "Date",
      header: "Date",
      sortable: true,
      width: "100px",
    },
    {
      key: "StudentName",
      header: "Student",
      sortable: true,
      width: "180px",
      render: (item: Transaction) => (
        <div className="flex items-center gap-2">
          <Image
            width={300}
            height={300}
            src={item.StudentAvatar || "/default-avatar.png"}
            alt={item.StudentName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span>{item.StudentName}</span>
        </div>
      ),
    },
    {
      key: "Course",
      header: "Course",
      sortable: true,
      width: "150px",
    },
    {
      key: "PaymentMethod",
      header: "Payment Method",
      sortable: true,
      width: "140px",
    },
    {
      key: "Status",
      header: "Status",
      sortable: true,
      width: "120px",
      render: (item: Transaction) => {
        const statusStyles = {
          Paid: "text-green-600 bg-green-50 border-green-100",
          Pending: "text-amber-600 bg-amber-50 border-amber-100",
          Failed: "text-red-600 bg-red-50 border-red-100",
          Refunded: "text-blue-600 bg-blue-50 border-blue-100",
        };
        return (
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
              statusStyles[item.Status]
            }`}
          >
            {item.Status}
          </span>
        );
      },
    },
    {
      key: "Amount",
      header: "Amount",
      sortable: true,
      width: "120px",
      align: "right",
      render: (item: Transaction) => (
        <span className="font-medium text-sm">{item.Amount}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      align: "right",
      actions: {
        primaryActions: [
          {
            label: "Delete",
            icon: <Trash2 size={15} />,
            onClick: () => console.log("Delete clicked"),
            className: "text-red-600 hover:bg-red-50",
          },
          {
            label: "Editt",
            icon: <SquarePen size={15} />,
            onClick: () => console.log("Edit clicked"),
            className: "text-green-600 hover:bg-green-50",
          },
        ],
        dropdownActions: [
          {
            label: "Publish",
            icon: <Send size={14} />,
            onClick: () => console.log("Publish clicked"),
          },
          {
            label: "Quick Edit",
            icon: <FileText size={14} />,
            onClick: () => console.log("Quick Edit clicked"),
          },
          {
            label: "Edit",
            icon: <Edit size={14} />,
            onClick: () => console.log("Edit clicked"),
          },
          {
            label: "Archive",
            icon: <Archive size={14} />,
            onClick: () => console.log("Archive clicked"),
            className: "text-orange-600",
          },
        ],
      },
    },
  ];
  return (
    <div className="rounded-lg bg-white p-2 shadow-sm">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-gray-600">
            View and manage all transactions
          </p>
        </div>
      </div>
      <Suspense>
        <DynamicTableFilter
          filters={filterConfig}
          columns={3}
          showSearch={true}
          showClearAll={true}
          className="mb-6"
        />
      </Suspense>

      <DynamicTable<Transaction>
        data={TransactionsData}
        columns={columns}
        pagination={true}
        itemsPerPage={10}
        headerClassName="bg-gray-50 text-gray-700 font-medium"
        rowClassName="hover:bg-gray-50"
        cellClassName="py-3 px-4 text-sm"
        emptyMessage="No transactions found"
        defaultSort={{ key: "Date", direction: "desc" }}
        selectable
        showRowNumbers
      />
    </div>
  );
};

export default TransactionsTable;
