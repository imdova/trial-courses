import InstaPay from "@/assets/images/instaPay.png";
import { Download, Eye } from "lucide-react";
import { AdvancedColumnConfig } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { cn, formatDate } from "@/util";
import { Checkbox } from "@/components/UI/Check-Box";
import { Button } from "@/components/UI/button";
import { FaPaypal, FaCreditCard, FaWallet, FaCcVisa } from "react-icons/fa";
import { HiOutlineCash } from "react-icons/hi";
import Image from "next/image";
import { Badge } from "@/components/UI/badge";
import { CourseTransaction } from "@/types/transaction";
import { formatMoney } from "@/util/general";

const getMethodIcon = (method: CourseTransaction["method"]) => {
  switch (method) {
    case "Credit Card":
      return <FaCreditCard />;
    case "Visa":
      return <FaCcVisa />;
    case "Cash":
      return <HiOutlineCash />;
    case "Wallet":
      return <FaWallet />;
    case "InstaPay":
      return (
        <Image
          src={InstaPay}
          alt="InstaPay"
          width={24}
          height={24}
          className="size-6 object-contain"
        />
      );
    case "PayPal":
      return <FaPaypal />;
    default:
      return null;
  }
};

const getMethodClass = (method: CourseTransaction["method"]) => {
  switch (method) {
    case "Credit Card":
      return "text-blue-500";
    case "Visa":
      return "text-blue-700";
    case "Cash":
      return "text-green-600";
    case "Wallet":
      return "text-yellow-500";
    case "InstaPay":
      return "text-pink-500";
    case "PayPal":
      return "text-indigo-500";
    default:
      return null;
  }
};

export const generateCourseTransactionsColumns =
  (): AdvancedColumnConfig<CourseTransaction>[] => [
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
      enableHiding: false,
    },
    {
      header: "ID",
      accessorKey: "id",
      cell: ({ row }) => <span className="text-xs font-medium">#{row.getValue("id")}</span>,
    },
    {
      header: "Student",
      accessorKey: "firstName",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage
              src={row.original.avatar}
              alt={row.original.firstName}
            />
            <AvatarFallback className="text-xs">
              {row.original.firstName.charAt(0) +
                row.original.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="text-xs font-medium">
            {row.original.firstName + " " + row.original.lastName}
          </div>
        </div>
      ),
    },
    {
      header: "Item",
      accessorKey: "item",
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: ({ row }) => (
        <Badge
          variant={row.getValue("type") === "course" ? "success" : "premium"}
        >
          {row.getValue("type")}
        </Badge>
      ),
      meta: { filterVariant: "select" },
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
      header: "Method",
      accessorKey: "method",
      cell: ({ row }) => (
        <div
          className={cn(
            "flex items-center text-xs [&>img]:size-4 [&>svg]:size-4",
            getMethodClass(row.getValue("method")),
          )}
        >
          {getMethodIcon(row.getValue("method"))}{" "}
          <span className="text-foreground ml-1">{row.getValue("method")}</span>
        </div>
      ),
      meta: { filterVariant: "select" },
    },
    {
      accessorKey: "created_at",
      accessorFn: (row) => new Date(row.created_at!).getTime(),
      cell: ({ row }) => (
        <span className="text-muted-foreground text-xs">
          {formatDate(row.original.created_at)}
        </span>
      ),
      header: "Date",
      meta: { filterVariant: "date-range" },
    },
    {
      id: "actions",
      header: "Receipt",
      enableHiding: false,
      cell: () => {
        return (
          <div className="flex gap-2">
            <Button size="iconSm" variant="successOutline">
              <Eye />
              <span className="sr-only">View</span>
            </Button>
            <Button size="iconSm" variant="outline">
              <Download />
              <span className="sr-only">Download</span>
            </Button>
          </div>
        );
      },
    },
  ];
