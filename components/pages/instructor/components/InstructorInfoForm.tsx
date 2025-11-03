"use client";

import FormModal from "@/components/FormModal/FormModal";
import IconButton from "@/components/UI/Buttons/IconButton";
import { FieldConfig } from "@/types/forms";
import { Award, Clock, Languages, MapPin, Pen, Plus } from "lucide-react";
import { useState } from "react";

interface LocationItem {
  code: string;
  name: string;
}

interface InstructorInfo {
  country: string;
  state: string;
  languages: {
    name: string;
    proficiency: string;
  }[];
  qualifications: string[];
  experience: number;
}

interface InstructorInfoFormProps {
  instructor: InstructorProfile;
  isMe: boolean;
}

const countries: LocationItem[] = [
  { code: "EG", name: "Egypt" },
  { code: "CA", name: "Canada" },
];

const states: Record<string, LocationItem[]> = {
  EG: [
    { code: "CAI", name: "Cairo" },
    { code: "AS", name: "Asyut" },
  ],
  ca: [
    { code: "ON", name: "Ontario" },
    { code: "QC", name: "Quebec" },
  ],
};

const InstructorInfoForm: React.FC<InstructorInfoFormProps> = ({
  instructor,
  isMe,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState<InstructorInfo>({
    country: instructor.country?.code || "",
    state: instructor.state?.code || "",
    languages: instructor.languages || [],
    qualifications: instructor.qualifications || [],
    experience: instructor.experience || 0,
  });

  const hasInfo =
    info.country ||
    info.state ||
    info.languages.length > 0 ||
    info.qualifications.length > 0 ||
    info.experience > 0;

  const getCurrentCountry = () =>
    countries.find((c) => c.code === info.country);
  const getCurrentState = () =>
    states[info.country]?.find((s) => s.code === info.state);

  const infoFields: FieldConfig[] = [
    {
      name: "country",
      type: "select",
      label: "Country",
      selectProps: {
        options: countries.map((c) => ({ value: c.code, label: c.name })),
      },
      onChange: () => {
        return { resetFields: ["state"] };
      },
    },
    {
      name: "state",
      type: "select",
      label: "State/Region",
      selectProps: {
        options: info.country
          ? states[info.country]?.map((s) => ({
              value: s.code,
              label: s.name,
            })) || []
          : [],
        disabled: !info.country,
      },
    },
    {
      name: "languages",
      type: "multi-text",
      label: "Languages",
      componentProps: {
        formatDisplay: (item: string) => item,
      },
      textFieldProps: {
        placeholder: "e.g. Arabic, English",
      },
    },
    {
      name: "qualifications",
      type: "multi-text",
      label: "Qualifications",
      componentProps: {
        formatDisplay: (item: string) => item,
      },
      textFieldProps: {
        placeholder: "Add qualification and press enter",
      },
    },
    {
      name: "experience",
      type: "number",
      label: "Years of Experience",
      textFieldProps: {
        min: 0,
        max: 50,
        placeholder: "0",
      },
    },
  ];

  const handleUpdateInfo = (formData: InstructorInfo) => {
    const updatedInfo: InstructorInfo = {
      country: formData.country,
      state: formData.state,
      languages: formData.languages || [],
      qualifications: formData.qualifications || [],
      experience: Number(formData.experience) || 0,
    };
    setInfo(updatedInfo);
    setIsModalOpen(false);
  };

  const formatLocation = () => {
    const parts = [];
    const state = getCurrentState();
    const country = getCurrentCountry();

    if (state?.name) parts.push(state.name);
    if (country?.name) parts.push(country.name);
    return parts.join(", ") || "Not specified";
  };

  return (
    <div className="w-full">
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Instructor Info</h2>
          {isMe && hasInfo && (
            <IconButton
              className="!text-gray-500 border border-gray-200 !rounded-md"
              Icon={Pen}
              onClick={() => setIsModalOpen(true)}
            />
          )}
        </div>

        {hasInfo ? (
          <ul className="space-y-3">
            {(info.country || info.state) && (
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">Location</h4>
                  <p className="text-sm text-gray-600">{formatLocation()}</p>
                </div>
              </li>
            )}

            {info.languages.length > 0 && (
              <li className="flex items-start gap-3">
                <Languages size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">Languages</h4>
                  <p className="text-sm text-gray-600">
                    {info.languages.map((lan) => (
                      <span key={lan.name} className="mr-2 text-sm">
                        {lan.name}
                      </span>
                    ))}
                  </p>
                </div>
              </li>
            )}

            {info.qualifications.length > 0 && (
              <li className="flex items-start gap-3">
                <Award size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">Qualifications</h4>
                  <p className="text-sm text-gray-600">
                    {info.qualifications.join(", ")}
                  </p>
                </div>
              </li>
            )}

            {info.experience > 0 && (
              <li className="flex items-start gap-3">
                <Clock size={20} className="mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold">Experience</h4>
                  <p className="text-sm text-gray-600">
                    {info.experience} {info.experience === 1 ? "Year" : "Years"}
                  </p>
                </div>
              </li>
            )}
          </ul>
        ) : isMe ? (
          <div className="flex flex-col items-center justify-center py-8">
            <IconButton
              className="!text-gray-500 border border-gray-200 !rounded-md mb-4"
              Icon={Plus}
              onClick={() => setIsModalOpen(true)}
            />
            <p className="text-gray-500 text-xs">
              No instructor information added yet
            </p>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No instructor information available
          </div>
        )}
      </div>

      <FormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateInfo}
        fields={infoFields}
        title={
          hasInfo ? "Edit Instructor Information" : "Add Instructor Information"
        }
        initialValues={info}
      />
    </div>
  );
};

export default InstructorInfoForm;
