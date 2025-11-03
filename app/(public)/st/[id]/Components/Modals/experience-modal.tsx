"use client";

import { ExperienceItemData } from "@/types";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import { FieldConfig } from "@/types/forms";
import FormModal from "@/components/FormModal/FormModal";
import useUpdateApi from "@/hooks/useUpdateApi";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<ExperienceItemData>;
  seekerId?: string;
  seekerTitle?: string | null;
};

type OptExperienceItemData = ExperienceItemData & {
  startYear: string;
  endYear: string;
  startMonth: string;
  endMonth: string;
};

const years = Array.from(
  { length: new Date().getFullYear() - 1980 + 1 },
  (v, k) => k + 1980
).reverse();
const months = [
  { full: "January", short: "Jan", number: "01" },
  { full: "February", short: "Feb", number: "02" },
  { full: "March", short: "Mar", number: "03" },
  { full: "April", short: "Apr", number: "04" },
  { full: "May", short: "May", number: "05" },
  { full: "June", short: "Jun", number: "06" },
  { full: "July", short: "Jul", number: "07" },
  { full: "August", short: "Aug", number: "08" },
  { full: "September", short: "Sep", number: "09" },
  { full: "October", short: "Oct", number: "10" },
  { full: "November", short: "Nov", number: "11" },
  { full: "December", short: "Dec", number: "12" },
];
const ExperienceModal = ({ isOpen, onClose }: PostJobModalProps) => {
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
  const fields: FieldConfig<OptExperienceItemData>[] = [
    {
      name: "title",
      type: "text",
      label: "Job Title",
      textFieldProps: { placeholder: "Enter Job Title" },
      required: true,
      gridProps: { xs: 12 }, // Full row for title
    },
    {
      name: "startYear",
      type: "search-select",
      label: "Start Year",
      textFieldProps: { placeholder: "Start Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      required: true,
      gridProps: { xs: 12, md: 4 },
    },
    {
      name: "startMonth",
      label: "Start Month",
      type: "search-select",
      textFieldProps: { placeholder: "Start Month" },
      options: months.map((month) => ({
        value: month.number,
        label: month.full,
      })),
      required: true,
      gridProps: { xs: 12, md: 4 },
    },
    {
      name: "isPresent",
      label: "I currently work there",
      type: "checkbox",
      resetFields: ["endYear", "endMonth"],
      hideFieldNames: ["endYear", "endMonth"],
      gridProps: { xs: 12, md: 4 },
    },
    {
      name: "endYear",
      label: "End Year",
      type: "search-select",
      textFieldProps: { placeholder: "End Year" },
      options: years.map((year) => ({
        value: year.toString(),
        label: year.toString(),
      })),
      rules: {
        validate: (value: string, formValues: OptExperienceItemData) => {
          const allValues = formValues as OptExperienceItemData;
          return !value ||
            !allValues?.startYear ||
            Number(value) >= Number(allValues.startYear)
            ? true
            : "End Year must be after start year";
        },
      },
      required: true,
      gridProps: { xs: 12, md: 6 },
    },
    {
      name: "endMonth",
      label: "End Month",
      type: "search-select",
      textFieldProps: { placeholder: "End Month" },
      options: months.map((month) => ({
        value: month.number,
        label: month.full,
      })),
      required: true,
      gridProps: { xs: 12, md: 6 },
    },
  ];

  // const onSubmit = async (formData: Partial<OptExperienceItemData>) => {
  //   const { state: formState, country: formCountry } = formData;
  //   const country =
  //     countries.data.find((country) => country.isoCode === formCountry?.code) ||
  //     null;
  //   const state =
  //     states.data.find((state) => state.isoCode === formState?.code) || null;

  //   const startDate = formData.startYear + "-" + formData.startMonth;
  //   const endDate = formData.isPresent
  //     ? null
  //     : formData.endYear + "-" + formData.endMonth;

  //   const body = {
  //     ...formData,
  //     seekerId: seekerId,
  //     country: { code: country?.isoCode, name: country?.name },
  //     state: { code: state?.isoCode, name: state?.name },
  //     startDate,
  //     endDate,
  //   };
  //   if (body.id) {
  //     const isTitleExperience =
  //       seekerTitle === `EXPERIENCE: ${values?.title} at ${values?.name}`;
  //     const title = seekerTitle
  //       ? isTitleExperience
  //         ? `EXPERIENCE: ${body.title} at ${body.name}`
  //         : null
  //       : `EXPERIENCE: ${body.title} at ${body.name}`;

  //     await update(API_UPDATE_SEEKER_EXPERIENCE, { body }, TAGS.experience);
  //     if (title) {
  //       update(
  //         API_UPDATE_SEEKER,
  //         { body: { id: seekerId, title } },
  //         TAGS.profile
  //       );
  //     }
  //   } else {
  //     await update(
  //       API_CREATE_SEEKER_EXPERIENCE,
  //       { method: "POST", body },
  //       TAGS.experience
  //     );
  //     const title = seekerTitle
  //       ? seekerTitle.includes("EXPERIENCE:")
  //         ? `EXPERIENCE: ${body.title} at ${body.name}`
  //         : null
  //       : `EXPERIENCE: ${body.title} at ${body.name}`;
  //     if (title) {
  //       update(
  //         API_UPDATE_SEEKER,
  //         { body: { id: seekerId, title } },
  //         TAGS.profile
  //       );
  //     }
  //   }
  // };

  // const deleteHandler = async (data: ExperienceItemData) => {
  //   await onDelete(
  //     API_DELETE_SEEKER_EXPERIENCE + data.id,
  //     {
  //       method: "DELETE",
  //     },
  //     TAGS.experience
  //   );
  // };

  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      deleteLoading={isDeleting}
      onClose={handleClose}
      onSubmit={() => console.log("sumit")}
      fields={fields}
      deleteButtonText="Delete Experience"
      title="Add Experience"
      initialValues={[]}
    />
  );
};

export default ExperienceModal;
