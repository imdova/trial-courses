"use client";
import { useState } from "react";
import {
  ChevronDown,
  PlayCircle,
  LockIcon,
  Layers,
  ClipboardList,
  FileText,
} from "lucide-react";
import { Tab } from "@/types/courses";

interface ProgressTabsProps {
  tabs: Tab[];
  currentTab: number; // Track the current tab
  currentVideoIndex: number; // Track the current video within the tab
  setCurrentVideo: (tabIndex: number, videoIndex: number) => void; // Function to update video
  setCurrentTab: (index: number) => void; // Function to update tab
}

const ProgressTabs: React.FC<ProgressTabsProps> = ({
  tabs,
  currentTab,
  currentVideoIndex,
  setCurrentVideo,
  setCurrentTab,
}) => {
  const [activeTab, setActiveTab] = useState(currentTab);

  if (!tabs || tabs.length === 0) {
    return <div>No data available</div>;
  }

  // Handle tab switching
  const handleActive = (index: number) => {
    if (typeof index !== "number") {
      console.error("Invalid tab index:", index);
      return;
    }
    setActiveTab(index);
    setCurrentTab(index);
    // Reset to first video when switching tabs
    setCurrentVideo(index, 0);
  };

  return (
    <div className="w-full">
      {tabs.map((tab, tabIndex) => (
        <div
          key={tab.title}
          className="max-h-[500px] overflow-auto border rounded-xl p-3 mb-4"
        >
          {/* Tab Header */}
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => handleActive(tabIndex)}
          >
            <div>
              <span className="flex items-center gap-1 text-primary text-xs font-semibold mb-1">
                <Layers size={15} />
                Module {tabIndex + 1}
              </span>
              <span className="text-sm font-bold">
                {tabIndex + 1}- {tab.title}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <ChevronDown
                size={16}
                className={`${
                  activeTab === tabIndex ? "rotate-180" : ""
                } transition`}
              />
            </div>
          </div>

          {/* Video List */}
          {activeTab === tabIndex && tab.items && (
            <div className="my-2 space-y-2">
              {tab.items.map((item, videoIndex) => (
                <div
                  key={videoIndex}
                  className={`flex justify-between items-center p-3 rounded-2xl cursor-pointer ${
                    currentTab === tabIndex && currentVideoIndex === videoIndex
                      ? "bg-primary text-white"
                      : item.locked
                      ? "bg-gray-200 !cursor-not-allowed opacity-50"
                      : "bg-gray-200"
                  }`}
                  // Update video only if it's not locked
                  onClick={() =>
                    !item.locked &&
                    item.type === "lesson" &&
                    setCurrentVideo(tabIndex, videoIndex)
                  }
                >
                  <span className="flex gap-3 items-center">
                    {item.locked ? (
                      <LockIcon size={18} />
                    ) : item.type === "lesson" ? (
                      <PlayCircle size={18} />
                    ) : item.type === "quiz" ? (
                      <ClipboardList size={18} />
                    ) : item.type === "material" ? (
                      <FileText size={18} />
                    ) : null}
                    <span className="text-sm">{item.title}</span>
                  </span>
                  {item.type === "lesson" && (
                    <span
                      className={`${
                        currentTab === tabIndex &&
                        currentVideoIndex === videoIndex
                          ? "text-white"
                          : "text-muted-foreground"
                      } text-xs`}
                    >
                      {item.duration}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTabs;
