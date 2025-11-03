"use client";
import DynamicTable from "@/components/UI/tables/DTable";
import { Download, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Instructor = {
  id: string;
  name: string;
  avatar: string;
};

type Plan = {
  id: string;
  plan: string;
  instructors: Instructor[];
  orders: number;
  revenue: number;
  status: string;
  view_url: string;
  download_url: string;
};

export const dummyPlans: Plan[] = [
  {
    id: "1",
    plan: "Basic",
    instructors: [
      {
        id: "inst-001",
        name: "Dr. Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      },
      {
        id: "inst-002",
        name: "Prof. Ali Hassan",
        avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      },
    ],
    orders: 120,
    revenue: 2400,
    status: "Active",
    view_url: "/view/1",
    download_url: "/download",
  },
  {
    id: "2",
    plan: "Standard",
    instructors: [
      {
        id: "inst-003",
        name: "Dr. Mary Lee",
        avatar: "https://randomuser.me/api/portraits/women/40.jpg",
      },
      {
        id: "inst-004",
        name: "Dr. Samuel Green",
        avatar: "https://randomuser.me/api/portraits/men/60.jpg",
      },
      {
        id: "inst-005",
        name: "Dr. Linda Perez",
        avatar: "https://randomuser.me/api/portraits/women/61.jpg",
      },
    ],
    orders: 200,
    revenue: 4800,
    status: "Active",
    view_url: "/view/1",
    download_url: "/download",
  },
  {
    id: "3",
    plan: "Premium",
    instructors: [
      {
        id: "inst-006",
        name: "Dr. Thomas Blake",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
      },
    ],
    orders: 50,
    revenue: 5000,
    status: "Paused",
    view_url: "/view/1",
    download_url: "/download",
  },
  {
    id: "4",
    plan: "Enterprise",
    instructors: [
      {
        id: "inst-003",
        name: "Dr. Mary Lee",
        avatar: "https://randomuser.me/api/portraits/women/40.jpg",
      },
      {
        id: "inst-004",
        name: "Dr. Samuel Green",
        avatar: "https://randomuser.me/api/portraits/men/60.jpg",
      },
    ],
    orders: 0,
    revenue: 0,
    status: "Inactive",
    view_url: "/view/1",
    download_url: "/download",
  },
];

const columns = [
  { key: "id", header: "ID", sortable: true },
  {
    key: "plan",
    header: "Plan",
  },
  {
    key: "instructors",
    header: "Instructors",
    render: (plan: Plan) => (
      <ul className="flex items-center gap-2">
        {plan.instructors.slice(0, 4).map((instructor) => (
          <li key={instructor.id}>
            <Image
              className="w-8 h-8 rounded-full object-cover"
              src={instructor.avatar} // assuming avatar is an array
              width={32}
              height={32}
              alt={instructor.name}
            />
          </li>
        ))}
        {plan.instructors.length > 4 && (
          <li className="w-8 h-8 rounded-full bg-gray-200 text-xs flex items-center justify-center text-gray-700">
            +{plan.instructors.length - 4}
          </li>
        )}
      </ul>
    ),
  },
  { key: "orders", header: "Orders" },
  {
    key: "revenue",
    header: "Revenue",
    sortable: true,
    render: (plan: Plan) => {
      return <span>{plan.revenue}EGP</span>;
    },
  },
  {
    key: "status",
    header: "Status",
    render: (plan: Plan) => {
      return (
        <span
          className={`px-4 py-1 rounded-full text-xs ${
            plan.status.toLowerCase() === "active"
              ? "text-green-600 bg-green-100"
              : "text-red-600 bg-red-100"
          }`}
        >
          {plan.status}
        </span>
      );
    },
  },
  {
    key: "view_url",
    header: "View",
    render: (plan: Plan) => (
      <Link
        href={plan.view_url}
        className="flex justify-center text-green-600 hover:text-green-800 hover:underline"
      >
        <Eye size={20} />
      </Link>
    ),
  },
  {
    key: "download_url",
    header: "Download",
    render: (plan: Plan) => (
      <Link
        href={plan.download_url}
        className="flex justify-center text-gray-600 hover:text-gray-800 hover:underline"
      >
        <Download size={20} />
      </Link>
    ),
  },
];

export default function PlansPanel() {
  return (
    <div>
      <div className="p-3 border rounded-xl shadow-sm mb-4">
        <h2 className="text-xl font-semibold">
          All Plan ({dummyPlans.length})
        </h2>
      </div>
      <div className="p-3 border rounded-xl shadow-sm ">
        <DynamicTable
          selectable={true}
          columns={columns}
          data={dummyPlans}
          pagination
        />
      </div>
    </div>
  );
}
