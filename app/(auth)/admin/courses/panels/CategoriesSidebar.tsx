import React from "react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { Trash } from "lucide-react";

type Category = {
  id: string; // Changed to string to match typical API IDs
  name: string;
};

interface CategoriesSidebarProps {
  categoriesData: Category[];
  selected: string;
  onSelect: (categoryId: string) => void;
  onDeleteCategory: (id: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({
  categoriesData,
  selected,
  onSelect,
  error = null,
}) => {
  const handleCategorySelect = (categoryId: string) => {
    // You can use either ID or name for selection depending on your needs
    onSelect(categoryId); // Changed to use ID for more reliable selection
  };

  if (error) {
    return (
      <div className="flex h-full items-center justify-center border-r p-4">
        <h2 className="text-red-800 font-semibold text-lg">{error}</h2>
      </div>
    );
  }

  if (categoriesData.length === 0) {
    return (
      <div className="flex h-full items-center justify-center border-r p-4">
        <h2 className="font-semibold text-lg">No categories available</h2>
      </div>
    );
  }

  return (
    <div className="relative">
      <ul className="space-y-2">
        {categoriesData.map((category) => (
          <li key={category.id}>
            <button
              className={`w-full text-left p-2 rounded-md mb-2 flex justify-between items-center
            ${
              selected === category.id
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-transparent hover:bg-gray-100"
            }`}
              onClick={() => handleCategorySelect(category.id)}
            >
              <span className="flex-grow">{category.name}</span>
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
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
