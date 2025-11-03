"use client";
import Calendar from "@/components/calendar/Calendar";
import EventList from "@/components/calendar/EventList";
import { Card } from "@/components/UI/card";
import PopularEventsDashboard from "@/components/UI/Charts/PopularEventsDashboard";
import SalesRevenueDashboard from "@/components/UI/Charts/SalesRevenueDashboard";
import TicketSalesDashboard from "@/components/UI/Charts/TicketSalesDashboard";
import EventCard from "@/components/UI/EventCard";
import StatCardItem from "@/components/UI/StatCardItem";
import RecentBookings from "@/components/UI/tables/RecentBookings";
import { eventsData } from "@/constants/events.data";
import { events } from "@/constants/events.data";
import { CalendarIcon, CheckCircle, Edit, Ticket, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import RecentActivity from "./RecentActivity";
import OptionsDropdown from "@/components/UI/OptionsDropdown";

const stats = [
  {
    id: 1,
    title: "Upcoming Events",
    icon: <CalendarIcon size={20} />,
    value: "345",
    bgColor: "#E4F8FFE5",
    textColor: "#55BEE6",
  },
  {
    id: 2,
    title: "Total Bookings",
    icon: <CheckCircle size={20} />,
    value: "150",
    bgColor: "#E4F8FFE5",
    textColor: "#55BEE6",
  },
  {
    id: 3,
    title: "Tickets Solid Revenue",
    icon: <Ticket size={20} />,
    value: "200",
    bgColor: "#DCFCE7",
    textColor: "#008236",
  },
];
const OverviewEvent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      <div className="grid gap-2 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {stats.map((stat) => (
              <StatCardItem key={stat.id} {...stat} />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-8">
            <Card className="col-span-3">
              <TicketSalesDashboard />
            </Card>
            <div className="col-span-5 space-y-4">
              <Card className="h-fit py-0">
                <SalesRevenueDashboard />
              </Card>
              <Card className="h-fit py-0">
                <PopularEventsDashboard />
              </Card>
            </div>
          </div>
          <div className="space-y-4 py-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="px-2 text-lg font-semibold">All Events</h2>
              <Link
                href={"#"}
                className="bg-primary-foreground cu text-primary rounded-lg px-3 py-2 text-sm"
              >
                View All Events
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {eventsData.map((event) => {
                return <EventCard key={event.id} event={event} />;
              })}
            </div>
            <Card>
              <RecentBookings />
            </Card>
          </div>
        </div>
        <div className="space-y-4 xl:col-span-4">
          <Card className="p-3">
            <div className="flex items-center justify-between">
              <h2 className="px-2 text-lg font-semibold">Upcoming Events</h2>
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
            </div>
            <EventCard event={eventsData[0]} isView />
          </Card>
          <Card className="p-3">
            <Calendar
              events={events}
              onDateSelect={setSelectedDate}
              selectedDate={selectedDate}
            />
            <EventList events={events} selectedDate={selectedDate} />
          </Card>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default OverviewEvent;
