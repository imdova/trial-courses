/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { ChevronDown, X, Play, FileText, ClipboardList, Star } from "lucide-react";
import { Check } from "lucide-react";
import { SingleCourseSection } from "@/types/courses";
import { CourseItemsProgress } from "@/types/enrolledCourses";

interface ProgressSidebarProps {
  sections?: SingleCourseSection[]; // Make sections optional since it might be undefined
  currentTab: number;
  currentItemId?: string; // ID of the currently selected item
  onItemClick?: (sectionIndex: number, itemIndex: number, itemId: string) => void;
  progressData?: CourseItemsProgress | null;
  onClose?: () => void;
}

const ProgressSidebar = ({
  sections = [],
  currentTab,
  currentItemId,
  onItemClick,
  progressData,
  onClose,
}: ProgressSidebarProps) => {
  // Change from array to single number, -1 means no section is expanded
  const [expandedSection, setExpandedSection] = React.useState<number>(0);

  const toggleSection = (index: number) => {
    setExpandedSection((prev) => (prev === index ? -1 : index));
  };

  // Helper function to check if an item is completed
  const isItemCompleted = (itemId: string): boolean => {
    if (!progressData?.items) return false;
    const progressItem = progressData.items.find(item => item.id === itemId);
    return progressItem?.completed || false;
  };

  // Helper function to get score for an item
  const getItemScore = (itemId: string): number | null => {
    if (!progressData?.items) return null;
    const progressItem = progressData.items.find(item => item.id === itemId);
    return progressItem?.score || null;
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return (
          <div className="mr-2">
            <FileText size={18} />
          </div>
        );
      case "assignment":
        return (
          <div className="mr-2">
            <ClipboardList size={18} />
          </div>
        );
      case "lecture":
      default:
        return (
          <div className="mr-2 flex h-[16px] w-[16px] items-center justify-center rounded-full border-[1px] border-gray-400 ">
            <Play size={10} />
          </div>
        );
    }
  };

  const getItemTitle = (item: SingleCourseSection['items'][0]) => {
    if (item.curriculumType === 'lecture' && item.lecture) {
      return item.lecture.title;
    } else if (item.curriculumType === 'quiz' && item.quiz) {
      return item.quiz.title;
    } else if (item.curriculumType === 'assignment' && item.assignment) {
      return item.assignment.name;
    }
    return 'Untitled';
  };

  return (
    <div className="w-full bg-[#1E2A38] p-4 text-white rounded-2xl">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Contents</h2>
        {/* <button onClick={onClose} className="hover:opacity-75">
          <X size={20} />
        </button> */}
      </div>

      {/* Overall Progress */}
      {progressData && (
        <div className="mb-4 rounded-lg bg-[#2C3B4F] p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-300">Course Progress</span>
            <span className="text-sm font-semibold text-green-400">
              {progressData.progressPercentage}%
            </span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-300"
              style={{ width: `${progressData.progressPercentage}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <span>{progressData.completedItems} of {progressData.totalItems} items completed</span>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {sections.map((section, sectionIndex) => (
          <div key={section.id}>
            <button
              onClick={() => toggleSection(sectionIndex)}
              className="flex w-full items-center justify-between rounded p-2 hover:bg-[#2C3B4F]"
            >
              <span className="text-sm font-medium">{section.name}</span>
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  expandedSection === sectionIndex ? "rotate-180" : ""
                }`}
              />
            </button>

            {expandedSection === sectionIndex && section.items && (
              <div className="mt-1 ml-2 space-y-1">
                {section.items.map((item, itemIndex) => {
                  const isSelected = currentItemId === item.id;
                  const isCompleted = isItemCompleted(item.id);
                  const score = getItemScore(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => onItemClick?.(sectionIndex, itemIndex, item.id)}
                      className={`flex w-full flex-col gap-3 rounded p-2 text-sm transition-colors ${
                        isSelected
                          ? "bg-[#2C3B4F] ring-2 ring-green-500"
                          : "hover:bg-[#2C3B4F]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {/* Completion status indicator */}
                        {isCompleted ? (
                          <div className="h-4 w-4 rounded-full bg-green-500 flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        ) : (
                          <div className={`h-4 w-4 rounded-full border ${
                            isSelected ? "border-green-500" : "border-gray-400"
                          }`} />
                        )}
                        <span className="text-sm text-left flex-1">{getItemTitle(item)}</span>
                        {/* Show score if available */}
                        {score !== null && (
                          <span className={`text-xs px-1.5 py-0.5 rounded ${
                            score >= 70 ? "bg-green-500/20 text-green-300" : "bg-red-500/20 text-red-300"
                          }`}>
                            {score}%
                          </span>
                        )}
                      </div>
                      <div className="ml-5 flex items-center text-xs text-gray-400">
                        {getItemIcon(item.curriculumType)}
                        <span className="capitalize">{item.curriculumType}</span>
                        {isCompleted && !score && (
                          <span className="ml-2 text-green-400">• Completed</span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
        {/* Static Certificate Entry */}
        <div className="mt-6">
          <div className="flex w-full flex-col gap-3 rounded p-2 text-sm bg-[#2C3B4F] opacity-70 cursor-not-allowed">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 rounded-full bg-gray-400 flex items-center justify-center">
                <Star size={12} className="text-white" />
              </div>
              <span className="text-sm text-left flex-1">Certificate</span>
              <span className="text-xs px-1.5 py-0.5 rounded bg-gray-500/20 text-gray-300">Coming soon!</span>
            </div>
            <div className="ml-5 flex items-center text-xs text-gray-400">
              <Star className="mr-2" size={16} />
              <span>Certificate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSidebar;
