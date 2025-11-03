interface TabsProps {
  activeTab: "info" | "questions" | "preview";
  setActiveTab: (tab: "info" | "questions" | "preview") => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="flex p-1 bg-[#f0f0f0] rounded-lg mb-4">
      <button
        type="button"
        className={`p-2 w-full rounded-md font-medium ${
          activeTab === "info" ? "bg-white" : ""
        }`}
        onClick={() => setActiveTab("info")}
      >
        Basic Information
      </button>
      <button
        type="button"
        className={`p-2 w-full font-medium rounded-md ${
          activeTab === "questions" ? "bg-white" : ""
        }`}
        onClick={() => setActiveTab("questions")}
      >
        Questions
      </button>
    </div>
  );
}
