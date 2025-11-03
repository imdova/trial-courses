import { Instructor } from "./courses";

export type Ticket = {
  id: string;
  ticketId: string;
  subject: string;
  description: string;
  assignee: Instructor;
  createdOn: Date;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in-progress" | "resolved" | "closed";
  category: string;
  lastUpdated: Date;
};
