"use client";

import TextEditor from "@/components/editor/editor";
import ImageUpload from "@/components/UI/ImageUpload";
import { courseData } from "@/constants/VideosData.data";
import { FormBundelValues } from "@/types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CourseSelect from "@/components/UI/CourseSelect";

export default function AddCourseBundle() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // control,
    formState: { errors },
  } = useForm<FormBundelValues>({
    defaultValues: {
      courses: [],
      priceType: "fixed",
    },
  });
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const IsBundleFree = watch("bundle_free");

  const onSubmit = (data: FormBundelValues) => {
    if (!data.details) {
      alert("Details are required");
      return;
    }
    console.log("Form submitted:", data);
  };

  return (
    <div className="min-h-screen px-6">
      <div className="max-w-4xl mx-auto border border-gray-200 bg-white rounded-lg shadow-sm p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Add Course Bundle
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 ">
              Title*
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className={`w-full px-3 py-2 border rounded-md text-sm  outline-none ${
                errors.title ? "border-red-500" : "border-gray-200"
              }`}
              placeholder="Course bundle title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <CourseSelect
            courses={courseData}
            selected={selectedCourses}
            onChange={(val) => {
              setSelectedCourses(val);
              setValue("courses", val);
            }}
          />
          {/* Price Type + Amount */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Bundle Pricing</h2>
            {/* Free Course Toggle */}
            <div className="flex items-center justify-between mt-4">
              <label
                htmlFor="bundle_free"
                className="flex items-center gap-4 cursor-pointer"
              >
                <span className="text-gray-700 font-medium text-sm">
                  Is the bundel free?
                </span>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="bundle_free"
                    {...register("bundle_free")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300"></div>
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 peer-checked:translate-x-5"></div>
                </div>
              </label>
            </div>
            {/* Course Pricing Section */}
            {!IsBundleFree && (
              <div className="mt-6">
                {/* <DiscountSchedule<FormBundelValues>
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  control={control}
                /> */}
              </div>
            )}
          </div>

          {/* Thumbnail Upload */}
          <ImageUpload
            onChange={(file) => setValue("thumbnail", file)}
            value={watch("thumbnail")}
            label="Bundle thumbnail"
            required
            resolution="400 x 250"
          />

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bundle details*
            </label>
            <TextEditor
              value={watch("details")}
              onChange={(e) => setValue("details", e.target.value)}
            />
            {errors.details && (
              <p className="mt-1 text-sm text-red-600">
                {errors.details.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-primary py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none "
            >
              Create Bundle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
