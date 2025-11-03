"use client";
import SelectField from "@/components/FormModal/fields/SelectField";
import TextField from "@/components/FormModal/fields/TextField";
import Flag from "@/components/UI/flagitem";
import SearchableSelect from "@/components/UI/form/SearchableSelect";
import { createUrl } from "@/util";
import { School } from "@mui/icons-material";
import { Button } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

// Dummy data for instructor types
const INSTRUCTOR_TYPES = [
  { id: "1", name: "Language Instructor" },
  { id: "2", name: "Music Teacher" },
  { id: "3", name: "Academic Tutor" },
  { id: "4", name: "Sports Coach" },
  { id: "5", name: "Art Teacher" },
  { id: "6", name: "Dance Instructor" },
];

// Dummy data for countries
const COUNTRIES = [
  { isoCode: "US", name: "United States" },
  { isoCode: "GB", name: "United Kingdom" },
  { isoCode: "CA", name: "Canada" },
  { isoCode: "AU", name: "Australia" },
  { isoCode: "EG", name: "Egypt" },
  { isoCode: "FR", name: "France" },
  { isoCode: "DE", name: "Germany" },
  { isoCode: "JP", name: "Japan" },
];

const SearchInputForm: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const newPathname = pathname;

  const initialSearchText = searchParams.get("q") || "";
  const initialInstructorType = searchParams.get("type") || "";
  const initialCountry = searchParams.get("country") || "EG";

  const [query, setQuery] = useState(initialSearchText);
  const [instructorType, setInstructorType] = useState(initialInstructorType);
  const [country, setCountry] = useState(initialCountry);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("q", query || " ");
    newParams.set("country", country);
    newParams.set("type", instructorType);
    newParams.delete("page");
    router.push(createUrl(newPathname, newParams));
  }

  const onReset = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete("q");
    newParams.delete("page");
    newParams.delete("country");
    newParams.delete("type");
    setQuery("");
    setInstructorType("");
    setCountry("");
    router.push(createUrl(newPathname, newParams));
  };

  // Prepare options for SelectField
  const instructorTypeOptions = INSTRUCTOR_TYPES.map((type) => ({
    value: type.id,
    label: type.name,
    icon: <School />,
  }));

  return (
    <form
      className="flex flex-col gap-2 items-center rounded-base border border-gray-200 bg-white p-3 shadow-soft md:flex-row md:p-5"
      onSubmit={onSubmit}
    >
      {/* Text Input with Icon */}
      <TextField
        placeholder="Instructor name or keyword"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <SelectField
        field={{
          name: "instructorType",
          options: instructorTypeOptions,
          textFieldProps: {
            placeholder: "Select Instructor Type",
            className: "w-full",
          },
        }}
        controllerField={{
          value: instructorType,
          onChange: (value) => setInstructorType(value as string),
        }}
      />

      <div className="w-full">
        {" "}
        <SearchableSelect
          options={COUNTRIES.map((x) => ({
            icon: (
              <Flag
                code={x.isoCode.toLocaleLowerCase()}
                name={x.name}
                className="mr-2 inline"
              />
            ),
            label: x.name,
            value: x.isoCode,
          }))}
          value={country}
          onChange={(value: string) => setCountry(value)} // Fixed this line
          renderValue={(selected: string) => {
            if (!selected) {
              return <em className="text-gray-400">Select Country</em>;
            }
            const item = COUNTRIES.find((x) => x.isoCode == selected);
            return (
              item && (
                <span>
                  <Flag
                    code={item.isoCode.toLocaleLowerCase()}
                    name={item.name}
                    className="mr-2 inline"
                  />
                  {item.name}
                </span>
              )
            );
          }}
        />
      </div>

      {/* Search Button */}
      {(query || country || instructorType) && (
        <Button
          className="md:w-fit w-full"
          variant="outlined"
          onClick={onReset}
        >
          Reset
        </Button>
      )}
      <Button
        variant="contained"
        className="md:w-fit w-full"
        type="submit"
        sx={{
          textTransform: "none",
          fontWeight: "bold",
          px: 4,
        }}
      >
        Search
      </Button>
    </form>
  );
};

const SearchBar: React.FC = (props) => {
  return (
    <Suspense>
      <SearchInputForm {...props} />
    </Suspense>
  );
};
export default SearchBar;
