import Image from "next/image";
import { useState } from "react";

// Helper function to get initials
const getInitials = (name: string) => {
  const names = name.trim().split(" ");
  if (names.length >= 2) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export const InstructorAvatar = ({ name, imageUrl }: { name: string; imageUrl: string }) => {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);

  if (!imageUrl || imageError) {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600">
        <span className="text-xs font-bold text-white">{initials}</span>
      </div>
    );
  }

  return (
    <Image
      className="h-8 w-8 rounded-full object-cover"
      src={imageUrl}
      alt={name}
      width={32}
      height={32}
      onError={() => setImageError(true)}
    />
  );
};
