"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff, ImageIcon, X } from "lucide-react";
import { countries } from "@/constants";
import Image from "next/image";

type InstructorFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  title: string;
  location: string;
  role: "Instructor" | "Education Academy";
  profilePicture: FileList;
  countryCode: string;
  phoneNumber: string;
};

export default function NewInstructorPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InstructorFormValues>();
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"Instructor" | "Education Academy">(
    "Instructor"
  );
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // handle image instructor
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImagePreview(null);
  };

  const onSubmit = (data: InstructorFormValues) => {
    console.log(data);
  };

  return (
    <div className=" p-6 bg-white border rounded-lg shadow-sm mx-4">
      <h1 className="text-2xl font-semibold mb-6">New Instructor</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-4">
          <div className="flex justify-center items-center col-span-2">
            <div className="flex justify-center items-center">
              <div className="flex flex-col items-center">
                <label className="text-sm font-medium mb-2">
                  Profile Picture
                </label>
                <div className="w-32 h-32 overflow-hidden border-2 border-dashed rounded flex items-center justify-center relative">
                  <input
                    type="file"
                    {...register("profilePicture")}
                    className="opacity-0 absolute w-24 h-24 cursor-pointer"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={imagePreview}
                        alt="Uploaded Profile Picture"
                        width={128}
                        height={128}
                        className="object-cover rounded-full"
                      />
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="flex justify-center items-center absolute w-5 h-5 top-1 right-1 p-1 bg-gray-400 text-white rounded-full"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <ImageIcon
                        className="text-muted-foreground mb-2 opacity-60"
                        fontSize="large"
                      />
                      <span className="text-xs text-gray-400 text-center">
                        Upload Photo
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5">
            <div className="flex justify-between gap-4 mb-4">
              {/* First Name */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  {...register("firstName", { required: true })}
                  className="w-full p-2 border rounded"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    First name is required
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col w-full">
                <label className="text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  {...register("lastName", { required: true })}
                  className="w-full p-2 border rounded"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    Last name is required
                  </p>
                )}
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                {...register("email", { required: true })}
                className="w-full p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Email is required</p>
              )}
            </div>
            {/* Username */}
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                {...register("username", { required: true })}
                className="w-full p-2 border rounded"
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  Username is required
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="col-span-2 border-t my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Password */}
          <div className="relative">
            <div className="flex flex-col mb-4">
              <label className="text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true })}
                className="w-full p-2 border rounded pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  Password is required
                </p>
              )}
            </div>
          </div>
          {/* Phone */}
          <div className="flex flex-col mb-4">
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number (optional)
              </label>

              <div className="flex rounded-md">
                <div className="relative flex-grow focus-within:z-10">
                  {/* Hidden input for form submission */}
                  <input
                    type="hidden"
                    {...register("countryCode")}
                    value={selectedCountry.code}
                  />

                  {/* Country code dropdown with flag */}
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <button
                      type="button"
                      className="h-full flex items-center pl-3 pr-2 border border-gray-300 rounded-l-md hover:bg-gray-100 focus:outline-none "
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      {selectedCountry.flag && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: selectedCountry.flag,
                          }}
                          className="flex justify-center items-center w-8 h-8 mr-2"
                        />
                      )}
                      <span className="text-gray-700">
                        {selectedCountry.code}
                      </span>
                      <svg
                        className="ml-1 h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Country dropdown menu */}
                    {showDropdown && (
                      <div className="absolute z-10 mt-1 left-0 top-full w-56 bg-white rounded-md overflow-hidden border border-gray-200">
                        <div className="max-h-60 overflow-y-auto">
                          {countries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              onClick={() => {
                                setSelectedCountry(country);
                                setShowDropdown(false);
                              }}
                            >
                              {country.flag && (
                                <div
                                  dangerouslySetInnerHTML={{
                                    __html: country.flag,
                                  }}
                                  className="flex justify-center items-center w-8 h-8 mr-2"
                                />
                              )}
                              <span className="flex-1 text-left">
                                {country.name}
                              </span>
                              <span className="text-gray-500">
                                {country.code}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone number input */}
                  <input
                    type="tel"
                    id="phone"
                    {...register("phoneNumber", {
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    className="pl-32 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    placeholder="1015753392"
                  />
                </div>
              </div>

              {errors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.phoneNumber.message as string}
                </p>
              )}
            </div>
          </div>
          {/* Title */}
          <div className="flex flex-col mb-4">
            <label className="text-sm font-medium mb-1">Title</label>
            <select
              {...register("title", { required: true })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Title</option>
              <option value="Doctor">Doctor</option>
              <option value="Professor">Professor</option>
            </select>
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">Title is required</p>
            )}
          </div>
          {/* Location */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Location</label>
            <select
              {...register("location", { required: true })}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Location</option>
              <option value="Cairo">Cairo</option>
              <option value="Alexandria">Alexandria</option>
            </select>
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">Location is required</p>
            )}
          </div>
        </div>

        {/* Role Buttons */}
        <div className="col-span-2 flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => {
              setRole("Instructor");
              setValue("role", "Instructor");
            }}
            className={`px-4 py-2 rounded-full border ${
              role === "Instructor"
                ? "bg-green-100 text-green-700"
                : "text-gray-500"
            }`}
          >
            Instructor
          </button>
          <button
            type="button"
            onClick={() => {
              setRole("Education Academy");
              setValue("role", "Education Academy");
            }}
            className={`px-4 py-2 rounded-full border ${
              role === "Education Academy"
                ? "bg-green-100 text-green-700"
                : "text-gray-500"
            }`}
          >
            Education Academy
          </button>
        </div>
        {/* Save Button */}
        <div className="col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            className="px-8 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
