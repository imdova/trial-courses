import { useIsBottom } from "@/hooks/useIsBottom";
import { ChatMessageType, ChatType } from "@/types/chat";
import { insertDateTitles } from "@/util/chat";
import { CircularProgress, IconButton } from "@mui/material";
import { User } from "next-auth";
import { useEffect, useMemo, useRef } from "react";
import SenderMessage from "./SenderMessage";
import ReceivedMessage from "./ReceivedMessage";
import { ChevronDown } from "lucide-react";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { useDetectScrollUp } from "@/hooks/useDetectScrollUp";
import useUpdateApi from "@/hooks/useUpdateApi";
import { useTriggerOnScrollUpAtTop } from "@/hooks/useScrollAtTopAndScrollingUp";
import { API_MARK_MESSAGES_AS_SEEN } from "@/constants/api/general";

type ChatBodyProps = {
  user: User;
  limit: number;
  isMoreLoading: boolean;
  preventAutoScroll: boolean;
  selectedChat: ChatType;
  data: PaginatedResponse<ChatMessageType> | null;
  loadMore: () => void;
  setPreventAutoScroll: React.Dispatch<React.SetStateAction<boolean>>;
  setChatList: React.Dispatch<
    React.SetStateAction<PaginatedResponse<ChatType> | null>
  >;
};

const ChatBody: React.FC<ChatBodyProps> = ({
  user,
  selectedChat,
  data,
  loadMore,
  limit,
  isMoreLoading,
  preventAutoScroll,
  setPreventAutoScroll,
  setChatList,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { update } = useUpdateApi();
  const userId = user.id || "";
  const messages = useMemo(
    () => insertDateTitles(data?.data || [], userId),
    [data, userId],
  );
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const isNearBottom = useIsBottom(
    containerRef as React.RefObject<HTMLElement>,
    400,
  );

  useEffect(() => {
    if (!preventAutoScroll) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, preventAutoScroll]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useScrollToBottom(containerRef as React.RefObject<HTMLElement>, selectedChat);

  useEffect(() => {
    if (isNearBottom) {
      setPreventAutoScroll(false);
    }
  }, [isNearBottom, setPreventAutoScroll]);

  useDetectScrollUp(containerRef as React.RefObject<HTMLElement>, 400, () =>
    setPreventAutoScroll(true),
  );

  useTriggerOnScrollUpAtTop(containerRef as React.RefObject<HTMLElement>, {
    onTrigger: () => {
      if (limit < Number(data?.total)) {
        setPreventAutoScroll(true);
        loadMore();
      }
    },
  });

  const markMessagesAssRead = async () => {
    const unreadMessages = messages
      .filter((x) => x.type === "received")
      .map((y) => y.id);
    if (unreadMessages.length > 0) {
      update(API_MARK_MESSAGES_AS_SEEN, {
        body: {
          chatId: selectedChat.chat.id,
          messageIds: unreadMessages,
        },
      });
      setChatList((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          data: prev.data.map((chat) => {
            if (chat.chat.id === selectedChat.chat?.id) {
              return {
                ...chat,
                unreadCount: 0,
              };
            }
            return chat;
          }),
        };
      });
    }
  };

  useEffect(() => {
    markMessagesAssRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, selectedChat.chat]);

  return (
    <div ref={containerRef} className="w-full flex-grow overflow-y-auto px-4">
      <div
        className={`flex items-center justify-center transition-[height] duration-300 ease-in-out ${
          isMoreLoading ? "h-40" : "h-0 overflow-hidden"
        }`}
      >
        <CircularProgress size={30} />
      </div>
      {messages.map((message) => {
        if (message.type === "text") {
          return (
            <div
              key={`date-${message.id}`}
              className="sticky top-0 flex w-full justify-center bg-white"
            >
              <p className="text-secondary mb-1 text-center text-sm">
                {message.dateTitle}
              </p>
            </div>
          );
        }

        if (message.type === "send") {
          return (
            <SenderMessage key={message.id} message={message} user={user} />
          );
        }

        if (message.type === "received") {
          return (
            <ReceivedMessage
              key={message.id}
              message={message}
              selectedChat={selectedChat}
              user={user}
            />
          );
        }

        // Fallback for unknown types
        return null;
      })}
      {!isNearBottom && (
        <div className="sticky bottom-4 flex h-0 justify-end">
          <IconButton
            onClick={scrollToBottom}
            className="bg-primary h-8 w-8 -translate-y-8 p-2 text-white"
          >
            <ChevronDown className="h-4 w-4" />
          </IconButton>
        </div>
      )}
      <div ref={bottomRef} className="pt-4" />
    </div>
  );
};

export default ChatBody;
