import { ColumnDef } from "@tanstack/react-table";
import { Academy } from "@/types/academy";
import { UserAvatar } from "../UI/Avatar";
import OptionsDropdown from "../UI/OptionsDropdown";
import { Edit, Eye, Trash, Users, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export const generateAcademiesColumns = (): ColumnDef<Academy>[] => [
  {
    accessorKey: "name",
    header: "Name",
    filterFn: "includesString",
    cell: ({ row }) => {
      const academy = row.original;
      return (
        <div className="flex items-center gap-3">
          <UserAvatar size={40} src={academy.image} className="rounded-md" />
          <div>
            <Link
              href={`/admin/academies/${academy.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="font-medium hover:underline"
            >
              {academy.name}
            </Link>
            <p className="text-xs text-gray-500">{academy.keyWords?.[0]}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    filterFn: "includesString",
    meta: { filterVariant: "select" },
    cell: ({ row }) => {
      const academy = row.original as Academy;
      const typeColors: Record<Academy["type"], string> = {
        University: "bg-blue-100 text-blue-800",
        Academy: "bg-purple-100 text-purple-800",
        College: "bg-teal-100 text-teal-800",
        "Training Center": "bg-indigo-100 text-indigo-800",
      };

      return (
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium ${typeColors[academy.type]}`}
        >
          {academy.type}
        </span>
      );
    },
  },
  {
    accessorKey: "location.city",
    header: "City",
    cell: ({ row }) => {
      const academy = row.original as Academy;
      return (
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{academy.city?.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      const academy = row.original as Academy;
      return academy.country?.name;
    },
  },
  {
    accessorKey: "foundedYear",
    header: "Founded",
    cell: ({ getValue }) => {
      const foundedYear = getValue() as number;
      return foundedYear;
    },
  },
  {
    accessorKey: "studentsCount",
    header: "Students",
    cell: ({ getValue }) => {
      const count = getValue() as number;
      return (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-500" />
          <span>{count.toLocaleString()}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "contactInfo",
    header: "Contact",
    cell: ({ row }) => {
      const academy = row.original as Academy;
      return (
        <div className="space-y-1">
          <div className="flex items-center gap-1">
            <Mail className="h-3 w-3 text-gray-500" />
            <span className="text-xs">{academy.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3 text-gray-500" />
            <span className="text-xs">{academy.phone}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    meta: { filterVariant: "select" },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const academy = row.original;
      return (
        <OptionsDropdown
          actions={[
            {
              label: "View",
              icon: <Eye className="h-4 w-4" />,
              onClick: () => console.log("View clicked", academy.name),
            },
            {
              label: "Edit",
              icon: <Edit className="h-4 w-4" />,
              onClick: () => console.log("Edit clicked", academy.name),
            },
            {
              label: "Delete",
              icon: <Trash className="h-4 w-4" />,
              onClick: () => console.log("Delete clicked", academy.name),
              danger: true,
            },
          ]}
        />
      );
    },
  },
];
