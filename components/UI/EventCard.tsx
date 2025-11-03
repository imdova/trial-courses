"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardFooter } from "./card";
import Link from "next/link";
import { EventType } from "@/types/courses";
import { UserAvatar } from "./Avatar";

interface EventCardProps {
  event: EventType;
  isView?: boolean;
}

export default function EventCard({ event, isView = false }: EventCardProps) {
  return (
    <Card
      className={`overflow-hidden rounded-lg border bg-white py-0 shadow-sm ${isView && "border-primary"}`}
    >
      {/* Image with category badge */}
      <div className="relative h-40 w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <span className="text-primary absolute top-2 left-2 rounded-lg bg-white/90 px-2 py-1 text-xs font-medium">
          {event.category}
        </span>
      </div>

      {/* Card content */}
      <CardContent className="space-y-2 px-2 pt-3">
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
          {event.title}
        </h3>
        <p className="text-xs text-gray-500">{event.location}</p>
        <div className="flex items-center gap-2">
          <UserAvatar src={event.organizer.logo} size={30} />
          <span className="text-xs text-gray-600">{event.organizer.name}</span>
        </div>
      </CardContent>

      {/* Footer (date + price) */}
      <CardFooter className="flex items-center justify-between p-2">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar size={14} />
          <span>{event.date}</span>
        </div>
        {isView ? (
          <Link
            className="bg-primary rounded-lg px-3 py-2 text-sm text-white"
            href={"#"}
          >
            View Details
          </Link>
        ) : (
          <span className="text-primary font-semibold">${event.price}</span>
        )}
      </CardFooter>
    </Card>
  );
}
