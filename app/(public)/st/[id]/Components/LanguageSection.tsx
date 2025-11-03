"use client";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { Edit, LanguageOutlined } from "@mui/icons-material";
import SearchableSelect from "@/components/UI/form/SearchableSelect";
import FormModal from "@/components/FormModal/FormModal";
import { FieldConfig } from "@/types/forms";

// Types
type Option = {
  value: string;
  label: string;
};

type LanguageSectionProps = {
  user: UserProfile;
  isMe: boolean;
};
type UpdateOptions<T> = {
  body: T;
};

// Constants
const languageOptions: Option[] = [
  { value: "Fluent", label: "Fluent" },
  { value: "Native", label: "Native" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Beginner", label: "Beginner" },
];

const languages = [
  "Afrikaans",
  "Albanian",
  "Amharic",
  "Arabic",
  "Armenian",
  "Basque",
  "Bengali",
  "Bulgarian",
  "Catalan",
  "Chinese",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "English",
  "Estonian",
  "Finnish",
  "French",
  "Georgian",
  "German",
  "Greek",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Icelandic",
  "Indonesian",
  "Italian",
  "Japanese",
  "Korean",
  "Latvian",
  "Lithuanian",
  "Macedonian",
  "Malay",
  "Maltese",
  "Norwegian",
  "Persian",
  "Polish",
  "Portuguese",
  "Romanian",
  "Russian",
  "Serbian",
  "Slovak",
  "Slovenian",
  "Spanish",
  "Swahili",
  "Swedish",
  "Tagalog",
  "Tamil",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Vietnamese",
  "Welsh",
  "Yiddish",
];

const baseFields: FieldConfig[] = [
  {
    name: "English",
    label: "English",
    type: "select",
    options: languageOptions,
  },
  {
    name: "Spanish",
    label: "Spanish",
    type: "select",
    options: languageOptions,
  },
];

// Mock API functions
const useUpdateApi = <T extends object>(
  callback: (error: Error | null) => void
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);

  const update = async (
    api: string,
    options: UpdateOptions<T>,
    tag: string
  ) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Mock API call:", { api, options, tag });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      callback(null);
    } catch (error: unknown) {
      const err =
        error instanceof Error ? error : new Error("An unknown error occurred");
      setError({ message: "Failed to update languages" });
      callback(err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => setError(null);

  return { isLoading, error, update, reset };
};

const API_UPDATE_SEEKER = "/api/update-seeker";
const TAGS = {
  profile: "profile",
};

// Main Component
const LanguageSection: React.FC<LanguageSectionProps> = ({
  user,
  isMe = true,
}) => {
  const languageData = user.languages || [];
  const languagesValues = languageData.reduce((acc, lang) => {
    acc[lang.name] = lang.proficiency;
    return acc;
  }, {} as Record<string, string>);

  const initialFields: FieldConfig[] = languageData.map((lang) => ({
    name: lang.name,
    label: lang.name.charAt(0).toUpperCase() + lang.name.slice(1),
    type: "select",
    textFieldProps: { placeholder: "Select proficiency" },
    options: languageOptions,
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState<FieldConfig[]>(
    initialFields.length > 0 ? initialFields : baseFields
  );

  const { isLoading, error, update, reset } = useUpdateApi(() => {
    setIsModalOpen(false);
  });

  const open = () => {
    setIsModalOpen(true);
    setFields(initialFields.length > 0 ? initialFields : baseFields);
  };

  const close = () => {
    setIsModalOpen(false);
    reset();
  };

  const handleUpdate = async (formData: Record<string, string>) => {
    const updatedLanguages = Object.entries(formData)
      .filter(([proficiency]) => proficiency)
      .map(([name, proficiency]) => ({ name, proficiency }));

    await update(
      API_UPDATE_SEEKER,
      { body: { id: user.id, languages: updatedLanguages } },
      TAGS.profile
    );
  };

  const addNewField = (language: string) => {
    if (language) {
      setFields([
        ...fields,
        {
          name: language,
          label: language.charAt(0).toUpperCase() + language.slice(1),
          type: "select",
          textFieldProps: { placeholder: "Select proficiency" },
          options: languageOptions,
        },
      ]);
    }
  };

  const removeField = (fieldName: string) => {
    setFields(fields.filter((field) => field.name !== fieldName));
  };

  const availableLanguages = languages.filter(
    (lang) => !fields.some((field) => field.name === lang)
  );

  return (
    <div className="rounded-base border border-gray-200 bg-white p-4 shadow-soft md:p-5">
      <div className="flex items-center justify-between">
        <h3 className="mb-2 text-xl font-semibold text-main">Languages</h3>
        {isMe && (
          <IconButton
            onClick={open}
            className="rounded border border-solid border-gray-200 p-2"
          >
            <Edit />
          </IconButton>
        )}
      </div>

      <FormModal
        open={isModalOpen}
        onClose={close}
        onSubmit={handleUpdate}
        error={error?.message}
        loading={isLoading}
        fields={fields}
        title="Edit Your Languages"
        removeField={fields.length > 1 ? removeField : undefined}
        initialValues={languagesValues}
        submitButtonText="Save"
        cancelButtonText="Cancel"
      >
        <div className="border-t border-gray-200 p-4">
          <label className="font-semibold">Add Language</label>
          <SearchableSelect
            options={availableLanguages.map((lang) => ({
              value: lang,
              label: lang,
            }))}
            value=""
            onChange={addNewField}
            renderValue={() => (
              <span className="text-neutral-400">Select Language</span>
            )}
          />
        </div>
      </FormModal>

      <div>
        {languageData.length === 0 ? (
          <p className="text-muted-foreground">No language data found.</p>
        ) : (
          languageData.map((language, index) => (
            <div key={index} className="my-2">
              <p className="text-muted-foreground">
                <LanguageOutlined className="mr-2" color="primary" />
                <span className="font-semibold text-main">
                  {language.name}:
                </span>{" "}
                {language.proficiency}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LanguageSection;
