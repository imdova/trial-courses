"use client";

import { AcademyFormData, AcademyInstructor } from "@/types/forms";
import { X } from "lucide-react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

export interface Step4AdditionalInfoProps {
  register: UseFormRegister<AcademyFormData>;
  errors: FieldErrors<AcademyFormData>;
  watch: UseFormWatch<AcademyFormData>;
  setValue: UseFormSetValue<AcademyFormData>;
  instructorInput: AcademyInstructor;
  setInstructorInput: (value: AcademyInstructor) => void;
}

export default function Step4AdditionalInfo({
  register,
  errors,
  watch,
  setValue,
  instructorInput,
  setInstructorInput,
}: Step4AdditionalInfoProps) {
  const instructors = watch("instructors");

  const addInstructor = () => {
    if (instructorInput.name && instructorInput.title && instructorInput.id) {
      const newInstructor = {
        name: instructorInput.name,
        title: instructorInput.title,
        photo: instructorInput.photo || "",
        id: instructorInput.id,
        bio: instructorInput.bio || "",
      };

      setValue("instructors", [...(instructors || []), newInstructor]);
      setInstructorInput({
        name: "",
        title: "",
        photo: "",
        id: "",
        bio: "",
      });
    }
  };

  const removeInstructor = (index: number) => {
    const updated = [...(instructors || [])];
    updated.splice(index, 1);
    setValue("instructors", updated);
  };

  return (
    <div className="space-y-6">
      <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
        Additional Information
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="studentsCount"
            className="block text-sm font-medium text-gray-700"
          >
            Students Count *
          </label>
          <input
            type="number"
            id="studentsCount"
            {...register("studentsCount", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.studentsCount && (
            <p className="mt-1 text-xs text-red-600">
              {errors.studentsCount.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="alumniNetwork"
            className="block text-sm font-medium text-gray-700"
          >
            Alumni Network
          </label>
          <input
            type="text"
            id="alumniNetwork"
            {...register("alumniNetwork")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.alumniNetwork && (
            <p className="mt-1 text-xs text-red-600">
              {errors.alumniNetwork.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="tuitionFeesRange"
            className="block text-sm font-medium text-gray-700"
          >
            Tuition Fees Range *
          </label>
          <input
            type="text"
            id="tuitionFeesRange"
            {...register("tuitionFeesRange")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
            placeholder="e.g., $5,000 - $15,000"
          />
          {errors.tuitionFeesRange && (
            <p className="mt-1 text-xs text-red-600">
              {errors.tuitionFeesRange.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Instructors
          </label>

          <div className="mb-4 rounded-md bg-gray-50 p-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name *
                </label>
                <input
                  type="text"
                  value={instructorInput.name || ""}
                  onChange={(e) =>
                    setInstructorInput({
                      ...instructorInput,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title *
                </label>
                <input
                  type="text"
                  value={instructorInput.title || ""}
                  onChange={(e) =>
                    setInstructorInput({
                      ...instructorInput,
                      title: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID *
                </label>
                <input
                  type="text"
                  value={instructorInput.id || ""}
                  onChange={(e) =>
                    setInstructorInput({
                      ...instructorInput,
                      id: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="url"
                  value={instructorInput.photo || ""}
                  onChange={(e) =>
                    setInstructorInput({
                      ...instructorInput,
                      photo: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  rows={2}
                  value={instructorInput.bio || ""}
                  onChange={(e) =>
                    setInstructorInput({
                      ...instructorInput,
                      bio: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={addInstructor}
              className="bg-primary mt-4 inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none"
            >
              Add Instructor
            </button>
          </div>

          <div className="space-y-2">
            {instructors?.map(
              (instructor: AcademyInstructor, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border bg-white p-2"
                >
                  <div>
                    <p className="font-medium">{instructor.name}</p>
                    <p className="text-sm text-gray-600">{instructor.title}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeInstructor(index)}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  >
                    <X size={14} />
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
