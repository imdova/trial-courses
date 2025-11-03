"use client";

import { AcademyFormData } from "@/types/forms";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Step2LocationContactProps {
register: UseFormRegister<AcademyFormData>;
  errors: FieldErrors<AcademyFormData>;
}

export default function Step2LocationContact({
  register,
  errors,
}: Step2LocationContactProps) {
  return (
    <div className="space-y-6 ">
      <h2 className="border-b pb-2 text-xl font-semibold text-gray-800">
        Location & Contact Information
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h3 className="text-lg font-medium text-gray-700">Location</h3>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address *
          </label>
          <input
            type="text"
            id="address"
            {...register("location.address")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.location?.address && (
            <p className="mt-1 text-xs text-red-600">
              {errors.location.address.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City *
          </label>
          <input
            type="text"
            id="city"
            {...register("location.city")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.location?.city && (
            <p className="mt-1 text-xs text-red-600">
              {errors.location.city.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country *
          </label>
          <input
            type="text"
            id="country"
            {...register("location.country")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.location?.country && (
            <p className="mt-1 text-xs text-red-600">
              {errors.location.country.message}
            </p>
          )}
        </div>

        <div className="mt-6 sm:col-span-2">
          <h3 className="text-lg font-medium text-gray-700">
            Contact Information
          </h3>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            {...register("contactInfo.email")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.contactInfo?.email && (
            <p className="mt-1 text-xs text-red-600">
              {errors.contactInfo.email.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone *
          </label>
          <input
            type="text"
            id="phone"
            {...register("contactInfo.phone")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.contactInfo?.phone && (
            <p className="mt-1 text-xs text-red-600">
              {errors.contactInfo.phone.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="website"
            className="block text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <input
            type="url"
            id="website"
            {...register("contactInfo.website")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
          {errors.contactInfo?.website && (
            <p className="mt-1 text-xs text-red-600">
              {errors.contactInfo.website.message}
            </p>
          )}
        </div>

        <div className="mt-6 sm:col-span-2">
          <h3 className="text-lg font-medium text-gray-700">
            Social Links (Optional)
          </h3>
        </div>

        <div>
          <label
            htmlFor="facebook"
            className="block text-sm font-medium text-gray-700"
          >
            Facebook
          </label>
          <input
            type="url"
            id="facebook"
            {...register("contactInfo.socialLinks.facebook")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700"
          >
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            {...register("contactInfo.socialLinks.linkedin")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="twitter"
            className="block text-sm font-medium text-gray-700"
          >
            Twitter
          </label>
          <input
            type="url"
            id="twitter"
            {...register("contactInfo.socialLinks.twitter")}
            className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
