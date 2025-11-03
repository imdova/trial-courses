"use client";

import { useState } from "react";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { generateAdminQuizesColumns } from "@/components/columns/adminQuizesColumns";
import { AdminQuiz } from "@/store/slices/admin-quizzes.slice";
import { useAdminQuizzes } from "@/hooks/useAdminQuizzes";
import Loading from "@/components/loading/loading";
import { Button } from "@/components/UI/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function QuizzesListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const { quizzes, pagination, loading, getQuizzes } = useAdminQuizzes(true, pageSize);

  const columns = generateAdminQuizesColumns();

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    getQuizzes(newPage, pageSize);
  };

  if (loading && quizzes.length === 0) {
    return <Loading />;
  }

  return (
    <div className="relative grid grid-cols-1 rounded-lg border border-gray-200 bg-white p-3">
      <div className="gap-4 border-b border-gray-200 p-2 pb-3 md:flex-row">
        <h2 className="mb-1 text-2xl font-semibold">All Quizzes</h2>
        <p className="text-xs text-gray-600">
          {pagination ? `Showing ${quizzes.length} of ${pagination.total} quizzes` : "Loading..."}
        </p>
      </div>

      <div className="py-3">
        <AdvancedDataTable<AdminQuiz>
          data={quizzes}
          columns={columns}
          hidePagination={true}
          hideSearch={false}
          hideExport={false}
          hideColumnManager={false}
          initialPagination={{
            pageIndex: 0,
            pageSize: pageSize,
          }}
          cellClassName="p-3 text-sm"
          headerClassName="text-sm uppercase text-gray-500 bg-gray-100"
          tableClassName="rounded-lg border"
        />

        {/* Custom Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-600">
              Page {pagination.page} of {pagination.totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!pagination.hasPrev || loading}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex items-center gap-1">
                {[...Array(Math.min(pagination.totalPages, 5))].map((_, idx) => {
                  const pageNumber = idx + 1;
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      disabled={loading}
                      className="h-8 w-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                {pagination.totalPages > 5 && (
                  <>
                    <span className="px-2 text-gray-400">...</span>
                    <Button
                      variant={currentPage === pagination.totalPages ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pagination.totalPages)}
                      disabled={loading}
                      className="h-8 w-8 p-0"
                    >
                      {pagination.totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!pagination.hasNext || loading}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

