"use client";
import {
  ArrowUpDown,
  Edit,
  Eye,
  MessageSquareMore,
  Search,
  Trash,
  Video,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import OptionsDropdown from "../OptionsDropdown";

interface Student {
  name: string;
  studentId: string;
  pricePerLesson: string;
  joinDate: string;
  prepaidBalance: string;
  avatar: string;
}

interface StudentTableProps {
  students: Student[];
}

const StudentTable: React.FC<StudentTableProps> = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Student | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting logic
  const sortedStudents = [...students].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    // Handling different data types
    if (sortField === "joinDate") {
      return sortOrder === "asc"
        ? new Date(aValue as string).getTime() -
            new Date(bValue as string).getTime()
        : new Date(bValue as string).getTime() -
            new Date(aValue as string).getTime();
    }

    if (sortField === "studentId" || sortField === "pricePerLesson") {
      return sortOrder === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }

    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Search filter
  const filteredStudents = sortedStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: keyof Student) => {
    setSortField(field);
    setSortOrder(sortField === field && sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div>
      <div>
        {/* Search Bar & Heading */}
        <div className="flex flex-col sm:flex-row justify-between items-center pb-4">
          <h2 className="text-xl font-semibold">Current Students</h2>
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg bg-gray-100 w-full sm:w-64 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="text-gray-700 bg-gray-100">
                {[
                  { label: "Name", key: "name" },
                  { label: "Student ID", key: "studentId" },
                  { label: "Price per Lesson", key: "pricePerLesson" },
                  { label: "Join Date", key: "joinDate" },
                  { label: "Prepaid Balance", key: "prepaidBalance" },
                ].map(({ label, key }) => (
                  <th
                    key={key}
                    className="p-3 text-left cursor-pointer"
                    onClick={() => toggleSort(key as keyof Student)}
                  >
                    <div className="flex items-center gap-2">
                      {label}
                      {sortField === key && (
                        <ArrowUpDown
                          className={`${
                            sortOrder === "asc"
                              ? "text-primary"
                              : "text-red-500"
                          }`}
                          size={15}
                        />
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((student, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 flex items-center space-x-3">
                      <Image
                        className="object-cover w-12 h-12 rounded-full"
                        src={student.avatar}
                        width={50}
                        height={50}
                        alt="Student Image"
                      />
                      <span>{student.name}</span>
                    </td>
                    <td className="p-3">{student.studentId}</td>
                    <td className="p-3">{student.pricePerLesson}</td>
                    <td className="p-3">{student.joinDate}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm ${
                          student.prepaidBalance.toLowerCase() === "prepaid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {student.prepaidBalance}
                      </span>
                    </td>
                    <td className="p-3 flex space-x-3">
                      <button className="text-gray-500 hover:text-primary">
                        <MessageSquareMore size={18} />
                      </button>
                      <button className="text-gray-500 hover:text-primary">
                        <Video size={18} />
                      </button>
                      <div className="flex justify-center items-center">
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
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredStudents.length
            )}{" "}
            - {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
            {filteredStudents.length} students
          </p>
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
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
