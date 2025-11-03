import Link from "next/link";
import { ArrowLeft, Eye, Save } from "lucide-react";

interface QuizHeaderProps {
  activeTab: "info" | "questions" | "preview";
  setActiveTab: (tab: "info" | "questions" | "preview") => void;
  handleSubmit: () => void;
}

export default function QuizHeader({
  setActiveTab,
  handleSubmit,
}: QuizHeaderProps) {
  return (
    <div className="flex flex-col justify-between sm:items-center py-4 gap-4 border-b border-gray-200 sm:flex-row">
      <div className="flex gap-6 items-center">
        <Link className="p-2 border text-muted-foreground rounded-md" href={"/admin"}>
          <ArrowLeft size={15} />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Create Quiz</h1>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2 bg-white border rounded-md text-sm text-primary"
          onClick={() => setActiveTab("preview")}
        >
          <Eye size={15} />
          Preview
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 px-5 py-2 bg-primary border rounded-md text-sm text-white"
        >
          <Save size={15} />
          Save Quiz
        </button>
      </div>
    </div>
  );
}
