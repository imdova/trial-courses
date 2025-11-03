"use client";
import { Card, CardHeader, CardTitle } from "@/components/UI/card";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { useEffect } from "react";
import { useInstructorWithdrawals } from "@/hooks/useInstructorWithdrawals";
import { generateInstructorWithdrawalsColumns } from "@/components/columns/generateInstructorWithdrawalsColumns";
import { InstructorWithdrawal } from "@/types/withdraw";

const InstructorWithdrawalsTab = () => {
  const { withdrawals, fetching, getInstructorWithdrawals, cached } =
    useInstructorWithdrawals();

  const columns = generateInstructorWithdrawalsColumns();

  useEffect(() => {
    getInstructorWithdrawals();
  }, [getInstructorWithdrawals]);

  const filters: {
    key: keyof InstructorWithdrawal | "placeholder";
    className?: string;
  }[] = [
    { key: "created_at", className: "min-w-32 max-w-44" },
    { key: "placeholder", className: "flex-1" },
    { key: "status", className: "min-w-32 max-w-44" },
    { key: "amount", className: "min-w-32 md:max-w-32" },
    { key: "method", className: "min-w-32 max-w-44" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          Instructor Withdrawals
          <span className="text-muted-foreground ml-1 w-32">
            ({withdrawals?.length || 0})
          </span>
        </CardTitle>
      </CardHeader>
      <AdvancedDataTable
        columns={columns}
        data={withdrawals}
        defaultSorting={{
          id: "created_at",
          desc: true,
        }}
        filters={filters}
        loading={fetching || !cached}
        headerClassName="text-xs"
        cellClassName="text-xs"
        filterClassName="px-5 justify-between"
        paginationClassName="px-5"
        tableClassName="border-t border-b min-h-60 pb-6"
        initialPagination={{
          pageIndex: 0,
          pageSize: 20,
        }}
        hideSearch={false}
        hideExport={false}
        hidePagination={false}
      />
    </Card>
  );
};

export default InstructorWithdrawalsTab;
