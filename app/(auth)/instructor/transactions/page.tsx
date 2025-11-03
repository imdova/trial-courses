"use client";
import { Card, CardHeader, CardTitle } from "@/components/UI/card";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { useEffect } from "react";
import { useCourseTransactions } from "@/hooks/useCourseTransactions";
import { generateCourseTransactionsColumns } from "@/components/columns/generateCourseTransactionsColumns";
import { CourseTransaction } from "@/types/transaction";

const TransactionsPage = () => {
  const { transactions, fetching, getCourseTransactions, cached } =
    useCourseTransactions();

  const columns = generateCourseTransactionsColumns();

  useEffect(() => {
    getCourseTransactions();
  }, [getCourseTransactions]);

  const filters: {
    key: keyof CourseTransaction | "placeholder";
    className?: string;
  }[] = [
    { key: "created_at", className: "min-w-32 max-w-44" },
    { key: "placeholder", className: "flex-1" },
    { key: "type", className: "min-w-32 max-w-44" },
    { key: "amount", className: "min-w-32 md:max-w-32" },
    { key: "method", className: "min-w-32 max-w-44" },
  ];

  return (
    <div className="px-5">
      <CardHeader className="mb-5 px-0">
        <CardTitle className="text-2xl">
          All Transactions
          <span className="text-muted-foreground ml-1 w-32">
            ({transactions?.length})
          </span>
        </CardTitle>
      </CardHeader>
      <Card>
        <AdvancedDataTable
          columns={columns}
          data={transactions}
          defaultSorting={{
            id: "id",
            desc: true,
          }}
          filters={filters}
          loading={fetching || cached === null}
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
    </div>
  );
};

export default TransactionsPage;
