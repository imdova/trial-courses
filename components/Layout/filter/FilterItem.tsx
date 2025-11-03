import React, { useState } from "react";
import { FilterOption, FilterSectionType } from "@/types";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import CustomInput from "@/components/UI/form/CustomInput";
import Rating from "@/components/UI/Rating";

interface FilterItemProps {
  section: FilterSectionType;
  value: string[];
  handleCheckChange: (key: string, value: string[]) => void;
  isSearch: boolean;
  index?: number;
}

function getTotalCount(items: FilterOption[]) {
  return items.reduce((sum, item) => sum + (item.count || 0), 0);
}

const filterOptions = (options: FilterOption[], query: string) => {
  return options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase())
  );
};

const FilterItem: React.FC<FilterItemProps> = ({
  section,
  value,
  handleCheckChange,
  isSearch,
  index,
}) => {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(index === 0 || index === 1);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredOptions =
    isSearch && query ? filterOptions(section.options, query) : section.options;

  const isAllSelected = value.length === section.options.length;

  const handleAllChange = () => {
    const newValue = isAllSelected
      ? [] // Deselect all if "All" is checked
      : section.options.map((option) => option.value); // Select all
    handleCheckChange(section.key, newValue);
  };

  const handleCheckboxChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((val) => val !== optionValue)
      : [...value, optionValue];

    handleCheckChange(section.key, newValue);
  };

  return (
    <div className="p-3 rounded-lg md:bg-[#F7F7F9] last:border-b-0 mb-6">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleExpand}>
        <h6 className=" text-[14px] font-semibold text-[#25324B]">
          {section.title}
        </h6>
        <div className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-[#ffffffce] text-muted-foreground">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-3 px-1">
          <fieldset className="w-full">
            <div className="grid grid-cols-1 gap-1 px-1">
              {/* All Checkbox */}
              <label className="flex cursor-pointer items-center rounded-md p-1 text-[#515B6F] transition-colors hover:bg-gray-50">
                <div className="relative mr-2">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleAllChange}
                    className="peer hidden"
                  />
                  <div className="h-5 w-5 rounded-sm border-2 border-[#D6DDEB] peer-checked:border-primary peer-checked:bg-primary">
                    {isAllSelected && (
                      <Check className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                </div>
                <span>{`All ${section.title} (${getTotalCount(
                  filteredOptions
                )})`}</span>
              </label>

              {/* Individual Checkboxes */}
              {filteredOptions.map((option) => (
                <label
                  key={option.value}
                  className="flex cursor-pointer items-center rounded-md p-1 text-[#515B6F] transition-colors hover:bg-gray-50">
                  <div className="relative mr-2">
                    <input
                      type="checkbox"
                      checked={value.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value)}
                      className="peer hidden"
                    />
                    <div className="h-5 w-5 rounded-sm border-2 border-[#D6DDEB] peer-checked:border-primary peer-checked:bg-primary">
                      {value.includes(option.value) && (
                        <Check className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                  </div>
                  {section.title === "Rating" ? (
                    <div className="flex gap-2 items-center">
                      <Rating size={12} rating={Number(option.value)} />
                      <span>({option.count})</span>
                    </div>
                  ) : (
                    <span>
                      {option.label} ({option.count})
                    </span>
                  )}
                </label>
              ))}
            </div>
          </fieldset>
          {isSearch && (
            <CustomInput
              placeholder="Search..."
              value={query || ""}
              onChange={searchHandler}
              className="my-1 py-0"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default FilterItem;
