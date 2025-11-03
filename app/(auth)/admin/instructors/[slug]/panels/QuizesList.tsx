"use client";
import { useState } from "react";
import { Edit, Eye, SearchIcon, Trash } from "lucide-react";
import OptionsDropdown from "@/components/UI/OptionsDropdown";

export type Quiz = {
  id: string;
  title: string;
  date: string;
  questions: number;
  enrollment: number;
  take_quiz: string;
};
const quizes: Quiz[] = [
  {
    id: "1",
    title: "Clinical Pathology Quiz 1",
    date: "April 5, 2025",
    questions: 20,
    enrollment: 450,
    take_quiz: "pending",
  },
  {
    id: "2",
    title: "Pharmacology Quiz 2",
    date: "April 10, 2025",
    questions: 30,
    enrollment: 520,
    take_quiz: "published",
  },
  {
    id: "3",
    title: "Anatomy and Physiology Quiz",
    date: "April 12, 2025",
    questions: 25,
    enrollment: 410,
    take_quiz: "not approved",
  },
  {
    id: "4",
    title: "Clinical Pathology Quiz 2",
    date: "April 15, 2025",
    questions: 35,
    enrollment: 600,
    take_quiz: "pending",
  },
  {
    id: "5",
    title: "Medical Terminology Quiz",
    date: "April 18, 2025",
    questions: 40,
    enrollment: 700,
    take_quiz: "published",
  },
  {
    id: "6",
    title: "Surgical Technology Quiz",
    date: "April 20, 2025",
    questions: 15,
    enrollment: 300,
    take_quiz: "not approved",
  },
];

const QuizesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedquizes, setSelectedquizes] = useState<string[]>([]);
  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(quizes.length / itemsPerPage);
  const paginatedquizes = quizes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle checkbox selection
  const togglequizeselection = (courseId: string) => {
    setSelectedquizes((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  // Handle select all/none
  const toggleSelectAll = () => {
    if (selectedquizes.length === paginatedquizes.length) {
      setSelectedquizes([]);
    } else {
      setSelectedquizes(paginatedquizes.map((course) => course.id));
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
              placeholder="Search quizes..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 overflow-x-auto">
        <table className="min-w-[900px] w-full divide-y divide-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-100">
            <tr>
              <th
                scope="col"
                className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10"
              >
                <input
                  type="checkbox"
                  checked={
                    selectedquizes.length === paginatedquizes.length &&
                    paginatedquizes.length > 0
                  }
                  onChange={toggleSelectAll}
                  className="h-4 w-4 text-green-600 rounded border-gray-300 accent-primary cursor-pointer"
                />
              </th>
              {[
                { label: "ID", key: "id" },
                { label: "Quiz Title", key: "course" },
                { label: "Date", key: "date" },
                { label: "Questions", key: "questions" },
                { label: "Enrollment", key: "enrollment" },
                { label: "Take Quiz", key: "takeQuiz" },
                { label: "Download", key: "Download" },
              ].map(({ label, key }) => (
                <th
                  key={key}
                  scope="col"
                  className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
                >
                  {label}
                </th>
              ))}
              <th
                scope="col"
                className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedquizes.length === 0 ? (
              <tr>
                <td
                  colSpan={11}
                  className="px-1 py-4 text-center text-sm text-gray-500"
                >
                  No quizes found.
                </td>
              </tr>
            ) : (
              paginatedquizes.map((quiz, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedquizes.includes(quiz.id)}
                      onChange={() => togglequizeselection(quiz.id)}
                      className="h-4 w-4 text-green-600 rounded border-gray-300 accent-primary cursor-pointer"
                    />
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">{quiz.id}</td>
                  <td className="px-3 py-4 whitespace-nowrap">{quiz.title}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quiz.date}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quiz.questions}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    {quiz.enrollment}
                  </td>

                  <td className="px-3 py-4 whitespace-nowrap">
                    <span
                      className={`px-4 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quiz.take_quiz.toLowerCase() === "published"
                          ? "bg-green-100 text-green-800"
                          : quiz.take_quiz.toLowerCase() === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : quiz.take_quiz.toLowerCase() === "approved"
                          ? "bg-green-100 text-green-800"
                          : quiz.take_quiz.toLowerCase() === "not approved"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {quiz.take_quiz}
                    </span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-xs hover:bg-green-700 transition">
                      Download
                    </button>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
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

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <div className="text-sm text-gray-600 mb-2 sm:mb-0">
          {selectedquizes.length > 0 ? (
            <span>{selectedquizes.length} selected</span>
          ) : (
            <span>
              Showing{" "}
              {Math.min((currentPage - 1) * itemsPerPage + 1, quizes.length)} -{" "}
              {Math.min(currentPage * itemsPerPage, quizes.length)} of{" "}
              {quizes.length} quizes
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-4 py-1 rounded-lg ${
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
      </div>
    </div>
  );
};

export default QuizesList;
