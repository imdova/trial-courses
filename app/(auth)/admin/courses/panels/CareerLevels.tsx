import React, { useState } from "react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { Plus, Trash } from "lucide-react";
import DotLoading from "@/components/UI/DotLoading";

type CareerLevel = {
  id: string;
  name: string;
};

type CategoryData = {
  id: string;
  name: string;
  careerLevels: CareerLevel[];
};

interface CareerLevelsProps {
  categoryId: string;
  categoriesData: CategoryData[];
  checkedItems: { [key: string]: string[] };
  onCheck: (categoryId: string, levelId: string) => void;
  onAddLevel: (categoryId: string, levelName: string) => Promise<void>;
  onDeleteLevel: (categoryId: string, levelId: string) => Promise<void>;
  isLoading?: boolean;
}

const CareerLevels: React.FC<CareerLevelsProps> = ({
  categoryId,
  categoriesData,
  checkedItems,
  onCheck,
  onAddLevel,
  isLoading = false,
}) => {
  const [newLevel, setNewLevel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const categoryData = categoriesData.find((cat) => cat.id === categoryId);
  const careerLevels = categoryData?.careerLevels || [];

  const handleAddLevel = async () => {
    if (!newLevel.trim() || !categoryData) return;

    try {
      await onAddLevel(categoryId, newLevel.trim());
      setNewLevel("");
      setSuccess("Career level added successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to add career level");
      }
    }
  };

  if (!categoryData) {
    return <div className="text-red-500">Category not found</div>;
  }
  return (
    <div className="bg-white border rounded-xl shadow-sm p-4 h-full">
      {/* Error/Success Notifications */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded">
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
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
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

      <h3 className="mb-3 text-sm font-semibold md:text-lg">
        Manage Career Levels for {categoryData.name}
      </h3>

      {/* Add Level Input */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="w-full p-2 border rounded outline-none"
          value={newLevel}
          onChange={(e) => setNewLevel(e.target.value)}
          placeholder="New Career Level"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddLevel();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddLevel}
          className="rounded-lg bg-primary text-white p-2 hover:bg-black transition-colors disabled:opacity-50 outline-none"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Career Levels List */}
      {isLoading && careerLevels.length === 0 ? (
        <div className="flex justify-center p-4">
          <DotLoading size="sm" color="bg-primary" />
        </div>
      ) : careerLevels.length === 0 ? (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 text-green-700">
          No career levels found
        </div>
      ) : (
        <ul className="space-y-2">
          {careerLevels.map((level) => (
            <li
              key={level.id}
              className="flex items-center justify-between  hover:bg-gray-50 rounded"
            >
              <label
                htmlFor={level.id}
                className="flex items-center p-4 w-full cursor-pointer"
              >
                <input
                  id={level.id}
                  type="checkbox"
                  className="mr-3 h-5 w-5 accent-primary cursor-pointer"
                  checked={
                    checkedItems[categoryId]?.includes(level.id) || false
                  }
                  onChange={() => onCheck(categoryId, level.id)}
                  disabled={isLoading}
                />
                <span>{level.name}</span>
              </label>
              <OptionsDropdown
                actions={[
                  {
                    label: "Delete",
                    icon: <Trash className="w-4 h-4" />,
                    onClick: () => console.log("Delete clicked"),
                    danger: true,
                  },
                ]}
              />{" "}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CareerLevels;
