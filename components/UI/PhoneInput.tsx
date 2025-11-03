import { formDataSettings } from "@/types/forms";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";

// Country data with flag
const countries = [
  {
    code: "+20",
    name: "Egypt",
    flag: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="26" height="16"> <rect width="3" height="2" fill="#ce1126"/> <rect y="0.666" width="3" height="0.666" fill="#fff"/> <rect y="1.333" width="3" height="0.666" fill="#000"/><text x="1.5" y="1.2" text-anchor="middle" font-size="0.3" fill="gold" font-family="Arial">&#x1F3F4; </text> </svg>',
  },
  {
    code: "+1",
    name: "USA",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="26" height="16">
        <rect width="24" height="24" fill="#B22234"/>
        <g fill="#fff">
          <rect y="2" width="24" height="2"/>
          <rect y="6" width="24" height="2"/>
          <rect y="10" width="24" height="2"/>
          <rect y="14" width="24" height="2"/>
          <rect y="18" width="24" height="2"/>
        </g>
        <rect width="10" height="10" fill="#3C3B6E"/>
      </svg>
    `,
  },
  {
    code: "+44",
    name: "UK",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="16">
        <rect width="24" height="24" fill="#012169"/>
        <path d="M0 0L24 24M24 0L0 24" stroke="#fff" stroke-width="4"/>
        <path d="M0 0L24 24M24 0L0 24" stroke="#C8102E" stroke-width="2"/>
        <path d="M0 10h24v4H0zM10 0v24h4V0z" fill="#fff"/>
        <path d="M0 11h24v2H0zM11 0v24h2V0z" fill="#C8102E"/>
      </svg>
    `,
  },
  {
    code: "+33",
    name: "France",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="8" height="16" fill="#0055A4"/>
        <rect x="8" width="8" height="16" fill="#fff"/>
        <rect x="16" width="8" height="16" fill="#EF4135"/>
      </svg>
    `,
  },
  {
    code: "+49",
    name: "Germany",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="5.33" y="0" fill="#000"/>
        <rect width="24" height="5.33" y="5.33" fill="#D00"/>
        <rect width="24" height="5.33" y="10.66" fill="#FFCE00"/>
      </svg>
    `,
  },
  {
    code: "+966",
    name: "Saudi Arabia",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="16" fill="#006c3f"/>
        <text x="12" y="10" text-anchor="middle" font-size="6" fill="#fff" font-family="Arial">لا إله إلا الله</text>
      </svg>
    `,
  },
  {
    code: "+971",
    name: "UAE",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="5.33" y="0" fill="#00732e"/>
        <rect width="24" height="5.33" y="5.33" fill="#fff"/>
        <rect width="24" height="5.33" y="10.66" fill="#000"/>
        <rect width="6" height="16" fill="#ff0000"/>
      </svg>
    `,
  },
  {
    code: "+81",
    name: "Japan",
    flag: `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16" width="24" height="16">
        <rect width="24" height="16" fill="#fff"/>
        <circle cx="12" cy="8" r="4" fill="#bc002d"/>
      </svg>
    `,
  },
];

interface PhoneInputProps {
  register: UseFormRegister<formDataSettings>;
  errors: {
    [K in keyof formDataSettings]?: { message?: string };
  };
  required?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  register,
  errors,
  required = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
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
            {...register("countryCode", {
              required: required && "Country code is required",
            })}
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
                  dangerouslySetInnerHTML={{ __html: selectedCountry.flag }}
                  className="flex justify-center items-center w-8 h-8 mr-2"
                />
              )}
              <span className="text-gray-700">{selectedCountry.code}</span>
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
                          dangerouslySetInnerHTML={{ __html: country.flag }}
                          className="flex justify-center items-center w-8 h-8 mr-2"
                        />
                      )}
                      <span className="flex-1 text-left">{country.name}</span>
                      <span className="text-gray-500">{country.code}</span>
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
              required: required && "Phone number is required",
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
  );
};

export default PhoneInput;
