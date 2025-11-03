"use client";
import { useState, useRef } from "react";
import StudentOverviewTable from "./tables/StudentOverviewTable";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

const LineTabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    tabRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto no-scrollbar">
        {/* Tab Buttons */}
        <div className="flex min-w-max gap-2 mb-7 border-b whitespace-nowrap">
          {tabs.map((tab, index) => (
            <button
              key={index}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              onClick={() => handleTabClick(index)}
              className={`px-8 transition-all duration-300 py-2 text-center ${
                activeTab === index
                  ? "text-primary border-b-primary font-semibold border-b"
                  : "text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <StudentOverviewTable />
    </div>
  );
};

export default LineTabs;
