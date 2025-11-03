"use client";

import { generateAcademiesColumns } from "@/components/columns/academiesColumns";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Academy } from "@/types/academy";
import { Card } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function AcademiesPage() {
  const columns = generateAcademiesColumns();

  return (
    <div className="px-3">
      <Card className="p-3">
        {/* Header Controls */}
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 p-2 pb-3 md:flex-row">
          <div>
            <h2 className="mb-1 text-2xl font-semibold">Academies</h2>
            <p className="text-xs text-gray-600">
              List of all educational academies
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin/add-academy">
              <Plus />
              Create Academy
            </Link>
          </Button>
        </div>

        <div className="py-3">
          {/* Advanced Data Table */}
          <AdvancedDataTable<Academy>
            // TODO: fetch data from API
            data={[]}
            columns={columns}
            hidePagination={false}
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
            filters={[
              { key: "category", className: "min-w-32" },
              { key: "type", className: "min-w-32" },
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
