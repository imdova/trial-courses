import React, { useEffect, useState } from "react";
import IndustriesSidebar from "./IndustriesSidebar";
import CategoryManagement from "./CategoryManagement";

type DataType = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  name: string;
};

const Industries: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [checkedCategories, setCheckedCategories] = useState<{
    [key: string]: string[];
  }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [industriesData, setIndustriesData] = useState<DataType[]>([]);
  const [allCategoriesData, setAllCategoriesData] = useState<{
    [key: string]: DataType[];
  }>({});

  // API endpoints
  const GIT_INDUSTRIES_DATA =
    "http://34.70.58.31/api/v1.0.0/admin/sys-configurations/industry";

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // First fetch industries
        const industriesRes = await fetch(GIT_INDUSTRIES_DATA);
        if (!industriesRes.ok) throw new Error("Failed to fetch industries");

        const industriesJson = await industriesRes.json();
        if (!Array.isArray(industriesJson?.data)) {
          throw new Error("Invalid industries data format");
        }

        setIndustriesData(industriesJson.data);

        // Initialize selected industry with the first one if available
        if (industriesJson.data.length > 0) {
          setSelectedIndustry(industriesJson.data[0].id);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch categories when selected industry changes
  useEffect(() => {
    if (!selectedIndustry) return;

    const fetchCategories = async () => {
      try {
        const categoriesRes = await fetch(
          `http://34.70.58.31/api/v1.0.0/admin/sys-configurations/category/industries/${selectedIndustry}`
        );

        if (!categoriesRes.ok) {
          throw new Error("Failed to fetch categories");
        }

        const categoriesJson = await categoriesRes.json();

        setAllCategoriesData((prev) => ({
          ...prev,
          [selectedIndustry]: categoriesJson.data || [],
        }));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [selectedIndustry]);

  // Load checked categories from localStorage on initial render
  useEffect(() => {
    const savedChecked = localStorage.getItem("checkedCategories");
    if (savedChecked) {
      try {
        setCheckedCategories(JSON.parse(savedChecked));
      } catch (err) {
        console.error("Error parsing checked categories", err);
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="h-[400px] inset-0 z-10 flex items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    );
  }

  if (industriesData.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-lg font-medium">No industries available</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <IndustriesSidebar
        industriesData={industriesData}
        selected={selectedIndustry}
        onSelect={setSelectedIndustry}
        setIndustries={setIndustriesData}
        allCategoriesData={allCategoriesData}
        setAllCategories={setAllCategoriesData}
      />

      {selectedIndustry ? (
        <CategoryManagement
          industry={selectedIndustry}
          industriesData={industriesData}
          setIndustries={setIndustriesData}
          checkedCategories={checkedCategories}
          setCheckedCategories={setCheckedCategories}
          setAllCategories={setAllCategoriesData}
        />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-lg font-medium">Select an industry</div>
        </div>
      )}
    </div>
  );
};

export default Industries;
