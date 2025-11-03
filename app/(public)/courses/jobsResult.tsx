/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import CustomSelect from "@/components/UI/CustomSelect";
// import { FormControl, IconButton, MenuItem, Select } from "@mui/material";
// import { GridViewOutlined, List } from "@mui/icons-material";
import { useState } from "react";

type Data = {
  id: string;
};

const JobsResult: React.FC<{ data: Data[]; total: number }> = ({
  data,
  total,
}) => {
  const [view, setView] = useState("list");
  const [selectedOption, setSelectedOption] = useState<{
    value: string;
    label: string;
  } | null>(null);
  const options = [
    { value: "most-relevant", label: "Most relevant" },
    { value: "oldest", label: "Oldest" },
    { value: "name", label: "Name" },
  ];

  return (
    <div>
      <div className="mb-9 flex flex-wrap-reverse items-center justify-between md:flex-nowrap">
        <div>
          <h3 className="text-[24px] font-bold text-main">Search Results</h3>
          <p className="text-sm text-muted-foreground">
            {total === 0 ? "No results" : `Showing ${total} Results`}
          </p>
        </div>
        <div className="flex w-full items-center justify-between gap-2 md:w-auto md:justify-normal">
          <div className="flex items-baseline gap-1">
            <label className="mb-1 text-muted-foreground">Sort by:</label>
            {/*TODO: you will find a custom select component added to component, you can add some improvements  */}

            {/* <FormControl variant="standard" className="w-32">
              <Select
                className="border-none bg-transparent text-main focus:outline-none"
                disableUnderline
                defaultValue="most-relevant"
              >
                <MenuItem value="most-relevant">Most relevant</MenuItem>
                <MenuItem value="oldest">Oldest</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>
            </FormControl> */}

            <CustomSelect
              options={options}
              selected={selectedOption}
              onChange={setSelectedOption}
              placeholder="Select a Filter "
            />

            {selectedOption && (
              <p className="mt-4">Selected: {selectedOption.label}</p>
            )}
          </div>
          <div className="flex gap-2 border-l px-2">
            {/* TODO: use your icon buttons  */}

            {/* <IconButton
              onClick={() => setView("grid")}
              className={`${view === "grid" ? "bg-secondary text-primary-foreground" : "text-muted-foreground"} border-none focus:text-primary focus:outline-primary`}
            >

              <GridViewOutlined />
            </IconButton> */}
            {/* <IconButton
              onClick={() => setView("list")}
              className={`${view === "list" ? "bg-secondary text-primary-foreground" : "text-muted-foreground"} border-none focus:text-primary focus:outline-primary`}
            >
              <List />
            </IconButton> */}
          </div>
        </div>
      </div>
      {view === "list" ? (
        <div className="mb-8 flex flex-col gap-4">
          {/* {data.map((item) => (
            <Card key={item.id} item={item} />
          ))} */}
        </div>
      ) : (
        <div className="mb-8 grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3">
          {/* {data.map((item) => (
            <GridCardView key={item.id} item={item} />
          ))} */}
        </div>
      )}
    </div>
  );
};

export default JobsResult;
