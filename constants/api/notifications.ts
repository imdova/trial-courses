import {
  API_DELETE_ALL_STUDENT_NOTIFICATIONS,
  API_DELETE_STUDENT_NOTIFICATIONS,
  API_GET_STUDENT_NOTIFICATIONS,
  API_MARK_ALL_STUDENT_NOTIFICATIONS_READ,
  API_MARK_ALL_STUDENT_NOTIFICATIONS_UNREAD,
  API_MARK_STUDENT_NOTIFICATIONS_READ,
  API_MARK_STUDENT_NOTIFICATIONS_UNREAD,
  API_STUDENT_SOCKET,
} from "./students";
import {
  API_GET_INSTRUCTOR_NOTIFICATIONS,
  API_DELETE_INSTRUCTOR_NOTIFICATIONS,
  API_MARK_INSTRUCTOR_NOTIFICATIONS_READ,
  API_MARK_INSTRUCTOR_NOTIFICATIONS_UNREAD,
  API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_READ,
  API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_UNREAD,
  API_DELETE_ALL_INSTRUCTOR_NOTIFICATIONS,
  API_INSTRUCTORS_SOCKET,
} from "./instructor";
import {
  API_GET_ADMIN_NOTIFICATIONS,
  API_DELETE_ADMIN_NOTIFICATIONS,
  API_MARK_ADMIN_NOTIFICATIONS_READ,
  API_MARK_ADMIN_NOTIFICATIONS_UNREAD,
  API_MARK_ALL_ADMIN_NOTIFICATIONS_READ,
  API_MARK_ALL_ADMIN_NOTIFICATIONS_UNREAD,
  API_DELETE_ALL_ADMIN_NOTIFICATIONS,
  API_ADMIN_SOCKET,
} from "./admin";
import { RoleState } from "@/types/next-auth";

type NotificationApiConfig = {
  fetch: string;
  delete: string;
  markRead: string;
  markUnread: string;
  markAllRead: string;
  markAllUnread: string;
  deleteAll: string;
  socket: string;
  event: string;
};

export const NOTIFICATION_API: Record<RoleState, NotificationApiConfig> = {
  student: {
    fetch: API_GET_STUDENT_NOTIFICATIONS,
    delete: API_DELETE_STUDENT_NOTIFICATIONS,
    markRead: API_MARK_STUDENT_NOTIFICATIONS_READ,
    markUnread: API_MARK_STUDENT_NOTIFICATIONS_UNREAD,
    markAllRead: API_MARK_ALL_STUDENT_NOTIFICATIONS_READ,
    markAllUnread: API_MARK_ALL_STUDENT_NOTIFICATIONS_UNREAD,
    deleteAll: API_DELETE_ALL_STUDENT_NOTIFICATIONS,
    socket: API_STUDENT_SOCKET,
    event: "student.notification",
  },
  instructor: {
    fetch: API_GET_INSTRUCTOR_NOTIFICATIONS,
    delete: API_DELETE_INSTRUCTOR_NOTIFICATIONS,
    markRead: API_MARK_INSTRUCTOR_NOTIFICATIONS_READ,
    markUnread: API_MARK_INSTRUCTOR_NOTIFICATIONS_UNREAD,
    markAllRead: API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_READ,
    markAllUnread: API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_UNREAD,
    deleteAll: API_DELETE_ALL_INSTRUCTOR_NOTIFICATIONS,
    socket: API_INSTRUCTORS_SOCKET,
    event: "instructor.notification",
  },
  academy_admin: {
    fetch: API_GET_INSTRUCTOR_NOTIFICATIONS,
    delete: API_DELETE_INSTRUCTOR_NOTIFICATIONS,
    markRead: API_MARK_INSTRUCTOR_NOTIFICATIONS_READ,
    markUnread: API_MARK_INSTRUCTOR_NOTIFICATIONS_UNREAD,
    markAllRead: API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_READ,
    markAllUnread: API_MARK_ALL_INSTRUCTOR_NOTIFICATIONS_UNREAD,
    deleteAll: API_DELETE_ALL_INSTRUCTOR_NOTIFICATIONS,
    socket: API_INSTRUCTORS_SOCKET,
    event: "instructor.notification",
  },
  admin: {
    fetch: API_GET_ADMIN_NOTIFICATIONS,
    delete: API_DELETE_ADMIN_NOTIFICATIONS,
    markRead: API_MARK_ADMIN_NOTIFICATIONS_READ,
    markUnread: API_MARK_ADMIN_NOTIFICATIONS_UNREAD,
    markAllRead: API_MARK_ALL_ADMIN_NOTIFICATIONS_READ,
    markAllUnread: API_MARK_ALL_ADMIN_NOTIFICATIONS_UNREAD,
    deleteAll: API_DELETE_ALL_ADMIN_NOTIFICATIONS,
    socket: API_ADMIN_SOCKET,
    event: "admin.notification",
  },
  unverified: {
    fetch: "",
    delete: "",
    markRead: "",
    markUnread: "",
    markAllRead: "",
    markAllUnread: "",
    deleteAll: "",
    socket: "",
    event: "unverified.notification",
  },
};

export const WebSocketEvents = {
  Connection: {
    CONNECTED: "connected",
    EXCEPTION: "exception",
    DISCONNECTED: "disconnected",
  },
  Seeker: {
    NOTIFICATION: "seeker.notification",
    MESSAGE_RECEIVED: "seeker.messageReceived",
    SEND_MESSAGE: "seeker.sendMessage",
  },
  Employer: {
    NOTIFICATION: "employer.notification",
    MESSAGE_RECEIVED: "employer.messageReceived",
    SEND_MESSAGE: "employer.sendMessage",
  },
  Admin: {
    NOTIFICATION: "admin.notification",
    MESSAGE_RECEIVED: "admin.messageReceived",
    SEND_MESSAGE: "admin.sendMessage",
  },
};

export const CHAT_API = {
  student: {
    socket: API_STUDENT_SOCKET,
    event: WebSocketEvents.Seeker.MESSAGE_RECEIVED,
  },
  instructor: {
    socket: API_INSTRUCTORS_SOCKET,
    event: WebSocketEvents.Employer.MESSAGE_RECEIVED,
  },
  academy_admin: {
    socket: API_INSTRUCTORS_SOCKET,
    event: WebSocketEvents.Employer.MESSAGE_RECEIVED,
  },
  admin: {
    socket: API_ADMIN_SOCKET,
    event: WebSocketEvents.Admin.MESSAGE_RECEIVED,
  },
  unverified: {
    socket: "",
    event: "",
  },
};
