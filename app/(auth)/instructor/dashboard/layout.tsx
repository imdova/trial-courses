import SettingsNavigation from "@/components/UI/SettingsNavigation";
import { OptionTab } from "@/types";
import { File, LayoutList, Users } from "lucide-react";

const tabs: OptionTab[] = [
  {
    label: "Over View",
    icon: <LayoutList className="h-5 w-5" />,
    value: "/instructor/dashboard",
  },
  {
    label: "Courses List",
    icon: <File className="h-5 w-5" />,
    value: "/instructor/dashboard/courses-list",
  },
  {
    label: "Students List",
    icon: <Users className="h-5 w-5" />,
    value: "/instructor/dashboard/students-list",
  },
];

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 space-y-3 md:px-5">
      <SettingsNavigation tabs={tabs} />
      {/* Tab Panels */}
      {children}
    </div>
  );
};

export default layout;
