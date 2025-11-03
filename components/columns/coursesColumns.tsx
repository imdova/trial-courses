import { CourseFormType, CourseItem, CoursePricing } from "@/types/courses";
import Link from "next/link";
import { ImageIcon, MoreHorizontal, Pen, PlusIcon } from "lucide-react";
import { Switch } from "../UI/switch";
import { Badge } from "../UI/badge";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "../UI/Tooltip";
import { Input } from "../UI/input";

const academyColumns: AdvancedColumnConfig<CourseItem>[] = [
  {
    accessorKey: "academyInstructors",
    header: "academyInstructors",
    cell: ({ row }) => (
      <div className="mt-4 flex -space-x-3">
        {row.original.academyInstructors
          ?.slice(0, 3)
          ?.map((instructor, idx) => (
            <Tooltip key={idx}>
              <TooltipTrigger>
                <Avatar className="ring-background size-8 ring-2 transition-all hover:z-10 hover:scale-150">
                  <AvatarImage src={instructor.photoUrl} />
                  <AvatarFallback className="text-muted-foreground text-xs">
                    {instructor.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{instructor.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        {row.original.academyInstructors?.length > 3 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="bg-muted has-focus-visible:ring-ring/50 ring-background flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full ring-2">
                <PlusIcon className="size-4" />
                <span className="sr-only">Add</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-2xs">
              {row.original.academyInstructors
                ?.slice(3)
                .map((instructor, index) => (
                  <DropdownMenuItem key={index} className="cursor-auto">
                    <Avatar>
                      <AvatarImage
                        src={instructor.photoUrl}
                        alt={instructor.name}
                      />
                      <AvatarFallback className="text-xs">
                        {instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{instructor.name}</span>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    ),
  },
];

export const generateCoursesColumns = (
  actions?: (rowIndex: number, type: "delete" | "quicEdit") => void,
  loading?: boolean,
  isAcademy?: boolean,
): AdvancedColumnConfig<CourseItem>[] => [
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
    header: "Course",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="aspect-video size-auto h-7 rounded">
            <AvatarImage src={course.courseImage} alt={course.name} />
            <AvatarFallback>
              <ImageIcon />
            </AvatarFallback>
          </Avatar>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/instructor/courses/${course.id}`}
                className="line-clamp-2 w-44 text-wrap break-words hover:underline"
              >
                {course.name}
              </Link>
            </TooltipTrigger>
            {course.name.length > 40 && (
              <TooltipContent>{course.name}</TooltipContent>
            )}
          </Tooltip>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    accessorFn: (row) => new Date(row.created_at!).getTime(),
    cell: ({ row }) => formatDate(row.original.created_at),
    header: "Date",
    meta: { filterVariant: "date-range" },
  },
  ...(isAcademy ? academyColumns : []),
  {
    id: "category",
    accessorKey: "category.name",
    header: "Category",
    meta: { filterVariant: "select" },
  },
  {
    id: "subCategory",
    accessorKey: "subCategory.name",
    header: "Sup Category",
    meta: { filterVariant: "select" },
  },
  {
    accessorKey: "pricings",
    header: "Price",
    cell: ({ row, column, table }) => {
      const prices: CoursePricing[] = row.original.pricings || [];
      if (!prices || prices.length === 0) {
        return <span className="text-muted-foreground">No prices</span>;
      }
      const price = prices[0];
      return (
        <div className={`relative ${loading ? "pointer-events-none" : ""}`}>
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <span>{price.currencyCode}</span>
          </div>
          <Input
            type="text"
            variant="table"
            placeholder="Username"
            className="peer min-w-32 pl-10"
            defaultValue={price.regularPrice || ""}
            onBlur={(e) => {
              const regular = Number(e.target.value) || 0;
              const hasChanged = regular !== price.regularPrice;
              if (!hasChanged) return;
              table.options.meta?.updateData(row.index, column.id, [
                {
                  currencyCode: price.currencyCode,
                  discountAmount: price.discountAmount,
                  discountEnabled: price.discountEnabled,
                  isActive: price.isActive,
                  regularPrice: regular,
                  salePrice: +(
                    regular *
                    (1 - (price.discountAmount || 0) / 100)
                  ).toFixed(2),
                } as CoursePricing,
              ]);
            }}
          />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "students",
    header: "Students",
    cell: () => "100",
    size: 100,
  },
  {
    id: "revenue",
    header: "Revenue",
    cell: () => `$1000`,
    size: 100,
  },
  {
    accessorKey: "type",
    header: "Type",
    meta: { filterVariant: "select" },
    cell: ({ getValue }) => {
      const type = getValue() as CourseFormType["type"];
      return (
        <Badge variant={type === "recorded" ? "info" : "premium"}>{type}</Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    meta: { filterVariant: "select" },
    cell: ({ getValue }) => {
      const status = getValue() as CourseFormType["status"];
      return (
        <Badge
          variant={
            status === "published"
              ? "success"
              : status === "archived"
                ? "info"
                : "warning"
          }
        >
          {status}
        </Badge>
      );
    },
    size: 120,
  },
  {
    header: "Active",
    accessorKey: "isActive",
    cell: ({ row, column, table }) => {
      const status: boolean = row.getValue("isActive");
      return (
        <div
          className={`flex items-center gap-2 ${loading ? "pointer-events-none" : ""}`}
        >
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
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row, table }) => {
      const course = row.original;
      return (
        <div>
          <Button
            size="iconSm"
            variant="outline"
            onClick={() => actions?.(row.index, "quicEdit")}
          >
            <Pen />
          </Button>
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
                <Link href={`/courses/${course.slug}`}>View</Link>
              </DropdownMenuItem>
              {course.status === "draft" ? (
                <DropdownMenuItem
                  onClick={() =>
                    table.options.meta?.updateData(
                      row.index,
                      "status",
                      "published",
                    )
                  }
                >
                  Publish
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    table.options.meta?.updateData(row.index, "status", "draft")
                  }
                  className="bg-orange-50 text-orange-500"
                >
                  Draft
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/lms/course/add?duplicate=${course.id}`}>
                  Duplicate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/lms/course/edit/${course.id}`}>Full Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="bg-red-50 text-red-500"
                onClick={() => actions?.(row.index, "delete")}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
