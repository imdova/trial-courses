"use client";

import * as React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  Tag,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Send,
  FileText,
  Edit,
  Archive,
} from "lucide-react";
import { FilterConfigTable, Invoice } from "@/types";
import { invoices } from "@/constants/invoices";
import { generateInvoicePDF } from "@/util";

const InvoicesTable: React.FC = () => {
  const filterConfig: FilterConfigTable[] = [
    {
      id: "status",
      label: "Status",
      options: [
        {
          value: "Paid",
          label: "Paid",
          count: invoices.filter((i) => i.status === "Paid").length,
        },
        {
          value: "Pending",
          label: "Pending",
          count: invoices.filter((i) => i.status === "Pending").length,
        },
        {
          value: "Cancelled",
          label: "Cancelled",
          count: invoices.filter((i) => i.status === "Cancelled").length,
        },
      ],
      placeholder: "Select status",
      icon: Tag,
    },
    {
      id: "currency",
      label: "Currency",
      options: [
        {
          value: "EGP",
          label: "EGP",
        },
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "SAR",
          label: "SAR",
        },
      ],
      placeholder: "Select currency",
      icon: Tag,
    },
  ];

  const handleDownloadPDF = (invoice: Invoice) => {
    try {
      generateInvoicePDF(invoice);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const columns = [
    {
      key: "invoiceNumber",
      header: "Invoice #",
      sortable: true,
      render: (invoice: Invoice) => (
        <span className="font-medium text-xs">{invoice.invoiceNumber}</span>
      ),
    },
    {
      key: "student",
      header: "Student",
      sortable: true,
      render: (invoice: Invoice) => (
        <div>
          <div className="font-medium text-sm">{invoice.student.name}</div>
          <div className="text-sm text-gray-500">{invoice.student.email}</div>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      sortable: true,
      render: (invoice: Invoice) => (
        <span className="text-sm">{invoice.subject}</span>
      ),
    },
    {
      key: "issueDate",
      header: "Issue Date",
      sortable: true,
      render: (invoice: Invoice) => (
        <span className="text-sm">{invoice.issueDate}</span>
      ),
    },
    {
      key: "dueDate",
      header: "Due Date",
      sortable: true,
      render: (invoice: Invoice) => (
        <span className="text-sm">{invoice.dueDate}</span>
      ),
    },
    {
      key: "total",
      header: "Amount",
      sortable: true,
      render: (invoice: Invoice) => (
        <span className="text-sm">
          {invoice.total.toLocaleString()} {invoice.currency}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (invoice: Invoice) => {
        const statusClasses = {
          Paid: "bg-green-100 text-green-800",
          Pending: "bg-yellow-100 text-yellow-800",
          Cancelled: "bg-gray-100 text-gray-800",
        };

        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              statusClasses[invoice.status]
            }`}
          >
            {invoice.status === "Paid" ? (
              <CheckCircle size={14} />
            ) : invoice.status === "Cancelled" ? (
              <XCircle size={14} />
            ) : (
              <Clock size={14} />
            )}
            {invoice.status}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      actions: {
        primaryActions: [
          {
            label: "Download",
            icon: <Download size={14} />,
            onClick: (invoice: Invoice) => handleDownloadPDF(invoice),
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
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <React.Suspense fallback={<div>Loading...</div>}>
        <DynamicTableFilter
          filters={filterConfig}
          columns={5}
          showSearch={true}
          showClearAll={true}
          className="mb-6"
        />
      </React.Suspense>
      <DynamicTable<Invoice>
        data={invoices}
        columns={columns}
        pagination={true}
        itemsPerPage={10}
        className="border border-gray-200 rounded-lg"
        headerClassName="bg-gray-100 text-gray-700"
        rowClassName="hover:bg-gray-50 border-b"
        cellClassName="p-3"
        emptyMessage="No invoices found"
        rowIdKey="id"
        selectable
      />
    </div>
  );
};

export default InvoicesTable;
