import { StudentProfile } from "@/types/courses";
import { Badge } from "@/components/UI/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Mars, Venus } from "lucide-react";
import { ColumnConfig } from ".";
import { Checkbox } from "@/components/UI/Check-Box";

export const studentsColumns: ColumnConfig<StudentProfile>[] = [
  {
    header: "Student",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback className="text-xs">
            {row.original.name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="text-xs font-medium">{row.getValue("name")}</div>
      </div>
    ),
  },
  {
    header: "country",
    accessorKey: "country",
    cell: ({ row }) => (
      <div className="text-xs font-medium">{row.getValue("country")}</div>
    ),
  },
  {
    header: "State",
    accessorKey: "state",
    cell: ({ row }) => (
      <div className="text-xs font-medium">{row.getValue("state")}</div>
    ),
  },
  {
    header: "Age",
    accessorKey: "age",
    cell: ({ row }) => (
      <div className="text-xs font-medium">{row.getValue("age")}</div>
    ),
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: ({ row }) => (
      <Badge
        className={
          row.getValue("gender") === "male"
            ? "bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5"
            : "bg-pink-600/10 text-pink-600 focus-visible:ring-pink-600/20 dark:bg-pink-400/10 dark:text-pink-400 dark:focus-visible:ring-pink-400/40 [a&]:hover:bg-pink-600/5 dark:[a&]:hover:bg-pink-400/5"
        }
        variant="outline"
      >
        {row.getValue("gender") === "male" ? <Mars /> : <Venus />}
        {row.getValue("gender")}
      </Badge>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("category")}</div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Specialty",
    accessorKey: "speciality",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("speciality")}</div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "enrollment",
    accessorKey: "joinDate",
    accessorFn: (row) => new Date(row.joinDate!).getTime(),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("joinDate")}</div>
    ),
    meta: {
      filterVariant: "date-range",
    },
  },
];
export const allStudentsColumns = (
  actions: ColumnConfig<StudentProfile>,
  showContactInfo?: boolean,
): ColumnConfig<StudentProfile>[] => [
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
  },
  {
    header: "ID",
    accessorKey: "studentId",
  },
  {
    header: "Student",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={row.original.avatar} alt={row.original.name} />
          <AvatarFallback className="text-xs">
            {row.original.name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="text-xs font-medium">
          <p>{row.getValue("name")}</p>
          {showContactInfo && <p>{row.original.email}</p>}
        </div>
      </div>
    ),
  },
  ...(showContactInfo
    ? [
        {
          header: "Phone",
          accessorKey: "phone", // ✅ keyof StudentProfile
        } as ColumnConfig<StudentProfile>, // sometimes needed for TS inference
      ]
    : []),
  {
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "State",
    accessorKey: "state",
  },
  {
    header: "Age",
    accessorKey: "age",
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Gender",
    accessorKey: "gender",
    cell: ({ row }) => (
      <Badge
        className={
          row.getValue("gender") === "male"
            ? "bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5"
            : "bg-pink-600/10 text-pink-600 focus-visible:ring-pink-600/20 dark:bg-pink-400/10 dark:text-pink-400 dark:focus-visible:ring-pink-400/40 [a&]:hover:bg-pink-600/5 dark:[a&]:hover:bg-pink-400/5"
        }
        variant="outline"
      >
        {row.getValue("gender") === "male" ? <Mars /> : <Venus />}
        {row.getValue("gender")}
      </Badge>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Category",
    accessorKey: "category",
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Specialty",
    accessorKey: "speciality",
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "courses",
    accessorKey: "enrolledCourses",
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Revenue",
    accessorKey: "revenue",
    cell: ({ row }) => (
      <div className="font-medium">EGP {row.getValue("revenue")}</div>
    ),
    meta: {
      filterVariant: "select",
    },
  },
  {
    header: "Enrollment",
    accessorKey: "joinDate",
  },
  ...(showContactInfo ? [actions] : []),
];
