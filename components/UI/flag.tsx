"use client";
import { cn } from "@/util";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

interface FlagProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> {
  code: string;
  name: string;
}

const Flag: React.FC<FlagProps> = ({
  code,
  name,
  width = 16,
  height = 12,
  className = "object-contain",
}) => {
  return (
    <Avatar
      className={cn(
        "inline-block aspect-video size-auto rounded",
        className,
      )}
      style={{ width, height }}
    >
      <AvatarImage
        src={`https://flagcdn.com/${code.toLowerCase()}.svg`}
        alt={name}
      />
      <AvatarFallback className="bg-primary/20 rounded">
        {name.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default Flag;
