"use client";

import { ColumnDef } from "@tanstack/react-table";
import AdvancedDataTable from "../AdvancedDataTable";

interface Booking {
  invoiceId: string;
  date: Date;
  name: string;
  event: string;
  Qty: number;
  status: "Confirmed" | "Pending" | "Cancelled" | "Completed";
}

const RecentBookings = () => {
  // Dummy data for recent bookings
  const dummyData: Booking[] = [
    {
      invoiceId: "INV-001",
      date: new Date(2023, 9, 15),
      name: "John Smith",
      event: "Conference",
      Qty: 2,
      status: "Confirmed",
    },
    {
      invoiceId: "INV-002",
      date: new Date(2023, 9, 16),
      name: "Emily Johnson",
      event: "Workshop",
      Qty: 1,
      status: "Pending",
    },
    {
      invoiceId: "INV-003",
      date: new Date(2023, 9, 17),
      name: "Michael Brown",
      event: "Seminar",
      Qty: 4,
      status: "Completed",
    },
    {
      invoiceId: "INV-004",
      date: new Date(2023, 9, 18),
      name: "Sarah Davis",
      event: "Networking",
      Qty: 3,
      status: "Cancelled",
    },
    {
      invoiceId: "INV-005",
      date: new Date(2023, 9, 19),
      name: "Robert Wilson",
      event: "Conference",
      Qty: 2,
      status: "Confirmed",
    },
    {
      invoiceId: "INV-006",
      date: new Date(2023, 9, 20),
      name: "Jennifer Taylor",
      event: "Workshop",
      Qty: 1,
      status: "Pending",
    },
    {
      invoiceId: "INV-007",
      date: new Date(2023, 9, 21),
      name: "David Miller",
      event: "Seminar",
      Qty: 5,
      status: "Completed",
    },
    {
      invoiceId: "INV-008",
      date: new Date(2023, 9, 22),
      name: "Lisa Anderson",
      event: "Networking",
      Qty: 2,
      status: "Confirmed",
    },
  ];

  // Column definitions
  const columns: ColumnDef<Booking>[] = [
    {
      accessorKey: "invoiceId",
      header: "Invoice ID",
      meta: {
        filterVariant: "text",
      },
    },
    {
      accessorKey: "date",
      accessorFn: (row) => new Date(row.date!).getTime(),
      header: "Date",
      cell: ({ row }) => {
        return row.original.date.toLocaleDateString();
      },
      meta: {
        filterVariant: "date-range",
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      meta: {
        filterVariant: "text",
      },
    },
    {
      accessorKey: "event",
      header: "Event",
      meta: {
        filterVariant: "select",
      },
    },
    {
      accessorKey: "Qty",
      header: "Quantity",
      meta: {
        filterVariant: "range",
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: {
        filterVariant: "select",
      },
      cell: ({ row }) => {
        const status = row.original.status;
        let statusClass = "";

        switch (status) {
          case "Confirmed":
            statusClass =
              "text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs";
            break;
          case "Pending":
            statusClass =
              "text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full text-xs";
            break;
          case "Cancelled":
            statusClass =
              "text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs";
            break;
          case "Completed":
            statusClass =
              "text-blue-600 bg-blue-100 px-2 py-1 rounded-full text-xs";
            break;
        }

        return <span className={statusClass}>{status}</span>;
      },
    },
  ];

  return (
    <div>
      <h2 className="mb-4 px-2 text-lg font-bold">Recent Bookings</h2>
      <AdvancedDataTable<Booking>
        name="Recent Bookings"
        columns={columns}
        data={dummyData}
        hidePagination={true}
        hideSearch={false}
        hideExport={true}
        hideColumnManager={true}
        initialPagination={{ pageIndex: 0, pageSize: 5 }}
        defaultSorting={{ id: "date", desc: true }}
        tableClassName=""
        headerClassName="font-semibold"
        cellClassName="py-3"
      />
    </div>
  );
};

export default RecentBookings;
