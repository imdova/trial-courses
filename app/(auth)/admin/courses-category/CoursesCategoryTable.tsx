import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import ExportBtnIcon from "../components/ExportBtnIcon";
import { Edit, Eye, SlidersHorizontal, Trash } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import OptionsDropdown from "@/components/UI/OptionsDropdown";

const Category = [
  {
    id: 1,
    CategoryName: "Medical Terminology Specialization",
    Slug: "/category/medical-terminology/",
    Parent: "Dental",
    Courses: 12,
    Students: 200,
    Revenue: "200EGP",
  },
  // ... rest of your category data
];

const CoursesCategoryTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"CategoryName">("CategoryName");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const columns = [
    {
      key: "CategoryName",
      header: "Category Name",
      sortable: true,
      width: "160px",
    },
    {
      key: "Slug",
      header: "Slug",
      sortable: true,
      width: "230px",
    },
    {
      key: "Parent",
      header: "Parent",
      sortable: true,
    },
    {
      key: "Courses",
      header: "Courses",
      sortable: true,
    },
    {
      key: "Students",
      header: "Date",
      sortable: true,
    },
    {
      key: "Revenue",
      header: "Amount",
      sortable: true,
    },
    {
      key: "Action",
      header: "Action",
      sortable: false,
      render: () => (
        <div className="flex items-center gap-2">
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

  const filteredData = Category.filter((category) =>
    category[filterType].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleFilterChange = (type: "CategoryName") => {
    setFilterType(type);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-end justify-between gap-4 overflow-hidden px-1 py-3 md:flex-row">
        <div className="w-[500px] max-w-[400px]">
          <SearchInput SetSearchQuery={setSearchQuery} />
        </div>
        <div className="flex items-center gap-3 relative">
          <button
            onClick={toggleMenu}
            className="h-12 w-12 rounded-md bg-primary text-white hover:bg-primary-900 flex items-center justify-center"
          >
            <SlidersHorizontal size={15} />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg z-10">
              {["CategoryName", "Category", "Instructor"].map((type) => (
                <button
                  key={type}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filterType === type
                      ? "bg-gray-100 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange(type as "CategoryName")}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          <ExportBtnIcon data={""} />
        </div>
      </div>

      <DynamicTable
        data={filteredData}
        columns={columns}
        pagination={true}
        itemsPerPage={5}
        className="min-w-[800px] border border-gray-300 rounded-md"
        headerClassName="bg-gray-100 text-black text-center text-base"
        rowClassName="hover:bg-gray-50"
        cellClassName="py-3 px-4 text-center text-xs"
      />
    </>
  );
};

export default CoursesCategoryTable;
