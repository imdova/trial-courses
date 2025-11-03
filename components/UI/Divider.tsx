import { cn } from "@/util";

interface DividerProps {
  text?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ text, className }) => {
  if (!text) {
    return <div className={cn("w-full h-px bg-gray-300 my-4", className)} />;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4 text-gray-500 text-sm my-4",
        className
      )}
    >
      <div className="h-px flex-1 bg-gray-300" />
      <span>{text}</span>
      <div className="h-px flex-1 bg-gray-300" />
    </div>
  );
};

export default Divider;
