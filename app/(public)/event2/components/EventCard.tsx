"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

type EventType = {
  id: string | number;
  title: string;
  image: string;
  topic: string;
  location: string;
  time: string;
  description: string;
  author: string;
  authorRole: string;
  price: number;
};

interface EventCardProps extends EventType {
  onBuy?: (eventId: string | number) => void;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  image,
  topic,
  location,
  time,
  description,
  author,
  authorRole,
  onBuy,
}) => {
  return (
    <div
      key={id}
      className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:flex-row"
    >
      {/* Left Banner */}
      <div className="relative h-[300px] w-full shrink-0 bg-white p-3 md:h-auto md:w-1/4">
        <Image
          src={image}
          width={500}
          height={500}
          alt={title}
          className="h-full w-full rounded-2xl object-fill"
        />
        <div className="absolute bottom-4 left-4">
          <span className="text-primary rounded-full bg-white/90 px-3 py-1 text-xs font-semibold">
            {topic}
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-slate-800">
            {title}
          </h3>

          {/* Location */}
          <div className="mb-2 flex items-center text-slate-500">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">{location}</span>
          </div>

          {/* Time */}
          <div className="mb-4 flex items-center text-slate-500">
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">{time}</span>
          </div>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {description}
          </p>
        </div>

        {/* Footer: Author & Price */}
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="mr-4 border-r border-gray-200 pr-4">
            <p className="font-semibold text-slate-800">{author}</p>
            <p className="text-sm text-slate-500">{authorRole}</p>
          </div>
          {/* Button */}
          <button
            onClick={() => onBuy?.(id)}
            className="bg-secondary flex w-fit cursor-pointer items-center justify-center rounded-lg px-3 py-1 text-sm font-medium text-white transition-colors duration-300"
          >
            BUY TICKET
            <ArrowRight size={15} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
