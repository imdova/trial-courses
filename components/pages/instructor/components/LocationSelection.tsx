import SearchableSelect from "@/components/UI/form/SearchableSelect";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCountries, fetchStates } from "@/store/slices/locationSlice";
import { FormControl, TextField, Tooltip } from "@mui/material";
import { useEffect } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

interface LocationSelectionProps {
  control: Control<InstructorProfile>;
  errors: FieldErrors<InstructorProfile>;
  watch: UseFormWatch<InstructorProfile>;
  setValue: UseFormSetValue<InstructorProfile>;
}

const LocationSelection = ({
  control,
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
  }, [dispatch, countries.data.length]);

  useEffect(() => {
    if (countryCode) {
      dispatch(fetchStates(countryCode));
    }
  }, [countryCode, dispatch]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Country Selector */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Country *
          </label>
          <Controller
            name="country.name"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field, fieldState }) => (
              <FormControl fullWidth error={!!fieldState.error}>
                <SearchableSelect
                  options={countries.data.map((x) => ({
                    value: x.name,
                    label: x.name,
                  }))}
                  {...field}
                  onChange={(selectedValue) => {
                    const country = countries.data.find(
                      (country) => country.name === selectedValue
                    );
                    field.onChange(selectedValue);
                    setValue("country.code", country?.isoCode || "");
                    setValue("state.name", "");
                    setValue("state.code", "");
                    setValue("city", "");
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
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-500">
                    {fieldState.error.message}
                  </p>
                )}
              </FormControl>
            )}
          />
        </div>

        {/* State Selector */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            State/Province
          </label>
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
                  <div>
                    <SearchableSelect
                      options={states.data.map((x) => ({
                        value: x.name,
                        label: x.name,
                      }))}
                      disabled={!countryCode}
                      {...field}
                      onChange={(selectedValue) => {
                        const state = states.data.find(
                          (state) => state.name === selectedValue
                        );
                        field.onChange(selectedValue);
                        setValue("state.code", state?.isoCode || "");
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
                  </div>
                </Tooltip>
              </FormControl>
            )}
          />
        </div>

        {/* City Input */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            City *
          </label>
          <Controller
            name="city"
            control={control}
            defaultValue=""
            rules={{ required: "City is required" }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="Enter city name"
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                disabled={!countryCode}
              />
            )}
          />
        </div>
        {/* Nationality */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nationality
          </label>
          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                placeholder="e.g. Egyptian"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default LocationSelection;
