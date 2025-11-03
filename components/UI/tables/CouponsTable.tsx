"use client";

import * as React from "react";
import DynamicTable from "@/components/UI/tables/DTable";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  Tag,
  Percent,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  SquarePen,
  Send,
  FileText,
  Edit,
  Archive,
} from "lucide-react";
import { Coupon, FilterConfigTable } from "@/types";
import { coupons } from "@/constants/coupons";

const CouponsTable: React.FC = () => {
  const filterConfig: FilterConfigTable[] = [
    {
      id: "status",
      label: "Status",
      options: [
        {
          value: "Active",
          label: "Active",
          count: coupons.filter((c) => c.status === "Active").length,
        },
        {
          value: "Expired",
          label: "Expired",
          count: coupons.filter((c) => c.status === "Expired").length,
        },
        {
          value: "Inactive",
          label: "Inactive",
          count: coupons.filter((c) => c.status === "Inactive").length,
        },
      ],
      placeholder: "Select status",
      icon: Tag,
    },
    {
      id: "mode",
      label: "Mode",
      options: [
        {
          value: "Coupon",
          label: "Coupon",
          count: coupons.filter((c) => c.mode === "Coupon").length,
        },
        {
          value: "Voucher",
          label: "Voucher",
          count: coupons.filter((c) => c.mode === "Voucher").length,
        },
      ],
      placeholder: "Select mode",
      icon: Tag,
    },
    {
      id: "offerType",
      label: "Offer Type",
      options: [
        {
          value: "Flat",
          label: "Flat",
          count: coupons.filter((c) => c.offerType === "Flat").length,
        },
        {
          value: "Percentage",
          label: "Percentage",
          count: coupons.filter((c) => c.offerType === "Percentage").length,
        },
      ],
      placeholder: "Select type",
      icon: Percent,
    },
  ];

  const columns = [
    {
      key: "offerName",
      header: "Offer Name",
      sortable: true,
      render: (coupon: Coupon) => (
        <span className="font-medium">{coupon.offerName}</span>
      ),
    },
    {
      key: "mode",
      header: "Mode",
      sortable: true,
      render: (coupon: Coupon) => <span>{coupon.mode}</span>,
    },
    {
      key: "offerType",
      header: "Offer Type",
      sortable: true,
      render: (coupon: Coupon) => <span>{coupon.offerType}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (coupon: Coupon) => <span>{coupon.amount}</span>,
    },
    {
      key: "startDate",
      header: "Start Date",
      sortable: true,
      render: (coupon: Coupon) => <span>{coupon.startDate}</span>,
    },
    {
      key: "endDate",
      header: "End Date",
      sortable: true,
      render: (coupon: Coupon) => <span>{coupon.endDate}</span>,
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (coupon: Coupon) => {
        const statusClasses = {
          Active: "bg-green-100 text-green-800",
          Expired: "bg-red-100 text-red-800",
          Inactive: "bg-gray-100 text-gray-800",
        };

        return (
          <span
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              statusClasses[coupon.status]
            }`}
          >
            {coupon.status === "Active" ? (
              <CheckCircle size={14} />
            ) : coupon.status === "Expired" ? (
              <XCircle size={14} />
            ) : (
              <Clock size={14} />
            )}
            {coupon.status}
          </span>
        );
      },
    },
    {
      key: "totalUsage",
      header: "Total Usage",
      sortable: true,
      render: (coupon: Coupon) => (
        <span>{coupon.totalUsage.toLocaleString()}</span>
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
      <DynamicTable<Coupon>
        data={coupons}
        columns={columns}
        pagination={true}
        itemsPerPage={10}
        className="border border-gray-200 rounded-lg"
        headerClassName="bg-gray-100 text-gray-700"
        rowClassName="hover:bg-gray-50 border-b"
        cellClassName="p-3"
        emptyMessage="No coupons found"
        rowIdKey="id"
        selectable
        showRowNumbers
      />
    </div>
  );
};

export default CouponsTable;
