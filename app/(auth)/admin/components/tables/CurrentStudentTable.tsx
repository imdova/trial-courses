"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Edit, Trash } from "lucide-react";
import { ColumnConfig } from "@/types";
import DataTable from "@/components/UI/data-table";
import { ListItemIcon } from "@mui/material";

const instructors = [
  {
    id: 1,
    Name: "Said Ahmed",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    StudentID: "1234567890",
    PricePerLesson: 20,
    JoinDate: "January 2, 2020",
    balance: "prepaid",
    Email: "said@example.com",
  },
  // ... rest of your instructor data
];

const CurrentStudentTable: React.FC = () => {
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const columns: ColumnConfig<(typeof instructors)[0]>[] = [
    {
      key: "Name",
      header: "Name",
      width: "160px",
      sortable: true,
      render: (item) => (
        <div className="flex h-full items-center gap-2">
          <Image
            width={300}
            height={300}
            src={item.image}
            alt={item.Name}
            className="h-10 w-10 rounded-lg"
          />
          <div>
            <h3 className="mb-1 text-xs">{item.Name}</h3>
            <p className="text-[8px] leading-none">{item.Email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "StudentID",
      header: "Student ID",
      sortable: true,
    },
    {
      key: "PricePerLesson",
      header: "Price Per Lesson",
      sortable: true,
      render: (item) => `$${item.PricePerLesson}`,
    },
    {
      key: "JoinDate",
      header: "Join Date",
      sortable: true,
    },
    {
      key: "balance",
      header: "Prepaid balance",
      sortable: true,
      render: (item) => (
        <span
          className={`rounded-md p-1 text-xs ${
            item.balance === "prepaid"
              ? "bg-[#4CBC9A26] text-green-700"
              : "bg-[#FC6B7726] text-red-700"
          }`}
        >
          {item.balance}
        </span>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-between gap-4 px-1 py-3 md:flex-row">
        <h1 className="text-lg font-bold">Current Students</h1>
      </div>

      <div className="grid grid-cols-1">
        <DataTable
          data={instructors}
          columns={columns}
          selected={selected}
          setSelected={setSelected}
          options={[
            {
              label: () => (
                <button>
                  <ListItemIcon>
                    <Edit className="mr-2 h-4 w-4" />
                  </ListItemIcon>
                  Edit
                </button>
              ),
            },
            {
              label: () => (
                <button>
                  <ListItemIcon>
                    <Trash className="mr-2 h-4 w-4" />
                  </ListItemIcon>
                  Delete
                </button>
              ),
            },
          ]}
          noDataMessage={{
            title: "No students found",
            description: "Try adjusting your search criteria",
          }}
        />
      </div>
    </>
  );
};

export default CurrentStudentTable;
