import Link from "next/link";
import { ImageIcon, MoreHorizontal } from "lucide-react";
import { Checkbox } from "../UI/Check-Box";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import { AdvancedColumnConfig } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/dropdown-menu";
import { Button } from "../UI/button";
import { formatDate } from "@/util";
import { AcademyInstructor } from "@/types/academy";

export const generateAcademyInstructorColumns = (
  actions?: (instructorId: string, type: "delete" | "edit") => void,
): AdvancedColumnConfig<AcademyInstructor>[] => [
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
    accessorKey: "name",
    header: "Instructor",
    cell: ({ row }) => {
      const instructor = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={instructor.photoUrl} alt={instructor.name} />
            <AvatarFallback>
              <ImageIcon />
            </AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">{instructor.name}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "biography",
  //   header: "Bio",
  //   cell: ({ row }) => (
  //     <p className="line-clamp-2 text-xs text-wrap break-all">
  //       {row.getValue("biography")}
  //     </p>
  //   ),
  // },
  {
    accessorKey: "created_at",
    accessorFn: (row) => new Date(row.created_at!).getTime(),
    cell: ({ row }) => formatDate(row.original.created_at),
    header: "Date",
    meta: { filterVariant: "date-range" },
  },
  {
    id: "actions",
    enableHiding: false,
    size: 5,
    cell: ({ row }) => {
      const instructor = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/academy/instructors/${instructor.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => actions?.(instructor.id, "edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="bg-red-50 text-red-500"
              onClick={() => actions?.(instructor.id, "delete")}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
