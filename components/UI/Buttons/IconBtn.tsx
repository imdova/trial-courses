import { cn } from "@/util";
import React from "react";

type IconBtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  width?: number;
};

const IconBtn: React.FC<IconBtnProps> = ({
  children,
  width,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      style={{ width: width }}
      className={cn(
        "flex text-white transition-all duration-300 hover:bg-black hover:text-white justify-between items-center rounded-full w-full bg-primary py-2 px-4",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconBtn;
