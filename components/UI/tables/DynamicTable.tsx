"use client";
import { ArrowUpDown, Edit, Eye, Search, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import OptionsDropdown from "../OptionsDropdown";

interface Student {
  name: string;
  studentId: string;
  courseName: string;
  joinDate: string;
  prepaidBalance: string;
  imageUrl: string;
  category: string;
}

interface StudentTableProps {
  students: Student[];
  columTitles: string[];
}

const columnMapping: Record<string, keyof Student> = {
  "Student Name": "name",
  "Student ID": "studentId",
  "Course Name": "courseName",
  "Join Date": "joinDate",
  Category: "category",
  Balance: "prepaidBalance",
};

const DynamicTable: React.FC<StudentTableProps> = ({
  students,
  columTitles,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Student | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle sorting logic
  const sortedStudents = [...students].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortField === "joinDate") {
      return sortOrder === "asc"
        ? new Date(aValue).getTime() - new Date(bValue).getTime()
        : new Date(bValue).getTime() - new Date(aValue).getTime();
    }

    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Handle search filtering
  const filteredStudents = sortedStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.max(
    1,
    Math.ceil(filteredStudents.length / itemsPerPage)
  );
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (columnTitle: string) => {
    const field = columnMapping[columnTitle];
    if (!field) return;

    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center pb-4 gap-4">
          <h2 className="text-xl font-semibold">Current Students</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg bg-gray-100 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="text-gray-700">
                {columTitles.map((header, index) => (
                  <th
                    key={index}
                    className="p-3 text-left cursor-pointer"
                    onClick={() => toggleSort(header)}
                  >
                    <div className="flex gap-3">
                      {header}
                      {sortField === columnMapping[header] && (
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
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 flex items-center space-x-3">
                    <Image
                      className="w-14 h-14 rounded-2xl object-cover"
                      src={student.imageUrl}
                      width={200}
                      height={200}
                      alt="blog image"
                    />
                    <span>{student.name}</span>
                  </td>
                  <td className="text-center p-3">{student.studentId}</td>
                  <td className="p-3">{student.courseName}</td>
                  <td className="p-3">
                    <span className="p-2 text-sm rounded-md bg-gray-100">
                      {student.category}
                    </span>
                  </td>
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
                  <td>
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing{" "}
            {Math.min(
              (currentPage - 1) * itemsPerPage + 1,
              filteredStudents.length
            )}
            -{Math.min(currentPage * itemsPerPage, filteredStudents.length)} of{" "}
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

export default DynamicTable;
