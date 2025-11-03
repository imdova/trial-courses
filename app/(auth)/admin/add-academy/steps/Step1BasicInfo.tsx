"use client";

import {
  Controller,
  Control,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import DropMenu from "@/components/UI/dropDown";
import AvatarUploader from "@/components/UI/AvatarUploader";
import { AcademyFormData } from "@/types/forms";

export interface Step1BasicInfoProps {
  register: UseFormRegister<AcademyFormData>;
  errors: FieldErrors<AcademyFormData>;
  control: Control<AcademyFormData>;
  watch: UseFormWatch<AcademyFormData>;
}

export default function Step1BasicInfo({
  register,
  errors,
  control,
}: Step1BasicInfoProps) {
  return (
    <div className="space-y-6">
      <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex flex-col items-center sm:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Academy Avatar
          </label>
          <Controller
            name="avatar"
            control={control}
            render={({ field: { onChange, value } }) => {
              // Normalize value to a previewable src
              let previewSrc: string | undefined;
              if (typeof value === "string" && value !== "") {
                previewSrc = value;
              } else if (value instanceof File) {
                previewSrc = URL.createObjectURL(value);
              } else {
                previewSrc = undefined;
              }

              return (
                <AvatarUploader
                  src={previewSrc}
                  onChange={(fileOrUrl) => {
                    onChange(fileOrUrl); // can be string or File
                  }}
                  size="lg"
                />
              );
            }}
          />
          <p className="mt-2 text-center text-xs text-gray-500">
            Click on the avatar to upload a new image
          </p>
          {errors.avatar && (
            <p className="mt-1 text-xs text-red-600">{errors.avatar.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Academy Name *
          </label>
          <input
            type="text"
            id="name"
            {...register("name")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category *
          </label>
          <input
            type="text"
            id="category"
            {...register("category")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.category && (
            <p className="mt-1 text-xs text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="type"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Type *
          </label>

          <Controller
            name="type"
            control={control}
            rules={{ required: "Type is required" }}
            render={({ field }) => (
              <DropMenu
                label={field.value || "Select Type"}
                options={[
                  { label: "University", value: "University" },
                  { label: "Academy", value: "Academy" },
                  { label: "Institute", value: "Institute" },
                  {
                    label: "Online Platform",
                    value: "Online Platform",
                  },
                ]}
                value={field.value}
                className="w-full"
                onChange={(option) => {
                  field.onChange(option.value);
                }}
              ></DropMenu>
            )}
          />

          {errors.type && (
            <p className="mt-1 text-xs text-red-600">{errors.type.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="foundedYear"
            className="block text-sm font-medium text-gray-700"
          >
            Founded Year *
          </label>
          <input
            type="number"
            id="foundedYear"
            {...register("foundedYear", { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.foundedYear && (
            <p className="mt-1 text-xs text-red-600">
              {errors.foundedYear.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="accreditation"
            className="block text-sm font-medium text-gray-700"
          >
            Accreditation
          </label>
          <input
            type="text"
            id="accreditation"
            {...register("accreditation")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.accreditation && (
            <p className="mt-1 text-xs text-red-600">
              {errors.accreditation.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
