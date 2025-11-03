import { UserAvatar } from "@/components/UI/Avatar";
import { ChatMessageType, ChatType } from "@/types/chat";
import { formatTime, getOtherSideData } from "@/util/chat";
import { User } from "next-auth";

const ReceivedMessage: React.FC<{
  message: ChatMessageType;
  selectedChat: ChatType;
  user: User;
}> = ({ message, selectedChat, user }) => {
  const data = getOtherSideData(selectedChat, user);

  return (
    <div className="mb-4 flex gap-4">
      <UserAvatar
        alt={data.name + " Image"}
        src={data.image}
        className="border-primary-100 border"
      />
      <div className="max-w-[75%] space-y-2">
        {/* {Array.from({ length: 1 }).map((_, index) => ( */}
        <div className="rounded-base bg-neutral-100 p-2">
          <p className="text-sm">{message.text}</p>
          <p className="text-secondary w-full text-right text-xs">
            {formatTime(message.created_at)}
          </p>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
};

export default ReceivedMessage;
