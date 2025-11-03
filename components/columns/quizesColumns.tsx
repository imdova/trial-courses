import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { Eye, Download } from "lucide-react";
import { Switch } from "../UI/switch";
import { Badge } from "../UI/badge";
import { Checkbox } from "../UI/Check-Box";
import { Quiz } from "@/types/quiz";

export const generateQuizesColumns = (): ColumnDef<Quiz>[] => [
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
    header: "Quiz ID",
    size: 80,
  },
  {
    accessorKey: "title",
    header: "Quiz Title",
    cell: ({ row }) => (
      <Link 
        href={`/admin/quizzes/${row.original.id}`}
        className="text-sm font-medium hover:text-blue-600 hover:underline transition-colors cursor-pointer"
      >
        {row.original.title}
      </Link>
    ),
    size: 250,
  },
  {
    accessorKey: "instructor",
    header: "Instructor",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 overflow-hidden rounded-full">
          <Image
            className="h-full w-full object-cover"
            src={row.original.instructor.avatar}
            alt={row.original.instructor.name}
            width={32}
            height={32}
          />
        </div>
        <span className="text-sm">{row.original.instructor.name}</span>
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm">
        {row.original.date
          ? new Date(row.original.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : ""}
      </span>
    ),
    size: 100,
  },
  {
    accessorKey: "questions",
    header: "Questions",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.questionsNum}</span>
    ),
    size: 100,
  },
  {
    header: "Active Status",
    accessorKey: "isActive",
    cell: ({ row, column, table }) => {
      const status: boolean = row.getValue("isActive");
      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={status}
            onCheckedChange={(value) =>
              table.options.meta?.updateData(row.index, column.id, value)
            }
          />
          <Badge variant={status ? "default" : "destructive"}>
            {status ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
    size: 120,
  },
  {
    accessorKey: "viewLink",
    header: "View",
    cell: ({ row }) => (
      <Link
        href={row.original.viewLink ?? "/"}
        className="text-green-600 hover:text-green-800 hover:underline"
        title="View Quiz"
      >
        <Eye size={16} />
      </Link>
    ),
    size: 80,
  },
  {
    accessorKey: "downloadLink",
    header: "Download",
    cell: ({ row }) => (
      <Link
        href={row.original.downloadLink ?? ""}
        className="text-gray-600 hover:text-gray-800 hover:underline"
        download
        title="Download Quiz"
      >
        <Download size={16} />
      </Link>
    ),
    size: 80,
  },
];
