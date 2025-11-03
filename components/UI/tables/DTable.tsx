import { ArrowDownNarrowWide, ArrowUpWideNarrow, Ellipsis } from "lucide-react";
import React, { useState, useMemo, useRef, useEffect } from "react";

type ActionItem<T> = {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  className?: string;
  disabled?: boolean | ((item: T) => boolean);
  divider?: boolean;
  showLabel?: boolean;
};

type ColumnDefinition<T> = {
  key: string | number | keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: string;
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
  actions?: {
    primaryActions?: ActionItem<T>[];
    dropdownActions?: ActionItem<T>[];
  };
};

type SortDirection = "asc" | "desc" | null;

type DynamicTableProps<T> = {
  data: T[];
  columns: ColumnDefinition<T>[];
  pagination?: boolean;
  itemsPerPage?: number;
  className?: string;
    currentPage?: number;
  totalItems?: number; 
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  emptyMessage?: string;
  minWidth?: string;
  selectable?: boolean;
  onSelectionChange?: (selectedItems: T[]) => void;
  rowIdKey?: keyof T;
  defaultSort?: {
    key: keyof T;
    direction: SortDirection;
  };
  showRowNumbers?: boolean;
    onPageChange?: (page: number) => void;
  loading?: boolean;
};

interface OptionsDropdownProps<T> {
  primaryActions?: ActionItem<T>[];
  dropdownActions?: ActionItem<T>[];
  item: T;
}

const OptionsDropdown = <T extends object>({
  primaryActions = [],
  dropdownActions = [],
  item,
}: OptionsDropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleActionClick = (action: ActionItem<T>) => {
    action.onClick(item);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex items-center gap-2 relative" ref={dropdownRef}>
      {/* Primary actions (always visible) */}
      {primaryActions.map((action, index) => {
        const isDisabled =
          typeof action.disabled === "function"
            ? action.disabled(item)
            : action.disabled;

        return (
          <button
            key={`primary-${index}`}
            onClick={() => !isDisabled && handleActionClick(action)}
            disabled={isDisabled}
            className={`flex items-center gap-1 p-1 rounded-md text-sm hover:bg-gray-100 ${
              action.className || "text-gray-600 hover:text-gray-900"
            } ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
            title={action.label}
          >
            {action.icon} {action.showLabel && action.label}
          </button>
        );
      })}

      {/* Dropdown toggle (only shown if there are dropdown actions) */}
      {dropdownActions.length > 0 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            aria-label="More options"
          >
            <Ellipsis size={16} />
          </button>

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                {dropdownActions.map((action, index) => {
                  const isDisabled =
                    typeof action.disabled === "function"
                      ? action.disabled(item)
                      : action.disabled;

                  const handleClick = (e: React.MouseEvent) => {
                    e.stopPropagation();
                    if (!isDisabled) {
                      handleActionClick(action);
                    }
                  };

                  return (
                    <React.Fragment key={`dropdown-${index}`}>
                      <button
                        onClick={handleClick}
                        disabled={isDisabled}
                        className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                          isDisabled
                            ? "text-gray-400 cursor-not-allowed"
                            : "hover:bg-gray-100 text-gray-700"
                        } ${action.className || ""}`}
                      >
                        {action.icon && (
                          <span className="mr-2">{action.icon}</span>
                        )}
                        {action.label}
                      </button>
                      {action.divider && (
                        <div className="border-t border-gray-200 my-1" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
const DynamicTable = <T extends object>({
  data,
  columns,
  pagination = false,
  itemsPerPage = 10,
  loading = false, // Add default value
  className = "",
  headerClassName = "bg-gray-100 text-gray-700",
  rowClassName = "hover:bg-gray-50",
  cellClassName = "py-3 px-2",
  emptyMessage = "No data available",
  minWidth = "950px",
  selectable = false,
  onSelectionChange,
  rowIdKey = "id" as keyof T,
  defaultSort,
  showRowNumbers = false,
  totalItems = 0,
  onPageChange,
}: DynamicTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<T[keyof T]>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: SortDirection;
  } | null>(defaultSort || null);

  // Sort data based on sortConfig
  const sortedData = useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const column = columns.find((col) => col.key === sortConfig.key);

      // Use custom sort function if provided
      if (column?.sortFn) {
        return sortConfig.direction === "asc"
          ? column.sortFn(a, b)
          : column.sortFn(b, a);
      }

      // Default sorting for primitive values
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, columns]);

  // Handle sorting
  const handleSort = (key: keyof T) => {
    let direction: SortDirection = "asc";

    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === "asc") {
        direction = "desc";
      } else if (sortConfig.direction === "desc") {
        direction = null;
      }
    }

    setSortConfig(direction ? { key, direction } : null);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Calculate pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedData = pagination
    ? sortedData?.slice(startIndex, endIndex)
    : sortedData?.slice(0, itemsPerPage);

  // Handle row selection
  const toggleRowSelection = (rowId: T[keyof T]) => {
    const newSelectedRows = new Set(selectedRows);
    if (newSelectedRows.has(rowId)) {
      newSelectedRows.delete(rowId);
    } else {
      newSelectedRows.add(rowId);
    }
    setSelectedRows(newSelectedRows);

    if (onSelectionChange) {
      const selectedItems = sortedData.filter((item) =>
        newSelectedRows.has(item[rowIdKey])
      );
      onSelectionChange(selectedItems);
    }
  };

  // Handle select all/none
  const toggleSelectAll = () => {
    if (selectedRows.size === displayedData.length) {
      // Deselect all
      setSelectedRows(new Set());
      if (onSelectionChange) onSelectionChange([]);
    } else {
      // Select all on current page
      const newSelectedRows = new Set(selectedRows);
      displayedData.forEach((item) => newSelectedRows.add(item[rowIdKey]));
      setSelectedRows(newSelectedRows);

      if (onSelectionChange) {
        const selectedItems = sortedData.filter((item) =>
          newSelectedRows.has(item[rowIdKey])
        );
        onSelectionChange(selectedItems);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage); // Call the callback
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      onPageChange?.(newPage); // Call the callback
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page); // Call the callback
    }
  };

  // Check if all rows on current page are selected
  const allSelectedOnPage =
    displayedData?.length > 0 &&
    displayedData.every((item) => selectedRows.has(item[rowIdKey]));

  // Get sort direction for a column
  const getSortDirection = (key: keyof T): SortDirection => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction;
  };

  // Render sort indicator
  const renderSortIndicator = (key: keyof T) => {
    const direction = getSortDirection(key);
    if (!direction) return null;

    return (
      <span className="ml-1">
        {direction === "asc" ? (
          <ArrowDownNarrowWide className="mr-3" size={12} />
        ) : (
          <ArrowUpWideNarrow className="mr-3" size={12} />
        )}
      </span>
    );
  };

  return (
    <div className={`flex flex-col rounded-md ${className}`}>
      {loading ? (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 overflow-x-auto ">
            <table style={{ minWidth: minWidth }}>
              <thead className={`bg-gray-100 ${headerClassName}`}>
                <tr>
                  {selectable && (
                    <th scope="col" className={`${cellClassName} w-10 text-center`}>
                      <input
                        type="checkbox"
                        checked={allSelectedOnPage}
                        onChange={toggleSelectAll}
                        className="h-4 w-4 rounded border-gray-300 accent-green-600 cursor-pointer"
                      />
                    </th>
                  )}
                  {showRowNumbers && (
                    <th className={`${cellClassName} w-12 text-center`}>#</th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.key.toString()}
                      scope="col"
                      className={`${cellClassName} text-${column.align || "left"} ${
                        column.width ? column.width : ""
                      } font-medium select-none ${
                        column.sortable ? "cursor-pointer hover:bg-gray-200" : ""
                      }`}
                      onClick={() =>
                        column.sortable && handleSort(column.key as keyof T)
                      }
                    >
                      <div
                        className={`flex items-center text-sm ${
                          column.align === "center"
                            ? "justify-center"
                            : column.align === "right"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {column.header}
                        {column.sortable &&
                          renderSortIndicator(column.key as keyof T)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedData?.length > 0 ? (
                  displayedData.map((item, rowIndex) => (
                    <tr key={rowIndex} className={rowClassName}>
                      {selectable && (
                        <td className={`${cellClassName} text-center`}>
                          <input
                            type="checkbox"
                            checked={selectedRows.has(item[rowIdKey])}
                            onChange={() => toggleRowSelection(item[rowIdKey])}
                            className="h-4 w-4 rounded border-gray-300 accent-green-600 cursor-pointer"
                          />
                        </td>
                      )}
                      {showRowNumbers && (
                        <td
                          className={`${cellClassName} text-center text-sm text-gray-500`}
                        >
                          {startIndex + rowIndex + 1}
                        </td>
                      )}
                      {columns.map((column) => (
                        <td
                          key={`${rowIndex}-${column.key.toString()}`}
                          className={`${cellClassName} text-${
                            column.align || "left"
                          }`}
                        >
                          {column.actions ? (
                            <OptionsDropdown<T>
                              primaryActions={column.actions.primaryActions}
                              dropdownActions={column.actions.dropdownActions}
                              item={item}
                            />
                          ) : column.render ? (
                            column.render(item)
                          ) : (
                            String(item[column.key as keyof T])
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={
                        columns.length +
                        (selectable ? 1 : 0) +
                        (showRowNumbers ? 1 : 0)
                      }
                      className={`${cellClassName} text-center text-sm text-gray-600`}
                    >
                      {emptyMessage}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {pagination && totalItems > itemsPerPage && (
            <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                    <span className="font-medium">{endIndex}</span>{" "}
                    of <span className="font-medium">{totalItems}</span>{" "}
                    results
                    {selectable && selectedRows.size > 0 && (
                      <span className="ml-2 font-medium text-indigo-600">
                        ({selectedRows.size} selected)
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={handlePrevious}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      &larr;
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? "z-10 bg-green-50 border-green-500 text-green-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                    <button
                      onClick={handleNext}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      &rarr;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DynamicTable;
