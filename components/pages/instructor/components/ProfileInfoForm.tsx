"use client";

import FormModal from "@/components/FormModal/FormModal";
import IconButton from "@/components/UI/Buttons/IconButton";
import { FieldConfig } from "@/types/forms";
import { Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface EditProfileProps {
  user: InstructorProfile;
  isMe: boolean;
}

// Enhanced dummy data for instructors
const dummyDepartments = [
  { id: "1", name: "Computer Science" },
  { id: "2", name: "Medicine" },
  { id: "3", name: "Engineering" },
  { id: "4", name: "Business Administration" },
];

const dummySpecializations = [
  { id: "101", name: "Artificial Intelligence", departmentId: "1" },
  { id: "102", name: "Data Science", departmentId: "1" },
  { id: "201", name: "Dermatology", departmentId: "2" },
  { id: "202", name: "Cardiology", departmentId: "2" },
];

const dummyAcademicRanks = [
  { id: "1001", name: "Lecturer" },
  { id: "1002", name: "Assistant Professor" },
  { id: "1003", name: "Associate Professor" },
  { id: "1004", name: "Professor" },
];

const dummyCountries = [
  { isoCode: "US", name: "United States" },
  { isoCode: "EG", name: "Egypt" },
  { isoCode: "UK", name: "United Kingdom" },
];

const dummyStates = [
  { isoCode: "CA", name: "California", countryCode: "US" },
  { isoCode: "NY", name: "New York", countryCode: "US" },
  { isoCode: "AS", name: "Assyut", countryCode: "EG" },
  { isoCode: "CAI", name: "Cairo", countryCode: "EG" },
];

const dummyTitles = [
  "Professor",
  "Dr.",
  "Mr.",
  "Ms.",
  "Assistant Professor",
  "Associate Professor",
];

const initialValues = (
  user: Partial<InstructorProfile>
): Partial<InstructorProfile> => ({
  firstName: user?.firstName || "",
  lastName: user?.lastName || "",
  birthDate: user?.birthDate || "",
  title: user?.title || "",
  departmentId: user?.departmentId || "",
  specializationId: user?.specializationId || "",
  academicRankId: user?.academicRankId || "",
  country: user?.country || undefined,
  state: user?.state || undefined,
  city: user?.city || "",
  email: user?.email || "",
  phone: user?.phone || "",
  bio: user?.bio || "",
  officeLocation: user?.officeLocation || "",
  officeHours: user?.officeHours || "",
  website: user?.website || "",
});

const EditInstructorProfile: React.FC<EditProfileProps> = ({ user, isMe }) => {
  const { update: updateSession } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countryCode, setCountryCode] = useState(user?.country?.code || "");
  const [departmentId, setDepartmentId] = useState(user?.departmentId || null);

  // Filter data based on selections
  const states = dummyStates.filter(
    (state) => state.countryCode === countryCode
  );
  const specializations = dummySpecializations.filter(
    (spec) => spec.departmentId === departmentId
  );

  const fields: FieldConfig[] = [
    // Row 1: Personal Information
    {
      label: "Title",
      name: "title",
      textFieldProps: {
        label: "Title",
      },
      type: "select",
      options: dummyTitles.map((title) => ({ value: title, label: title })),
      gridProps: { xs: 12, sm: 6, md: 4 },
    },
    {
      label: "First Name*",
      name: "firstName",
      type: "text",
      required: true,
      gridProps: { xs: 12, sm: 6, md: 4 },
    },
    {
      label: "Last Name*",
      name: "lastName",
      type: "text",
      required: true,
      gridProps: { xs: 12, sm: 6, md: 4 },
    },

    // Row 2: Academic Information
    {
      label: "Date of Birth",
      name: "birthDate",
      type: "date",
      gridProps: { xs: 12, sm: 6 },
      textFieldProps: {
        inputProps: {
          max: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            .toISOString()
            .split("T")[0],
        },
      },
    },
    {
      label: "Department*",
      name: "departmentId",
      type: "select",
      required: true,
      options: dummyDepartments.map((dept) => ({
        value: dept.id,
        label: dept.name,
      })),
      textFieldProps: {
        label: "Department",
      },
      onChange: (value) => setDepartmentId(value),
      resetFields: ["specializationId"],
      gridProps: { xs: 12, sm: 6 },
    },
    {
      label: "Specialization*",
      name: "specializationId",
      type: "select",
      required: true,
      dependsOn: "departmentId",
      textFieldProps: {
        label: "Specialization",
      },
      options: specializations.map((spec) => ({
        value: spec.id,
        label: spec.name,
      })),
      gridProps: { xs: 12, sm: 6 },
    },

    // Row 3: Academic Details
    {
      label: "Academic Rank*",
      name: "academicRankId",
      type: "select",
      required: true,
      textFieldProps: {
        label: "Academic Rank",
      },
      options: dummyAcademicRanks.map((rank) => ({
        value: rank.id,
        label: rank.name,
      })),
      gridProps: { xs: 12, sm: 6 },
    },
    {
      label: "Email*",
      name: "email",
      type: "email",
      required: true,
      gridProps: { xs: 12, sm: 6 },
    },
    {
      label: "Phone",
      name: "phone",
      type: "phone",
      gridProps: { xs: 12, sm: 6 },
    },

    // Row 4: Office Information
    {
      label: "Office Location",
      name: "officeLocation",
      type: "text",
      gridProps: { xs: 12, sm: 6 },
    },
    {
      label: "Office Hours",
      name: "officeHours",
      type: "text",
      gridProps: { xs: 12, sm: 6 },
    },

    // Row 5: Location Information
    {
      label: "Country",
      name: "country.code",
      type: "select",
      options: dummyCountries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      textFieldProps: {
        label: "Country",
      },
      onChange: (value) => setCountryCode(value),
      resetFields: ["state.code", "city"],
      gridProps: { xs: 12, sm: 6, md: 4 },
    },
    {
      label: "State/Region",
      name: "state.code",
      type: "select",
      textFieldProps: {
        label: "State/Region",
      },
      dependsOn: "country.code",
      options: states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 12, sm: 6, md: 4 },
    },
    {
      label: "City",
      name: "city",
      type: "text",
      gridProps: { xs: 12, sm: 6, md: 4 },
    },
  ];

  const handleUpdate = async (formData: Partial<InstructorProfile>) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedProfile = {
        ...user,
        ...formData,
        country:
          dummyCountries.find((c) => c.isoCode === formData.country?.code) ||
          null,
        state: states.find((s) => s.isoCode === formData.state?.code) || null,
      };

      console.log("Instructor profile updated:", updatedProfile);

      await updateSession({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
      });

      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isMe && (
        <FormModal
          maxWidth="xl"
          open={isModalOpen}
          loading={isLoading}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleUpdate}
          fields={fields}
          title="Edit Instructor Profile"
          initialValues={initialValues(user)}
        />
      )}

      <div className="flex h-full flex-col items-center justify-center gap-2 sm:items-end">
        {isMe && <IconButton Icon={Pen} onClick={() => setIsModalOpen(true)} />}
      </div>
    </>
  );
};

export default EditInstructorProfile;
