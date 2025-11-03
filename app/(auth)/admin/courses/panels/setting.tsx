"use client";

import { useState } from "react";
import IndustriesPage from "./Industries";
import CategoriesPage from "./Categories";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <div className="pt-2">{children}</div>}
    </div>
  );
}

function tabProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const SettingPage: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="box-content">
      <div className="flex flex-col">
        <div className="flex space-x-1">
          <button
            onClick={() => handleChange(0)}
            {...tabProps(0)}
            className={`px-4 py-1 text-xs rounded-full ${
              value === 0
                ? "bg-green-600 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            Industries
          </button>
          <button
            onClick={() => handleChange(1)}
            {...tabProps(1)}
            className={`px-4 py-1 text-xs rounded-full ${
              value === 1
                ? "bg-green-600 text-white"
                : "bg-transparent text-gray-700 hover:bg-gray-100"
            }`}
          >
            Categories
          </button>
        </div>

        <div className="mt-2">
          <CustomTabPanel value={value} index={0}>
            <IndustriesPage />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <CategoriesPage />
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
