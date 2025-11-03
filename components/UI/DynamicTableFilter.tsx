"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { ChevronDown, Check, X, Search, Grid, List } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FilterConfigTable } from "@/types";

interface DynamicTableFilterProps {
  filters?: FilterConfigTable[];
  columns?: number;
  showSearch?: boolean;
  showClearAll?: boolean;
  debounceTime?: number;
  className?: string;
  showViewModeToggle?: boolean;
  defaultViewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  showSort?: boolean;
  sortOptions?: { value: string; label: string }[];
  onClearAll?: () => void;
}

const DynamicTableFilter: React.FC<DynamicTableFilterProps> = ({
  filters,
  columns = 3,
  showSearch = true,
  showClearAll = true,
  debounceTime = 300,
  className = "",
  showViewModeToggle = false,
  defaultViewMode = "grid",
  onViewModeChange,
  showSort = false,
  sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
  ],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState(searchParams.get("q") || "");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filterSearchTerms, setFilterSearchTerms] = useState<
    Record<string, string>
  >({});
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">(defaultViewMode);
  const [sortOption, setSortOption] = useState<string>(
    searchParams.get("sort") || ""
  );
  const filterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Check mobile view on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle view mode change
  const handleViewModeChange = useCallback(
    (mode: "grid" | "list") => {
      setViewMode(mode);
      if (onViewModeChange) {
        onViewModeChange(mode);
      }
      const currentParams = new URLSearchParams(window.location.search);
      currentParams.set("view", mode);
      router.push(`?${currentParams.toString()}`);
    },
    [onViewModeChange, router]
  );

  // Handle sort change
  const handleSortChange = useCallback(
    (value: string) => {
      setSortOption(value);
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("sort", value);
      } else {
        params.delete("sort");
      }
      router.push(pathname + "?" + params.toString());
      setActiveFilter(null); // Close dropdown after selection
    },
    [pathname, router, searchParams]
  );

  // Create URL search params
  const createQueryString = useCallback(
    (name: string, value: string, isMulti?: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      if (isMulti) {
        const currentValues = params.getAll(name);
        if (currentValues.includes(value)) {
          params.delete(name, value);
        } else {
          params.append(name, value);
        }
      } else {
        if (params.get(name) === value) {
          params.delete(name);
        } else {
          params.set(name, value);
        }
      }

      return params.toString();
    },
    [searchParams]
  );

  // Handle filter selection
  const handleFilterSelect = (
    filterId: string,
    value: string,
    isMulti?: boolean
  ) => {
    router.push(pathname + "?" + createQueryString(filterId, value, isMulti));
    if (!isMulti) setActiveFilter(null);
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) {
          params.set("q", value);
        } else {
          params.delete("q");
        }
        router.push(pathname + "?" + params.toString());
      }, debounceTime),
    [debounceTime, pathname, router, searchParams]
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      debouncedSearch(e.target.value);
    },
    [debouncedSearch]
  );

  // Handle filter-specific search
  const handleFilterSearchChange = (filterId: string, value: string) => {
    setFilterSearchTerms((prev) => ({
      ...prev,
      [filterId]: value.toLowerCase(),
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    router.push(pathname);
    setSearchInput("");
    setFilterSearchTerms({});
    setActiveFilter(null);
    setSortOption("");
  };

  // Check if any filters are active
  const hasActiveFilters = Array.from(searchParams.entries()).some(
    ([key]) => key !== "q" && key !== "sort"
  );

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutside = Object.values(filterRefs.current).every((ref) => {
        return ref && !ref.contains(event.target as Node);
      });

      if (clickedOutside) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter options based on search term
  const getFilteredOptions = (
    filterId: string,
    options: { value: string; label: string; count?: number }[]
  ) => {
    const searchTerm = filterSearchTerms[filterId];
    if (!searchTerm) return options;

    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(searchTerm) ||
        option.value.toLowerCase().includes(searchTerm)
    );
  };

  // Responsive grid column classes
  const gridCols = isMobile
    ? "grid-cols-1"
    : `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${Math.min(
        Math.max(columns, 1),
        6
      )}`;

  return (
    <div className={`${className}`}>
      <div className="flex flex-col space-y-4">
        {/* Top row with search, sort, and view mode toggle */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search and sort container */}
          <div className="flex flex-col sm:flex-row gap-4 flex-grow">
            {/* Global search bar */}
            {showSearch && (
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="block w-full pl-10 pr-3 p-3 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none sm:text-sm"
                />
              </div>
            )}

            {/* Sort dropdown - styled like filters */}
            {showSort && (
              <div
                className="relative w-full sm:w-auto"
                ref={(el) => {
                  filterRefs.current["sort"] = el;
                }}
              >
                <button
                  type="button"
                  onClick={() =>
                    setActiveFilter(activeFilter === "sort" ? null : "sort")
                  }
                  className={`flex items-center justify-between w-full p-3 border gap-1 rounded-md text-sm font-medium ${
                    sortOption
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xs sm:text-sm">Sort</span>
                    {sortOption && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                        {sortOptions.find((o) => o.value === sortOption)?.label}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      activeFilter === "sort" ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {activeFilter === "sort" && (
                  <div
                    className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <div
                          key={option.value}
                          onClick={() => handleSortChange(option.value)}
                          className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer ${
                            sortOption === option.value
                              ? "bg-green-50 text-green-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <span className="text-xs sm:text-sm">
                            {option.label}
                          </span>
                          {sortOption === option.value && (
                            <Check className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* View mode toggle */}
          {showViewModeToggle && (
            <div className="flex items-center justify-end sm:justify-start gap-2">
              <button
                type="button"
                onClick={() => handleViewModeChange("grid")}
                className={`p-2 rounded-md ${
                  viewMode === "grid"
                    ? "bg-gray-200 text-gray-700"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                aria-label="Grid view"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange("list")}
                className={`p-2 rounded-md ${
                  viewMode === "list"
                    ? "bg-gray-200 text-gray-700"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                aria-label="List view"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>

        {/* Filters grid */}
        <div className={`grid gap-4 ${gridCols}`}>
          {filters?.map((filter) => {
            const currentValues = searchParams.getAll(filter.id);
            const isActive = currentValues.length > 0;
            const isMulti = filter.isMulti;
            const filteredOptions = getFilteredOptions(
              filter.id,
              filter.options
            );

            return (
              <div
                key={filter.id}
                className="relative"
                ref={(el) => {
                  filterRefs.current[filter.id] = el;
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveFilter(
                      activeFilter === filter.id ? null : filter.id
                    );
                  }}
                  className={`flex items-center justify-between w-full p-3 border gap-1 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    {filter.icon && <filter.icon className="h-4 w-4 mr-2" />}
                    <span className="text-xs sm:text-sm">{filter.label}</span>

                    {isActive && isMulti && currentValues.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">
                        {currentValues.length}
                      </span>
                    )}
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      activeFilter === filter.id ? "transform rotate-180" : ""
                    }`}
                  />
                </button>

                {activeFilter === filter.id && (
                  <div
                    className={`absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border border-gray-200 max-h-60 overflow-auto ${
                      isMobile ? "left-0" : ""
                    }`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Filter-specific search */}
                    {filter.isSearchable && (
                      <div className="p-2 border-b sticky top-0 bg-white z-10">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            placeholder={`Search ${filter.label}`}
                            value={filterSearchTerms[filter.id] || ""}
                            onChange={(e) =>
                              handleFilterSearchChange(
                                filter.id,
                                e.target.value
                              )
                            }
                            className="block w-full pl-8 pr-3 py-1 border border-gray-300 rounded-md text-sm leading-5 bg-white placeholder-gray-500 focus:outline-none"
                            autoFocus
                          />
                        </div>
                      </div>
                    )}

                    {/* Filter options */}
                    <div className="py-1">
                      {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => {
                          const isSelected = currentValues.includes(
                            option.value
                          );
                          return (
                            <div
                              key={option.value}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleFilterSelect(
                                  filter.id,
                                  option.value,
                                  filter.isMulti
                                );
                              }}
                              className={`flex items-center justify-between px-3 py-2 text-sm cursor-pointer ${
                                isSelected
                                  ? "bg-green-50 text-green-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              <div className="flex items-center">
                                {filter.isMulti && (
                                  <div
                                    className={`w-4 h-4 mr-2 border rounded-sm flex items-center justify-center ${
                                      isSelected
                                        ? "bg-green-500 border-green-500"
                                        : "border-gray-300"
                                    }`}
                                  >
                                    {isSelected && (
                                      <Check className="h-3 w-3 text-white" />
                                    )}
                                  </div>
                                )}
                                <span className="text-xs sm:text-sm">
                                  {option.label}
                                </span>
                                {option.count && (
                                  <span className="ml-auto pl-2 text-xs text-gray-500">
                                    {option.count}
                                  </span>
                                )}
                              </div>
                              {!filter.isMulti && isSelected && (
                                <Check className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div className="px-3 py-2 text-sm text-gray-500">
                          No options found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Active filters and clear button */}
        {(hasActiveFilters || searchInput || sortOption) && showClearAll && (
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {Array.from(searchParams.entries()).map(([key, value]) => {
              if (key === "q" || key === "sort") return null;

              const filter = filters?.find((f) => f.id === key);
              if (!filter) return null;

              const option = filter.options.find((opt) => opt.value === value);
              const label = option?.label || value;

              return (
                <span
                  key={`${key}-${value}`}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {filter.label}: {label}
                  <button
                    type="button"
                    onClick={() =>
                      handleFilterSelect(key, value, filter.isMulti)
                    }
                    className="ml-1.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                  >
                    <X className="w-2 h-2" />
                  </button>
                </span>
              );
            })}

            {searchInput && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Search: {searchInput}
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("q");
                    router.push(pathname + "?" + params.toString());
                  }}
                  className="ml-1.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                >
                  <X className="w-2 h-2" />
                </button>
              </span>
            )}

            {sortOption && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Sort:{" "}
                {sortOptions.find((o) => o.value === sortOption)?.label ||
                  sortOption}
                <button
                  type="button"
                  onClick={() => {
                    setSortOption("");
                    const params = new URLSearchParams(searchParams.toString());
                    params.delete("sort");
                    router.push(pathname + "?" + params.toString());
                  }}
                  className="ml-1.5 inline-flex items-center justify-center w-3.5 h-3.5 rounded-full text-green-400 hover:bg-green-200 hover:text-green-500"
                >
                  <X className="w-2 h-2" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={clearAllFilters}
              className="ml-auto text-sm text-green-600 hover:text-green-800 font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Debounce function implementation
function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    const later = (): void => {
      timeout = null;
      func(...args);
    };

    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export default DynamicTableFilter;
