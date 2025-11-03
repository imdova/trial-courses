import {
  FieldPathValue,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { FormField } from "../FormModal/fields/FormField";
import { FieldConfig } from "@/types/forms";
import { useLocationData } from "@/hooks/useLocationData";

interface LocationItems {
  country: LocationItem | null;
  state: LocationItem | null;
  city: string | null;
}

interface LocationSectionProps<T extends Partial<LocationItems>> {
  formMethods: UseFormReturn<T>;
}

function LocationSelect<T extends Partial<LocationItems>>({
  formMethods,
}: LocationSectionProps<T>) {
  const { getValues, setValue } = formMethods;
  const country = getValues(
    "country" as Path<T>
  ) as unknown as LocationItem | null;
  const { countries, states } = useLocationData(country?.code);

  const locationFields: FieldConfig<T>[] = [
    {
      name: "country.code" as Path<T>,
      type: "search-select",
      label: "Address",
      resetFields: ["state.code", "city"] as Path<T>[],
      textFieldProps: {
        placeholder: "Select your country (e.g., Egypt)",
      },
      options: countries.map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
      onChange: (value: string) => {
        const countryName =
          countries.find((c) => c.isoCode === value)?.name ?? "";
        setValue(
          "country.name" as Path<T>,
          countryName as FieldPathValue<T, Path<T>>
        );
      },
      gridProps: { xs: 12, sm: 4, md: 3 },
    },
    {
      name: "state.code" as Path<T>,
      type: "search-select",
      label: "State/Province",
      dependsOn: "country.code" as Path<T>,
      textFieldProps: {
        placeholder: "Select your governorate (e.g., Cairo, Alexandria)",
      },
      onChange: (value: string) => {
        const stateName = states.find((s) => s.isoCode === value)?.name ?? "";
        setValue(
          "state.name" as Path<T>,
          stateName as FieldPathValue<T, Path<T>>
        );
      },
      options: states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      })),
      gridProps: { xs: 12, sm: 4, md: 3 },
    },
    {
      name: "city" as Path<T>,
      type: "text",
      label: "City",
      textFieldProps: {
        placeholder: "e.g., Cairo, Giza",
      },
      gridProps: { xs: 12, sm: 4, md: 3 },
      rules: {
        minLength: { value: 2, message: "City must be at least 2 characters" },
      },
    },
  ];

  const resetValues = (fieldNames: (string | number)[]) => {
    fieldNames.forEach((name) => {
      const field = locationFields.find((f) => f.name === name);
      if (field) {
        setValue(field.name, "" as PathValue<T, Path<T>>, {
          shouldDirty: true,
        });
      }
    });
  };

  return (
    <div className="w-full">
      <div className="mt-1 grid grid-cols-12 gap-4">
        {locationFields.map((field) => {
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
                formValues={getValues()}
                dependsOnField={locationFields.find(
                  (f) => f.name === field.dependsOn
                )}
                resetValues={resetValues}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationSelect;
