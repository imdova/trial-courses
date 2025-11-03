/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnDef } from "@tanstack/react-table";
import {  Edit, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { Button } from "@/components/UI/button";
import { MoreHorizontal, ArchiveIcon, BellIcon, LinkIcon } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/UI/checkbox";
import { Assignment } from "@/types/courses";

type AssignmentColumnProps = {
  onEdit?: (assignment: Assignment) => void;
  onArchive?: (assignment: Assignment) => void;
  onReminder?: (assignment: Assignment) => void;
  onDelete?: (assignment: Assignment) => void;
};

export const generateAssignmentColumns = (
  props?: AssignmentColumnProps
): ColumnDef<Assignment>[] => [
  {
    id: "select",
    header: ({ table }) => {
      const isAllSelected = table.getIsAllPageRowsSelected();
      const isSomeSelected = table.getIsSomePageRowsSelected();
      const checked: boolean | "indeterminate" = isAllSelected 
        ? true 
        : isSomeSelected 
        ? "indeterminate" 
        : false;
      
      return (
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Assignment",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
            <FileText className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex flex-col">
            <Link
              href={`/instructor/assignments/${assignment.id}`}
              className="font-medium hover:underline"
            >
              {assignment.name}
            </Link>
            <span className="text-xs text-gray-500">
              {assignment.numberOfQuestions} questions
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "start_date",
    header: "Start Date & Time",
    cell: ({ row }) => {
      const assignment = row.original;
      if (!assignment.start_date) return <span className="text-gray-400">Not set</span>;
      
      const date = new Date(assignment.start_date);
      const isValid = !isNaN(date.getTime());

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">
            {isValid ? date.toLocaleDateString() : "Invalid Date"}
          </span>
          <span className="text-xs text-gray-500">
            {isValid ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "end_date",
    header: "Due Date & Time",
    cell: ({ row }) => {
      const assignment = row.original;
      if (!assignment.end_date) return <span className="text-gray-400">Not set</span>;
      
      const date = new Date(assignment.end_date);
      const isValid = !isNaN(date.getTime());
      const now = new Date();
      const isOverdue = isValid && date < now;

      return (
        <div className="flex flex-col">
          <span className={`text-sm font-medium ${isOverdue ? 'text-red-600' : ''}`}>
            {isValid ? date.toLocaleDateString() : "Invalid Date"}
          </span>
          <span className={`text-xs ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
            {isOverdue ? 'Overdue' : isValid ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "submissions",
    header: "Submissions",
    cell: ({ row }) => {
      const submissions = row.original.submissions || [];
      return (
        <div className="text-center">
          <span className="text-sm text-gray-700">
            {submissions.length} student{submissions.length !== 1 ? 's' : ''}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "totalPoints",
    header: "Points",
    cell: ({ getValue }) => {
      const points = getValue<number>();
      return <span className="font-medium">{points}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>());
      return (
        <span className="text-sm text-gray-600">
          {date.toLocaleDateString()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const assignment = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* <DropdownMenuItem asChild>
              <Link href={`/instructor/assignments/${assignment.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                <span>View</span>
              </Link>
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => props?.onEdit?.(assignment)}
            >
              <Edit className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem
              onClick={() => props?.onArchive?.(assignment)}
            >
              <ArchiveIcon className="mr-2 h-4 w-4" />
              <span>Archive</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => props?.onReminder?.(assignment)}
            >
              <BellIcon className="mr-2 h-4 w-4" />
              <span>Send Reminder</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(`${window.location.origin}/instructor/assignments/${assignment.id}`);
              }}
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              <span>Copy Link</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => props?.onDelete?.(assignment)}
              className="text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem> */}
              </DropdownMenuContent> 
        </DropdownMenu>
      );
    },
  },
];
