import { Card } from "@/components/UI/card";
import EnrolledCourseCard from "@/components/UI/EnrolledCourseCard";
import StatCardItem from "@/components/UI/StatCardItem";
import CertificatesTable from "@/components/UI/tables/CertificatesTable";
import { courseData } from "@/constants/VideosData.data";
import { DollarSign, Eye, Plus, UsersRound } from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Courses Enrollments",
    value: "1,234",
    change: "+12% from last month",
    icon: <UsersRound size={20} />,
    bgColor: "#E4F8FFE5",
    textColor: "#55BEE6",
  },
  {
    id: 2,
    title: "Total Purchase",
    value: "1,234",
    change: "+12% from last month",
    icon: <DollarSign size={20} />,
    bgColor: "#E4F8FFE5",
    textColor: "#55BEE6",
  },
  {
    id: 3,
    title: "Avarage Spending Time",
    value: "1,245",
    change: "+12% from last month",
    icon: <Eye size={20} />,
    bgColor: "#F3E8FF",
    textColor: "#AD46FF",
  },
];

export default function OverviewStudent() {
  return (
    <div>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {stats.map((stat) => (
          <StatCardItem key={stat.id} {...stat} />
        ))}
      </div>
      <div>
        <Card className="mb-4 p-4">
          <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <h2 className="text-xl font-semibold">Recent Enrolled Courses</h2>
            <button className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition hover:bg-green-700">
              <Plus size={15} /> Assign to new coures
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {courseData.map((course) => {
              return <EnrolledCourseCard key={course.id} course={course} />;
            })}
          </div>
        </Card>
        <CertificatesTable
          certificates={[
            {
              id: "1",
              name: "React Developer Certificate",
              program: "Frontend Development",
              grade: "A",
              issue_date: "2024-05-10",
              serial: "ABC123456",
              fileType: "pdf",
              downloadUrl: "/certificates/react.pdf",
            },
          ]}
          handleView={(id) => console.log("View certificate:", id)}
        />
      </div>
    </div>
  );
}
