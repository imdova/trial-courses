"use client";
import {
  BookOpen,
  CircleArrowUp,
  GraduationCap,
  MessageCircle,
  Users,
  Video,
} from "lucide-react";
import ChartEarnings from "./components/Charts/ChartEarnings";
import CircularProgress from "./components/CircularProgress";
import CurrentStudentTable from "./components/tables/CurrentStudentTable";
import WeeklySalesTable from "./components/tables/WeeklySalesTable";
import StatusCard from "@/components/UI/StatusCard";
import {
  List,
  ListActions,
  ListFooter,
  ListHeader,
  ListItem,
  ListItems,
} from "@/components/UI/DynamicList";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";
import { useAdminCoursesOverview } from "@/hooks/useAdminCoursesOverview";
import Loading from "@/components/loading/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";

export default function Dashboard() {
  const { dashboardData, loading } = useAdminDashboard();
  const { weeklySales } = useAdminCoursesOverview(true);

  if (loading || !dashboardData) {
    return <Loading />;
  }

  const cardsData = [
    {
      title: "Total Students",
      value: dashboardData.students.total,
      icon: <GraduationCap size={24} />,
      color: "bg-[#2EAE7D]",
      change: dashboardData.students.yearOverYearChange,
      changeText: "than last year",
    },
    {
      title: "New Students",
      value: dashboardData.newStudents.newThisMonth,
      icon: <Users size={24} />,
      color: "bg-[#6D6C80]",
      change: dashboardData.newStudents.monthOverMonthChange,
      changeText: "than last month",
    },
    {
      title: "Total Courses",
      value: dashboardData.courses.totalActive,
      icon: <BookOpen size={24} />,
      color: "bg-[#2BA149]",
      change: dashboardData.courses.newThisMonth,
      changeText: "new courses this month",
    },
  ];

  return (
    <div className="grid grid-cols-1 p-3">
      <div className="mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {cardsData.map((card, index) => (
          <StatusCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            change={card.change}
            changeText={card.changeText}
            isLoading={loading}
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 lg:grid-cols-8 xl:grid-cols-13">
        <div className="overflow-hidden lg:col-span-5 xl:col-span-9">
          <div className="mb-4 flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-3 xl:flex-row">
            <div className="w-[140px] p-4">
              <h2 className="mb-3 text-xl font-bold">Earnings</h2>
              <span className="text-muted-foreground mb-6 block text-sm">
                Dec 1 - Dec 31,2021
              </span>
              <span className="block">This Month</span>
              <h1 className="text-2xl font-bold">$53.668</h1>
              <div className="text-primary mt-2 flex items-center justify-start">
                <CircleArrowUp size={15} />
                <span>+15%</span>
              </div>
            </div>
            <ChartEarnings labelX={"Earn"} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-3 flex items-center sm:col-span-1 lg:col-span-3 xl:col-span-1">
              <div className="flex h-full w-full flex-col justify-between">
                <h2 className="mb-2 p-3 text-xl font-bold">Courses Stats</h2>
                <div className="h-full w-full rounded-md border border-gray-200 bg-white p-3">
                  <CircularProgress />
                </div>
              </div>
            </div>
            <div className="col-span-3 sm:col-span-2 lg:col-span-3 xl:col-span-2">
              <div className="flex h-full w-full flex-col justify-between">
                <h2 className="mb-2 p-3 text-xl font-bold">
                  Weekly Sales Stats
                </h2>
                <div className="h-full rounded-md border border-gray-200 bg-white p-3">
                  <WeeklySalesTable weeklySales={weeklySales} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <List className="lg:col-span-3 xl:col-span-4">
          <ListHeader title="Top Instructors" />
          <ListItems>
            {dashboardData.topInstructors.map((instructor) => (
              <ListItem key={instructor.id}>
                <div className="flex items-center justify-between rounded-xl border border-transparent bg-gray-50 p-3 transition-all hover:border-gray-200 hover:bg-gray-100 hover:shadow-sm">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src={instructor.photoUrl || undefined} 
                        alt={instructor.name}
                      />
                      <AvatarFallback className="bg-purple-100 text-purple-700">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-gray-900">
                        {instructor.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {instructor.totalCourses} {instructor.totalCourses === 1 ? 'course' : 'courses'}
                        {instructor.averageRating > 0 && (
                          <span className="ml-2 text-amber-600">
                            ★ {instructor.averageRating.toFixed(1)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ListActions>
                    <button
                      title="Watch Videos"
                      className="hover:bg-primary/10 hover:text-primary rounded-full p-2 text-gray-500 transition"
                    >
                      <Video size={16} />
                    </button>
                    <button
                      title="Send Message"
                      className="hover:bg-primary/10 hover:text-primary rounded-full p-2 text-gray-500 transition"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </ListActions>
                </div>
              </ListItem>
            ))}
          </ListItems>
          <ListFooter label="See All Instructors" href="/admin/instructors-team" />
        </List>
      </div>
      <div className="rounded-md border border-gray-200 bg-white p-3">
        <CurrentStudentTable />
      </div>
    </div>
  );
}
