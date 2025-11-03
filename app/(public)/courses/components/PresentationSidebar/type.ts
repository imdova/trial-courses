// components/PresentationSidebar/types.ts

export type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isQuestion?: boolean;
  upvotes?: number;
};

export type Poll = {
  id: string;
  question: string;
  options: PollOption[];
  createdAt: Date;
  createdBy: string;
};

export type PollOption = {
  id: string;
  text: string;
  votes: number;
};

export type User = {
  id: string;
  name: string;
  avatar?: string;
};

export type TabType = "chat" | "qa" | "poll";

// For backend integration
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  status: number;
};

// Socket event types
export type SocketEvent =
  | { type: "new_message"; payload: Message }
  | { type: "new_question"; payload: Message }
  | { type: "upvote"; payload: { questionId: string; count: number } }
  | { type: "new_poll"; payload: Poll }
  | {
      type: "vote";
      payload: { pollId: string; optionId: string; count: number };
    };

// Props types for components
export type ChatPanelProps = {
  messages: Message[];
  currentUser: User;
  onSendMessage: (content: string) => void;
  isLoading?: boolean;
};

export type QAPanelProps = {
  questions: Message[];
  currentUser: User;
  onAskQuestion: (content: string) => void;
  onUpvote: (id: string) => void;
  isLoading?: boolean;
};

export type PollPanelProps = {
  polls: Poll[];
  currentUser: User;
  onCreatePoll: (question: string, options: string[]) => void;
  onVote: (pollId: string, optionId: string) => void;
  isLoading?: boolean;
};

export type TabsProps = {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadCounts: {
    chat: number;
    qa: number;
    poll: number;
  };
};

export type Slide = {
  id: string;
  title: string;
  content: string;
  notes?: string;
  thumbnail?: string;
  // For PowerPoint slides
  pptxSlideNumber?: number;
  pptxSlideImage?: string;
};

export type PowerPointSlide = {
  number: number;
  image: string;
  notes?: string;
};

export type PowerPointMetadata = {
  title: string;
  author: string;
  slidesCount: number;
  slides: PowerPointSlide[];
};
