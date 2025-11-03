"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type CourseType = "All" | "Live" | "Offline" | "Recorded";

export default function FilterControls() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize state from URL param or default
  const [filterType, setFilterType] = useState<CourseType>(
    (searchParams.get("type") as CourseType) || "All"
  );
  // Update URL when filter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (filterType === "All") {
      params.delete("type");
    } else {
      params.set("type", filterType);
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, [filterType, pathname, router, searchParams]);

  const handleFilterChange = (type: CourseType) => {
    setFilterType(type);
  };

  return (
    <div className="mb-6">
      {/* Filter buttons - always visible on desktop, toggleable on mobile */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {(["All", "Live", "Offline", "Recorded"] as CourseType[]).map(
            (category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                  filterType === category
                    ? "bg-primary text-white border-primary"
                    : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                }`}
              >
                {category} Courses
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
