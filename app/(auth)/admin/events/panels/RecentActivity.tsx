"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/UI/card";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import {
  History,
  CheckCircle2,
  XCircle,
  RefreshCcw,
  Edit,
  Trash2,
} from "lucide-react";

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  icon: "check" | "reject" | "refund";
}

const activities: Activity[] = [
  {
    id: 1,
    user: "Admin John Doe",
    action: "approved",
    target: 'request for Invoice ID: "INV1004"',
    time: "05:30 PM",
    icon: "check",
  },
  {
    id: 2,
    user: "Admin Sarah Smith",
    action: "rejected",
    target: 'Invoice ID: "INV1005"',
    time: "04:10 PM",
    icon: "reject",
  },
  {
    id: 3,
    user: "Admin Michael Lee",
    action: "reviewed a refund request",
    target: 'Invoice ID: "INV1006"',
    time: "02:45 PM",
    icon: "refund",
  },
];

function getIcon(type: Activity["icon"]) {
  switch (type) {
    case "check":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case "reject":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "refund":
      return <RefreshCcw className="h-4 w-4 text-blue-500" />;
    default:
      return <History className="h-4 w-4 text-gray-400" />;
  }
}

export default function RecentActivity() {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold text-gray-800">
          Recent Activity
        </CardTitle>
        <OptionsDropdown
          actions={[
            {
              label: "Edit",
              icon: <Edit size={16} />,
              onClick: () => alert("Editing item..."),
            },
            {
              label: "Delete",
              icon: <Trash2 size={16} />,
              danger: true,
              onClick: () => alert("Deleted!"),
            },
          ]}
        />
      </CardHeader>

      <CardContent className="divide-y divide-gray-100">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 py-3">
            <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-50">
              {getIcon(activity.icon)}
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-700">
                <span className="font-medium">{activity.user}</span>{" "}
                {activity.action} <span>{activity.target}</span>
              </p>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
