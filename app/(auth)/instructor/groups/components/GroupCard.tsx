import OptionsDropdown, {
  DropdownAction,
} from "@/components/UI/OptionsDropdown";
import { Edit, Eye, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface GroupCardProps {
  group: {
    id: string;
    name: string;
    instructorCount: number;
    studentCount: number;
    instructors: {
      id: string;
      name: string;
      avatar?: string;
    }[];
    topStudents: {
      id: string;
      name: string;
      avatar?: string;
    }[];
    course?: {
      id: string;
      title: string;
      image: string;
    };
  };
}

const actions: DropdownAction[] = [
  {
    label: "View",
    icon: <Eye className="w-4 h-4" />,
    onClick: () => console.log("View clicked"),
  },
  {
    label: "Edit",
    icon: <Edit className="w-4 h-4" />,
    onClick: () => console.log("Edit clicked"),
  },
  {
    label: "Delete",
    icon: <Trash className="w-4 h-4" />,
    onClick: () => console.log("Delete clicked"),
    danger: true,
  },
];

const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between p-4 ">
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900">{group.name}</h3>
          <div>
            <p className="text-xs text-muted-foreground">Course Name</p>
            <h2 className="text-xs font-semibold">{group.course?.title}</h2>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="flex text-xs">
              {group.instructorCount} instructor
              {group.instructorCount !== 1 ? "s" : ""}
            </span>
            <span className="mx-2">•</span>
            <span className="text-xs">
              {group.studentCount} Student{group.studentCount !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="border-gray-200 border-none p-2 sm:px-6 sm:border-r">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Instructors
            </h4>
            <div className="flex -space-x-2">
              {group.instructors.slice(0, 5).map((instructor) => (
                <Link
                  href={"#"}
                  key={instructor.id}
                  className="group relative rounded-full"
                >
                  {instructor.avatar ? (
                    <Image
                      src={instructor.avatar}
                      alt={instructor.name}
                      width={24}
                      height={24}
                      className="rounded-full h-8 w-8 object-cover shadow-md"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      {instructor.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute top-full left-0 text-xs p-1 rounded-md text-center bg-black/50 min-w-[120px] text-white opacity-0 group-hover:opacity-100 transition">
                    {instructor.name}
                  </span>
                </Link>
              ))}
              {group.instructors.length > 5 && (
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shadow-md">
                    +{group.instructors.length - 5}
                  </div>
                  <span className="absolute top-full left-0 text-xs p-1 rounded-md text-center bg-black/50 min-w-[120px] text-white opacity-0 group-hover:opacity-100 transition">
                    {group.instructors.length - 5} more instructors
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-2 sm:px-6">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Top Students
            </h4>
            <div className="flex -space-x-2">
              {group.topStudents.slice(0, 5).map((student) => (
                <Link
                  href={"#"}
                  key={student.id}
                  className="group relative flex items-center rounded-full"
                >
                  {student.avatar ? (
                    <Image
                      src={student.avatar}
                      alt={student.name}
                      width={24}
                      height={24}
                      className="rounded-full h-8 w-8 object-cover shadow-md"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      {student.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute top-full left-0 text-xs p-1 rounded-md text-center bg-black/50 min-w-[120px] text-white opacity-0 group-hover:opacity-100 transition">
                    {student.name}
                  </span>
                </Link>
              ))}
              {group.topStudents.length > 5 && (
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shadow-md">
                    +{group.topStudents.length - 5}
                  </div>
                  <span className="absolute top-full left-0 text-xs p-1 rounded-md text-center bg-black/50 min-w-[120px] text-white opacity-0 group-hover:opacity-100 transition">
                    {group.topStudents.length - 5} more students
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <OptionsDropdown actions={actions} />
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
