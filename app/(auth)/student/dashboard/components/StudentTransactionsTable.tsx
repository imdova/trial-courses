"use client";

import { Archive, DollarSign, Edit, FileText, Send } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import { Suspense } from "react";

interface Transaction {
  id: number;
  TransactionID: string;
  Date: string;
  PaymentMethod: string;
  Amount: string;
  Status: "Completed" | "Pending" | "Failed" | "Refunded";
  [key: string]: unknown;
}

const StudentTransactionsData: Transaction[] = [
  {
    id: 1,
    TransactionID: "STU-001",
    Date: "2023-10-15",
    PaymentMethod: "Credit Card",
    Amount: "1,200 EGP",
    Status: "Completed",
  },
  {
    id: 2,
    TransactionID: "STU-002",
    Date: "2023-10-16",
    PaymentMethod: "Bank Transfer",
    Amount: "500 EGP",
    Status: "Pending",
  },
  {
    id: 3,
    TransactionID: "STU-003",
    Date: "2023-10-17",

    PaymentMethod: "Cash",
    Amount: "300 EGP",
    Status: "Completed",
  },
  {
    id: 4,
    TransactionID: "STU-004",
    Date: "2023-10-18",
    PaymentMethod: "Credit Card",
    Amount: "1,750 EGP",
    Status: "Failed",
  },
  {
    id: 5,
    TransactionID: "STU-005",
    Date: "2023-10-19",

    PaymentMethod: "PayPal",
    Amount: "200 EGP",
    Status: "Refunded",
  },
];

const StudentTransactionsTable = () => {
  const columns = [
    {
      key: "TransactionID",
      header: "Transaction ID",
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
          Completed: "text-green-600 bg-green-50 border-green-100",
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
            label: "Receipt",
            icon: <FileText size={15} />,
            onClick: () => console.log("Receipt clicked"),
            className: "text-blue-600 hover:bg-blue-50",
          },
          {
            label: "Refund",
            icon: <DollarSign size={15} />,
            onClick: () => console.log("Refund clicked"),
            className: "text-purple-600 hover:bg-purple-50",
          },
        ],
        dropdownActions: [
          {
            label: "View Details",
            icon: <FileText size={14} />,
            onClick: () => console.log("View Details clicked"),
          },
          {
            label: "Edit",
            icon: <Edit size={14} />,
            onClick: () => console.log("Edit clicked"),
          },
          {
            label: "Contact Student",
            icon: <Send size={14} />,
            onClick: () => console.log("Contact clicked"),
          },
          {
            label: "Archive",
            icon: <Archive size={14} />,
            onClick: () => console.log("Archive clicked"),
          },
        ],
      },
    },
  ];

  return (
    <div className="rounded-lg bg-white border border-gray-200 p-3 shadow-sm">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold">My Transactions</h1>
          <p className="text-sm text-gray-600">View all your transactions</p>
        </div>
      </div>
      <Suspense>
        <DynamicTableFilter
          columns={3}
          showSearch={true}
          showClearAll={true}
          className="mb-6"
        />
      </Suspense>

      <DynamicTable<Transaction>
        data={StudentTransactionsData}
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

export default StudentTransactionsTable;
