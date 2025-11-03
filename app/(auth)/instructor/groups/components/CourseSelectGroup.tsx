import { courseData } from "@/constants/VideosData.data";
import { X, BookOpen } from "lucide-react";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
}

const CourseSelectGroup: React.FC<Props> = ({ selected, onChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredCourses = courseData.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (courseId: string) => {
    // Only allow one course to be selected at a time
    if (selected.includes(courseId)) {
      onChange([]); // Deselect if clicking the already selected course
    } else {
      onChange([courseId]); // Replace any existing selection with the new one
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
        Select Course (Choose One)
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
        <BookOpen className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm max-h-96 overflow-y-auto"
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
                onClick={() => handleSelect(course.id)}
              >
                <div className="flex items-center h-5">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio" // Changed from checkbox to radio for single selection
                      checked={selected.includes(course.id)}
                      onChange={() => handleSelect(course.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="peer sr-only"
                    />
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-green-600 text-white peer-checked:bg-green-600 flex items-center justify-center transition-colors duration-200">
                      {selected.includes(course.id) && (
                        <div className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </div>
                  </label>
                </div>
                <Image
                  src={course.image}
                  alt={course.title}
                  width={32}
                  height={32}
                  className="rounded-md h-8 w-8 object-cover ml-3"
                />
                <div className="ml-3">
                  <span className="text-sm font-medium text-gray-700">
                    {course.title}
                  </span>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {course.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              No courses found
            </div>
          )}
        </div>
      )}

      {selected.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Selected Course
          </h3>
          <div className="flex flex-col gap-2 w-full">
            {selected.map((courseId) => {
              const course = courseData.find((c) => c.id === courseId);
              return course ? (
                <div
                  key={course.id}
                  className="flex items-center justify-between border border-gray-200 shadow-sm rounded-lg px-3 py-2 w-full"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={course.image}
                      alt={course.title}
                      width={24}
                      height={24}
                      className="rounded-md h-6 w-6 object-cover"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      {course.title}
                    </span>
                  </div>
                  <button
                    onClick={() => onChange([])} // Clear selection
                    className="ml-2 text-gray-400 hover:text-red-500"
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

export default CourseSelectGroup;
