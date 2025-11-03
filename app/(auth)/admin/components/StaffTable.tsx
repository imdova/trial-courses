import React, { useState } from "react";
import Link from "next/link";
import SearchInput from "./SearchInput";
import ExportBtnIcon from "./ExportBtnIcon";
import { Edit, Eye, Plus, SlidersHorizontal, Trash } from "lucide-react";
import DynamicTable from "@/components/UI/tables/DTable";
import OptionsDropdown from "@/components/UI/OptionsDropdown";

const Staff = [
  {
    id: 1,
    Name: "Tiger Nixon",
    StaffRoll: "Staff Roll",
    MobileNumber: "010234567890",
    Email: "info@example.com",
    JoinDate: "1-2-2020",
    Address: "15 Mostafa Refaat Sheraton Al Matar",
    AssignTo: "M.COM., P.H.D.",
  },
  // ... rest of your staff data
];

const StaffTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"Name">("Name");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const columns = [
    {
      key: "Name",
      header: "Name",
      sortable: true,
      width: "160px",
    },
    {
      key: "StaffRoll",
      header: "Staff Roll",
      sortable: true,
    },
    {
      key: "MobileNumber",
      header: "Mobile Number",
      sortable: true,
    },
    {
      key: "Email",
      header: "Email",
      sortable: true,
    },
    {
      key: "JoinDate",
      header: "Date",
      sortable: true,
    },
    {
      key: "Address",
      header: "Amount",
      sortable: true,
    },
    {
      key: "AssignTo",
      header: "Assign to",
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

  const filteredData = Staff.filter((staff) =>
    staff[filterType].toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleFilterChange = (type: "Name") => {
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
              {["Name", "Category", "Instructor"].map((type) => (
                <button
                  key={type}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    filterType === type
                      ? "bg-gray-100 text-primary"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleFilterChange(type as "Name")}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          <ExportBtnIcon data={""} />
          <Link
            className="flex h-12 items-center gap-2 rounded-md bg-primary px-4 text-sm text-white hover:bg-primary-900"
            href="/courses/admin/add-staff"
          >
            <Plus size={15} />
            Add Staff
          </Link>
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

export default StaffTable;
