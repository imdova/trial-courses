"use client";
import EventCard from "@/components/UI/EventCard";
import { EventType } from "@/types/courses";

interface EventViewProps {
  events: EventType[];
}

export default function EventView({ events }: EventViewProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-4">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  );
}
