import { BundlePricing, CourseBundle, CourseFormType } from "@/types/courses";
import Link from "next/link";
import { ImageIcon, MoreHorizontal, Pen } from "lucide-react";
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
import { getDiscountAmount, getSalePrice } from "@/util/forms";

// TODO: add courses list here
export const generateBundlesColumns = (
  actions?: (rowIndex: number, type: "delete" | "edit") => void,
  loading?: boolean,
): AdvancedColumnConfig<CourseBundle>[] => [
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
    accessorKey: "title",
    header: "Bundle",
    cell: ({ row }) => {
      const bundle = row.original;
      return (
        <div className="flex items-center gap-2">
          <Avatar className="aspect-video size-auto h-7 rounded">
            <AvatarImage src={bundle.thumbnail_url} alt={bundle.title} />
            <AvatarFallback>
              <ImageIcon />
            </AvatarFallback>
          </Avatar>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/instructor/bundles/${bundle.id}`}
                className="line-clamp-2 w-44 text-wrap break-words hover:underline"
              >
                {bundle.title}
              </Link>
            </TooltipTrigger>
            {bundle.title.length > 40 && (
              <TooltipContent>{bundle.title}</TooltipContent>
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
  {
    accessorKey: "courseBundles",
    header: "Courses",
    cell: ({ row }) => {
      const courses = row.original.courseBundles || [];
      const avatars = courses.map((bundle) => ({
        src: bundle.course.courseImage,
        name: bundle.course.name,
        fallback: bundle.course.name[0],
      }));
      if (avatars.length === 0)
        return <span className="text-muted-foreground">No Courses</span>;
      return (
        <div className="flex -space-x-2">
          {avatars.slice(0, 3).map((avatar, index) => (
            <Tooltip key={index}>
              <TooltipTrigger className="transition-all hover:z-10 hover:scale-125">
                <Avatar className="ring-background aspect-video size-auto h-7 rounded ring-2">
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
                <button className="bg-muted has-focus-visible:ring-ring/50 ring-background flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full ring-2">
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
  },
  {
    id: "regular_price",
    accessorKey: "pricings.0.regular_price",
    accessorFn: (row) => {
      const prices: BundlePricing[] = row.pricings || [];
      return prices.length > 0 ? Number(prices[0].regular_price) || 0 : 0;
    },
    header: "Regular Price",
    cell: ({ row, table }) => {
      const prices: BundlePricing[] = row.original.pricings || [];
      if (!prices || prices.length === 0) {
        return <span className="text-muted-foreground">No prices</span>;
      }
      const price = prices[0];
      return (
        <div className={`relative ${loading ? "pointer-events-none" : ""}`}>
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <span>{price.currency_code}</span>
          </div>
          <Input
            type="text"
            variant="table"
            placeholder=""
            className="peer min-w-32 pl-10"
            defaultValue={price.regular_price || ""}
            onBlur={(e) => {
              const value = Number(e.target.value) || 0;
              const hasChanged = value !== price.regular_price;
              if (!hasChanged) return;
              table.options.meta?.updateData(row.index, "pricings", [
                {
                  currency_code: price.currency_code,
                  discount_amount: price.discount_amount,
                  discount_enabled: price.discount_enabled,
                  is_active: price.is_active,
                  regular_price: value,
                  sale_price: getSalePrice(value, price.discount_amount || 0),
                } as BundlePricing,
              ]);
            }}
          />
        </div>
      );
    },
  },
  {
    id: "sale_price",
    accessorKey: "pricings.0.sale_price",
    header: "Sale Price",
    accessorFn: (row) => {
      const prices: BundlePricing[] = row.pricings || [];
      return prices.length > 0 ? Number(prices[0].sale_price) || 0 : 0;
    },
    cell: ({ row, table }) => {
      const prices: BundlePricing[] = row.original.pricings || [];
      if (!prices || prices.length === 0) {
        return <span className="text-muted-foreground">No prices</span>;
      }
      const price = prices[0];
      return (
        <div className={`relative ${loading ? "pointer-events-none" : ""}`}>
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <span>{price.currency_code}</span>
          </div>
          <Input
            type="text"
            variant="table"
            placeholder=""
            className="peer min-w-32 pl-10"
            defaultValue={price.sale_price || ""}
            onBlur={(e) => {
              const value = Number(e.target.value) || 0;
              const hasChanged = value !== price.sale_price;
              if (!hasChanged) return;
              table.options.meta?.updateData(row.index, "pricings", [
                {
                  currency_code: price.currency_code,
                  discount_amount: getDiscountAmount(
                    price.regular_price || 0,
                    value,
                  ),
                  discount_enabled: price.discount_enabled,
                  is_active: price.is_active,
                  regular_price: price.regular_price,
                  sale_price: value,
                } as BundlePricing,
              ]);
            }}
          />
        </div>
      );
    },
    meta: {
      filterVariant: "range",
    },
  },
  {
    id: "discount_amount",
    accessorKey: "pricings.0.discount_amount",
    header: "Discount",
    accessorFn: (row) => {
      const prices: BundlePricing[] = row.pricings || [];
      return prices.length > 0 ? Number(prices[0].discount_amount) || 0 : 0;
    },
    cell: ({ row, table }) => {
      const prices: BundlePricing[] = row.original.pricings || [];
      if (!prices || prices.length === 0) {
        return <span className="text-muted-foreground">No prices</span>;
      }
      const price = prices[0];
      return (
        <div className={`relative ${loading ? "pointer-events-none" : ""}`}>
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <span>%</span>
          </div>
          <Input
            type="text"
            variant="table"
            placeholder=""
            className="peer min-w-32 pl-7"
            defaultValue={price.discount_amount || 0}
            onBlur={(e) => {
              const value = Number(e.target.value) || 0;
              const hasChanged = value !== price.discount_amount;
              if (!hasChanged) return;
              table.options.meta?.updateData(row.index, "pricings", [
                {
                  currency_code: price.currency_code,
                  discount_amount: value,
                  discount_enabled: price.discount_enabled,
                  is_active: price.is_active,
                  regular_price: price.regular_price,
                  sale_price: getSalePrice(price.regular_price || 0, value),
                } as BundlePricing,
              ]);
            }}
          />
        </div>
      );
    },
    meta: {
      filterVariant: "range",
    },
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
    accessorKey: "active",
    cell: ({ row, column, table }) => {
      const status: boolean = row.getValue("active");
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
      const bundle = row.original;
      return (
        <div>
          <Button size="iconSm" variant="outline" asChild>
            <Link href={`/lms/bundle/edit/${bundle.id}`}>
              <Pen />
            </Link>
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
                <Link href={`/bundles/${bundle.id}`}>View</Link>
              </DropdownMenuItem>
              {bundle.status === "draft" ? (
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
                <Link href={`/lms/bundle/add?duplicate=${bundle.id}`}>
                  Duplicate
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/lms/bundle/edit/${bundle.id}`}>Edit</Link>
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
