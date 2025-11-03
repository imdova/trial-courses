import SearchBar from "@/components/UI/form/search-Input";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import DynamicTable from "@/components/UI/tables/DTable";
import { Download, Edit, Eye, Trash, UsersRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Certificate = {
  id: string;
  title: string;
  program: string;
  grade: string;
  issueDate: string;
  serial: string;
  view_url: string;
  download_url: string;
  file_type: "pdf" | "docx" | "png" | "jpg";
};
const certificates: Certificate[] = [
  {
    id: "C-001",
    title: "Full Stack Web Development",
    program: "Code Academy",
    grade: "A+",
    issueDate: "2023-08-10",
    serial: "CA-FSWD-2023-001",
    view_url: "/certificates/C-001/view",
    download_url: "/certificates/C-001/download",
    file_type: "pdf",
  },
  {
    id: "C-002",
    title: "Introduction to Cybersecurity",
    program: "Coursera - IBM",
    grade: "A",
    issueDate: "2023-06-15",
    serial: "CS-IBM-2023-024",
    view_url: "/certificates/C-002/view",
    download_url: "/certificates/C-002/download",
    file_type: "pdf",
  },
  {
    id: "C-003",
    title: "AI & Machine Learning Fundamentals",
    program: "edX - HarvardX",
    grade: "B+",
    issueDate: "2024-01-05",
    serial: "EDX-HARV-2024-043",
    view_url: "/certificates/C-003/view",
    download_url: "/certificates/C-003/download",
    file_type: "pdf",
  },
  {
    id: "C-004",
    title: "Responsive Web Design",
    program: "freeCodeCamp",
    grade: "A",
    issueDate: "2022-12-22",
    serial: "FCC-RWD-2022-109",
    view_url: "/certificates/C-004/view",
    download_url: "/certificates/C-004/download",
    file_type: "pdf",
  },
  {
    id: "C-005",
    title: "Cloud Computing Basics",
    program: "Google Cloud Skills Boost",
    grade: "A-",
    issueDate: "2023-10-01",
    serial: "GCSB-CCB-2023-076",
    view_url: "/certificates/C-005/view",
    download_url: "/certificates/C-005/download",
    file_type: "pdf",
  },
];
// File type icons mapping
const fileIcons = {
  pdf: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-red-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 12h1v4H8v-4zm3 .5c0-.276.224-.5.5-.5H13a.5.5 0 0 1 .5.5v1H13v-1h-1v3h1v-1h.5v1a.5.5 0 0 1-.5.5h-1.5a.5.5 0 0 1-.5-.5v-3zm4 .5h1a.5.5 0 0 1 .5.5v1h-1v-1h-.5v1.5H16v-1a.5.5 0 0 1 .5-.5H18v2h-1v-.5h-.5v.5a.5.5 0 0 1-.5.5H15v-3z" />
    </svg>
  ),
  docx: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-blue-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h13a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM9 12h1l1 4 1-4h1l1 4 1-4h1l-1.5 5h-1l-1-4-1 4h-1L9 12z" />
    </svg>
  ),
  xlsx: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-green-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 2h13l3 3v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.103.897-2 2-2zm1 5v10h2v-4h1.5l2 3h1.5l-2.5-3 2.5-3H10.5l-2 3H7V7H5zm10 13a1 1 0 0 0 1-1V9h-4V4H5a1 1 0 0 0-1 1v15h11z" />
    </svg>
  ),
  pptx: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-green-600"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M4 2h13l3 3v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4c0-1.103.897-2 2-2zm1 5v10h2v-4h1.5l2 3h1.5l-2.5-3 2.5-3H10.5l-2 3H7V7H5zm10 13a1 1 0 0 0 1-1V9h-4V4H5a1 1 0 0 0-1 1v15h11z" />
    </svg>
  ),
  zip: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-amber-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM9 7h1v1H9V7zm0 2h1v1H9V9zm0 2h1v1H9v-1zm2 0h1v1h-1v-1zm2 0h1v1h-1v-1zm-4 2h6v6H9v-6zm1 1v4h4v-4h-4z" />
    </svg>
  ),
  default: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 text-gray-500"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M6 2a2 2 0 0 0-2 2v16c0 1.103.897 2 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5zM8 13h8v2H8v-2zm0 4h8v2H8v-2z" />
    </svg>
  ),
};

const columns = [
  { key: "id", header: "ID", width: "w-20", sortable: true },
  {
    key: "title",
    header: "Title",
    render: (certificate: Certificate) => (
      <div className="flex items-center gap-2">
        {fileIcons[certificate.file_type as keyof typeof fileIcons] ??
          fileIcons.default}
        <span>{certificate.title}</span>
      </div>
    ),
  },
  { key: "program", header: "Program" },
  { key: "grade", header: "Grade" },
  { key: "issueDate", header: "Issue Date" },
  { key: "serial", header: "Serial" },
  {
    key: "download_url",
    header: "Download",
    align: "center",
    render: (certificate: Certificate) => (
      <Link
        href={certificate.download_url}
        className="flex justify-center text-gray-600 hover:text-gray-800 hover:underline"
        download
      >
        <Download size={20} />
      </Link>
    ),
  },
  {
    key: "view_url",
    header: "View",
    render: (certificate: Certificate) => (
      <Link
        href={certificate.view_url}
        className="flex justify-center text-green-600 hover:text-green-800 hover:underline"
      >
        <Eye size={20} />
      </Link>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    render: () => (
      <div className="flex justify-center cursor-pointer">
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
    ),
  },
];
export default function CertifcatesOverviewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    instructor: "",
    date: "",
  });
  // Get unique instructors for filter dropdown
  const uniquePrograms = Array.from(
    new Map(certificates.map((q) => [q.program, q.program])).values()
  );
  // Filter certifcates based on search and filters
  const filteredCertifcate = certificates.filter((certifcate) => {
    const matchesSearch =
      certifcate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      certifcate.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesProgram = filters.instructor
      ? certifcate.program === filters.instructor
      : true;
    const matchesDate = filters.date
      ? certifcate.issueDate === filters.date
      : true;

    return matchesSearch && matchesProgram && matchesDate;
  });
  // Reset to first page when filters change
  const handleFilterChange = (filterName: string, value: string) => {
    setFilters({ ...filters, [filterName]: value });
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mb-4">
        <div className="flex items-center gap-4 p-3 bg-white border rounded-xl">
          <div className="flex justify-center items-center w-14 h-14 bg-[#E4F8FFE5] text-[#55BEE6] rounded-md">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm text-muted-foreground mb-1">
              Total Certifcates
            </span>
            <h2 className="font-semibold text-xl">1,234</h2>
            <span className="text-xs text-primary">+12% from last month</span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-white border rounded-xl">
          <div className="flex justify-center items-center w-14 h-14 bg-[#E4F8FFE5] text-[#55BEE6] rounded-md">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm text-muted-foreground mb-1">
              Total Enrollments
            </span>
            <h2 className="font-semibold text-xl">1,234</h2>
            <span className="text-xs text-primary">+12% from last month</span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-3 bg-white border rounded-xl">
          <div className="flex justify-center items-center w-14 h-14 bg-[#E4F8FFE5] text-[#55BEE6] rounded-md">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm text-muted-foreground mb-1">
              Total Questions
            </span>
            <h2 className="font-semibold text-xl">1,245</h2>
            <span className="text-xs text-primary">+12% from last month</span>
          </div>
        </div>
      </div>
      <div className="p-4 border rounded-xl shadow-sm">
        {/* Header Controls */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
          <h2 className="text-2xl font-semibold">Certifcates</h2>
          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded-md w-full md:w-auto min-w-[160px]">
            + Create New Certifcate
          </button>
        </div>{" "}
        {/* Search and Filters */}
        <div className="flex flex-col xl:flex-row justify-between gap-4 mb-4">
          <SearchBar
            parentClassName="w-full"
            placeholder="Search quizzes by title or ID..."
            onSearch={(query) => {
              setSearchQuery(query);
            }}
          />
          <div className="flex flex-col sm:flex-row justify-end gap-3 ">
            <select
              className="border px-3 py-2 rounded-md w-full sm:w-[200px] outline-none"
              value={filters.instructor}
              onChange={(e) => handleFilterChange("instructor", e.target.value)}
            >
              <option value="">All Programs</option>
              {uniquePrograms.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="border px-3 py-2 rounded-md w-full sm:w-[200px] outline-none"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
            />
          </div>
        </div>
        <DynamicTable
          selectable={true}
          columns={columns}
          data={filteredCertifcate}
        />
      </div>
    </div>
  );
}
