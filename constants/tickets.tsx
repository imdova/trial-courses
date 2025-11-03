import { Ticket } from "@/types/ticket";
import { instructors } from "./instructors.data";
// Mock data for tickets
export const tickets: Ticket[] = [
  {
    id: "1",
    ticketId: "TKT-001",
    subject: "Login issues",
    description:
      "After applying the updated CRM theme, I am experiencing significant layout and design problems that affect my workflow. I urgently need assistance to resolve these display issues and compatibility challenges with the existing modules and plugins to ensure smooth operations and a consistent user experience.I've made several attempts to adjust theme settings and configurations, but the layout issues persist. The theme appears to conflict with essential CRM modules and custom workflows I heavily depend on.",
    assignee: instructors[2],
    createdOn: new Date("2023-10-15"),
    priority: "high",
    status: "open",
    category: "Technical",
    lastUpdated: new Date("2023-10-16"),
  },
  {
    id: "2",
    ticketId: "TKT-002",
    subject: "Payment processing failed",
    description:
      "After applying the updated CRM theme, I am experiencing significant layout and design problems that affect my workflow. I urgently need assistance to resolve these display issues and compatibility challenges with the existing modules and plugins to ensure smooth operations and a consistent user experience.I've made several attempts to adjust theme settings and configurations, but the layout issues persist. The theme appears to conflict with essential CRM modules and custom workflows I heavily depend on.",
    assignee: instructors[1],
    createdOn: new Date("2023-10-14"),
    priority: "urgent",
    status: "in-progress",
    category: "Billing",
    lastUpdated: new Date("2023-10-15"),
  },
  {
    id: "3",
    ticketId: "TKT-003",
    subject: "Feature request - dark mode",
    description:
      "After applying the updated CRM theme, I am experiencing significant layout and design problems that affect my workflow. I urgently need assistance to resolve these display issues and compatibility challenges with the existing modules and plugins to ensure smooth operations and a consistent user experience.I've made several attempts to adjust theme settings and configurations, but the layout issues persist. The theme appears to conflict with essential CRM modules and custom workflows I heavily depend on.",
    assignee: instructors[3],
    createdOn: new Date("2023-10-12"),
    priority: "medium",
    status: "open",
    category: "Enhancement",
    lastUpdated: new Date("2023-10-12"),
  },
  {
    id: "4",
    ticketId: "TKT-004",
    subject: "Report generation error",
    description:
      "After applying the updated CRM theme, I am experiencing significant layout and design problems that affect my workflow. I urgently need assistance to resolve these display issues and compatibility challenges with the existing modules and plugins to ensure smooth operations and a consistent user experience.I've made several attempts to adjust theme settings and configurations, but the layout issues persist. The theme appears to conflict with essential CRM modules and custom workflows I heavily depend on.",
    assignee: instructors[2],
    createdOn: new Date("2023-10-10"),
    priority: "high",
    status: "resolved",
    category: "Reports",
    lastUpdated: new Date("2023-10-14"),
  },
  {
    id: "5",
    ticketId: "TKT-005",
    subject: "Password reset not working",
    description:
      "After applying the updated CRM theme, I am experiencing significant layout and design problems that affect my workflow. I urgently need assistance to resolve these display issues and compatibility challenges with the existing modules and plugins to ensure smooth operations and a consistent user experience.I've made several attempts to adjust theme settings and configurations, but the layout issues persist. The theme appears to conflict with essential CRM modules and custom workflows I heavily depend on.",
    assignee: instructors[1],
    createdOn: new Date("2023-10-08"),
    priority: "medium",
    status: "closed",
    category: "Technical",
    lastUpdated: new Date("2023-10-11"),
  },
  {
    id: "6",
    ticketId: "TKT-006",
    subject: "Mobile app crashing on iOS",
    description:
      "After applying the updated CRM theme, I am experiencing significant layout and design problems that affect my workflow. I urgently need assistance to resolve these display issues and compatibility challenges with the existing modules and plugins to ensure smooth operations and a consistent user experience.I've made several attempts to adjust theme settings and configurations, but the layout issues persist. The theme appears to conflict with essential CRM modules and custom workflows I heavily depend on.",
    assignee: instructors[2],
    createdOn: new Date("2023-10-05"),
    priority: "urgent",
    status: "in-progress",
    category: "Mobile",
    lastUpdated: new Date("2023-10-15"),
  },
  {
    id: "7",
    ticketId: "TKT-007",
    subject: "Update billing information",
    description:
      "After applying the updated CRM theme, I am experiencing significant layout and design problems that affect my workflow. I urgently need assistance to resolve these display issues and compatibility challenges with the existing modules and plugins to ensure smooth operations and a consistent user experience.I've made several attempts to adjust theme settings and configurations, but the layout issues persist. The theme appears to conflict with essential CRM modules and custom workflows I heavily depend on.",

    assignee: instructors[1],
    createdOn: new Date("2023-10-04"),
    priority: "low",
    status: "open",
    category: "Billing",
    lastUpdated: new Date("2023-10-04"),
  },
];
