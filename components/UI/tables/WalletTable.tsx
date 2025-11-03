"use client";
import { ArrowUpDown, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Courses {
  name: string;
  numberStudent: number;
  pricePerLesson: string;
  date: string;
  imageUrl: string;
  status: string;
  total: number;
}

interface WalletTableProps {
  courses: Courses[];
}

const WalletTable: React.FC<WalletTableProps> = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Courses | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Handle sorting logic
  const sortedStudents = [...courses].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField as keyof Courses];
    const bValue = b[sortField as keyof Courses];

    // Convert to string, number, or date where necessary
    const isDateField = sortField === "date"; // Adjust if more date fields exist
    const isNumberField =
      sortField === "numberStudent" || sortField === "pricePerLesson";

    if (isDateField) {
      return sortOrder === "asc"
        ? new Date(aValue as string).getTime() -
            new Date(bValue as string).getTime()
        : new Date(bValue as string).getTime() -
            new Date(aValue as string).getTime();
    }

    if (isNumberField) {
      return sortOrder === "asc"
        ? Number(aValue) - Number(bValue)
        : Number(bValue) - Number(aValue);
    }

    return sortOrder === "asc"
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });

  // Handle search filtering
  const filteredCourses = sortedStudents.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSort = (field: keyof Courses) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="box-content">
      <div>
        <div className="flex flex-col sm:flex-row  justify-between items-center pb-4 gap-3 ">
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
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className=" text-gray-700">
                {[
                  "Name",
                  "Number of Students",
                  "Price per Lesson",
                  "Date",
                  "Status",
                  "Total",
                ].map((header, index) => (
                  <th
                    key={index}
                    className="p-3 text-left  cursor-pointer"
                    onClick={() =>
                      toggleSort(
                        header.toLowerCase().replace(/\s/g, "") as keyof Courses
                      )
                    }>
                    <div className="flex gap-3">
                      {header}
                      {sortField === header.toLowerCase().replace(/\s/g, "") &&
                        (sortOrder === "asc" ? (
                          <span>
                            <ArrowUpDown className=" text-primary" size={15} />
                          </span>
                        ) : (
                          <span>
                            <ArrowUpDown className=" text-primary" size={15} />
                          </span>
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedCourses.map((course, index) => (
                <tr key={index} className="border-b">
                  <td className="p-3 flex items-center space-x-3">
                    <div>
                      <Image
                        className="object-cover w-14 h-14 rounded-2xl"
                        src={course.imageUrl}
                        width={90}
                        height={90}
                        alt="blog image"
                      />
                    </div>
                    <span>{course.name}</span>
                  </td>
                  <td className="p-3">{course.numberStudent}</td>
                  <td className="p-3">{course.pricePerLesson}</td>
                  <td className="p-3">{course.date}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-lg text-sm ${
                        course.status.toLowerCase() === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                      {course.status}
                    </span>
                  </td>
                  <td className="p-3 ">${course.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-600">
            Showing {currentPage * itemsPerPage - (itemsPerPage - 1)}-
            {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of{" "}
            {filteredCourses.length} Courses
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
                onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletTable;
