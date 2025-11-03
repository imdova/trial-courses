import { CourseType } from "@/types/courses";
import { Check, X } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  courses: CourseType[];
  selected: string[]; // array of course IDs
  onChange: (selected: string[]) => void;
}

const CourseSelect: React.FC<Props> = ({ courses, selected, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggle = (courseId: string) => {
    if (selected.includes(courseId)) {
      onChange(selected.filter((id) => id !== courseId));
    } else {
      onChange([...selected, courseId]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      inputRef.current &&
      !inputRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full relative space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Courses
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full p-2 text-sm pl-8 border border-gray-200 rounded-md outline-none"
          placeholder="Search courses..."
        />
        <svg
          className="absolute left-2.5 top-3 h-4 w-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full  bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm max-h-96 overflow-y-auto"
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`flex items-center p-3 cursor-pointer transition-all ${
                  selected.includes(course.id)
                    ? "bg-green-50"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => handleToggle(course.id)}
              >
                <div className="flex items-center h-5">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selected.includes(course.id)}
                      onChange={() => handleToggle(course.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded border-2 border-gray-300 peer-checked:border-green-600 text-white peer-checked:bg-green-600 flex items-center justify-center transition-colors duration-200">
                      <Check size={15} />
                    </div>
                  </label>
                </div>
                <Image
                  width={300}
                  height={300}
                  src={course.image}
                  alt={course.title}
                  className="w-10 h-10 rounded-md object-cover ml-3"
                />
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {course.title}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No courses found
            </div>
          )}
        </div>
      )}

      {/* Selected courses as cards */}
      {selected.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Courses ({selected.length})
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {selected.map((courseId) => {
              const course = courses.find((c) => c.id === courseId);
              return course ? (
                <div
                  key={course.id}
                  className="flex items-center p-3 border border-gray-200 rounded-lg shadow-sm  transition-shadow"
                >
                  <Image
                    width={300}
                    height={300}
                    src={course.image}
                    alt={course.title}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <h4 className="text-sm font-medium text-gray-900">
                      {course.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {course.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(course.id)}
                    className="ml-2 text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSelect;
