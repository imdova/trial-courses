import InstructorCard from "@/app/(auth)/student/browse-instructors/components/InstructorCard";
import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
import DataTable from "@/components/UI/data-table";
import StatCardItem from "@/components/UI/StatCardItem";
import { dummyRevenueData } from "@/constants/charts/chart.data";
import { instructors } from "@/constants/instructors.data";
import { ColumnConfig } from "@/types";
import { Instructor } from "@/types/courses";
import { BookOpen, DollarSign, UserCog, Users, UsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  {
    id: 1,
    title: "Total Instructors",
    value: "1,234",
    change: "+12% from last month",
    icon: <UsersRound size={20} />,
    bgColor: "#E4F8FFE5",
    textColor: "#55BEE6",
  },
  {
    id: 2,
    title: "Total Courses",
    value: "1,234",
    change: "+12% from last month",
    icon: <UsersRound size={20} />,
    bgColor: "#E4F8FFE5",
    textColor: "#55BEE6",
  },
  {
    id: 3,
    title: "Total Enrollments",
    value: "1,245",
    change: "+12% from last month",
    icon: <UsersRound size={20} />,
    bgColor: "#E4F8FFE5",
    textColor: "#55BEE6",
  },
  {
    id: 4,
    title: "Total Revenue",
    value: "$12,450",
    change: "+8% from last month",
    icon: <DollarSign size={20} />,
    bgColor: "#DCFCE7",
    textColor: "#008236",
  },
];

export default function OverviewInstructorsPage() {
  const columns: ColumnConfig<Instructor>[] = [
    {
      header: "Instructor",
      key: "name",
      sortable: true,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Image
            className="h-8 w-8 rounded-full object-cover"
            width={200}
            height={200}
            src={item.avatar}
            alt={item.name}
          />
          <Link
            className="hover:text-primary transition"
            href={`/admin/instructors/${item.id}`}
          >
            <h2 className="text-sm font-medium">{item.name}</h2>
          </Link>
        </div>
      ),
    },
    {
      header: "Courses",
      key: "courses",
      sortable: true,
    },
    {
      header: "Students",
      key: "students",
      sortable: true,
    },
    {
      header: "Sales",
      key: "sales",
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCardItem key={stat.id} {...stat} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-9">
        <div className="col-span-1 md:col-span-6">
          <div className="mb-4 overflow-hidden">
            <DynamicStatisticsChart
              data={dummyRevenueData}
              metrics={[
                {
                  key: "courses",
                  label: "Courses",
                  icon: <BookOpen size={20} />,
                  color: "#EC4899",
                },
                {
                  key: "students",
                  label: "Students",
                  icon: <Users size={20} />,
                  color: "#FFB543",
                },
                {
                  key: "instructors",
                  label: "Instructors",
                  icon: <UserCog size={20} />,
                  color: "#6366F1",
                },
              ]}
              chartTitle="Instructors Statistics"
            />
          </div>
          <div>
            <div className="mb-4 flex justify-between">
              <h2 className="font-semibold">Recent Instructors</h2>
              <div className="mb-4 flex gap-3">
                <span className="rounded-lg bg-[#2563EB1A] px-4 py-2 text-xs text-[#2563EB]">
                  1,210 Courses sold
                </span>
                <span className="rounded-lg bg-[#008A2F1A] px-4 py-2 text-xs text-[#008A2F]">
                  $42,350.0 Net sales
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {instructors.map((instructor) => (
                <InstructorCard key={instructor.id} Instructor={instructor} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3">
          <DataTable<Instructor>
            data={instructors}
            columns={columns}
            total={instructors.length}
            isSelectable={false}
            noDataMessage={{
              title: "No instructors found",
              description: "There are no instructors in the system yet.",
            }}
          />
        </div>
      </div>
    </div>
  );
}
