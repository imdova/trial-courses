"use client";

import { MapPin } from "lucide-react";
import Image from "next/image";

interface ProgressAvatarProps {
  name: string;
  email: string;
  location: string;
  imageUrl: string;
  progress: number;
}

const ProgressAvatar: React.FC<ProgressAvatarProps> = ({
  name,
  email,
  location,
  imageUrl,
  progress,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-4 h-24 w-24">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#e5e7eb"
            strokeWidth="5"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#22c55e"
            strokeWidth="5"
            fill="none"
            strokeDasharray="283"
            strokeDashoffset={283 - (progress / 100) * 283}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full border-2 border-white object-cover"
          />
        </div>
      </div>
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <p className="text-sm text-gray-500">{email}</p>
      <div className="mt-2 flex items-center text-gray-500">
        <span className="text-green-500">
          <MapPin />
        </span>
        <span className="ml-1 text-sm">{location}</span>
      </div>
    </div>
  );
};

export default ProgressAvatar;
