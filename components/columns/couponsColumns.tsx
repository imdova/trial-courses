import { CopyIcon, Pen, Trash2Icon } from "lucide-react";
import { Switch } from "../UI/switch";
import { Badge } from "../UI/badge";
import { Checkbox } from "../UI/Check-Box";
import { AdvancedColumnConfig } from "@/types";
import { Button } from "../UI/button";
import { formatDate } from "@/util";
import { CouponData } from "@/types/coupon";
import { CourseItem } from "@/types/courses";
import { Tooltip, TooltipContent, TooltipTrigger } from "../UI/Tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../UI/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../UI/dropdown-menu";

export const generateCouponsColumns = (
  actions?: (id: string, type: "delete" | "edit" | "duplicate") => void,
  loading?: boolean,
  courses?: CourseItem[],
): AdvancedColumnConfig<CouponData>[] => [
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
    header: "Name",
  },
  {
    accessorKey: "created_at",
    accessorFn: (row) => new Date(row.created_at!).getTime(),
    cell: ({ row }) => formatDate(row.original.created_at),
    header: "Date",
    meta: { filterVariant: "date-range" },
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "offer_type",
    header: "Type",
    meta: { filterVariant: "select" },
  },
  {
    accessorKey: "applicable_for",
    header: "Applicable For",
    accessorFn: (coupon) =>
      coupon.applicable_for === "ALL_INSTRUCTOR_COURSES"
        ? "All Courses"
        : coupon.applicable_for === "MULTIPLE_COURSES"
          ? "Selected Courses"
          : "",
    cell: ({ row }) => {
      if (row.original.applicable_for === "ALL_INSTRUCTOR_COURSES") {
        return "All Courses";
      }
      const coursesIds =
        row.original.applicable_for === "MULTIPLE_COURSES"
          ? row.original.course_ids || []
          : [];
      const avatars = coursesIds.map((id) => {
        const item = courses?.find((course) => course.id === id);
        return {
          src: item?.courseImage,
          name: item?.name,
          fallback: item?.name[0],
        };
      });
      if (avatars.length === 0)
        return <span className="text-muted-foreground">No Courses</span>;
      return (
        <div className="flex -space-x-1">
          {avatars.slice(0, 3).map((avatar, index) => (
            <Tooltip key={index}>
              <TooltipTrigger className="transition-all hover:z-10 hover:scale-125">
                <Avatar className="ring-background aspect-video size-auto h-5 rounded ring-2">
                  <AvatarImage src={avatar.src} alt={avatar.name} />
                  <AvatarFallback className="text-xs">
                    {avatar.fallback}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{avatar.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {avatars.length > 3 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="bg-muted has-focus-visible:ring-ring/50 ring-background flex aspect-video size-auto h-5 shrink-0 cursor-pointer items-center justify-center rounded ring-2">
                  <span className="text-muted-foreground text-xs">
                    +{avatars.length - 3}
                  </span>
                  <span className="sr-only">More courses</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="max-w-sm">
                <DropdownMenuLabel>More Courses</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {avatars.slice(3).map((avatar, index) => (
                  <DropdownMenuItem
                    key={index}
                    className="flex items-center gap-2"
                  >
                    <Avatar className="aspect-video size-auto h-7 rounded">
                      <AvatarImage src={avatar.src} alt={avatar.name} />
                      <AvatarFallback className="text-xs">
                        {avatar.fallback}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate">{avatar.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      );
    },
    meta: { filterVariant: "select" },
  },

  {
    accessorKey: "amount",
    header: "Amount",
    accessorFn: (coupon) => Number(coupon.amount) ,
    meta: { filterVariant: "range" },
  },
  {
    accessorKey: "minimum_purchase",
    header: "Minimum Purchase",
    accessorFn: (coupon) => Number(coupon.minimum_purchase) ,
    meta: { filterVariant: "range" },
    cell: ({ row }) => row.original.minimum_purchase || "None",
  },
  {
    accessorKey: "usage_limit",
    header: "Usage Limit",
    accessorFn: (coupon) => Number(coupon.usage_limit) ,
    meta: { filterVariant: "range" },
    cell: ({ row }) => row.original.usage_limit || "Unlimited",
  },
  {
    accessorKey: "start_date",
    accessorFn: (coupon) => new Date(coupon.start_date!).getTime(),
    header: "Start Date",
    cell: ({ row }) => formatDate(row.original.start_date),
    meta: { filterVariant: "date-range" },
  },
  {
    accessorKey: "end_date",
    accessorFn: (coupon) => new Date(coupon.end_date!).getTime(),
    header: "End Date",
    cell: ({ row }) => formatDate(row.original.end_date),
    meta: { filterVariant: "date-range" },
  },
  {
    header: "Status",
    accessorKey: "status",
    meta: { filterVariant: "select" },
    filterFn: "equals",
    cell: ({ row, column, table }) => {
      const active: boolean = row.getValue("status") === "ACTIVE";
      return (
        <div
          className={`flex items-center gap-2 ${loading ? "pointer-events-none" : ""}`}
        >
          <Switch
            checked={active}
            onCheckedChange={(value) => {
              const status: CouponData["status"] = value
                ? "ACTIVE"
                : "INACTIVE";
              table.options.meta?.updateData(row.index, column.id, status);
            }}
          />
          <Badge variant={active ? "default" : "destructive"}>
            {active ? "Active" : "Inactive"}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const coupon = row.original;
      return (
        <div className="flex gap-2">
          <Button
            size="iconSm"
            variant="successOutline"
            onClick={() => actions?.(coupon.id, "edit")}
          >
            <Pen />
          </Button>
          <Button
            size="iconSm"
            variant="outline"
            onClick={() => actions?.(coupon.id, "duplicate")}
          >
            <CopyIcon />
          </Button>
          <Button
            size="iconSm"
            variant="destructiveOutline"
            onClick={() => actions?.(coupon.id, "delete")}
          >
            <Trash2Icon />
          </Button>
        </div>
      );
    },
  },
];
