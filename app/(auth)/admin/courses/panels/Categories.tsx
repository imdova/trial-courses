import React, { useEffect, useState, useCallback } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import SpecialtiesList from "./SpecialtiesList";
import CareerLevels from "./CareerLevels";
import { Plus } from "lucide-react";

// Define proper types for API responses
type ApiResponse<T> = {
  data: T;
  message?: string;
  success?: boolean;
};

type Specialty = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  _version?: number;
  subSpecialties?: Specialty[];
};

type CareerLevel = {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  _version?: number;
};

type Category = {
  id: string;
  name: string;
  specialties: Specialty[];
  careerLevels: CareerLevel[];
};

type Industry = {
  id: string;
  name: string;
};

const API_BASE_URL = "http://34.70.58.31/api/v1.0.0/admin/sys-configurations";

const Categories: React.FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedIndustryId, setSelectedIndustryId] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [careerLevels, setCareerLevels] = useState<CareerLevel[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState({
    initial: true,
    action: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [checkedSpecialties, setCheckedSpecialties] = useState<
    Record<string, Specialty[]>
  >({});
  const [checkedLevels, setCheckedLevels] = useState<Record<string, string[]>>(
    {}
  );

  // Fetch data with retry logic
  const fetchWithRetry = useCallback(
    async (url: string, retries = 3): Promise<ApiResponse<Category[]>> => {
      try {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (err) {
        if (retries > 0) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return fetchWithRetry(url, retries - 1);
        }
        throw err;
      }
    },
    []
  );

  // Fetch initial categories data
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, initial: true }));
        setError(null);

        const response = await fetchWithRetry(`${API_BASE_URL}/category`);
        const categoriesData = response.data.map((category: Category) => ({
          id: category.id,
          name: category.name,
          specialties: [],
          careerLevels: [],
        }));

        setCategories(categoriesData);
        if (categoriesData.length > 0) {
          setSelectedCategoryId(categoriesData[0].id);
        }
      } catch (err: unknown) {
        console.error("Error fetching categories:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load categories"
        );
      } finally {
        setIsLoading((prev) => ({ ...prev, initial: false }));
      }
    };

    fetchCategories();
  }, [fetchWithRetry]);

  // Fetch specialties and career levels when category is selected
  useEffect(() => {
    if (!selectedCategoryId) return;

    const fetchCategoryDetails = async () => {
      try {
        setIsLoading((prev) => ({ ...prev, action: true }));
        setError(null);

        const [specialtiesResponse, levelsResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/speciality/category?id=${selectedCategoryId}`),
          fetch(
            `${API_BASE_URL}/career-level/categories?ids=${selectedCategoryId}`
          ),
        ]);

        const specialtiesData: ApiResponse<Specialty[]> =
          await specialtiesResponse.json();
        const levelsData: ApiResponse<CareerLevel[]> =
          await levelsResponse.json();

        setSpecialties(specialtiesData.data);
        setCareerLevels(levelsData.data);

        if (!specialtiesData?.data || !levelsData?.data) {
          throw new Error("Invalid API response structure");
        }

        setCategories((prev) =>
          prev.map((category) =>
            category.id === selectedCategoryId
              ? {
                  ...category,
                  specialties: specialtiesData.data,
                  careerLevels: levelsData.data,
                }
              : category
          )
        );
      } catch (err: unknown) {
        console.error("Error fetching category details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load category details"
        );
      } finally {
        setIsLoading((prev) => ({ ...prev, action: false }));
      }
    };

    const fetchIndustries = async () => {
      try {
        const response = await fetch(
          "http://34.70.58.31/api/v1.0.0/admin/sys-configurations/industry"
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch industries");
        }

        const { data }: { data: Industry[] } = await response.json();
        setIndustries(data);
      } catch (err: unknown) {
        console.error("Error fetching industries:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch industries"
        );
      }
    };

    fetchIndustries();
    fetchCategoryDetails();
  }, [selectedCategoryId]);

  const handleAddCategory = async () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName || !selectedIndustryId) {
      setError("Category name and industry are required");
      return;
    }

    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(`${API_BASE_URL}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: trimmedName,
          industries: [selectedIndustryId],
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add category");
      }

      const result: ApiResponse<Category> = await response.json();
      const newCategory = result?.data;

      if (!newCategory?.id || !newCategory?.name) {
        throw new Error("Invalid category data from the API");
      }

      setCategories((prev) => [
        ...prev,
        {
          id: newCategory.id,
          name: newCategory.name,
          specialties: [],
          careerLevels: [],
        },
      ]);

      setNewCategoryName("");
      setSuccess("Category added successfully");
    } catch (err: unknown) {
      console.error("Error adding category:", err);
      setError(err instanceof Error ? err.message : "Failed to add category");
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(`${API_BASE_URL}/category?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete category");
      }

      setCategories((prev) => prev.filter((category) => category.id !== id));
      setSuccess("Category deleted successfully");

      if (selectedCategoryId === id) {
        setSelectedCategoryId(categories.length > 1 ? categories[0].id : "");
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add career level"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleCheckSpecialty = async (
    categoryId: string,
    specialty: Specialty
  ) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      // Optimistic update
      setCheckedSpecialties((prev) => {
        const existing = prev[categoryId] || [];
        const isChecked = existing.some((s) => s.id === specialty.id);
        return {
          ...prev,
          [categoryId]: isChecked
            ? existing.filter((s) => s.id !== specialty.id)
            : [...existing, specialty],
        };
      });

      // API call would go here
      // await api.checkSpecialty(categoryId, specialty.id, isSubSpecialty);

      setSuccess("Specialty updated successfully");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add career level"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleCheckLevel = async (categoryId: string, levelId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      // Optimistic update
      setCheckedLevels((prev) => {
        const existing = prev[categoryId] || [];
        const isChecked = existing.includes(levelId);
        return {
          ...prev,
          [categoryId]: isChecked
            ? existing.filter((id) => id !== levelId)
            : [...existing, levelId],
        };
      });

      // API call would go here
      // await api.checkLevel(categoryId, levelId);

      setSuccess("Career level updated successfully");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add career level"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleAddSpecialty = async (categoryId: string, name: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      // Make the POST request
      const response = await fetch(`${API_BASE_URL}/speciality`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization if needed:
          // Authorization: `Bearer ${yourToken}`,
        },
        body: JSON.stringify({ categoryId, name }),
      });

      if (!response.ok) {
        throw new Error("Failed to add specialty");
      }

      const newSpecialty = await response.json();

      // Update local state
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                specialties: [
                  ...cat.specialties,
                  {
                    id: newSpecialty.id,
                    name: newSpecialty.name,
                    subSpecialties: newSpecialty.subSpecialties || [],
                  },
                ],
              }
            : cat
        )
      );

      setSuccess("Specialty added successfully");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add career level"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  console.log(careerLevels);
  console.log(specialties);
  const handleAddLevel = async (categoryId: string, name: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(`${API_BASE_URL}/career-level`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoriesIds: [categoryId], // must be an array
          name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message?.join?.(", ") || "Failed to add career level"
        );
      }

      const newLevel = await response.json();

      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                careerLevels: [
                  ...cat.careerLevels,
                  {
                    id: newLevel.id,
                    name: newLevel.name,
                  },
                ],
              }
            : cat
        )
      );

      setSuccess("Career level added successfully");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add career level"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  const handleDeleteLevel = async (categoryId: string, levelId: string) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/career-level?id=${levelId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${yourToken}`, // if required
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete level");
      }

      // Update local state
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                careerLevels: cat.careerLevels.filter((l) => l.id !== levelId),
              }
            : cat
        )
      );

      setSuccess("Career level deleted successfully");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to add career level"
      );
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };
  const handleDeleteSpecialty = async (
    categoryId: string,
    specialtyId: string
  ) => {
    try {
      setIsLoading((prev) => ({ ...prev, action: true }));
      setError(null);

      const response = await fetch(
        `${API_BASE_URL}/speciality?id=${specialtyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${yourToken}`, // if required
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete Specialty");
      }

      // Update local state
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId
            ? {
                ...cat,
                specialties: cat.specialties.filter(
                  (l) => l.id !== specialtyId
                ),
              }
            : cat
        )
      );

      setSuccess("Specialty deleted successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to add career level");
      }
    } finally {
      setIsLoading((prev) => ({ ...prev, action: false }));
    }
  };

  console.log(checkedSpecialties);
  console.log(checkedLevels);
  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {success && (
        <div className="fixed bottom-4 left-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50">
          {success}
          <button onClick={() => setSuccess(null)} className="ml-2">
            x
          </button>
        </div>
      )}

      {error && (
        <div className="fixed bottom-4 left-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          {error}
          <button onClick={() => setError(null)} className="ml-2">
            x
          </button>
        </div>
      )}

      <div className="w-full bg-white p-4 rounded-xl border shadow-sm lg:w-1/3">
        <div className="mb-4 w-full">
          <select
            className="w-full p-2 border rounded outline-none"
            value={selectedIndustryId}
            onChange={(e) => setSelectedIndustryId(e.target.value)}
          >
            <option value="" disabled>
              Select Industry
            </option>
            {industries.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="w-full p-2 border rounded outline-none"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="New Category"
            disabled={isLoading.action}
            onKeyDown={(e) => e.key === "Enter" && handleAddCategory()}
          />

          <button
            type="button"
            onClick={handleAddCategory}
            className="rounded-lg bg-primary text-white p-2 hover:bg-black transition-colors disabled:opacity-50 outline-none"
          >
            <Plus size={18} />
          </button>
        </div>

        <CategoriesSidebar
          categoriesData={categories}
          selected={selectedCategoryId}
          onSelect={setSelectedCategoryId}
          onDeleteCategory={handleDeleteCategory}
          isLoading={isLoading.action}
        />
      </div>

      {selectedCategoryId && (
        <>
          <div className="w-full lg:w-1/3">
            <SpecialtiesList
              categoryId={selectedCategoryId}
              categoriesData={categories}
              checkedItems={checkedSpecialties}
              onCheck={handleCheckSpecialty}
              isLoading={isLoading.action}
              onAddSpecialty={handleAddSpecialty}
              onDeleteSpecialty={handleDeleteSpecialty}
            />
          </div>
          <div className="w-full lg:w-1/3">
            <CareerLevels
              categoryId={selectedCategoryId}
              categoriesData={categories}
              checkedItems={checkedLevels}
              onCheck={handleCheckLevel}
              onAddLevel={handleAddLevel}
              onDeleteLevel={handleDeleteLevel}
              isLoading={isLoading.action}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Categories;
