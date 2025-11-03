"use client";
import { Card, CardHeader, CardTitle } from "@/components/UI/card";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { useEffect } from "react";
import { useInstructorWithdrawals } from "@/hooks/useInstructorWithdrawals";
import { generateInstructorWithdrawalsColumns } from "@/components/columns/generateInstructorWithdrawalsColumns";

const InstructorRecentWithdrawals = () => {
  const { withdrawals, fetching, getInstructorWithdrawals, cached } =
    useInstructorWithdrawals();

  const columns = generateInstructorWithdrawalsColumns({ isMinimal: true });

  useEffect(() => {
    getInstructorWithdrawals();
  }, [getInstructorWithdrawals]);

  return (
    <div>
      <CardHeader className="mb-5 px-0">
        <CardTitle>
          Recent Withdrawals
          <span className="text-muted-foreground ml-1 w-32">
            ({withdrawals?.length || 0})
          </span>
        </CardTitle>
      </CardHeader>
      <Card className="p-0">
        <AdvancedDataTable
          columns={columns}
          data={withdrawals}
          defaultSorting={{
            id: "created_at",
            desc: true,
          }}
          loading={fetching || !cached}
          headerClassName="text-xs"
          cellClassName="text-xs"
          filterClassName="px-5 justify-between"
          paginationClassName="px-5"
          tableClassName="p-0"
          initialPagination={{
            pageIndex: 0,
            pageSize: 20,
          }}
        />
      </Card>
    </div>
  );
};

export default InstructorRecentWithdrawals;
