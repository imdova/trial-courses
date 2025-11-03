import DynamicRadioGroup from "@/components/UI/form/DynamicRadioGroup";
import SearchableSelect from "@/components/UI/form/SearchableSelect";
import { companySizeList } from "@/constants";
import { Company } from "@/types";
import { FormControl, MenuItem, Select } from "@mui/material";
import { Control, Controller, FieldErrors } from "react-hook-form";

interface OwnershipProps {
  control: Control<Company>;
  errors: FieldErrors<Company>;
}

const CompanyOwnership: React.FC<OwnershipProps> = ({ control, errors }) => {
  return (
    <div>
      <div className="mb-4 flex items-center">
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <DynamicRadioGroup
              {...field}
              value={
                field.value !== undefined ? String(field.value) : undefined
              } // boolean -> string
              onChange={(val) => field.onChange(val === "true")} // string -> boolean
              options={[
                { value: "true", label: "Private" },
                { value: "false", label: "Governmental" },
              ]}
              row
            />
          )}
        />
        <span className="mx-4">&</span>
        <Controller
          name="isProfitable"
          control={control}
          render={({ field }) => (
            <DynamicRadioGroup
              {...field}
              value={
                field.value !== undefined ? String(field.value) : undefined
              } // boolean -> string
              onChange={(val) => field.onChange(val === "true")} // string -> boolean
              options={[
                { value: "true", label: "Profit Org" },
                { value: "false", label: "Non-Profit Org" },
              ]}
              row
            />
          )}
        />
      </div>
      {/* Additional Form Fields */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="flex-1">
          <label className="text-main text-lg font-semibold">
            Company Size
          </label>
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.companySectorId)} fullWidth>
                <Select
                  {...field}
                  value={field.value ?? undefined}
                  displayEmpty
                  MenuProps={{
                    disableScrollLock: true,
                    PaperProps: {
                      sx: { maxHeight: 300 },
                    },
                  }}
                  renderValue={(selected) => {
                    const selectedSize = companySizeList.find(
                      (item) => item.value === selected,
                    );
                    if (!selectedSize) {
                      return (
                        <em className="text-gray-400">Select Company Size</em>
                      );
                    }
                    return <span>{selectedSize.name}</span>;
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Company Size</em>
                  </MenuItem>
                  {companySizeList.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </div>
        <div className="flex-1">
          <label className="text-main text-lg font-semibold">
            Year Founded
          </label>
          <Controller
            name="yearFounded"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.companySectorId)} fullWidth>
                <SearchableSelect
                  {...field}
                  value={field.value?.toString() ?? ""}
                  options={Array.from({
                    length: new Date().getFullYear() - 1800 + 1,
                  })
                    .reverse()
                    .map((_, i) => ({
                      value: String(new Date().getFullYear() - i),
                      label: String(new Date().getFullYear() - i),
                    }))}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <em className="text-gray-400">Select Founded Year </em>
                      );
                    }
                    return <span>{selected}</span>;
                  }}
                />
              </FormControl>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyOwnership;
