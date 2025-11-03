import { Message } from "@/types/courses";
import Image from "next/image";
import { useState } from "react";
interface ChatMessage {
  name: string;
  image: string;
  Messages: Message[];
}
export default function Chat({ name, image, Messages }: ChatMessage) {
  const [messages, setMessages] = useState<Message[]>(Messages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        sender: "user",
        avatar: image,
        name: name,
        timestamp: getCurrentTime(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };
  // get time messge Send
  const getCurrentTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex flex-col bg-gray-100 p-4 overflow-auto">
      <div className="flex-1 overflow-y-auto mb-4 max-h-[400px] px-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start mb-6 ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            } mb-2`}>
            {msg.sender !== "user" && (
              <Image
                src={msg.avatar}
                alt={msg.name}
                className="w-8 h-8 rounded-full mr-2"
                width={200}
                height={200}
              />
            )}
            <div
              className={`flex flex-col ${
                msg.sender === "user" ? "items-end" : "items-start"
              }`}>
              <span className="text-sm text-gray-600 mb-2">{msg.name}</span>
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-black"
                }`}>
                {msg.text}
              </span>
              <span
                className={`${
                  msg.sender === "user" ? "ml-auto" : ""
                }  mt-1 text-muted-foreground text-sm`}>
                {msg.timestamp}
              </span>
            </div>
            {msg.sender === "user" && (
              <Image
                src={msg.avatar}
                alt={msg.name}
                className="w-8 h-8 rounded-full ml-2"
                width={200}
                height={200}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded-l-lg outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-primary text-white p-2 rounded-r-lg">
          Send
        </button>
      </div>
    </div>
  );
}
