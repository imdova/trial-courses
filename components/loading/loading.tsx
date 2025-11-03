import { cn } from "@/util";
import { Spinner } from "../UI/spinner";

const Loading: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex h-screen items-center justify-center", className)}>
      <Spinner className="size-10" />
      <h6 className="ml-4">Loading...</h6>
    </div>
  );
};

export const IconSkeleton = () => {
  return <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300"></div>;
};

export const LinearProgress = () => {
  return (
    <div className="h-1.5 w-full rounded-full bg-gray-200">
      <div
        className="h-1.5 animate-pulse rounded-full bg-blue-600"
        style={{ width: "50%" }}
      ></div>
    </div>
  );
};

export const SkeletonLoader = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`animate-pulse rounded bg-gray-200 ${className}`}></div>
  );
};

export default Loading;
