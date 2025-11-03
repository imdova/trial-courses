"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import useUpdateApi from "@/hooks/useUpdateApi";
import { FieldConfig } from "@/types/forms";
import FormModal from "@/components/FormModal/FormModal";

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
  { length: new Date().getFullYear() - 1980 + 1 },
  (v, k) => k + 1980
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
      type: "text",
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

  // const onSubmit = async (formData: Partial<EducationItemData>) => {
  //   const country =
  //     countries.data.find(
  //       (country) => country.isoCode === formData?.country?.code
  //     ) || null;
  //   const body = {
  //     ...formData,
  //     country: { code: country?.isoCode, name: country?.name },
  //     seekerId: seekerId,
  //   };
  //   if (body.id) {
  //     await update(API_UPDATE_SEEKER_EDUCATION, { body }, TAGS.education);
  //   } else {
  //     await update(
  //       API_CREATE_SEEKER_EDUCATION,
  //       { method: "POST", body },
  //       TAGS.education
  //     );
  //   }
  // };

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
      onSubmit={() => console.log("submit")}
      fields={fields}
      deleteButtonText="Delete Education"
      title="Add Education"
      initialValues={initialValues}
    />
  );
};

export default EducationModal;
