"use client";
import {
  BriefcaseBusiness,
  CreditCard,
  DollarSign,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import PlansList from "../lists/PlansList";
import StatusCardTwo from "@/components/UI/StatusCardTwo";

const statusCards: StatusCardType[] = [
  {
    title: "Total Plans",
    value: "4",
    icon: (
      <BriefcaseBusiness className="block h-11 w-11 rounded-full bg-blue-100 p-2 text-blue-800" />
    ),
  },
  {
    title: "Active Plans",
    value: "3",
    icon: (
      <ShieldCheck className="bg-primary-100 text-primary block h-11 w-11 rounded-full p-2" />
    ),
  },
  {
    title: "Total Subscriptions",
    trend: {
      value: "20%",
      trendDirection: "up",
    },
    value: "100",
    icon: (
      <CreditCard className="block h-11 w-11 rounded-full bg-green-100 p-2 text-green-800" />
    ),
  },
  {
    title: "Active Subscribers",
    trend: {
      value: "20%",
      trendDirection: "up",
    },
    value: "60",
    icon: (
      <UserCheck className="block h-11 w-11 rounded-full bg-purple-100 p-2 text-purple-800" />
    ),
  },
  {
    title: "Revenue",
    value: "100$",
    trend: {
      value: "15%",
      trendDirection: "up",
    },
    icon: (
      <DollarSign className="block h-11 w-11 rounded-full bg-green-100 p-2 text-green-800" />
    ),
  },
];

const PlansOverView: React.FC = () => {
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
        {statusCards.map((card) => (
          <StatusCardTwo key={card.title} {...card} />
        ))}
      </div>
      <PlansList />
    </div>
  );
};
export default PlansOverView;
