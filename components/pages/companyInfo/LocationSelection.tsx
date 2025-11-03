import SearchableSelect from "@/components/UI/form/SearchableSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { Company } from "@/types";
import { FormControl, TextField, Tooltip } from "@mui/material";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  Path,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface LocationSelectionProps {
  control: Control<Company>;
  errors: FieldErrors<Company>;
  watch: UseFormWatch<Company>;
  setValue: UseFormSetValue<Company>;
}

const LocationSelection = ({
  control,
  errors,
  watch,
  setValue,
}: LocationSelectionProps) => {
  const countryCode = watch("country.code");
  const { countries, states } = useAppSelector((state) => state.location);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (countries.data.length === 0) {
      dispatch(fetchCountries());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (countryCode) {
      dispatch(fetchStates(countryCode));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode]);
  return (
    <div className="flex flex-col">
      {/* Company Sector Selector */}
      <div className="mb-2 flex flex-1 gap-3">
        <div className="w-1/2">
          <label className="text-main text-lg font-semibold">Country</label>
          <Controller
            name="country.name"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <SearchableSelect
                  options={countries.data.map((x) => ({
                    value: x.name,
                    label: x.name,
                  }))}
                  {...field}
                  value={field.value ?? ""}
                  onChange={(value) => {
                    const country = countries.data.find(
                      (country) => country.name === value,
                    );
                    field.onChange(value);
                    setValue(
                      "country.code" as Path<Company>,
                      country?.isoCode || "",
                    );
                    setValue("state.name" as Path<Company>, "");
                    setValue("state" as Path<Company>, null);
                  }}
                  renderValue={(selected) => {
                    if (!selected) {
                      return (
                        <span className="text-gray-400">Select Country</span>
                      );
                    }
                    return selected;
                  }}
                />
              </FormControl>
            )}
          />
        </div>
        {/* Company Type Selector */}
        <div className="w-1/2">
          <label className="text-main text-lg font-semibold">State</label>
          <Controller
            name="state.name"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <Tooltip
                  title={
                    countryCode ? undefined : "Please select Country first"
                  }
                  placement="bottom"
                >
                  <SearchableSelect
                    options={states.data.map((x) => ({
                      value: x.name,
                      label: x.name,
                    }))}
                    {...field}
                    value={field.value ?? ""}
                    onChange={(value) => {
                      const state = states.data.find(
                        (state) => state.name === value,
                      );
                      field.onChange(value);
                      setValue(
                        "state.code" as Path<Company>,
                        state?.isoCode || "",
                      );
                    }}
                    renderValue={(selected) => {
                      if (!selected) {
                        return (
                          <span className="text-gray-400">Select State</span>
                        );
                      }
                      return selected;
                    }}
                  />
                </Tooltip>
              </FormControl>
            )}
          />
        </div>
      </div>
      <div>
        <label className="text-main mb-2 text-lg font-semibold">City</label>
        <Controller
          name="city"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              className="w-full"
              placeholder="Enter City"
              error={!!errors?.city?.message}
            />
          )}
        />
      </div>
    </div>
  );
};

export default LocationSelection;
