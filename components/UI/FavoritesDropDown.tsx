"use client";
import { useEffect, useRef, useState } from "react";
import { Heart, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useFavoriteCourses } from "@/app/(auth)/student/favorite/hooks/useFavoriteCourses";

const FavoritesDropDown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { favoriteCourses, getFavoriteCourses } = useFavoriteCourses();

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  // Fetch favorites on mount
  useEffect(() => {
    getFavoriteCourses();
  }, [getFavoriteCourses]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape key
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") closeDropdown();
  };

  // Get first 2 favorites for preview
  const previewFavorites = favoriteCourses.slice(0, 2);

  return (
    <div className="relative">
      {favoriteCourses.length > 0 && (
        <span className="absolute -top-2 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[7px] text-white">
          {favoriteCourses.length}
        </span>
      )}
      
      {/* Favorites Button */}
      <div ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          type="button"
          className="flex items-center justify-center cursor-pointer focus:outline-none"
          id="favorites-menu-button"
          aria-expanded={isDropdownOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open favorites menu</span>
          <Heart 
            size={18} 
            className={favoriteCourses.length > 0 ? "fill-red-500 text-red-500" : ""}
          />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-12 -right-16 md:right-0 w-[280px] md:w-[400px] rounded-lg shadow-lg border border-gray-200 bg-white z-50">
            {previewFavorites.length > 0 ? (
              <div className="p-4">
                <div className="mb-3 flex items-center justify-between border-b pb-2">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Saved Courses
                  </h3>
                  <span className="text-xs text-gray-500">
                    {favoriteCourses.length} {favoriteCourses.length === 1 ? 'course' : 'courses'}
                  </span>
                </div>

                {/* Course List */}
                <div className="space-y-3 mb-3">
                  {previewFavorites.map((course) => (
                    <Link
                      key={course.id}
                      href={`/courses/view/${course.id}`}
                      onClick={closeDropdown}
                      className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          className="h-full w-full object-cover"
                          src={course.courseImage}
                          alt={course.name}
                          width={80}
                          height={64}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1">
                          {course.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                          <span className="truncate">
                            {course.instructor?.fullName || "Unknown"}
                          </span>
                        </div>
                        {/* Progress Bar */}
                        {course.progressPercentage !== undefined && course.progressPercentage > 0 && (
                          <div className="mb-2">
                            <div className="relative h-1 w-full rounded-full bg-gray-200">
                              <div
                                className="absolute top-0 left-0 h-1 rounded-full bg-green-500 transition-all"
                                style={{ width: `${course.progressPercentage}%` }}
                              ></div>
                            </div>
                            <span className="text-[10px] text-gray-500 mt-0.5">
                              {course.progressPercentage}% complete
                            </span>
                          </div>
                        )}
                        {course.pricings && course.pricings[0] && !course.isCourseFree && (
                          <div className="mt-1">
                            {course.pricings[0].discountEnabled && course.pricings[0].salePrice ? (
                              <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-green-600">
                                  ${course.pricings[0].salePrice}
                                </span>
                                <span className="text-xs text-gray-500 line-through">
                                  ${course.pricings[0].regularPrice}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm font-bold text-green-600">
                                ${course.pricings[0].regularPrice}
                              </span>
                            )}
                          </div>
                        )}
                        {course.isCourseFree && (
                          <span className="text-sm font-bold text-green-600">Free</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {/* View More Button */}
                <Link
                  href="/student/favorite"
                  onClick={closeDropdown}
                  className="block w-full rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700 transition-colors"
                >
                  View All Saved Courses
                </Link>
              </div>
            ) : (
              // Empty State
              <div className="flex items-center justify-center h-[250px] w-full p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                    <Heart className="text-gray-400" size={32} />
                  </div>
                  <h2 className="text-base text-gray-800 font-semibold mb-2">
                    No Saved Courses
                  </h2>
                  <p className="text-xs text-gray-600 mb-4 max-w-[200px]">
                    Save courses you&apos;re interested in to view them here
                  </p>
                  <Link
                    href="/courses"
                    onClick={closeDropdown}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-colors"
                  >
                    <BookOpen size={16} />
                    Browse Courses
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesDropDown;

