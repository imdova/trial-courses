"use client";

import { Suspense, useCallback, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/util";

interface PaginationProps {
  fixedNumberPerPage?: number;
  initialNumberPerPage?: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  fixedNumberPerPage,
  initialNumberPerPage = 10,
  totalItems,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage =
    fixedNumberPerPage ||
    Number(searchParams.get("limit")) ||
    initialNumberPerPage;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLimit = parseInt(event.target.value);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("limit", newLimit.toString());
    newParams.set("page", "1");
    router.push(createUrl(pathName, newParams), { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", page.toString());
    router.push(createUrl(pathName, newParams), { scroll: false });
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      router.push(`?${createQueryString("page", totalPages.toString())}`, {
        scroll: false,
      });
    }
  }, [totalItems, currentPage, totalPages, router, createQueryString]);

  if (totalPages < 2 && itemsPerPage === initialNumberPerPage) return null;

  return (
    <div
      className={`${
        fixedNumberPerPage ? "justify-center" : "justify-between"
      } mt-2 flex items-center gap-2 rounded-[10px] border border-gray-200 bg-white p-2 shadow-soft`}
    >
      {/* Items Per Page Selector */}
      {!fixedNumberPerPage && (
        <div className="flex items-center gap-2 px-2 md:pl-12">
          <span>View:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-primary focus:outline-none"
          >
            {[5, 10, 20, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Custom Pagination Buttons */}
      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 text-sm rounded border ${
                isActive
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};

const CustomPagination: React.FC<PaginationProps> = (props) => {
  return (
    <Suspense>
      <Pagination {...props} />
    </Suspense>
  );
};

export default CustomPagination;
