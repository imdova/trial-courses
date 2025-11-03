import React, { useState } from "react";
import { Plus, Trash } from "lucide-react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";

const ADD_INDUSTRY_URL =
  "http://34.70.58.31/api/v1.0.0/admin/sys-configurations/industry";

type DataType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string;
};

const IndustriesSidebar: React.FC<{
  onSelect: (industry: string) => void;
  setIndustries: React.Dispatch<React.SetStateAction<DataType[]>>;
  selected: string;
  industriesData: DataType[];
  allCategoriesData: { [key: string]: DataType[] };
  setAllCategories: React.Dispatch<
    React.SetStateAction<{ [key: string]: DataType[] }>
  >;
}> = ({
  onSelect,
  selected,
  industriesData,
  setIndustries,
  setAllCategories,
}) => {
  const [newIndustry, setNewIndustry] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddIndustry = async () => {
    if (!newIndustry.trim()) return;
    if (industriesData.some((ind) => ind.name === newIndustry)) {
      setError("Industry already exists");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(ADD_INDUSTRY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newIndustry.trim() }),
      });

      if (!response.ok) {
        throw new Error(
          response.status === 409
            ? "Industry already exists"
            : "Failed to create industry"
        );
      }

      const responseData = await response.json();
      if (!responseData?.data) {
        throw new Error("Invalid response from server");
      }

      const newIndustryData: DataType = {
        id: responseData.data.id || Date.now().toString(),
        name: responseData.data.name || newIndustry.trim(),
        created_at: responseData.data.created_at || new Date().toISOString(),
        updated_at: responseData.data.updated_at || new Date().toISOString(),
        deleted_at: responseData.data.deleted_at || null,
        _version: responseData.data._version || 1,
      };

      setIndustries((prev) => [...prev, newIndustryData]);
      setAllCategories((prev) => ({
        ...prev,
        [newIndustryData.name]: [],
      }));

      setNewIndustry("");
      setSuccess("Industry created successfully");
    } catch (error) {
      console.error("Error creating industry:", error);
      if (error instanceof Error) {
        setError(error.message || "Failed to create industry");
      } else {
        setError("Unknown error : Failed to create industry");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="box-content lg:w-[300px]">
      <h3 className="mb-3 text-sm font-semibold md:text-lg">Industries</h3>

      {/* Add new industry */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newIndustry}
          onChange={(e) => setNewIndustry(e.target.value)}
          placeholder="New Industry"
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddIndustry();
            }
          }}
          className="flex-1 rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
        />
        <button
          type="button"
          onClick={handleAddIndustry}
          disabled={isLoading}
          className="rounded-lg bg-primary text-white p-2 hover:bg-black transition-colors disabled:opacity-50"
        >
          <Plus size={18} />
        </button>
      </div>

      {/* Industries List */}
      <div className="relative flex flex-col gap-2">
        {industriesData.map((industry) => {
          if (!industry?.name) return null;
          const isSelected = selected === industry.name;

          return (
            <div
              key={industry.id}
              onClick={() => onSelect(industry.id)}
              className={`flex items-center justify-between rounded-md p-2 text-sm cursor-pointer transition-colors ${
                isSelected
                  ? "bg-primary text-white hover:bg-green-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <span>{industry.name}</span>
              <div>
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
              </div>
            </div>
          );
        })}
      </div>

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

export default IndustriesSidebar;
