import { UserAvatar } from "@/components/UI/Avatar";
import { ChatMessageType } from "@/types/chat";
import { formatTime } from "@/util/chat";
import { User } from "next-auth";

const SenderMessage: React.FC<{ message: ChatMessageType; user: User }> = ({
  message,
  user,
}) => {
  const image = user.image;

  return (
    <div className="mb-4 flex justify-end gap-4">
      <div className="max-w-[75%] space-y-2">
        {Array.from({ length: 1 }).map((_, index) => (
          <div key={index} className="rounded-base bg-primary-100 p-2">
            <p className="text-sm">{message.text}</p>
            <p className="text-secondary w-full text-right text-xs">
              {formatTime(message.created_at)}
            </p>
          </div>
        ))}
      </div>
      <UserAvatar
        src={image ?? "/images/placholder-avatar.png"}
        alt={user.name + " Image"}
        className="border-primary-100 border"
      />
    </div>
  );
};

export default SenderMessage;
