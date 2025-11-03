"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { CourseContentProps } from "@/types/courses";
import {
  Clock,
  List,
  SearchIcon,
  Grid2X2,
  BookOpen,
  Star,
  Eye,
  Edit,
  Trash,
} from "lucide-react";
import ToggleSwitch from "@/components/UI/ToggleSwitch";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import Modal from "@/components/UI/Modal";
import QuickEdit from "@/components/UI/form/QuickEdit";

interface CoursesListProps {
  courses: CourseContentProps[];
}

type ViewMode = "list" | "grid";

const CoursesList: React.FC<CoursesListProps> = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeModal, setActiveModal] = useState<boolean>(false);
  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const paginatedCourses = courses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle checkbox selection
  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Handle select all/none
  const toggleSelectAll = () => {
    if (selectedCourses.length === paginatedCourses.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(paginatedCourses.map((course) => course.id));
    }
  };

  return (
    <div className="max-w-full">
      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row justify-end items-center gap-4 mb-6">
        {/* Right Side Controls (Search + View Toggle) */}
        <div className="flex items-center gap-4 w-full lg:w-auto">
          {/* Search */}
          <div className="relative w-full lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode("list")}
              className={`flex justify-center items-center w-10 h-10 text-muted-foreground bg-gray-100 rounded-lg ${
                viewMode === "list" && "bg-primary text-white"
              }`}
            >
              <List size={18} />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex justify-center items-center w-10 h-10 text-muted-foreground bg-gray-100 rounded-lg ${
                viewMode === "grid" && "bg-primary text-white"
              }`}
            >
              <Grid2X2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === "list" ? (
        /* List View */
        <div className="grid grid-cols-1 overflow-x-auto">
          <table className="min-w-[900px] w-full divide-y divide-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedCourses.length === paginatedCourses.length &&
                      paginatedCourses.length > 0
                    }
                    onChange={toggleSelectAll}
                    className="h-4 w-4 text-green-600 rounded border-gray-300 accent-primary cursor-pointer"
                  />
                </th>
                {[
                  { label: "ID", key: "id" },
                  { label: "Course", key: "course" },
                  { label: "Date", key: "date" },
                  { label: "Category", key: "category" },
                  { label: "Sup Category", key: "supcategory" },
                  { label: "Students", key: "students" },
                  { label: "Price", key: "price" },
                  { label: "Type", key: "type" },
                  { label: "Views", key: "views" },
                  { label: "Sales", key: "sales" },
                  { label: "Status", key: "status" },
                  { label: "Active", key: "active" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    scope="col"
                    className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                  >
                    {label}
                  </th>
                ))}
                <th
                  scope="col"
                  className="px-3 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCourses.length === 0 ? (
                <tr>
                  <td
                    colSpan={11}
                    className="px-1 py-4 text-center text-sm text-gray-500"
                  >
                    No courses found.
                  </td>
                </tr>
              ) : (
                paginatedCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-1 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => toggleCourseSelection(course.id)}
                        className="h-4 w-4 text-green-600 rounded border-gray-300 accent-primary cursor-pointer"
                      />
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">{course.id}</td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-lg object-cover"
                            src={course.image}
                            width={40}
                            height={40}
                            alt="Course Image"
                          />
                        </div>
                        <div className="ml-4">
                          <Link href={`courses/${course.id}`}>
                            <span className="text-sm font-medium text-gray-900 hover:text-green-600">
                              {course.title}
                            </span>
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.date}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.category}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.supCategory}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.students}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${course.price}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {course.type}
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      12K
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      40K EGP
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          course.status.toLowerCase() === "published"
                            ? "bg-green-100 text-green-800"
                            : course.status.toLowerCase() === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : course.status.toLowerCase() === "approved"
                            ? "bg-green-100 text-green-800"
                            : course.status.toLowerCase() === "not approved"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500">
                      <ToggleSwitch
                        checked={course.isActive}
                        onChange={(value) => {
                          console.log("New value:", value);
                        }}
                      />
                    </td>
                    <td className="px-1 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <OptionsDropdown
                        actions={[
                          {
                            label: "View",
                            icon: <Eye className="w-4 h-4" />,
                            onClick: () => console.log("View clicked"),
                          },
                          {
                            label: "Edit",
                            icon: <Edit className="w-4 h-4" />,
                            onClick: () => console.log("Edit clicked"),
                          },
                          {
                            label: "Delete",
                            icon: <Trash className="w-4 h-4" />,
                            onClick: () => console.log("Delete clicked"),
                            danger: true,
                          },
                        ]}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedCourses.length === 0 ? (
            <div className="col-span-full text-center p-8 text-gray-500">
              No courses found.
            </div>
          ) : (
            paginatedCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border rounded-xl shadow-sm p-3"
              >
                <Link href={`/admin/courses/${course.id}`}>
                  <Image
                    className="w-full h-[150px] rounded-xl object-cover mb-4"
                    src={course.image}
                    width={400}
                    height={400}
                    alt={course.title}
                  />
                  <h1 className="mb-3 font-semibold">{course.title}</h1>

                  <div className="flex items-center gap-2 mb-3">
                    <Image
                      className="w-9 h-9 object-cover rounded-full"
                      width={90}
                      height={90}
                      src={course.instructor.image}
                      alt="Instructor"
                    />
                    <span className="text-xs">{course.instructor.name}</span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {course.rating.toFixed(1)}{" "}
                      <Star className="text-orange-500" size={12} />
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 mb-3 w-full">
                    <div className="flex gap-2">
                      <BookOpen className="text-muted-foreground" size={18} />
                      <span className="text-xs text-muted-foreground">
                        {course.lessons} Lessons
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Clock className="text-muted-foreground" size={18} />
                      <span className="text-xs text-muted-foreground">
                        {course.duration}
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="flex justify-end">
                  <Link
                    className="text-sm hover:text-primary hover:underline transition"
                    href={`/admin/courses/${course.id}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          {selectedCourses.length > 0 ? (
            <span>{selectedCourses.length} selected</span>
          ) : (
            <span>
              Showing{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, courses.length)} -{" "}
              {Math.min(currentPage * itemsPerPage, courses.length)} of{" "}
              {courses.length} courses
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-lg ${
                currentPage === index + 1
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <Modal isOpen={activeModal} onClose={() => setActiveModal(false)}>
          <QuickEdit />
        </Modal>
      </div>
    </div>
  );
};

export default CoursesList;
