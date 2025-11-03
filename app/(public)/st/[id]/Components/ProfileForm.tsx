"use client";
import React, { useState } from "react";
import dayjs from "dayjs";
import { UseFormReturn } from "react-hook-form";
import { Female, Male } from "@mui/icons-material";
import { Gender } from "@/constants/enums/gender.enum";
import { isValidPhoneNumber } from "@/util/forms";
import { FormField } from "@/components/FormModal/fields/FormField";
import { CheckboxField } from "@/components/FormModal/fields/CheckboxField";
import { FieldConfig } from "@/types/forms";
import LocationSelect from "@/components/selections/LocationSelect";

export const gendersOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

export const maritalStatusOptions = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
];

export const nationalitiesOptions = [
  { label: "Egyptian", value: "egyptian" },
  { label: "American", value: "american" },
  { label: "French", value: "french" },
  { label: "German", value: "german" },
  { label: "Saudi", value: "saudi" },
];

interface ProfileFormProps {
  formMethods: UseFormReturn<Partial<UserProfile>>;
}

const genderIcons: Record<keyof typeof Gender, React.ReactNode> = {
  MALE: (
    <Male className="h-7 w-7 text-blue-500 group-aria-selected:text-white" />
  ),
  FEMALE: (
    <Female className="h-7 w-7 text-pink-500 group-aria-selected:text-white" />
  ),
  ANY: null,
};

const ProfileForm: React.FC<ProfileFormProps> = ({ formMethods }) => {
  const { control } = formMethods;
  const [isMyWhatsApp, setIsMyWhatsApp] = useState(true);
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setIsMyWhatsApp(isChecked);
  };
  return (
    <div className="rounded-base shadow-soft w-full space-y-3 border border-gray-200 bg-white p-5">
      <h5 className="text-main text-xl font-semibold md:mt-4">
        Your Personal Info
      </h5>
      <div className="flex gap-4 md:w-1/2">
        {/* Phone Number */}
        <div className="w-full">
          <FormField
            field={{
              label: "Phone Number*",
              name: "phone",
              type: "phone",
              rules: {
                validate: (value: string) =>
                  isValidPhoneNumber(value || "") ||
                  "Please enter a valid phone number",
              },
            }}
            control={control}
          />
        </div>
        <div className="flex-1">
          {!isMyWhatsApp && (
            <FormField
              field={
                {
                  label: "WhatsApp Number",
                  name: "whatsapp",
                  type: "phone",
                  rules: {
                    validate: (value: string) =>
                      isValidPhoneNumber(value || "") ||
                      "Please enter a valid phone number",
                  },
                } as FieldConfig<UserProfile>
              }
              control={control}
            />
          )}
        </div>
      </div>
      <CheckboxField
        field={{
          name: "My Phone Number is my whats app number",
        }}
        controllerField={{
          value: isMyWhatsApp,
          onChange: onCheckboxChange,
        }}
      />
      <div className="md:w-1/2">
        <FormField
          field={
            {
              name: "birthDate",
              type: "date",
              label: "Date of Birth*",
              dateFieldProps: {
                maxDate: dayjs().subtract(16, "years"),
              },
            } as FieldConfig<UserProfile>
          }
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={{
            name: "gender",
            type: "radio",
            label: "Gender",
            options: gendersOptions.map((x) => ({
              ...x,
              icon: genderIcons[x.value as keyof typeof genderIcons],
            })),
          }}
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={{
            name: "nationality",
            type: "search-select",
            label: "Nationality",
            options: nationalitiesOptions,
          }}
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={
            {
              name: "maritalStatus",
              type: "radio",
              label: "Marital Status",
              options: maritalStatusOptions,
            } as FieldConfig<UserProfile>
          }
          control={control}
        />
      </div>
      <div className="md:w-1/2">
        <FormField
          field={
            {
              name: "hasDrivingLicence",
              type: "radio",
              label: "Do you have a driving license?",
              options: [
                { label: "yes", value: true },
                { label: "no", value: false },
              ],
            } as unknown as FieldConfig<UserProfile>
          }
          control={control}
        />
      </div>
      {/* Location */}
      <LocationSelect formMethods={formMethods} />
    </div>
  );
};

export default ProfileForm;
