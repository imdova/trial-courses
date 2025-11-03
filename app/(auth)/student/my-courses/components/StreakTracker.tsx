import { Flame, CheckCircle, FileText } from "lucide-react";

// Dummy data structure
type StreakData = {
  currentStreak: number;
  recordStreak: number;
  days: {
    id: number;
    name: string;
    active: boolean;
  }[];
  stats: {
    classesCovered: number;
    assignmentsCompleted: number;
  };
};

// Sample dummy data
const dummyData: StreakData = {
  currentStreak: 5,
  recordStreak: 16,
  days: [
    { id: 1, name: "Sun", active: true },
    { id: 2, name: "Mon", active: true },
    { id: 3, name: "Tue", active: true },
    { id: 4, name: "Wed", active: true },
    { id: 5, name: "Thu", active: true },
    { id: 6, name: "Fri", active: false },
    { id: 7, name: "Sat", active: false },
  ],
  stats: {
    classesCovered: 6,
    assignmentsCompleted: 4,
  },
};

const StreakTracker = () => {
  const { currentStreak, recordStreak, days, stats } = dummyData;

  return (
    <div className="p-6 border border-gray-200 shadow-sm rounded-xl">
      {/* Streak header */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-lg font-bold">
            {currentStreak} days without a break
          </span>
        </div>
        <span className="text-sm text-gray-500">
          The record is {recordStreak} days without a break
        </span>
      </div>

      {/* Day indicators with flame icons */}
      <div className="flex justify-between mb-2">
        {days.map((day) => (
          <div key={day.id} className="flex flex-col items-center gap-1">
            <Flame
              className={`w-6 h-6 ${
                day.active ? "text-orange-500" : "text-gray-200"
              }`}
            />
            <span className="text-xs text-gray-500">{day.name}</span>
          </div>
        ))}
      </div>

      {/* Stats summary */}
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mt-6">
        <span className="flex items-center text-sm text-muted-foreground">
          <CheckCircle className="w-4 h-4 mr-1.5 text-green-500" />
          {stats.classesCovered} classes covered
        </span>
        <span className="flex items-center text-sm text-muted-foreground">
          <FileText className="w-4 h-4 mr-1.5 text-blue-500" />
          {stats.assignmentsCompleted} assignment completed
        </span>
      </div>
    </div>
  );
};

export default StreakTracker;
