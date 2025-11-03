import { Download, Eye } from "lucide-react";
import { AdvancedColumnConfig } from "@/types";
import { cn, formatDate } from "@/util";
import { Checkbox } from "@/components/UI/Check-Box";
import { Button } from "@/components/UI/button";
import { FaPaypal, FaWallet } from "react-icons/fa";
import { LiaUniversitySolid } from "react-icons/lia"; // Icon for Bank Transfer
import { Badge } from "@/components/UI/badge";
import { formatMoney } from "@/util/general";
import { InstructorWithdrawal } from "@/types/withdraw";
import Image from "next/image";
import InstaPay from "@/assets/images/instaPay.png";

// Import the InstructorWithdrawal interface and WithdrawMethods type

// Define the WithdrawMethods type (as provided in your prompt)
export type WithdrawMethods =
  | "instapay"
  | "eWallet"
  | "bankTransfer"
  | "paypal";

// --- Helper Functions for Methods (Adapted for InstructorWithdrawal) ────────────────
const getWithdrawMethodIcon = (method: InstructorWithdrawal["method"]) => {
  switch (method) {
    case "bankTransfer":
      return <LiaUniversitySolid />;
    case "paypal":
      return <FaPaypal />;
    case "instapay":
      return (
        <Image
          src={InstaPay}
          alt="InstaPay"
          width={24}
          height={24}
          className="size-6 object-contain"
        />
      );
    case "eWallet":
      return <FaWallet />;
    default:
      return null;
  }
};

const getWithdrawMethodClass = (method: InstructorWithdrawal["method"]) => {
  switch (method) {
    case "bankTransfer":
      return "text-blue-600";
    case "paypal":
      return "text-indigo-500";
    case "instapay":
      return "text-pink-500";
    case "eWallet":
      return "text-yellow-500";
    default:
      return "text-gray-500";
  }
};

const getStatusBadgeVariant = (status: InstructorWithdrawal["status"]) => {
  switch (status) {
    case "Processed":
      return "success";
    case "Pending":
      return "warning";
    case "Rejected":
    case "Failed":
      return "destructiveOutline";
    default:
      return "default";
  }
};

const selectColumn: AdvancedColumnConfig<InstructorWithdrawal>[] = [
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
];

// ─── Generate Instructor Withdrawals Columns ──────────────────────────────
export const generateInstructorWithdrawalsColumns = (
  { isMinimal } = { isMinimal: false },
): AdvancedColumnConfig<InstructorWithdrawal>[] => [
  ...(!isMinimal ? selectColumn : []),
  {
    header: "ID",
    accessorKey: "id",
    cell: ({ row }) => (
      <span className="text-xs font-medium">#{row.getValue("id")}</span>
    ),
    size: 80,
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <span className="text-xs font-medium">
        {formatMoney(row.original.amount, row.original.currency)}
      </span>
    ),
    meta: { filterVariant: "range" },
  },
  {
    header: "Fees",
    accessorKey: "feeAmount",
    cell: ({ row }) =>
      row.original.feeAmount > 0 ? (
        <span className="text-xs text-red-500">
          - {formatMoney(row.original.feeAmount, row.original.currency)}
        </span>
      ) : (
        "-"
      ),
  },
  {
    header: "Net Received",
    accessorKey: "netAmount",
    cell: ({ row }) => (
      <span className="text-primary text-xs font-medium">
        {formatMoney(row.original.netAmount, row.original.currency)}
      </span>
    ),
    meta: { filterVariant: "range" },
  },
  {
    header: "Method",
    accessorKey: "method",
    cell: ({ row }) => (
      <div
        className={cn(
          "flex items-center text-xs [&>svg]:size-4",
          getWithdrawMethodClass(row.getValue("method")),
        )}
      >
        {getWithdrawMethodIcon(row.getValue("method"))}{" "}
        <span className="text-foreground ml-1 capitalize">
          {row.getValue("method")}
        </span>
      </div>
    ),
    meta: { filterVariant: "select" },
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => (
      <Badge variant={getStatusBadgeVariant(row.getValue("status"))}>
        {row.getValue("status")}
      </Badge>
    ),
    meta: { filterVariant: "select" },
  },
  {
    header: "Requested Date",
    accessorKey: "created_at",
    accessorFn: (row) => new Date(row.created_at).getTime(),
    cell: ({ row }) => (
      <span className="text-muted-foreground text-xs">
        {formatDate(row.original.created_at)}
      </span>
    ),
    meta: { filterVariant: "date-range" },
  },
  {
    id: "actions",
    header: "Details",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button size="iconSm" variant="outline">
            <Eye />
            <span className="sr-only">View Details</span>
          </Button>
          <Button size="iconSm" variant="ghost">
            <Download />
            <span className="sr-only">Download Receipt</span>
          </Button>
        </div>
      );
    },
  },
];
