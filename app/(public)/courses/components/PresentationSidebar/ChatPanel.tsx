import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import { Message } from "./type";

type ChatPanelProps = {
  messages: Message[];
  onSendMessage: (content: string) => void;
};

export default function ChatPanel({ messages, onSendMessage }: ChatPanelProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200">
        <h3 className="font-medium text-gray-800">BUSINESS TEAM</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <div className="flex justify-between items-baseline">
              <span className="font-medium text-sm text-gray-800">
                {msg.sender}
              </span>
              <span className="text-xs text-gray-500">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-1">{msg.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="w-full p-2 pr-10 border border-gray-300 rounded-lg focus:outline-none  text-sm"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800"
          >
            <SendHorizonal className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
