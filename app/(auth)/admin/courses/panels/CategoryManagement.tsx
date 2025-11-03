import React, { useState, useEffect, useMemo } from "react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { Plus, Trash } from "lucide-react";

type DataType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string;
};

const API_BASE_URL = "http://34.70.58.31/api/v1.0.0/admin/sys-configurations";

const CategoryManagement: React.FC<{
  industry: string;
  industriesData: DataType[];
  setIndustries: React.Dispatch<React.SetStateAction<DataType[]>>;
  checkedCategories: { [key: string]: string[] };
  setCheckedCategories: React.Dispatch<
    React.SetStateAction<{ [key: string]: string[] }>
  >;
  setAllCategories: React.Dispatch<
    React.SetStateAction<{ [key: string]: DataType[] }>
  >;
}> = ({
  industry,
  industriesData,
  checkedCategories,
  setCheckedCategories,
  setAllCategories,
}) => {
  const [categories, setCategories] = useState<DataType[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const industryData = useMemo(
    () => industriesData.find((ind) => ind.id === industry) || null,
    [industriesData, industry]
  );

  useEffect(() => {
    const fetchCategories = async () => {
      if (!industry) {
        setError("No industry selected");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/category/industries?ids=${industry}`
        );
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        setCategories(Array.isArray(data?.data) ? data.data : []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Failed to load categories");
        } else {
          setError("Unknown error : Failed to load categories");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [industry]);

  useEffect(() => {
    if (industry) {
      setAllCategories((prev) => ({ ...prev, [industry]: categories }));

      const savedChecked = localStorage.getItem("checkedCategories");
      if (savedChecked) {
        try {
          setCheckedCategories(JSON.parse(savedChecked));
        } catch (e) {
          console.error("Error parsing checked categories", e);
        }
      }
    }
  }, [categories, industry, setAllCategories, setCheckedCategories]);

  useEffect(() => {
    localStorage.setItem(
      "checkedCategories",
      JSON.stringify(checkedCategories)
    );
  }, [checkedCategories]);

  const handleToggle = (categoryId: string) => {
    if (!industry) return;
    setCheckedCategories((prev) => {
      const updatedChecked = prev[industry] ? [...prev[industry]] : [];
      if (updatedChecked.includes(categoryId)) {
        return {
          ...prev,
          [industry]: updatedChecked.filter((c) => c !== categoryId),
        };
      } else {
        return { ...prev, [industry]: [...updatedChecked, categoryId] };
      }
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim() || !industry)
      return setError("Please select an industry first");

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newCategory.trim(),
          industries: [industry],
        }),
      });

      if (!response.ok) throw new Error("Failed to create category");

      const data = await response.json();
      const newCategoryData = data?.data;
      if (!newCategoryData?.id) throw new Error("Invalid category data");

      setCategories((prev) => [...prev, newCategoryData]);
      setNewCategory("");
      setSuccess("Category added successfully");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message || "Failed to add category");
      } else {
        setError("Unknown error : Failed to add category");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="box-content flex-1">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <h3 className="mb-3 w-full text-sm font-semibold md:text-lg">
          {industryData?.name
            ? `Manage Categories for ${industryData.name}`
            : "Select an industry to manage categories"}
        </h3>

        {industry && (
          <div className="flex w-full gap-2">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New Category"
              disabled={isLoading}
              onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
              className="w-full rounded-md border p-2 text-sm focus:outline-none md:min-w-[200px]"
            />

            <button
              type="button"
              onClick={handleAddCategory}
              className="rounded-lg bg-primary text-white p-2 hover:bg-black transition-colors disabled:opacity-50"
            >
              <Plus size={18} />
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center p-4">Loading...</div>
      ) : error ? (
        <div className="p-2 text-red-500">{error}</div>
      ) : !industry ? (
        <div className="p-4 text-gray-500">
          Please select an industry to view or manage categories
        </div>
      ) : categories.length === 0 ? (
        <div className="p-4 text-gray-500">
          No categories found for this industry
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex items-center justify-between rounded-md hover:bg-gray-100"
            >
              <label
                htmlFor={category.id}
                className="flex items-center gap-2 accent-primary cursor-pointer w-full p-4"
              >
                <input
                  id={category.id}
                  type="checkbox"
                  checked={
                    checkedCategories[industry]?.includes(category.id) || false
                  }
                  onChange={() => handleToggle(category.id)}
                  disabled={isLoading}
                  className="h-4 w-4"
                />
                <span>{category.name || "Unnamed Category"}</span>
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
              />
            </li>
          ))}
        </ul>
      )}

      {/* Notifications */}
      {error && (
        <div className="fixed bottom-4 left-4 mt-4 rounded-md bg-red-100 p-3 text-sm text-red-800 z-30">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-500 hover:underline"
          >
            ✕
          </button>
        </div>
      )}

      {success && (
        <div className="fixed bottom-4 left-4 mt-4 rounded-md bg-green-100 p-3 text-sm text-green-800 z-30">
          {success}
          <button
            onClick={() => setSuccess(null)}
            className="float-right text-green-600 hover:underline"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
