import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

type IconBtnProps = {
  children: React.ReactNode;
  className?: string;
  link: string;
};

const AddBtn: React.FC<IconBtnProps> = ({ children, className, link }) => {
  return (
    <Link
      href={link}
      className={`flex justify-center gap-2 ${className} h-fit text-white text-sm transition-all duration-300 hover:bg-black hover:text-white items-center rounded-md w-full bg-primary py-2 px-4`}
    >
      <Plus size={18} />
      {children}
    </Link>
  );
};

export default AddBtn;
