import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <LoaderCircle className="text-primary animate-spin" size={35} />
      <h6 className="ml-4">Loading...</h6>
    </div>
  );
}
