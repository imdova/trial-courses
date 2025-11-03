/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types/forms";
import FormModal from "@/components/FormModal/FormModal";
import { useProfile } from "@/hooks/useProfile";
import { useSession } from "next-auth/react";

export const educationOptions = [
  { id: "high_school", label: "High School" },
  { id: "associate", label: "Associate Degree" },
  { id: "bachelor", label: "Bachelor's Degree" },
  { id: "master", label: "Master's Degree" },
  { id: "phd", label: "Ph.D." },
  { id: "diploma", label: "Diploma" },
  { id: "certificate", label: "Certificate" },
  { id: "other", label: "Other" },
];

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<EducationItemData>;
  seekerId?: string;
};

const years = Array.from(
  { length: new Date().getFullYear() - 1900 + 1 },
  (v, k) => k + 1900
).reverse();

const EducationModal = ({
  isOpen,
  onClose,
  initialValues,
}: PostJobModalProps) => {
  const { isLoading, error, reset } = useUpdateApi(handleClose);
  const { isLoading: isDeleting } = useUpdateApi(handleClose);

  const { countries } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { profile, saveProfile } = useProfile();
  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  function handleClose() {
    reset();
    onClose();
  }
  const fields: FieldConfig<EducationItemData>[] = [
    {
      name: "inistitute",
      type: "text",
      label: "Educational Institute",
      textFieldProps: {
        placeholder: "e.g., University of Oxford, MIT, Delhi University",
      },
      required: true,
      gridProps: { xs: 12 },
    },
    {
      name: "program",
      type: "text",
      label: "Program Name",
      textFieldProps: {
        placeholder:
          "e.g., Nursing, Radiologic Technology, Health Information Management",
      },
      required: true,
      gridProps: { xs: 12 },
    },
    {
      name: "degree",
      type: "select",
      label: "Degree Awarded",
      textFieldProps: {
        placeholder: "e.g., Bachelor's, Master's, PhD",
      },
      required: true,
      gridProps: { xs: 12, md: 4 },
      options: educationOptions.map((x) => ({
        label: x.label,
        value: x.id,
      })),
    },
    {
      name: "grade",
      label: "Final Grade or GPA",
      type: "number",
      textFieldProps: {
        placeholder: "e.g., 3.8 GPA, First Class Honours, A+",
      },
      required: true,
      gridProps: { xs: 12, md: 4 },
    },
    {
      name: "startYear",
      label: "Year of Admission",
      type: "search-select",
      textFieldProps: {
        placeholder: "e.g., 2019",
      },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
      gridProps: { xs: 12, md: 6 },
    },
    {
      name: "endYear",
      label: "Year of Graduation",
      type: "search-select",
      textFieldProps: {
        placeholder: "e.g., 2023",
      },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
      gridProps: { xs: 12, md: 6 },
      rules: {
        validate: (value: string, formValues: EducationItemData) => {
          const allValues = formValues as EducationItemData;
          return !value ||
            !allValues?.startYear ||
            Number(value) >= Number(allValues.startYear)
            ? true
            : "End Year must be after Start Year";
        },
      },
    },
  ];

  const onSubmit = async (formData: Partial<EducationItemData>) => {
    try {
      const userId = (session?.user?.id as string | undefined) || undefined;

      if (!userId) return;

      const existingMetadata = profile?.metadata
        ? (typeof profile.metadata === "string"
            ? JSON.parse(profile.metadata)
            : profile.metadata)
        : {};

      // Clone the array to avoid mutating Redux/Immer-frozen state
      const educationList: any[] = Array.isArray(existingMetadata.education)
        ? [...existingMetadata.education]
        : [];

      const payloadItem = {
        institute: formData.inistitute || "",
        programName: formData.program || "",
        degreeAwarded: formData.degree || "",
        finalGrade: formData.grade || "",
        yearOfAdmission: formData.startYear ? Number(formData.startYear) : undefined,
        yearOfGraduation: formData.endYear ? Number(formData.endYear) : undefined,
      };

      const idx = formData.id !== undefined ? Number(formData.id) : -1;
      if (!Number.isNaN(idx) && idx >= 0 && idx < educationList.length) {
        educationList[idx] = payloadItem;
      } else {
        educationList.push(payloadItem);
      }

      const updatedMetadata = {
        ...existingMetadata,
        education: educationList,
      };

      await saveProfile(userId, { metadata: updatedMetadata });
      handleClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to save education");
    }
  };

  // const deleteHandler = async (data: EducationItemData) => {
  //   await onDelete(
  //     API_DELETE_SEEKER_EDUCATION + data.id,
  //     {
  //       method: "DELETE",
  //     },
  //     TAGS.education
  //   );
  // };

  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      deleteLoading={isDeleting}
      onClose={handleClose}
      onSubmit={onSubmit}
      fields={fields}
      deleteButtonText="Delete Education"
      title="Add Education"
      initialValues={initialValues}
    />
  );
};

export default EducationModal;
