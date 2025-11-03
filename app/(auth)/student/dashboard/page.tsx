import { Book, Clock, Star, Users } from "lucide-react";
// import StudentCard from "./components/StudentCard";
import { ProgressNumberCard } from "./components/ProgressNumberCard";
import ActiveHoursChart from "./components/ActiveHoursChart";
import PerformanceChart from "./components/PerformanceChart";
import StudentTransactionsTable from "./components/StudentTransactionsTable";
import CalendarCard from "./components/CalendarCard";
import UpcomingEvents from "./components/UpcomingEvents";
import LearningPlan from "./components/LearningPlan";

export default function DashboardPage() {
  return (
    <div className="px-4">
      {/* <StudentCard
        id="2021-0001"
        name="Caleb White"
        avatar="https://img.freepik.com/free-photo/portrait-young-businesswoman-holding-eyeglasses-hand-against-gray-backdrop_23-2148029483.jpg?t=st=1754567223~exp=1754570823~hmac=19f20251bb2b98d247b1c08e580f382ac2d20d6a761476841ddd405ab113512b&w=1480"
        phone="(555) 123-4567"
        email="caleb.white@gmail.com"
        address="123 Elm Street"
        totalAttendance={13}
        lifeAttendance={7}
        undertimeAttendance={1}
        totalAnswer={2}
      /> */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-4 mt-4">
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <ProgressNumberCard
              value={18}
              progressValue={65}
              title="Course in progress"
              icon={<Users className="h-4 w-4" />}
              color="orange"
              size="lg"
            />
            <ProgressNumberCard
              value={23}
              progressValue={82}
              title="Course Completed"
              icon={<Book className="h-4 w-4" />}
              color="green"
              size="lg"
            />
            <ProgressNumberCard
              value={15}
              progressValue={45}
              title="Cretificates Earned"
              icon={<Clock className="h-4 w-4" />}
              color="blue"
              size="lg"
            />
            <ProgressNumberCard
              value={87}
              progressValue={93}
              title="Community support"
              icon={<Star className="h-4 w-4" />}
              color="purple"
              size="lg"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-4">
            <div className="md:col-span-3 overflow-hidden">
              <ActiveHoursChart />
            </div>
            <div className="md:col-span-2 overflow-hidden">
              <PerformanceChart />
            </div>
          </div>
          <StudentTransactionsTable />
        </div>
        <div className="lg:col-span-3">
          <LearningPlan />
          <CalendarCard />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
