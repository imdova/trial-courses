import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "../UI/badge";
import { Checkbox } from "../UI/Check-Box";
import { Student } from "@/store/slices/admin-students-list.slice";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import Flag from "../UI/flagitem";
import { Mars, Venus } from "lucide-react";
import Link from "next/link";

export const generateAdminStudentsColumns = (): ColumnDef<Student>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Student ID",
    cell: ({ row }) => (
      <span className="text-xs font-mono text-gray-600">
        {row.original.id.substring(0, 8)}...
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: "profile.fullName",
    header: "Name",
    cell: ({ row }) => (
      <Link 
        href={`/admin/students/${row.original.id}`}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors cursor-pointer"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={row.original.profile.photoUrl || undefined}
            alt={row.original.profile.fullName}
          />
          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
            {row.original.profile.firstName[0]}{row.original.profile.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-gray-900 text-sm hover:text-blue-600 transition-colors">
            {row.original.profile.fullName}
          </div>
          <div className="text-xs text-gray-500">
            {row.original.email}
          </div>
        </div>
      </Link>
    ),
    size: 250,
  },
  {
    accessorKey: "profile.age",
    header: "Age",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.profile.age || "N/A"}</span>
    ),
    size: 80,
  },
  {
    accessorKey: "profile.gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.profile.gender;
      if (!gender) return <span className="text-sm text-gray-400">N/A</span>;
      
      return (
        <Badge
          className={
            gender === "male"
              ? "bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5"
              : "bg-pink-600/10 text-pink-600 focus-visible:ring-pink-600/20 dark:bg-pink-400/10 dark:text-pink-400 dark:focus-visible:ring-pink-400/40 [a&]:hover:bg-pink-600/5 dark:[a&]:hover:bg-pink-400/5"
          }
          variant="outline"
        >
          {gender === "male" ? <Mars className="h-3 w-3" /> : <Venus className="h-3 w-3" />}
          <span className="capitalize ml-1">{gender}</span>
        </Badge>
      );
    },
    size: 120,
  },
  {
    accessorKey: "profile.country",
    header: "Country",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.profile.country ? (
          <>
            <Flag
              code={row.original.profile.country.code.toLowerCase()}
              name={row.original.profile.country.name}
              className="h-4 w-6"
            />
            <span className="text-sm">{row.original.profile.country.name}</span>
          </>
        ) : (
          <span className="text-sm text-gray-400">N/A</span>
        )}
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: "profile.state",
    header: "State",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.profile.state?.name || "N/A"}
      </span>
    ),
    size: 120,
  },
  {
    accessorKey: "profile.category",
    header: "Category",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.profile.category || "N/A"}
      </span>
    ),
    size: 130,
  },
  {
    accessorKey: "profile.speciality",
    header: "Speciality",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.profile.speciality || "N/A"}
      </span>
    ),
    size: 150,
  },
  {
    accessorKey: "createdAt",
    header: "Joined Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {new Date(row.original.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </span>
    ),
    size: 120,
  },
];

