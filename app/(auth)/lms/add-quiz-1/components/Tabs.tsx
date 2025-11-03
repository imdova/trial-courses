// components/quiz/Tabs.tsx
interface TabsProps {
  activeTab: "editor" | "questions" | "preview";
  setActiveTab: (tab: "editor" | "questions" | "preview") => void;
  isEditorFormValid?: boolean;
}

export default function Tabs({ activeTab, setActiveTab, isEditorFormValid = false }: TabsProps) {
  return (
    <div className="flex p-1 bg-[#E4E4E7] rounded-lg mb-4">
      <button
        type="button"
        className={`p-2 w-full rounded-md font-medium ${
          activeTab === "editor" ? "bg-white" : ""
        }`}
        onClick={() => setActiveTab("editor")}
      >
        Editor
      </button>
      <button
        type="button"
        className={`p-2 w-full font-medium rounded-md transition-all ${
          activeTab === "questions" ? "bg-white" : ""
        } ${
          !isEditorFormValid 
            ? "opacity-50 cursor-not-allowed text-gray-400" 
            : "hover:bg-gray-100"
        }`}
        onClick={() => setActiveTab("questions")}
        disabled={!isEditorFormValid}
        title={!isEditorFormValid ? "Complete the Editor form first" : ""}
      >
        Questions
        {!isEditorFormValid && (
          <span className="ml-1 text-xs">🔒</span>
        )}
      </button>
      <button
        type="button"
        className={`p-2 w-full font-medium rounded-md ${
          activeTab === "preview" ? "bg-white" : ""
        }`}
        onClick={() => setActiveTab("preview")}
      >
        Preview
      </button>
    </div>
  );
}
