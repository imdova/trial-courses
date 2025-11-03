"use client";

import { generateTicketsColumns } from "@/components/columns/ticketsColumns";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Ticket } from "@/types/ticket";
import { Card } from "@/components/UI/card";
import { tickets } from "@/constants/tickets";

export default function TicketsPage() {
  // Convert ColumnConfig to ColumnDef for AdvancedDataTable
  const columns = generateTicketsColumns();

  return (
    <div className="px-3">
      <Card className="p-3">
        {/* Header Controls */}
        <div className="gap-4 border-b border-gray-200 p-2 pb-3 md:flex-row">
          <h2 className="mb-1 text-2xl font-semibold">Tickets</h2>
          <p className="text-xs text-gray-600">List of all support tickets</p>
        </div>

        <div className="py-3">
          {/* Advanced Data Table */}
          <AdvancedDataTable<Ticket>
            data={tickets}
            columns={columns}
            hidePagination={false}
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
            filters={[
              { key: "subject", className: "min-w-32" },
              { key: "priority", className: "min-w-32" },
              { key: "status", className: "min-w-32" },
            ]}
            hideSearch={false}
            hideExport={false}
            hideColumnManager={false}
            cellClassName="p-3 text-sm"
            headerClassName="text-sm uppercase text-gray-500 bg-gray-100"
            tableClassName="rounded-lg border"
          />
        </div>
      </Card>
    </div>
  );
}
