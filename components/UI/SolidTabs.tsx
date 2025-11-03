"use client";
import { LucideIcon } from "lucide-react";
import { useState } from "react";

type Tab = {
  label: React.ReactNode | string;
  content: React.ReactNode;
  icon?: LucideIcon;
};

type TabsProps = {
  tabs: Tab[];
};

const SolidTabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="w-full space-y-2">
      {/* Tab Buttons */}
      <div className="flex flex-wrap p-1 border rounded-base shadow-soft bg-white gap-2 md:flex-row">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`flex items-center gap-2 px-8 transition-all duration-300 py-2 text-sm  text-center ${
              activeTab === index
                ? "text-primary border-b-2 border-primary "
                : "text-gray-600"
            }`}
          >
            {tab.icon && <tab.icon size={15} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>{tabs[activeTab].content}</div>
    </div>
  );
};

export default SolidTabs;
