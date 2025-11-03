"use client";
import { dummyRevenueData } from "@/constants/charts/chart.data";
import {
  BookOpen,
  DollarSign,
  Eye,
  Package,
  ShoppingCart,
  SquarePen,
  UserCog,
  Users,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import { formatterDate } from "@/util";
import Link from "next/link";
import TransactionsTable from "@/components/UI/tables/TransactionTable";
import DynamicStatisticsChart from "@/components/UI/Charts/DynamicStatisticsChart";
import WalletCard from "@/components/UI/WalletCard";
import Calendar from "@/components/calendar/Calendar";
import { events } from "@/constants/events.data";
import EventList from "@/components/calendar/EventList";
import { useState } from "react";
import EnrollmentsStudentsTable from "@/components/UI/tables/EnrollmentsStudentsTable";

const dummyInstructor: InstructorProfile = {
  id: "user-001",
  userName: "dr.mohamed",
  phone: "+201001234567",
  email: "dr.mohamed@example.com",
  firstName: "Mohamed",
  lastName: "Sayed",
  avatar:
    "https://img.freepik.com/free-photo/waist-up-portrait-handsome-serious-unshaven-male-keeps-hands-together-dressed-dark-blue-shirt-has-talk-with-interlocutor-stands-against-white-wall-self-confident-man-freelancer_273609-16320.jpg",
  birthDate: "1980-05-20",
  type: "instructor",
  skills: ["JavaScript ", " Public", " Speaking"],
  active: true,
  shortcuts: ["Pharmacist", " Health Educator ", " 10+ Years Teaching"],
  bio: "Dar Al Fouad Hospital is one of the largest and most prominent medical centres in Egypt. It was establishing a state-of-the-art in the Nasr City and has total land area is 13,000 square meters (42,651 square feet), the footprint is 7000 square meters (22,966 square feet)Dar Al Fouad Hospital is one of the largest and most prominent medical centres in Egypt. It was establishing a state-of-the-art in the Nasr City and has total land area is 13,000 square",
  title: "Dr",
  languages: [
    { name: "Arabic", proficiency: "Intermediate" },
    { name: "English", proficiency: "Intermediate" },
  ],
  resume: "https://example.com/resume.pdf",
  socialLinks: {
    linkedin: "https://linkedin.com/in/drmohamed",
    twitter: "https://twitter.com/drmohamed",
  },
  whatsapp: "+201001234567",
  nationality: "Egyptian",
  maritalStatus: "married",
  qualifications: ["PhD in Computer Science", "MSc in AI"],
  hasDrivingLicence: true,
  country: { code: "EG", name: "Egypt" },
  state: { code: "CAI", name: "Cairo" },
  city: "Nasr City",
  isPublic: true,
  created_at: "2024-01-01T10:00:00.000Z",
  updated_at: "2025-07-01T12:00:00.000Z",
  deleted_at: null,
  _version: 3,
  isLocked: false,
  gender: "male",
  certificates: [
    {
      title: "Certified AI Expert",
      organization: "AI Institute",
      issueDate: "2023-08-10",
      expirationDate: "2026-08-10",
      credentialId: "AIX-123456",
      credentialUrl: "https://certs.ai.org/AIX-123456",
    },
  ],
  experience: 10,
  reviews: "55K",
  rating: 4.8,
  students: 350,

  // Instructor-specific fields
  departmentId: "dept-cs",
  department: "Computer Science",
  specializationId: "spec-ai",
  specialization: "Artificial Intelligence",
  academicRankId: "rank-prof",
  academicRank: "Professor",
  officeLocation: "Building A, Room 302",
  officeHours: "Sunday & Tuesday 10:00 AM - 12:00 PM",
  website: "https://drmohamed.com",
  coursesTaught: ["AI Basics", "Machine Learning", "Deep Learning"],
  researchInterests: ["Neural Networks", "NLP", "Computer Vision"],
  publications: ["AI Journal 2023", "ML Conference 2022"],
  totalYearsExperience: 15,
  categoryId: "dept-cs", // alias
  category: "Computer Science",
  specialityId: "spec-ai", // alias
  speciality: "Artificial Intelligence",
  careerLevelId: "rank-prof", // alias
  careerLevel: "Professor",
};

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <main>
      <div className="grid lg:grid-cols-9 gap-3 mb-3">
        <div className="lg:col-span-6 p-4 border border-gray-200 rounded-xl shadow-sm ">
          <div className="flex flex-col flex-wrap lg:flex-row items-center lg:items-start gap-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center flex-1">
              <Image
                className="w-[150px] h-[150px] rounded-full object-cover"
                src={dummyInstructor.avatar ?? "/images/placeholder-avatar.svg"}
                alt={dummyInstructor.firstName ?? "user"}
                width={400}
                height={400}
              />
              <div className="flex-1 h-full flex flex-col items-center lg:items-start justify-center">
                <div className="flex w-full justify-center lg:justify-between">
                  <div>
                    <h2 className="font-bold text-xl">
                      {dummyInstructor.firstName} {dummyInstructor.lastName}
                    </h2>
                    <p className="text-muted-foreground">
                      {dummyInstructor.specialization}
                    </p>
                  </div>
                  <div className="hidden lg:flex gap-2 items-start h-full">
                    <button className="px-2 flex items-center gap-2 text-gray-700 py-2 shadow-sm text-xs border border-gray-200 rounded-lg">
                      <SquarePen size={15} /> Edit
                    </button>
                    <Link
                      href={"/in/${id}"}
                      className="px-2 flex items-center gap-2 text-gray-700 py-2 shadow-sm text-xs border border-gray-200 rounded-lg"
                    >
                      <Eye size={15} /> View Profile
                    </Link>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row  flex-wrap  items-center lg:items-start gap-4 mt-4">
                  <div className="flex flex-col lg:items-start items-center">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Department
                    </span>
                    <h3 className="text-sm font-semibold ">
                      {dummyInstructor.department}
                    </h3>
                  </div>
                  <div className="flex flex-col lg:items-start items-center">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Type
                    </span>
                    <h3 className="text-sm font-semibold ">
                      {dummyInstructor.type}
                    </h3>
                  </div>
                  <div className="flex flex-col lg:items-start items-center">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Specialization
                    </span>
                    <h3 className="text-sm font-semibold ">
                      {dummyInstructor.specialization}
                    </h3>
                  </div>
                  <div className="flex flex-col lg:items-start items-center">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Date
                    </span>
                    <h3 className="text-sm font-semibold ">
                      {formatterDate(dummyInstructor.created_at)}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex lg:hidden gap-2 items-start h-full">
              <button className="px-3 flex items-center gap-2 text-gray-700 py-2 shadow-sm text-sm border border-gray-200 rounded-lg">
                <SquarePen size={15} /> Edit
              </button>
              <Link
                href={"/in/${id}"}
                className="px-3 flex items-center gap-2 text-gray-700 py-2 shadow-sm text-sm border border-gray-200 rounded-lg"
              >
                <Eye size={15} /> View Profile
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <WalletCard balance={16200.62} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-3 mb-4">
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#E4F8FFE5] text-[#55BEE6]">
            <UsersRound size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Students</span>
            <h1 className="font-bold">1,245</h1>
            <span className="block text-xs text-primary">
              +12% from last month
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#F3E8FF] text-[#AD46FF]">
            <Package size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Courses</span>
            <h1 className="font-bold">5,678</h1>
            <span className="block text-xs text-primary">
              +15% from last month
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
          <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#DCFCE7] text-[#008236]">
            <DollarSign size={20} />
          </div>
          <div>
            <span className="block text-sm">Total Revenue</span>
            <h1 className="font-bold">12,450</h1>
            <span className="block text-xs text-primary">
              +8% from last month
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-9 gap-3 justify-start mb-3 ">
        <div className="lg:col-span-6">
          {/* Earnings Chart  */}
          <div className="border border-gray-200 p-4 shadow-sm bg-white rounded-lg grid grid-cols-1 flex-1 overflow-hidden ">
            <DynamicStatisticsChart
              data={dummyRevenueData}
              metrics={[
                {
                  key: "revenue",
                  label: "Revenue",
                  icon: <ShoppingCart size={20} />,
                  color: "#2BA149",
                },
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
              chartTitle="Platform Revenue Overview"
            />{" "}
          </div>
          {/* Students Table Content */}
          <div className="hidden lg:block border mt-4 border-gray-200 p-4 shadow-sm bg-white rounded-lg">
            <TransactionsTable />
          </div>
        </div>
        <div className="lg:col-span-3">
          <div>
            <div className="p-4 shadow-sm border border-gray-200 rounded-lg">
              <Calendar
                events={events}
                onDateSelect={setSelectedDate}
                selectedDate={selectedDate}
              />
              <EventList events={events} selectedDate={selectedDate} />
            </div>
          </div>
          {/* Today student List   */}
          <div className="mt-4">
            <EnrollmentsStudentsTable />
          </div>
        </div>
        {/* Students Table Content */}
        <div className="block lg:hidden border mt-4 border-gray-200 p-4 shadow-sm bg-white rounded-lg">
          <TransactionsTable />
        </div>
      </div>
    </main>
  );
};
export default Dashboard;
