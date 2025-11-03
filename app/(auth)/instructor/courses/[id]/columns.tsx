import Flag from "@/components/UI/flag";
import { AdvancedColumnConfig } from "@/types";
import { CourseStudent } from "@/types/courses";
import { formatMoney } from "@/util/general";
import { Award, DollarSign, Eye, UsersRound } from "lucide-react";

type TopCountry = {
  country: string;
  countryCode: string;
  students: number;
  revenue: number;
  avgCompletionRate: number;
};

type TopCategory = {
  category: string;
  students: number;
  avgWatchTimeHrs: number;
  avgRating: number;
  revenue: number;
};

type TopAgeGroup = {
  ageGroup: string;
  students: number;
  revenue: number;
  avgSessionLengthMin: number;
  completionRate: number;
};

export const topCountriesData: TopCountry[] = [
  {
    country: "United States",
    countryCode: "US",
    students: 120,
    revenue: 4800,
    avgCompletionRate: 78,
  },
  {
    country: "India",
    countryCode: "IN",
    students: 95,
    revenue: 2100,
    avgCompletionRate: 72,
  },
  {
    country: "Egypt",
    countryCode: "EG",
    students: 70,
    revenue: 1600,
    avgCompletionRate: 69,
  },
  {
    country: "Germany",
    countryCode: "DE",
    students: 45,
    revenue: 2200,
    avgCompletionRate: 81,
  },
  {
    country: "Brazil",
    countryCode: "BR",
    students: 40,
    revenue: 1400,
    avgCompletionRate: 65,
  },
  {
    country: "China",
    countryCode: "CN",
    students: 35,
    revenue: 1800,
    avgCompletionRate: 75,
  },
  {
    country: "Japan",
    countryCode: "JP",
    students: 30,
    revenue: 1500,
    avgCompletionRate: 71,
  },
  {
    country: "South Korea",
    countryCode: "KR",
    students: 25,
    revenue: 1200,
    avgCompletionRate: 68,
  },
  {
    country: "Russia",
    countryCode: "RU",
    students: 20,
    revenue: 800,
    avgCompletionRate: 65,
  },
  {
    country: "France",
    countryCode: "FR",
    students: 15,
    revenue: 600,
    avgCompletionRate: 72,
  },
];

export const topCategoriesData: TopCategory[] = [
  {
    category: "Web Development",
    students: 150,
    avgWatchTimeHrs: 18,
    avgRating: 4.6,
    revenue: 18000,
  },
  {
    category: "UI/UX Design",
    students: 90,
    avgWatchTimeHrs: 15,
    avgRating: 4.5,
    revenue: 13500,
  },
  {
    category: "Data Science",
    students: 80,
    avgWatchTimeHrs: 22,
    avgRating: 4.7,
    revenue: 17600,
  },
  {
    category: "Marketing",
    students: 60,
    avgWatchTimeHrs: 12,
    avgRating: 4.3,
    revenue: 7200,
  },
  {
    category: "Business",
    students: 50,
    avgWatchTimeHrs: 10,
    avgRating: 4.2,
    revenue: 5000,
  },
  {
    category: "AI/ML",
    students: 40,
    avgWatchTimeHrs: 20,
    avgRating: 4.5,
    revenue: 8000,
  },
  {
    category: "Cybersecurity",
    students: 30,
    avgWatchTimeHrs: 15,
    avgRating: 4.4,
    revenue: 4500,
  },
  {
    category: "Cloud Computing",
    students: 25,
    avgWatchTimeHrs: 12,
    avgRating: 4.3,
    revenue: 3000,
  },
  {
    category: "Database Management",
    students: 20,
    avgWatchTimeHrs: 10,
    avgRating: 4.2,
    revenue: 2000,
  },
];

export const topAgeGroupsData: TopAgeGroup[] = [
  {
    ageGroup: "18-24",
    students: 110,
    revenue: 2200,
    avgSessionLengthMin: 35,
    completionRate: 70,
  },
  {
    ageGroup: "25-34",
    students: 130,
    revenue: 3900,
    avgSessionLengthMin: 42,
    completionRate: 77,
  },
  {
    ageGroup: "35-44",
    students: 60,
    revenue: 2500,
    avgSessionLengthMin: 28,
    completionRate: 68,
  },
  {
    ageGroup: "45-54",
    students: 25,
    revenue: 1200,
    avgSessionLengthMin: 25,
    completionRate: 60,
  },
  {
    ageGroup: "55+",
    students: 10,
    revenue: 400,
    avgSessionLengthMin: 20,
    completionRate: 55,
  },
  {
    ageGroup: "60+",
    students: 5,
    revenue: 200,
    avgSessionLengthMin: 15,
    completionRate: 50,
  },
];

export const generateTopCountriesColumns =
  (): AdvancedColumnConfig<TopCountry>[] => [
    {
      header: "Country",
      accessorKey: "country",
      cell: ({ row }) => {
        const country = row.original;
        return (
          <div className="flex items-center gap-2">
            <Flag name={country.country} code={country.countryCode} />
            <div className="text-xs">{country.country}</div>
          </div>
        );
      },
      size: 20,
    },
    {
      header: "Students",
      accessorKey: "students",
    },
    {
      header: "Revenue",
      accessorKey: "revenue",
      cell: ({ row }) => (
        <div className="text-xs font-medium text-green-600">
          ${formatMoney(row.getValue("revenue"))}
        </div>
      ),
    },
    {
      header: "Completion",
      accessorKey: "avgCompletionRate",
      cell: ({ row }) => (
        <div className="text-xs font-medium text-blue-600">
          {row.getValue("avgCompletionRate")}%
        </div>
      ),
    },
  ];

export const generateTopCategoriesColumns =
  (): AdvancedColumnConfig<TopCategory>[] => [
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => (
        <div className="text-xs font-medium">{row.getValue("category")}</div>
      ),
    },
    {
      header: "Students",
      accessorKey: "students",
    },
    {
      header: "Revenue",
      accessorKey: "revenue",
      cell: ({ row }) => (
        <div className="text-xs font-medium text-green-600">
          ${formatMoney(row.getValue("revenue"))}
        </div>
      ),
    },
    {
      header: "W.T",
      accessorKey: "avgWatchTimeHrs",
      cell: ({ row }) => (
        <div className="text-xs">{row.getValue("avgWatchTimeHrs")} hrs</div>
      ),
    },
  ];

export const generateTopAgesColumns =
  (): AdvancedColumnConfig<TopAgeGroup>[] => [
    {
      header: "Age",
      accessorKey: "ageGroup",
      cell: ({ row }) => (
        <div className="text-xs font-medium">{row.getValue("ageGroup")}</div>
      ),
    },
    {
      header: "Students",
      accessorKey: "students",
    },
    {
      header: "Revenue",
      accessorKey: "revenue",
      cell: ({ row }) => (
        <div className="text-xs font-medium text-green-600">
          ${formatMoney(row.getValue("revenue"))}
        </div>
      ),
    },
    {
      header: "C.Rate",
      accessorKey: "completionRate",
      cell: ({ row }) => (
        <div className="text-xs font-medium text-blue-600">
          {row.getValue("completionRate")}%
        </div>
      ),
    },
  ];

export const stats = [
  {
    title: "Total Enrollments",
    value: "1,245",
    change: "+12% from last month",
    icon: <UsersRound size={20} />,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-500",
  },
  {
    title: "Course Revenue",
    value: "$12,450",
    change: "+8% from last month",
    icon: <DollarSign size={20} />,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Total Views",
    value: "5,678",
    change: "+15% from last month",
    icon: <Eye size={20} />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
  {
    title: "Completion Rate",
    value: "78%",
    change: "+3% from last month",
    icon: <Award size={20} />,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
];

export const courseStudentsColumns: AdvancedColumnConfig<CourseStudent>[] = [
  {
    header: "id",
    accessorKey: "studentId",
    cell: ({ row }) => (
      <div className="text-xs font-medium">
        # {(row.getValue("studentId") || "").toString().slice(0, 8)}
      </div>
    ),
  },
  {
    header: "Student",
    accessorKey: "studentEmail",
    cell: ({ row }) => (
      <a
        href={`mailto:${row.getValue("studentEmail")}`}
        className="text-xs font-medium text-blue-600 hover:underline"
      >
        {row.getValue("studentEmail")}
      </a>
    ),
  },
  {
    header: "Completion",
    accessorKey: "progressPercentage",
    cell: ({ row }) => (
      <div className="text-xs font-medium">
        {row.getValue("progressPercentage")}%
      </div>
    ),
    meta: {
      filterVariant: "range",
    },
  },
  {
    header: "Progress",
    accessorKey: "completedItems",
    cell: ({ row }) => (
      <div className="text-xs font-medium">
        {row.original.completedItems}/{row.original.totalItems}
      </div>
    ),
    meta: {
      filterVariant: "range",
    },
  },
];
