/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  BookOpen,
  Clock,
  MoveUpRight,
  Loader2,
  Filter,
  Grid3x3,
  List,
  CheckCircle,
  Star,
  GraduationCap,
  Trash2,
  ShoppingCart,
} from "lucide-react";
import { useFavoriteCourses } from "./hooks/useFavoriteCourses";
import PlansImage from "@/assets/images/planss.png";
import StudentCard from "../dashboard/components/StudentCard";
import { InstructorAvatar } from "./InstructorAvatar";

// Helper function to get initials
const getInitials = (name: string) => {
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const FavoriteCoursesPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterType, setFilterType] = useState<
    "all" | "recorded" | "live" | "offline"
  >("all");

  const {
    favoriteCourses,
    loading,
    error,
    getFavoriteCourses,
    removeFavorite,
    removingId,
  } = useFavoriteCourses();

  useEffect(() => {
    getFavoriteCourses();
  }, [getFavoriteCourses]);

  // Filter courses based on selected type
  const filteredCourses = favoriteCourses.filter((course) => {
    if (filterType === "all") return true;
    return course.type.toLowerCase() === filterType;
  });

  // Handle remove from favorites
  const handleRemoveFavorite = async (courseId: string) => {
    if (
      confirm("Are you sure you want to remove this course from favorites?")
    ) {
      await removeFavorite(courseId);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-150px)] w-full px-3">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="space-y-4 text-center">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-green-600" />
            <p className="text-gray-600">Loading your favorite courses...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-[calc(100vh-150px)] w-full px-3">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={getFavoriteCourses}
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-150px)] w-full">
      <div className="grid grid-cols-1 gap-4 px-3 lg:grid-cols-8">
        <div className="col-span-1 lg:col-span-6">
          <StudentCard />

          {/* Favorites Section */}
          <div className="mt-4 rounded-xl border bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
                  <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                  Saved Courses
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  {filteredCourses.length}{" "}
                  {filteredCourses.length === 1 ? "course" : "courses"} saved
                  for later
                </p>
              </div>

              {/* View Toggle and Filters */}
              <div className="flex items-center gap-3">
                {/* Filter Dropdown */}
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) =>
                      setFilterType(
                        e.target.value as
                          | "all"
                          | "recorded"
                          | "live"
                          | "offline",
                      )
                    }
                    className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="recorded">Recorded</option>
                    <option value="live">Live</option>
                    <option value="offline">Offline</option>
                  </select>
                  <Filter className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
                </div>

                {/* View Mode Toggle */}
                <div className="flex rounded-lg border border-gray-300 bg-white">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`rounded-l-lg p-2 transition-colors ${
                      viewMode === "grid"
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <Grid3x3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`rounded-r-lg p-2 transition-colors ${
                      viewMode === "list"
                        ? "bg-green-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Empty State */}
            {filteredCourses.length === 0 ? (
              <div className="py-16 text-center">
                <div className="space-y-4">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                    <Heart className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700">
                    No Saved Courses Yet
                  </h3>
                  <p className="mx-auto max-w-md text-gray-600">
                    {filterType === "all"
                      ? "Start exploring and save courses you're interested in to view them here."
                      : `No ${filterType} courses in your favorites.`}
                  </p>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
                  >
                    <BookOpen className="h-5 w-5" />
                    Browse Courses
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {/* Grid View */}
                {viewMode === "grid" && (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className="group relative flex flex-col rounded-xl border bg-white shadow-sm transition-all hover:shadow-md"
                      >
                        {/* Course Image */}
                        <Link
                          href={`/courses/view/${course.id}`}
                          className="relative"
                        >
                          <div className="relative h-[180px] w-full overflow-hidden rounded-t-xl">
                            <Image
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              src={course.courseImage}
                              alt={course.name}
                              width={400}
                              height={300}
                            />
                            {/* Course Type Badge */}
                            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
                              {course.type}
                            </span>
                            {/* Remove Favorite Button */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleRemoveFavorite(course.id);
                              }}
                              disabled={removingId === course.id}
                              className="absolute top-3 right-3 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-red-50"
                              title="Remove from favorites"
                            >
                              {removingId === course.id ? (
                                <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                              ) : (
                                <Heart className="h-5 w-5 fill-red-600 text-red-600" />
                              )}
                            </button>
                          </div>
                        </Link>

                        {/* Course Content */}
                        <div className="flex flex-1 flex-col p-4">
                          {/* Category Badge */}
                          {course.tags && course.tags[0] && (
                            <span className="mb-2 block w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                              {course.tags[0]}
                            </span>
                          )}

                          {/* Course Title */}
                          <Link href={`/courses/view/${course.id}`}>
                            <h3 className="mb-4 line-clamp-2 font-semibold text-gray-800 transition-colors hover:text-green-600">
                              {course.name}
                            </h3>
                          </Link>

                          {/* Progress Bar */}
                          <div className="mb-4 w-full">
                            <div className="relative h-1 w-full rounded-full bg-gray-200">
                              <div
                                className="absolute top-0 left-0 h-1 rounded-full bg-green-500 transition-all duration-300"
                                style={{
                                  width: `${course.progressPercentage || 0}%`,
                                }}
                              ></div>
                            </div>
                            <span className="mt-1 text-xs text-gray-500">
                              {course.progressPercentage || 0}% complete
                            </span>
                          </div>

                          {/* Instructor */}
                          <div className="mb-3 flex items-center gap-2">
                            <InstructorAvatar
                              name={course.instructor?.fullName || "Unknown Instructor"}
                              imageUrl={course.instructor?.photoUrl || ""}
                            />
                            <span className="text-sm text-gray-600">
                              {course.instructor?.fullName ||
                                "Unknown Instructor"}
                            </span>
                          </div>

                          {/* Course Stats */}
                          <div className="mb-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <GraduationCap className="h-4 w-4" />
                              <span>{course.studentCount || 0} students</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{course.lecturesCount || 0} lectures</span>
                            </div>
                            {course.totalHours && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.totalHours} hours</span>
                              </div>
                            )}
                            {course.averageRating > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{course.averageRating.toFixed(1)}</span>
                              </div>
                            )}
                          </div>

                          {/* Price and Action Buttons */}
                          <div className="mt-auto border-t pt-3">
                            <div className="mb-2 flex items-center justify-between gap-2">
                              <div className="flex flex-col">
                                {course.isCourseFree ? (
                                  <span className="text-lg font-bold text-green-600">
                                    Free
                                  </span>
                                ) : (
                                  <>
                                    {course.pricings && course.pricings[0] && (
                                      <>
                                        {course.pricings[0].discountEnabled &&
                                        course.pricings[0].salePrice ? (
                                          <div className="flex items-center gap-2">
                                            <span className="text-lg font-bold text-green-600">
                                              ${course.pricings[0].salePrice}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                              ${course.pricings[0].regularPrice}
                                            </span>
                                          </div>
                                        ) : (
                                          <span className="text-lg font-bold text-green-600">
                                            ${course.pricings[0].regularPrice}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>

                              {(course.progressPercentage || 0) >= 100 && (
                                <span className="flex items-center gap-1 text-xs text-green-800">
                                  <CheckCircle size={15} />
                                  Completed
                                </span>
                              )}
                            </div>

                            <Link
                              href={`/courses/view/${course.id}`}
                              className="flex w-full items-center justify-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                            >
                              View
                              <MoveUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* List View */}
                {viewMode === "list" && (
                  <div className="space-y-4">
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm transition-all hover:shadow-md md:flex-row"
                      >
                        {/* Course Image */}
                        <Link
                          href={`/courses/view/${course.id}`}
                          className="relative flex-shrink-0"
                        >
                          <div className="relative h-[120px] w-full overflow-hidden rounded-lg md:w-[200px]">
                            <Image
                              className="h-full w-full object-cover"
                              src={course.courseImage}
                              alt={course.name}
                              width={200}
                              height={120}
                            />
                            <span className="absolute top-2 left-2 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-gray-800 backdrop-blur-sm">
                              {course.type}
                            </span>
                          </div>
                        </Link>

                        {/* Course Content */}
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              {/* Category Badge */}
                              {course.tags && course.tags[0] && (
                                <span className="mb-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                                  {course.tags[0]}
                                </span>
                              )}

                              {/* Course Title */}
                              <Link href={`/courses/view/${course.id}`}>
                                <h3 className="mb-4 text-lg font-semibold text-gray-800 transition-colors hover:text-green-600">
                                  {course.name}
                                </h3>
                              </Link>

                              {/* Progress Bar */}
                              <div className="mb-4 w-full">
                                <div className="relative h-1 w-full rounded-full bg-gray-200">
                                  <div
                                    className="absolute top-0 left-0 h-1 rounded-full bg-green-500 transition-all duration-300"
                                    style={{
                                      width: `${course.progressPercentage || 0}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="mt-1 text-xs text-gray-500">
                                  {course.progressPercentage || 0}% complete
                                </span>
                              </div>

                              {/* Instructor */}
                              <div className="mb-3 flex items-center gap-2">
                                <InstructorAvatar
                                  name={course.instructor?.fullName || "Unknown Instructor"}
                                  imageUrl={course.instructor?.photoUrl || ""}
                                />
                                <span className="text-sm text-gray-600">
                                  {course.instructor?.fullName ||
                                    "Unknown Instructor"}
                                </span>
                              </div>

                              {/* Course Stats */}
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <GraduationCap className="h-4 w-4" />
                                  <span>
                                    {course.studentCount || 0} students
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <BookOpen className="h-4 w-4" />
                                  <span>
                                    {course.lecturesCount || 0} lectures
                                  </span>
                                </div>
                                {course.totalHours && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{course.totalHours} hours</span>
                                  </div>
                                )}
                                {course.averageRating > 0 && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span>
                                      {course.averageRating.toFixed(1)} (
                                      {course.ratingCount} reviews)
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <button
                              onClick={() => handleRemoveFavorite(course.id)}
                              disabled={removingId === course.id}
                              className="rounded-lg p-2 transition-colors hover:bg-red-50"
                              title="Remove from favorites"
                            >
                              {removingId === course.id ? (
                                <Loader2 className="h-5 w-5 animate-spin text-red-600" />
                              ) : (
                                <Heart className="h-5 w-5 fill-red-600 text-red-600" />
                              )}
                            </button>
                          </div>

                          {/* Bottom Actions */}
                          <div className="mt-auto border-t pt-3">
                            <div className="mb-3 flex items-center justify-between gap-4">
                              <div className="flex flex-col">
                                {course.isCourseFree ? (
                                  <span className="text-xl font-bold text-green-600">
                                    Free
                                  </span>
                                ) : (
                                  <>
                                    {course.pricings && course.pricings[0] && (
                                      <>
                                        {course.pricings[0].discountEnabled &&
                                        course.pricings[0].salePrice ? (
                                          <div className="flex items-center gap-2">
                                            <span className="text-xl font-bold text-green-600">
                                              ${course.pricings[0].salePrice}
                                            </span>
                                            <span className="text-sm text-gray-500 line-through">
                                              ${course.pricings[0].regularPrice}
                                            </span>
                                          </div>
                                        ) : (
                                          <span className="text-xl font-bold text-green-600">
                                            ${course.pricings[0].regularPrice}
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>

                              {(course.progressPercentage || 0) >= 100 && (
                                <span className="flex items-center gap-1 text-xs text-green-800">
                                  <CheckCircle size={15} />
                                  Completed
                                </span>
                              )}
                            </div>

                            <Link
                              href={`/courses/view/${course.id}`}
                              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                            >
                              View Course
                              <MoveUpRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="col-span-1 hidden lg:col-span-2 lg:block">
          <div className="space-y-4">
            {/* Stats Card */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Your Learning Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Saved Courses</span>
                  <span className="text-lg font-bold text-green-600">
                    {favoriteCourses.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Recorded</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {
                      favoriteCourses.filter(
                        (c) => c.type.toLowerCase() === "recorded",
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Live</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {
                      favoriteCourses.filter(
                        (c) => c.type.toLowerCase() === "live",
                      ).length
                    }
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Offline</span>
                  <span className="text-sm font-semibold text-gray-800">
                    {
                      favoriteCourses.filter(
                        (c) => c.type.toLowerCase() === "offline",
                      ).length
                    }
                  </span>
                </div>
              </div>
            </div>

            {/* Promo Image */}
            <div className="overflow-hidden rounded-xl">
              <Image
                className="w-full"
                src={PlansImage}
                alt="Plan image"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCoursesPage;
