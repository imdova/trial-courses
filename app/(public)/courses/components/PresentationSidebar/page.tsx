"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Message, Poll } from "./type";
import Tabs from "./Tabs";
import ChatPanel from "./ChatPanel";
import QAPanel from "./QAPanel";
import PollPanel from "./PollPanel";
import PresentationSystem from "./PresentationSystem";

export default function PresentationSidebar() {
  const [activeTab, setActiveTab] = useState<"chat" | "qa" | "poll">("chat");
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sample data - in a real app, this would come from the backend
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Hely Cak",
      content:
        "Could you free now? Can you look and read the brief first. Let me know is you interested? Thanks.",
      timestamp: new Date("2023-06-15T10:35:00"),
    },
  ]);

  const [questions, setQuestions] = useState<Message[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isMobile && !sidebarOpen) {
    return (
      <div className="fixed right-4 bottom-4 z-50">
        <button
          onClick={toggleSidebar}
          className="p-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex relative flex-col h-full p-2 border border-gray-200 rounded-xl">
      {/* Main content area */}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? "fixed inset-y-0 right-0 z-50 w-80 shadow-xl bg-white  transform p-3 transition-transform duration-300 ease-in-out"
            : "flex-1 "
        } ${sidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center p-3">
            <h2 className="font-semibold text-gray-800">SLIDE PRESENTATION</h2>
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-1 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <PresentationSystem />
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="flex-1 overflow-auto">
            {activeTab === "chat" && (
              <ChatPanel
                messages={messages}
                onSendMessage={(content) => {
                  const newMessage: Message = {
                    id: Date.now().toString(),
                    sender: "You",
                    content,
                    timestamp: new Date(),
                  };
                  setMessages([...messages, newMessage]);
                }}
              />
            )}
            {activeTab === "qa" && (
              <QAPanel
                questions={questions}
                onAskQuestion={(content) => {
                  const newQuestion: Message = {
                    id: Date.now().toString(),
                    sender: "You",
                    content,
                    timestamp: new Date(),
                    isQuestion: true,
                    upvotes: 0,
                  };
                  setQuestions([...questions, newQuestion]);
                }}
                onUpvote={(id) => {
                  setQuestions(
                    questions.map((q) =>
                      q.id === id ? { ...q, upvotes: (q.upvotes || 0) + 1 } : q
                    )
                  );
                }}
              />
            )}
            {activeTab === "poll" && (
              <PollPanel
                polls={polls}
                onCreatePoll={(question, options) => {
                  const newPoll: Poll = {
                    id: Date.now().toString(),
                    question,
                    options: options.map((opt, i) => ({
                      id: i.toString(),
                      text: opt,
                      votes: 0,
                    })),
                    createdAt: new Date(),
                    createdBy: "You",
                  };
                  setPolls([...polls, newPoll]);
                }}
                onVote={(pollId, optionId) => {
                  setPolls(
                    polls.map((poll) => {
                      if (poll.id !== pollId) return poll;
                      return {
                        ...poll,
                        options: poll.options.map((opt) => {
                          if (opt.id !== optionId) return opt;
                          return { ...opt, votes: opt.votes + 1 };
                        }),
                      };
                    })
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile toggle button when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div className="fixed right-4 bottom-4 z-50">
          <button
            onClick={toggleSidebar}
            className="p-3 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
