"use client";
import { Grid } from "@mui/material";

import { UseFormReturn } from "react-hook-form";
import { FieldConfig } from "@/types/forms";
import { FormField } from "@/components/FormModal/fields/FormField";
import { uploadFiles } from "@/lib/actions/upload.actions";
import ProfileImage from "@/components/UI/ProfileImage";
const fields: FieldConfig<UserProfile>[] = [
  {
    label: "First Name*",
    name: "firstName",
    type: "text",
    required: true,
    rules: {
      minLength: { value: 2, message: "First Name must be larger than 2 word" },
    },
    gridProps: { xs: 12, sm: 6, md: 3 },
  },
  {
    label: "Last Name*",
    name: "lastName",
    type: "text",
    required: true,
    rules: {
      minLength: { value: 2, message: "Last Name must be larger than 2 word" },
    },
    gridProps: { xs: 12, sm: 6, md: 3 },
  },
];

interface HeaderSectionProps {
  formMethods: UseFormReturn<Partial<InstructorProfile>>;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ formMethods }) => {
  const { control, getValues, setValue, watch } = formMethods;
  const avatar = watch("avatar");

  const updateImage = async (file: File) => {
    const [avatar] = await uploadFiles([file]);
    setValue("avatar", avatar, { shouldDirty: true });
  };

  return (
    <div className="flex w-full flex-col items-center gap-8 overflow-hidden rounded-base rounded-t-base border bg-white p-5 shadow-soft lg:flex-row lg:items-start">
      <div>
        <ProfileImage
          currentImageUrl={avatar || ""}
          alt={" user image"}
          size="large"
          onImageUpdate={updateImage}
          imageClassName="border-4 border-white shadow-md"
        />
      </div>
      <div className="w-full">
        <Grid className="grid grid-cols-12 gap-4">
          {fields.map((field) => {
            const gridProps = field.gridProps ?? {};
            const xs = gridProps.xs ?? 12;
            const sm = gridProps.sm ?? xs;
            const md = gridProps.md ?? sm;
            const classNames = [
              `col-span-${xs}`,
              sm !== xs ? `sm:col-span-${sm}` : "",
              md !== sm ? `md:col-span-${md}` : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <div className={classNames} key={String(field.name)}>
                <FormField
                  field={field}
                  control={control}
                  formValues={getValues()}
                />
              </div>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default HeaderSection;
