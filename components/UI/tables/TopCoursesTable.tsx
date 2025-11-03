import { Star } from "lucide-react";

interface Course {
  name: string;
  enrollments: number;
  revenue: string;
  rating: number;
}

const courses: Course[] = [
  { name: "Advanced React", enrollments: 245, revenue: "$8,2k", rating: 4.8 },
  {
    name: "Node.js Masterclass",
    enrollments: 189,
    revenue: "$6,8k",
    rating: 4.7,
  },
  {
    name: "JavaScript Basics",
    enrollments: 312,
    revenue: "$4,6k",
    rating: 4.6,
  },
  {
    name: "Python for Beginners",
    enrollments: 287,
    revenue: "$2,8k",
    rating: 4.8,
  },
  { name: "Advanced React", enrollments: 245, revenue: "$8,2k", rating: 4.8 },
];

export default function TopCoursesTable() {
  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Top Courses</h2>
        <p className="text-sm text-gray-500">Your best performing courses</p>
      </div>

      <div className="overflow-x-auto max-h-[350px]">
        <table className="min-w-full text-sm text-left  overflow-y-auto">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="p-3 font-medium text-sm">Course</th>
              <th className="p-3 font-medium text-sm">Enrollments</th>
              <th className="p-3 font-medium text-sm">Revenue</th>
              <th className="p-3 font-medium text-sm">Rating</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-3 text-sm text-gray-800">{course.name}</td>
                <td className="p-3 text-gray-600">{course.enrollments}</td>
                <td className="p-3 text-gray-600  font-semibold">
                  {course.revenue}
                </td>
                <td className="p-3 text-gray-600 flex items-center gap-1 font-semibold">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  {course.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
