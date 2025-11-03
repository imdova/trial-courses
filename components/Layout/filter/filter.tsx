"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterOption } from "@/types";
import { useCallback, useState } from "react";
import FilterItem from "./FilterItem";
import { FilterIcon, X } from "lucide-react";

interface FilterContentProps<T extends Record<string, FilterOption[]>> {
  sections: T;
  searchKeys?: (keyof T)[];
}

const FilterContent = <T extends Record<string, FilterOption[]>>({
  sections,
  searchKeys,
}: FilterContentProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isActive, setIsActive] = useState(false);

  // Create URL search params object based on current params
  const createQueryString = useCallback(
    (sectionKey: string, value: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      // Remove old values for this section
      params.delete(sectionKey);

      // Add new values
      value.forEach((val) => {
        params.append(sectionKey, val);
      });

      return params.toString();
    },
    [searchParams]
  );

  const handleCheckChange = (sectionKey: string, value: string[]) => {
    const queryString = createQueryString(sectionKey, value);
    router.push(`${pathname}?${queryString}`);
  };

  // Get current selected filters from URL
  const getSelectedFilters = () => {
    const selected: Record<string, string[]> = {};

    Object.keys(sections).forEach((key) => {
      const values = searchParams.getAll(key);
      selected[key] = values.length > 0 ? values : [];
    });

    return selected;
  };

  const selectedFilters = getSelectedFilters();

  const filteredSections = Object.entries(sections).map(([key, options]) => ({
    key,
    title: key.charAt(0).toUpperCase() + key.slice(1),
    options,
  }));

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsActive(true)}
        className="md:hidden fixed bottom-2 left-3 flex items-center gap-2 h-12 w-12 z-50 bg-primary text-white px-4 py-2 rounded-full shadow-md mb-4"
      >
        <FilterIcon size={18} />
      </button>

      {/* Filter sidebar */}
      <div
        className={`${
          isActive ? "left-0" : "-left-[500px]"
        } md:sticky md:bg-transparent md:z-10 fixed top-0 bg-white z-50 p-4 md:p-2 w-[260px] h-screen max-h-screen md:h-full md:max-h-full overflow-y-auto no-scrollbar transition-all duration-500 pt-16 md:pt-0 shadow-md md:shadow-none`}
      >
        <button
          onClick={() => setIsActive(false)}
          className="block lg:hidden absolute right-3 top-3 p-2 text-muted-foreground hover:text-red-500"
        >
          <X size={18} />
        </button>

        <div className="min-h-full">
          {/* Filter Header */}
          <div className="hidden md:flex justify-between items-center mb-5 bg-primary text-white p-2 rounded-md">
            <span>Filter</span>
            <FilterIcon size={18} />
          </div>

          {/* Filter Items */}
          {filteredSections.map((section, index) => (
            <FilterItem
              key={section.key}
              index={index}
              section={section}
              value={selectedFilters[section.key] || []}
              handleCheckChange={handleCheckChange}
              isSearch={searchKeys?.includes(section.key) ?? false}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterContent;
