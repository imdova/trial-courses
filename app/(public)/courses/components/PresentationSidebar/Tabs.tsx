// components/PresentationSidebar/Tabs.tsx
import { MessageSquare, HelpCircle, BarChart2 } from "lucide-react";

type TabProps = {
  activeTab: "chat" | "qa" | "poll";
  setActiveTab: (tab: "chat" | "qa" | "poll") => void;
};

export default function Tabs({ activeTab, setActiveTab }: TabProps) {
  return (
    <div className="flex border-b border-gray-200">
      <button
        onClick={() => setActiveTab("chat")}
        className={`flex items-center justify-center flex-1 py-3 text-sm font-medium ${
          activeTab === "chat"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <MessageSquare className="w-4 h-4 mr-2" />
        Chat
      </button>
      <button
        onClick={() => setActiveTab("qa")}
        className={`flex items-center justify-center flex-1 py-3 text-sm font-medium ${
          activeTab === "qa"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <HelpCircle className="w-4 h-4 mr-2" />
        Q&A
      </button>
      <button
        onClick={() => setActiveTab("poll")}
        className={`flex items-center justify-center flex-1 py-3 text-sm font-medium ${
          activeTab === "poll"
            ? "text-green-600 border-b-2 border-green-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <BarChart2 className="w-4 h-4 mr-2" />
        Poll
      </button>
    </div>
  );
}
