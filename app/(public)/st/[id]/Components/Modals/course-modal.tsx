"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries } from "@/store/slices/locationSlice";
import { CourseType } from "@/types/courses";
import { FieldConfig } from "@/types/forms";
import useUpdateApi from "@/hooks/useUpdateApi";
import FormModal from "@/components/FormModal/FormModal";

type PostJobModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialValues?: Partial<CourseType>;
};

const CourseModal = ({ isOpen, onClose, initialValues }: PostJobModalProps) => {
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
  const fields: FieldConfig<CourseType>[] = [
    {
      name: "title",
      type: "text",
      label: "Course Title",
      textFieldProps: {
        placeholder:
          "e.g., Advanced Cardiac Life Support (ACLS), Medical Terminology",
      },
      required: true,
    },
    {
      name: "description",
      type: "text",
      label: "Course Description",
      textFieldProps: {
        placeholder:
          "Briefly describe what the course covered, e.g., emergency procedures, patient care, healthcare technology.",
        sx: {
          "& .MuiOutlinedInput-root": {
            p: 0,
            borderRadius: "10px",
            height: "auto",
          },
        },
        multiline: true,
        minRows: 4,
        maxRows: 14,
      },
    },
  ];

  return (
    <FormModal
      open={isOpen}
      error={error?.message}
      loading={isLoading}
      deleteLoading={isDeleting}
      onClose={handleClose}
      onSubmit={() => console.log("submit")}
      fields={fields}
      deleteButtonText="Delete Course"
      title="Add Course"
      initialValues={initialValues}
    />
  );
};

export default CourseModal;
