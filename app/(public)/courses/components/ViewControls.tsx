"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import CustomSelect from "@/components/UI/CustomSelect";
import SearchBar from "@/components/UI/form/search-Input";

type ViewMode = "grid" | "list";
type SortOption = "most-relevant" | "oldest" | "name";

interface OptionType {
  value: string;
  label: string;
}

export default function ViewControls() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from URL params or defaults
  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get("view") as ViewMode) || "grid"
  );
  const [sortBy, setSortBy] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) || "most-relevant"
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [filteredCount, setFilteredCount] = useState(0);

  const options: OptionType[] = [
    { value: "most-relevant", label: "Most Relevant" },
    { value: "oldest", label: "Oldest" },
    { value: "name", label: "Name" },
  ];

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (viewMode) params.set("view", viewMode);
    if (sortBy) params.set("sort", sortBy);
    if (searchQuery) params.set("q", searchQuery);

    router.replace(`${pathname}?${params.toString()}`);
  }, [viewMode, sortBy, searchQuery, pathname, router, searchParams]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      // Filter your actual data here
      setFilteredCount(Math.floor(Math.random() * 100));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, sortBy, viewMode]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option: OptionType) => {
    setSortBy(option.value as SortOption);
  };

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <div className="space-y-4">
      <SearchBar placeholder="Search for courses" onSearch={handleSearch} />

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="hidden md:block text-sm text-muted-foreground">
          Showing {filteredCount} total results
        </span>

        <div className="flex items-center w-full justify-between md:w-fit md:justify-start gap-3">
          <div className="flex gap-2 items-center">
            <span className="hidden md:block mr-2 text-sm text-gray-500">
              Sort By:
            </span>

            <CustomSelect
              options={options}
              selected={
                options.find((opt) => opt.value === sortBy) || options[0]
              }
              onChange={handleSortChange}
              placeholder="Select a Filter"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleViewMode}
              className={`flex justify-center items-center w-8 h-8 border ${
                viewMode === "grid"
                  ? "bg-primary text-white"
                  : "border-primary text-primary"
              } rounded-md`}
            >
              {viewMode === "grid" ? (
                <LayoutGrid size={18} />
              ) : (
                <List size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
