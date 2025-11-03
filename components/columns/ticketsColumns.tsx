import { ColumnDef } from "@tanstack/react-table";
import { Ticket } from "@/types/ticket";
import { UserAvatar } from "../UI/Avatar";
import OptionsDropdown from "../UI/OptionsDropdown";
import { Edit, Eye, Trash } from "lucide-react";
import Link from "next/link";

export const generateTicketsColumns = (): ColumnDef<Ticket>[] => [
  {
    accessorKey: "id",
    header: "Ticket ID",
    filterFn: "includesString",
  },
  {
    accessorKey: "subject",
    header: "Subject",
    filterFn: "includesString",
    cell: ({ row }) => {
      const ticket = row.original as { id: string; subject: string };
      return (
        <Link href={`/admin/tickets/${ticket.id}`} className="hover:underline">
          {ticket.subject}
        </Link>
      );
    },
    meta: { filterVariant: "select" },
  },
  {
    accessorKey: "createdOn",
    header: "Created On",
    cell: ({ getValue }) => {
      const createdOn = getValue() as string | number | Date;
      return new Date(createdOn).toLocaleDateString();
    },
  },
  {
    accessorKey: "assignee",
    header: "Assignee",
    cell: ({ getValue }) => {
      const assignee = getValue() as
        | { name: string; avatar: string }
        | undefined;

      if (!assignee)
        return <span className="text-sm text-gray-400">Unassigned</span>;

      return (
        <div className="flex items-center gap-2">
          <UserAvatar size={21} src={assignee.avatar} />
          <span className="text-sm">{assignee.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    filterFn: "includesString",
    meta: { filterVariant: "select" },
    cell: ({ row }) => {
      const ticket = row.original as Ticket;
      const priorityColors: Record<Ticket["priority"], string> = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-orange-100 text-orange-800",
        urgent: "bg-red-100 text-red-800",
      };

      return (
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium ${priorityColors[ticket.priority]}`}
        >
          {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "includesString",
    meta: { filterVariant: "select" },
    cell: ({ row }) => {
      const ticket = row.original as Ticket;
      const statusColors: Record<Ticket["status"], string> = {
        open: "bg-blue-600 ",
        "in-progress": "bg-yellow-600 ",
        resolved: "bg-green-600 ",
        closed: "bg-gray-600",
      };

      return (
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2.5 py-0.5 text-xs font-medium text-white ${statusColors[ticket.status]}`}
        >
          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <OptionsDropdown
          actions={[
            {
              label: "View",
              icon: <Eye className="h-4 w-4" />,
              onClick: () => console.log("View clicked", course.id),
            },
            {
              label: "Edit",
              icon: <Edit className="h-4 w-4" />,
              onClick: () => console.log("Edit clicked", course.id),
            },
            {
              label: "Delete",
              icon: <Trash className="h-4 w-4" />,
              onClick: () => console.log("Delete clicked", course.id),
              danger: true,
            },
          ]}
        />
      );
    },
  },
];
