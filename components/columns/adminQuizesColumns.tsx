import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye, Download } from "lucide-react";
import { Switch } from "../UI/switch";
import { Badge } from "../UI/badge";
import { Checkbox } from "../UI/Check-Box";
import { AdminQuiz } from "@/store/slices/admin-quizzes.slice";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";

export const generateAdminQuizesColumns = (): ColumnDef<AdminQuiz>[] => [
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
    cell: ({ row }) => (
      <span className="text-xs font-mono text-gray-600">
        {row.original.id.substring(0, 8)}...
      </span>
    ),
    size: 100,
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
    accessorKey: "instructorName",
    header: "Instructor",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={row.original.instructorPhotoUrl || undefined}
            alt={row.original.instructorName}
          />
          <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">
            {row.original.instructorName.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm">{row.original.instructorName}</span>
      </div>
    ),
    size: 180,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">{row.original.date}</span>
    ),
    size: 130,
  },
  {
    accessorKey: "totalQuestions",
    header: "Questions",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.totalQuestions}</span>
    ),
    size: 100,
  },
  {
    accessorKey: "totalEnrollments",
    header: "Enrollments",
    cell: ({ row }) => (
      <span className="text-sm">{row.original.totalEnrollments}</span>
    ),
    size: 100,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "published" ? "default" : "secondary"}>
        {row.original.status === "published" ? "Published" : "Draft"}
      </Badge>
    ),
    size: 100,
  },
  {
    header: "Active",
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/quizzes/${row.original.id}`}
          className="text-green-600 hover:text-green-800"
          title="View Quiz"
        >
          <Eye size={16} />
        </Link>
        <button
          className="text-gray-600 hover:text-gray-800"
          title="Download Quiz"
        >
          <Download size={16} />
        </button>
      </div>
    ),
    size: 100,
  },
];

