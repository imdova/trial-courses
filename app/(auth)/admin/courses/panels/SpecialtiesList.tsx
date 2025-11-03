import React, { useState } from "react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-react";
import DotLoading from "@/components/UI/DotLoading";

type Specialty = {
  id: string;
  name: string;
};

type CategoryData = {
  id: string;
  name: string;
  specialties: Specialty[];
};

interface SpecialtiesListProps {
  categoriesData: CategoryData[];
  categoryId: string;
  checkedItems: { [key: string]: Specialty[] };
  onCheck: (categoryId: string, specialty: Specialty) => void;
  isLoading?: boolean;
  onAddSpecialty: (categoryId: string, name: string) => Promise<void>;
  onDeleteSpecialty: (specialtyId: string, categoryId: string) => Promise<void>;
}

const SpecialtiesList: React.FC<SpecialtiesListProps> = ({
  categoriesData,
  categoryId,
  checkedItems,
  onCheck,
  isLoading = false,
  onAddSpecialty,
}) => {
  const [newSpecialties, setNewSpecialties] = useState<{
    [key: string]: string;
  }>({});
  const [newSpecialtiesId, setnewSpecialtiesId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [localLoading, setLocalLoading] = useState({
    addSpecialty: false,
    deleteSpecialty: false,
  });
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});

  const categoryData = categoriesData.find((cat) => cat.id === categoryId);

  const handleCategoryToggle = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
    setnewSpecialtiesId(categoryId);
  };

  const handleAddSpecialty = async (categoryId: string) => {
    const newName = newSpecialties[categoryId]?.trim();
    if (!newName) return;

    try {
      setLocalLoading((prev) => ({ ...prev, addSpecialty: true }));
      await onAddSpecialty(categoryId, newName);
      setNewSpecialties((prev) => ({ ...prev, [categoryId]: "" }));
      setSuccess("Specialty added successfully");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add career level"
      );
    } finally {
      setLocalLoading((prev) => ({ ...prev, addSpecialty: false }));
    }
  };

  const handleCheckAll = (categoryId: string, specialties: Specialty[]) => {
    const alreadyCheckedIds = new Set(
      checkedItems[categoryId]?.map((s) => s.id)
    );
    const allChecked = specialties.every((s) => alreadyCheckedIds.has(s.id));

    specialties.forEach((s) => {
      const isChecked = alreadyCheckedIds.has(s.id);
      if (allChecked && isChecked) {
        // uncheck
        onCheck(categoryId, s);
      } else if (!allChecked && !isChecked) {
        // check
        onCheck(categoryId, s);
      }
    });
  };

  return (
    <div className="h-full rounded-lg border bg-white p-4 shadow-sm relative">
      {/* Error/Success Notifications */}
      {error && (
        <div className="fixed bottom-4 left-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded z-50">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-4 text-red-700 font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 left-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded z-50">
          <div className="flex justify-between items-center">
            <span>{success}</span>
            <button
              onClick={() => setSuccess(null)}
              className="ml-4 text-green-700 font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="">
        <h3 className="mb-3 text-xs font-semibold md:text-lg">
          Manage Specialties for {categoryData?.name}
        </h3>

        {/* Add Specialty Input */}
        <div className="mb-3 flex gap-2">
          <input
            type="text"
            className="w-full p-2 border rounded outline-none"
            value={newSpecialties[newSpecialtiesId] || ""}
            onChange={(e) =>
              setNewSpecialties((prev) => ({
                ...prev,
                [newSpecialtiesId]: e.target.value,
              }))
            }
            placeholder="New Specialty"
            disabled={isLoading || localLoading.addSpecialty}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSpecialty(newSpecialtiesId);
              }
            }}
          />
          <button
            type="button"
            onClick={() => handleAddSpecialty(newSpecialtiesId)}
            className="rounded-lg bg-primary text-white p-2 hover:bg-black transition-colors disabled:opacity-50"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {categoriesData.map((category) => {
        const specialties = category.specialties || [];
        const isExpanded = expandedCategories[category.id];
        const checkedCount = checkedItems[category.id]?.length || 0;
        const allChecked =
          specialties.length > 0 && checkedCount === specialties.length;

        return (
          <div
            key={category.id}
            className="mb-2 rounded-md border bg-white p-3 shadow-sm"
          >
            {/* Header with toggle and "Check All" */}
            <div
              className="flex cursor-pointer items-center justify-between"
              onClick={() => handleCategoryToggle(category.id)}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 h-5 w-5 accent-primary cursor-pointer"
                  checked={allChecked}
                  onChange={(e) => {
                    e.stopPropagation(); // prevent toggle
                    handleCheckAll(category.id, specialties);
                  }}
                />
                <h3 className="font-medium">{category.name}</h3>
              </div>
              <span className="text-gray-500">
                {isExpanded ? (
                  <ChevronUp size={15} />
                ) : (
                  <ChevronDown size={15} />
                )}
              </span>
            </div>

            {isExpanded && (
              <div className="mt-4">
                {/* Specialty List */}
                {isLoading && specialties.length === 0 ? (
                  <div className="flex justify-center p-4">
                    <DotLoading size="sm" color="bg-primary" />
                  </div>
                ) : specialties.length === 0 ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
                    No specialtiesfound
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {specialties.map((specialty) => (
                      <li
                        key={specialty.id}
                        className="flex items-center p-2 hover:bg-gray-50"
                      >
                        <input
                          type="checkbox"
                          className="mr-3 h-5 w-5 accent-primary cursor-pointer"
                          checked={
                            checkedItems[category.id]?.some(
                              (s) => s.id === specialty.id
                            ) || false
                          }
                          onChange={() => onCheck(category.id, specialty)}
                          disabled={isLoading}
                        />
                        <div className="flex-grow">
                          <div className="font-semibold text-sm">
                            {specialty.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {category.name}
                          </div>
                        </div>
                        <OptionsDropdown
                          actions={[
                            {
                              label: "Delete",
                              icon: <Trash className="w-4 h-4" />,
                              onClick: () => console.log("Delete clicked"),
                              danger: true,
                            },
                          ]}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpecialtiesList;
