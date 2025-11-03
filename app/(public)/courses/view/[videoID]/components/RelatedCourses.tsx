import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { RelatedCourse } from "@/types/courses";
import { useFavoriteCourses } from "@/app/(auth)/student/favorite/hooks/useFavoriteCourses";
import { useSession } from "next-auth/react";

interface RelatedCoursesProps {
  relatedCourses?: RelatedCourse[];
}

const RelatedCourses = ({relatedCourses = []}: RelatedCoursesProps) => {
  const { data: session } = useSession();
  const { addFavorite, removeFavorite, removingId } = useFavoriteCourses();
  const [addingId, setAddingId] = useState<string | null>(null);
  
  // Local state to track favorite status based on API response
  const [favoritesState, setFavoritesState] = useState<Record<string, boolean>>({});

  // Initialize favorites state from API response
  useEffect(() => {
    if (relatedCourses && relatedCourses.length > 0) {
      const initialState = relatedCourses.reduce((acc, course) => {
        acc[course.id] = course.isFavorite; // Use isFavorite from API response
        return acc;
      }, {} as Record<string, boolean>);
      setFavoritesState(initialState);
    }
  }, [relatedCourses]);

  // Only show for authenticated students
  if (relatedCourses.length === 0 || session?.user?.type !== "student") {
    return null;
  }

  const handleFavoriteToggle = async (courseId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation();

    const currentFavoriteState = favoritesState[courseId];

    if (currentFavoriteState) {
      // Remove from favorites
      setAddingId(courseId);
      const success = await removeFavorite(courseId);
      if (success) {
        setFavoritesState((prev) => ({ ...prev, [courseId]: false }));
      }
      setAddingId(null);
    } else {
      // Add to favorites
      setAddingId(courseId);
      const success = await addFavorite(courseId);
      if (success) {
        setFavoritesState((prev) => ({ ...prev, [courseId]: true }));
      }
      setAddingId(null);
    }
  };

  return (
    <div className="h-fit col-span-1 mt-3 rounded-xl border border-gray-200 p-3 shadow-sm lg:col-span-2">
      <h2 className="mb-3 text-lg font-semibold">Related courses</h2>
      <ul className="flex flex-col gap-6">
        {relatedCourses.map((course) => {
          // Use local state if available, fallback to API response
          const isFavorited = favoritesState[course.id] ?? course.isFavorite;
          const isLoading = addingId === course.id || removingId === course.id;

          return (
            <li
              className="relative border-b last-of-type:border-b-0"
              key={course.id}
            >
              <Link
                className="flex gap-4 p-3 hover:bg-gray-50 transition-colors"
                href={`/courses/view/${course.id}`}
              >
                <div className="max-h-[100px] max-w-[200px] overflow-hidden rounded-lg lg:max-h-[60px] lg:max-w-[100px]">
                  <Image
                    className="h-full w-full object-cover"
                    src={course.courseImage}
                    alt={course.name}
                    width={200}
                    height={200}
                  />
                </div>
                <div className="w-full">
                  <span className="text-xs text-gray-500">Course</span>
                  <h2 className="text-sm font-semibold text-gray-800">{course.name}</h2>
                  <span className="text-muted-foreground text-xs">
                    {course.studentCount} learners
                  </span>
                  <button 
                    className="absolute right-2 bottom-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
                    onClick={(e) => handleFavoriteToggle(course.id, e)}
                    disabled={isLoading}
                    title={isFavorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart 
                      size={13} 
                      className={`transition-colors ${
                        isFavorited 
                          ? "fill-red-500 text-red-500" 
                          : "text-gray-400 hover:text-red-500"
                      } ${isLoading ? "opacity-50" : ""}`}
                    />
                  </button>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RelatedCourses;
