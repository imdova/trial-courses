"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Settings, X } from "lucide-react";

type FormValues = {
  instructor: string;
  regularPrice: string;
  discountedPrice: string;
  level: string;
  mainCategory: string;
  subCategory: string;
  tags: string[];
};

export default function QuickEditForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tags: [],
    },
  });

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([
    "healthcare",
    "certification",
    "nursing",
  ]);

  const onSubmit = (data: FormValues) => {
    const finalData = { ...data, tags };
    console.log(finalData);
  };

  // Handle adding a tag
  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        const newTags = [...tags, tagInput.trim()];
        setTags(newTags);
        setValue("tags", newTags);
      }
      setTagInput("");
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue("tags", newTags);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <span>
          <Settings size={22} />
        </span>{" "}
        Quick Edit
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Instructor Select */}
        <div>
          <select
            {...register("instructor", { required: "Instructor is required" })}
            className="w-full border rounded-lg p-2 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select Instructors
            </option>
            <option value="Instructor1">Instructor 1</option>
            <option value="Instructor2">Instructor 2</option>
          </select>
          {errors.instructor && (
            <p className="text-red-500 text-sm">{errors.instructor.message}</p>
          )}
        </div>

        {/* Prices */}
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              {...register("regularPrice")}
              placeholder="$ Leave blank for free"
              className="w-full border rounded-lg p-2 focus:outline-none"
            />
          </div>
          <div className="flex-1">
            <input
              type="text"
              {...register("discountedPrice")}
              placeholder="e.g., Starting from"
              className="w-full border rounded-lg p-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Level Select */}
        <div>
          <select
            {...register("level", { required: "Level is required" })}
            className="w-full border rounded-lg p-2 focus:outline-none"
            defaultValue=""
          >
            <option value="" disabled>
              Select level
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.level && (
            <p className="text-red-500 text-sm">{errors.level.message}</p>
          )}
        </div>

        {/* Categories */}
        <div className="flex gap-4">
          <div className="flex-1">
            <select
              {...register("mainCategory", {
                required: "Main Category is required",
              })}
              className="w-full border rounded-lg p-2 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Main Category
              </option>
              <option value="Doctors">Doctors</option>
              <option value="Nurses">Nurses</option>
            </select>
            {errors.mainCategory && (
              <p className="text-red-500 text-sm">
                {errors.mainCategory.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <select
              {...register("subCategory", {
                required: "Sub Category is required",
              })}
              className="w-full border rounded-lg p-2 focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Sub Category
              </option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
            </select>
            {errors.subCategory && (
              <p className="text-red-500 text-sm">
                {errors.subCategory.message}
              </p>
            )}
          </div>
        </div>

        {/* Tags (Skills) */}
        <div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Enter tags separated by commas"
            className="w-full border rounded-lg p-2 focus:outline-none"
          />

          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-2 text-gray-600 hover:text-gray-800"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}
