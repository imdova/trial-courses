import { UserAvatar } from "@/components/UI/Avatar";
import { Button } from "@/components/UI/button";
import { Checkbox } from "@/components/UI/Check-Box";
import { Badge } from "@/components/UI/NotificationBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { AdvancedColumnConfig } from "@/types";
import { TransactionType } from "@/types/finance";
import { Download, Eye } from "lucide-react";
import Link from "next/link";

export const generateTransactionsColumns =
  (): AdvancedColumnConfig<TransactionType>[] => [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
    },
    {
      header: "ID",
      accessorKey: "id",
      size: 28,
      cell: ({ row }) => "#" + row.getValue("id"),
    },

    {
      header: "Date",
      accessorKey: "created_at",
    },
    {
      header: "Plan",
      accessorKey: "plan",
      accessorFn: (row) => row.plan || "-",
      meta: {
        filterVariant: "select",
      },
    },
    {
      id: "employer",
      header: "Employer",
      accessorKey: "employer.name",
      cell: ({ row }) => {
        const employer = row.original.employer;
        return (
          <div className="flex items-center gap-2">
            <UserAvatar src={employer.image} alt={employer.name} />
            <div>
              <Link
                href={`/admin/employees/${employer.username}`}
                className="line-clamp-1 text-sm hover:underline"
              >{`${employer.name}`}</Link>
            </div>
          </div>
        );
      },
    },
    {
      header: "Payment Method",
      accessorKey: "payment_method",
      meta: {
        filterVariant: "select",
      },
    },
    {
      header: "Total Amount",
      accessorKey: "total_amount",
      meta: {
        filterVariant: "range",
      },
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => (
        <Badge
          variant={row.getValue("type") === "subscription" ? "success" : "info"}
        >
          {row.getValue("type")}
        </Badge>
      ),
      meta: {
        filterVariant: "select",
      },
    },
    {
      header: "Receipt",
      accessorKey: "invoice_id",
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: () => (
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <Eye />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <Download />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download</TooltipContent>
          </Tooltip>
        </div>
      ),
    },
  ];
