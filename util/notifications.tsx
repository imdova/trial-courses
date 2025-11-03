import { NotificationEnum } from "@/constants/enums/notifications.enum";
import { AppRouterInstance, BadgeVariant, NotificationType } from "@/types";
import { ActionOption } from "@/types/forms";
import {
  AlertCircle,
  Bell,
  Info,
  MessageCircle,
  UserCheck,
  UserX,
  Lock,
  ShieldAlert,
  RefreshCw,
  Zap,
  FileWarning,
  Ban,
  Briefcase,
  Users,
  AlertTriangle,
  TrendingDown,
  LineChart,
  Megaphone,
  Send,
  User,
  ClipboardCheck,
  ClipboardX,
  Clipboard,
  Eye,
  PlusCircle,
  MessageSquare,
  Edit,
  CheckCircle,
  XCircle,
  LifeBuoy,
  FileText,
  BookOpen,
  GraduationCap,
  Bookmark,
} from "lucide-react";

export const getActionsForNotification = (
  notification: NotificationType,
  router: AppRouterInstance,
) => {
  const cardAction: ActionOption = { label: null, icon: null };
  const mainAction: ActionOption = { label: null, icon: null };
  const secondaryAction: ActionOption = { label: null, icon: null };
  const dropdownActions: ActionOption[] = [];

  const addCardAction = (
    label: string,
    icon: React.ReactNode,
    action: () => void,
  ) => {
    cardAction.label = label;
    cardAction.icon = icon;
    cardAction.action = action;
  };

  const addMainAction = (
    label: string,
    icon: React.ReactNode,
    action: () => void,
  ) => {
    mainAction.label = label;
    mainAction.icon = icon;
    mainAction.action = action;
  };

  const addSecondaryAction = (
    label: string,
    icon: React.ReactNode,
    action: () => void,
  ) => {
    secondaryAction.label = label;
    secondaryAction.icon = icon;
    secondaryAction.action = action;
  };

  const addDropdownAction = (
    label: string,
    icon: React.ReactNode,
    action: () => void,
  ) => {
    dropdownActions.push({ label, icon, action });
  };

  // Type-specific actions
  switch (notification.type) {
    case NotificationEnum.NEW_COURSE_MATCH:
      addMainAction("View Course", <BookOpen className="h-4 w-4" />, () =>
        console.log(`Viewing course ${notification.metaData.course?.id}`),
      );
      break;
    case NotificationEnum.NEW_MESSAGE:
      addMainAction("Reply", <MessageSquare className="h-4 w-4" />, () =>
        console.log(`Replying to message`),
      );
      break;
    case NotificationEnum.PROFILE_INCOMPLETE:
      addMainAction("Complete Profile Now", <Edit className="h-4 w-4" />, () =>
        console.log("Navigating to profile edit"),
      );
      break;
    case NotificationEnum.PROFILE_REJECTED:
      addMainAction("Update Profile", <Edit className="h-4 w-4" />, () =>
        console.log("Navigating to profile edit"),
      );
      break;
    case NotificationEnum.COURSE_DRAFT:
      addMainAction("Complete and publish", <Edit className="h-4 w-4" />, () =>
        console.log(`Navigating to course draft`),
      );
      break;
    case NotificationEnum.COURSE_FLAGGED:
    case NotificationEnum.ACCOUNT_SUSPENDED:
    case NotificationEnum.PAYMENT_ISSUE:
      addMainAction("Contact Support", <LifeBuoy className="h-4 w-4" />, () =>
        console.log("Contacting support"),
      );
      break;
    case NotificationEnum.COURSE_PENDING_APPROVAL:
      addMainAction("Approve", <CheckCircle className="h-4 w-4" />, () =>
        console.log(`Approving course ${notification.metaData.course?.id}`),
      );
      addSecondaryAction("Reject", <XCircle className="h-4 w-4" />, () =>
        console.log(`Rejecting course ${notification.metaData.course?.id}`),
      );
      break;
    case NotificationEnum.RECOMMENDED_LIST_ADDED:
      addMainAction("View List", <Eye className="h-4 w-4" />, () =>
        console.log(`Viewing recommended list`),
      );
      break;
    case NotificationEnum.NEW_ENROLLMENT:
      console.log(notification);
      addMainAction("Review Enrollment", null, () =>
        router.push(
          `/instructor/course/manage-courses/${notification.metaData.course?.id}`,
        ),
      );
      break;
    case NotificationEnum.ENROLLMENT_SUBMITTED:
    case NotificationEnum.ENROLLMENT_ACCEPTED:
    case NotificationEnum.ENROLLMENT_REJECTED:
    case NotificationEnum.ENROLLMENT_WITHDRAWN:
      addCardAction("View", null, () => router.push("/student/my-enrollments"));
      break;
    case NotificationEnum.COURSE_SUBMITTED:
    case NotificationEnum.COURSE_APPROVED:
    case NotificationEnum.COURSE_REJECTED:
    case NotificationEnum.LOW_ENROLLMENTS:
    case NotificationEnum.USER_REPORTED:
    case NotificationEnum.ACCOUNT_SUSPENSION_REQUEST:
    case NotificationEnum.COURSE_REPORTED:
    case NotificationEnum.COURSE_AUTO_FLAGGED:
      addCardAction("View", <Eye className="h-4 w-4" />, () =>
        console.log(`Viewing details`),
      );
      break;
    case NotificationEnum.NEW_FEATURE:
      addMainAction("View Feature", <FileText className="h-4 w-4" />, () =>
        console.log(`Navigate To new feature`),
      );
      break;
    case NotificationEnum.PROFILE_APPROVED:
    case NotificationEnum.ACCOUNT_SUSPENSION_WARNING:
    case NotificationEnum.PASSWORD_RESET:
    case NotificationEnum.NOTIFICATION_PREFERENCES_UPDATED:
    case NotificationEnum.PLATFORM_MAINTENANCE:
    case NotificationEnum.POLICY_UPDATE:
    case NotificationEnum.PLATFORM_ISSUE:
    case NotificationEnum.HIGH_USER_ACTIVITY:
    case NotificationEnum.LOW_ENGAGEMENT:
    case NotificationEnum.ANALYTICS_REPORT:
    case NotificationEnum.BROADCAST_SENT:
    case NotificationEnum.TARGETED_NOTIFICATION_SENT:
    case NotificationEnum.FEEDBACK_RECEIVED:
    case NotificationEnum.ACCOUNT_MANAGER_ASSIGNED:
    case NotificationEnum.BULK_ACTION_COMPLETED:
      addCardAction("View", <Eye className="h-4 w-4" />, () =>
        console.log(`Viewing details`),
      );
      break;
    default:
      addCardAction("View", <Eye className="h-4 w-4" />, () =>
        console.log(`Viewing details`),
      );
      break;
  }

  // Additional dropdown actions
  if (!cardAction.label) {
    addDropdownAction("View", <Eye className="h-4 w-4" />, () =>
      console.log(`Viewing notification`),
    );
  }
  if (notification.type !== NotificationEnum.NEW_MESSAGE) {
    addDropdownAction("Reply", <MessageSquare className="h-4 w-4" />, () =>
      console.log(`Replying to message`),
    );
  }

  return { cardAction, mainAction, secondaryAction, dropdownActions };
};

export const getTagsForNotification = (notification: NotificationType) => {
  const tags: { text: string; link?: string; status: BadgeVariant }[] = [];
  const maxTags = 5;

  if (notification.metaData.course?.id) {
    tags.push({
      text: notification.metaData.course.title
        ? notification.metaData.course.title
        : `Course #${notification.metaData.course.id}`,
      link: `/course/${notification.metaData.course.id}`,
      status: "neutral",
    });
  }

  if (notification.metaData.instructor?.name) {
    tags.push({
      text: notification.metaData.instructor.name,
      link: `/instructor/${notification.metaData.instructor.username}`,
      status: "neutral",
    });
  }

  // Type-specific tags
  switch (notification.type) {
    case NotificationEnum.ENROLLMENT_WITHDRAWN:
      tags.push({ text: "Withdrawn", status: "warning" });
      break;
    case NotificationEnum.ENROLLMENT_SUBMITTED:
      tags.push({ text: "Submitted", status: "success" });
      break;
    case NotificationEnum.ENROLLMENT_ACCEPTED:
      tags.push({ text: "Accepted", status: "success" });
      break;
    case NotificationEnum.ENROLLMENT_REJECTED:
      tags.push({ text: "Rejected", status: "error" });
      break;
    case NotificationEnum.COURSE_FLAGGED:
    case NotificationEnum.COURSE_DRAFT:
    case NotificationEnum.ACCOUNT_SUSPENDED:
    case NotificationEnum.COURSE_REJECTED:
    case NotificationEnum.ACCOUNT_SUSPENSION_WARNING:
    case NotificationEnum.PAYMENT_ISSUE:
      tags.push({ text: "Action Required", status: "error" });
      break;
    case NotificationEnum.PLATFORM_MAINTENANCE:
    case NotificationEnum.PLATFORM_ISSUE:
      tags.push({ text: "System Alert", status: "warning" });
      break;
    case NotificationEnum.NEW_MESSAGE:
      tags.push({ text: "Message", status: "info" });
      break;
    case NotificationEnum.PROFILE_INCOMPLETE:
    case NotificationEnum.COURSE_PENDING_APPROVAL:
    case NotificationEnum.PROFILE_APPROVED:
    case NotificationEnum.COURSE_APPROVED:
    case NotificationEnum.BULK_ACTION_COMPLETED:
      tags.push({ text: "Approved", status: "success" });
      break;
    case NotificationEnum.NEW_COURSE_MATCH:
    case NotificationEnum.LOW_ENROLLMENTS:
      tags.push({ text: "Low Engagement", status: "warning" });
      break;
    case NotificationEnum.USER_REPORTED:
    case NotificationEnum.COURSE_REPORTED:
    case NotificationEnum.COURSE_AUTO_FLAGGED:
      tags.push({ text: "Flagged", status: "error" });
      break;
    case NotificationEnum.NEW_FEATURE:
      tags.push({ text: "New Feature", status: "info" });
      break;
  }

  // Truncate tags to maxTags and ensure unique texts
  const uniqueTags = [];
  const seenTexts = new Set();
  for (const tag of tags) {
    if (!seenTexts.has(tag.text) && uniqueTags.length < maxTags) {
      uniqueTags.push(tag);
      seenTexts.add(tag.text);
    }
  }

  return uniqueTags;
};

export const getIconForType = (type: NotificationEnum) => {
  switch (type) {
    // ✅ Student Notifications
    case NotificationEnum.NEW_COURSE_MATCH:
      return <BookOpen className="h-4 w-4" />;
    case NotificationEnum.ENROLLMENT_SUBMITTED:
      return <Clipboard className="h-4 w-4" />;
    case NotificationEnum.ENROLLMENT_ACCEPTED:
      return <ClipboardCheck className="h-4 w-4" />;
    case NotificationEnum.ENROLLMENT_REJECTED:
      return <ClipboardX className="h-4 w-4" />;
    case NotificationEnum.ENROLLMENT_WITHDRAWN:
      return <Bookmark className="h-4 w-4" />;
    case NotificationEnum.NEW_MESSAGE:
      return <MessageCircle className="h-4 w-4" />;
    case NotificationEnum.PROFILE_INCOMPLETE:
    case NotificationEnum.PROFILE_REJECTED:
      return <UserX className="h-4 w-4" />;
    case NotificationEnum.PROFILE_APPROVED:
      return <UserCheck className="h-4 w-4" />;
    case NotificationEnum.ACCOUNT_SUSPENSION_WARNING:
    case NotificationEnum.ACCOUNT_SUSPENDED:
      return <ShieldAlert className="h-4 w-4" />;
    case NotificationEnum.PASSWORD_RESET:
      return <Lock className="h-4 w-4" />;
    case NotificationEnum.NOTIFICATION_PREFERENCES_UPDATED:
      return <Bell className="h-4 w-4" />;
    case NotificationEnum.PLATFORM_MAINTENANCE:
      return <RefreshCw className="h-4 w-4" />;
    case NotificationEnum.NEW_FEATURE:
      return <Zap className="h-4 w-4" />;
    case NotificationEnum.POLICY_UPDATE:
      return <FileWarning className="h-4 w-4" />;

    // ✅ Instructor Notifications
    case NotificationEnum.COURSE_SUBMITTED:
    case NotificationEnum.COURSE_APPROVED:
      return <ClipboardCheck className="h-4 w-4" />;
    case NotificationEnum.COURSE_REJECTED:
    case NotificationEnum.COURSE_FLAGGED:
    case NotificationEnum.COURSE_DRAFT:
      return <AlertCircle className="h-4 w-4" />;
    case NotificationEnum.LOW_ENROLLMENTS:
      return <TrendingDown className="h-4 w-4" />;
    case NotificationEnum.NEW_ENROLLMENT:
    case NotificationEnum.RECOMMENDED_LIST_ADDED:
      return <Users className="h-4 w-4" />;
    case NotificationEnum.ACCOUNT_MANAGER_ASSIGNED:
      return <User className="h-4 w-4" />;
    case NotificationEnum.PAYMENT_ISSUE:
      return <Ban className="h-4 w-4" />;

    // ✅ Admin Notifications
    case NotificationEnum.USER_REPORTED:
    case NotificationEnum.ACCOUNT_SUSPENSION_REQUEST:
    case NotificationEnum.COURSE_REPORTED:
    case NotificationEnum.COURSE_AUTO_FLAGGED:
      return <ShieldAlert className="h-4 w-4" />;
    case NotificationEnum.BULK_ACTION_COMPLETED:
      return <Send className="h-4 w-4" />;
    case NotificationEnum.COURSE_PENDING_APPROVAL:
      return <Clipboard className="h-4 w-4" />;
    case NotificationEnum.PLATFORM_ISSUE:
      return <AlertTriangle className="h-4 w-4" />;
    case NotificationEnum.HIGH_USER_ACTIVITY:
    case NotificationEnum.LOW_ENGAGEMENT:
      return <LineChart className="h-4 w-4" />;
    case NotificationEnum.ANALYTICS_REPORT:
      return <Info className="h-4 w-4" />;
    case NotificationEnum.BROADCAST_SENT:
    case NotificationEnum.TARGETED_NOTIFICATION_SENT:
      return <Megaphone className="h-4 w-4" />;
    case NotificationEnum.FEEDBACK_RECEIVED:
      return <MessageCircle className="h-4 w-4" />;

    default:
      return <Info className="h-4 w-4" />;
  }
};

export const getPlaceholderImage = (
  notification: NotificationType,
): { image?: string | null; url?: string } => {
  switch (notification.type) {
    // Student Notifications
    case NotificationEnum.NEW_COURSE_MATCH:
    case NotificationEnum.ENROLLMENT_SUBMITTED:
    case NotificationEnum.ENROLLMENT_ACCEPTED:
    case NotificationEnum.ENROLLMENT_REJECTED:
    case NotificationEnum.ENROLLMENT_WITHDRAWN:
      return {
        image: notification.metaData.instructor?.image,
        url: `/instructor/${notification.metaData.instructor?.username}`,
      };
    case NotificationEnum.NEW_MESSAGE:
      return {};
    case NotificationEnum.PROFILE_INCOMPLETE:
    case NotificationEnum.PROFILE_APPROVED:
    case NotificationEnum.PROFILE_REJECTED:
      return {};
    case NotificationEnum.ACCOUNT_SUSPENSION_WARNING:
    case NotificationEnum.ACCOUNT_SUSPENDED:
    case NotificationEnum.PASSWORD_RESET:
      return {};
    case NotificationEnum.NOTIFICATION_PREFERENCES_UPDATED:
    case NotificationEnum.PLATFORM_MAINTENANCE:
    case NotificationEnum.NEW_FEATURE:
    case NotificationEnum.POLICY_UPDATE:
      return {};

    // Instructor Notifications
    case NotificationEnum.COURSE_SUBMITTED:
    case NotificationEnum.COURSE_APPROVED:
    case NotificationEnum.COURSE_REJECTED:
    case NotificationEnum.COURSE_FLAGGED:
    case NotificationEnum.COURSE_DRAFT:
    case NotificationEnum.LOW_ENROLLMENTS:
    case NotificationEnum.NEW_ENROLLMENT:
    case NotificationEnum.RECOMMENDED_LIST_ADDED:
      return {
        image: notification.metaData.student?.image,
        url: `/student/${notification.metaData.student?.username}`,
      };
    case NotificationEnum.ACCOUNT_MANAGER_ASSIGNED:
      return {};
    case NotificationEnum.PAYMENT_ISSUE:
      return {};

    // Admin Notifications
    case NotificationEnum.USER_REPORTED:
    case NotificationEnum.ACCOUNT_SUSPENSION_REQUEST:
    case NotificationEnum.BULK_ACTION_COMPLETED:
    case NotificationEnum.COURSE_PENDING_APPROVAL:
    case NotificationEnum.COURSE_REPORTED:
    case NotificationEnum.COURSE_AUTO_FLAGGED:
      return {};
    case NotificationEnum.PLATFORM_ISSUE:
    case NotificationEnum.HIGH_USER_ACTIVITY:
    case NotificationEnum.LOW_ENGAGEMENT:
    case NotificationEnum.ANALYTICS_REPORT:
    case NotificationEnum.BROADCAST_SENT:
    case NotificationEnum.TARGETED_NOTIFICATION_SENT:
    case NotificationEnum.FEEDBACK_RECEIVED:
      return {};

    default:
      return {};
  }
};

export const getTextColorForType = (type: NotificationEnum) => {
  switch (type) {
    case NotificationEnum.ENROLLMENT_REJECTED:
    case NotificationEnum.ENROLLMENT_WITHDRAWN:
    case NotificationEnum.COURSE_REJECTED:
    case NotificationEnum.COURSE_FLAGGED:
    case NotificationEnum.PROFILE_REJECTED:
    case NotificationEnum.ACCOUNT_SUSPENSION_WARNING:
    case NotificationEnum.ACCOUNT_SUSPENDED:
    case NotificationEnum.PAYMENT_ISSUE:
    case NotificationEnum.PLATFORM_ISSUE:
    case NotificationEnum.COURSE_AUTO_FLAGGED:
    case NotificationEnum.COURSE_REPORTED:
    case NotificationEnum.ACCOUNT_SUSPENSION_REQUEST:
      return "bg-red-500";

    case NotificationEnum.ENROLLMENT_ACCEPTED:
    case NotificationEnum.ENROLLMENT_SUBMITTED:
    case NotificationEnum.COURSE_APPROVED:
    case NotificationEnum.COURSE_SUBMITTED:
    case NotificationEnum.PROFILE_APPROVED:
    case NotificationEnum.NEW_ENROLLMENT:
    case NotificationEnum.RECOMMENDED_LIST_ADDED:
    case NotificationEnum.NEW_COURSE_MATCH:
      return "bg-green-500";

    case NotificationEnum.PASSWORD_RESET:
    case NotificationEnum.NOTIFICATION_PREFERENCES_UPDATED:
    case NotificationEnum.NEW_FEATURE:
    case NotificationEnum.POLICY_UPDATE:
    case NotificationEnum.ANALYTICS_REPORT:
    case NotificationEnum.BROADCAST_SENT:
    case NotificationEnum.TARGETED_NOTIFICATION_SENT:
    case NotificationEnum.FEEDBACK_RECEIVED:
    case NotificationEnum.NEW_MESSAGE:
    case NotificationEnum.USER_REPORTED:
      return "bg-primary";

    case NotificationEnum.COURSE_DRAFT:
    case NotificationEnum.HIGH_USER_ACTIVITY:
    case NotificationEnum.LOW_ENGAGEMENT:
    case NotificationEnum.PLATFORM_MAINTENANCE:
    case NotificationEnum.BULK_ACTION_COMPLETED:
    case NotificationEnum.COURSE_PENDING_APPROVAL:
      return "bg-yellow-500";

    default:
      return "bg-gray-500";
  }
};

export const filterNotificationsByTab = (
  activeTab: string,
  notifications: NotificationType[],
): NotificationType[] => {
  const tabMap: Record<string, NotificationEnum[]> = {
    all: [],
    admin: [
      NotificationEnum.USER_REPORTED,
      NotificationEnum.ACCOUNT_SUSPENSION_REQUEST,
      NotificationEnum.BULK_ACTION_COMPLETED,
      NotificationEnum.COURSE_PENDING_APPROVAL,
      NotificationEnum.COURSE_REPORTED,
      NotificationEnum.COURSE_AUTO_FLAGGED,
      NotificationEnum.LOW_ENROLLMENTS,
      NotificationEnum.PLATFORM_ISSUE,
      NotificationEnum.HIGH_USER_ACTIVITY,
      NotificationEnum.LOW_ENGAGEMENT,
      NotificationEnum.ANALYTICS_REPORT,
      NotificationEnum.BROADCAST_SENT,
      NotificationEnum.TARGETED_NOTIFICATION_SENT,
      NotificationEnum.FEEDBACK_RECEIVED,
    ],
    student: [
      NotificationEnum.NEW_COURSE_MATCH,
      NotificationEnum.PROFILE_INCOMPLETE,
      NotificationEnum.ENROLLMENT_SUBMITTED,
      NotificationEnum.ENROLLMENT_ACCEPTED,
      NotificationEnum.ENROLLMENT_REJECTED,
      NotificationEnum.ENROLLMENT_WITHDRAWN,
      NotificationEnum.PROFILE_APPROVED,
      NotificationEnum.PROFILE_REJECTED,
      NotificationEnum.ACCOUNT_SUSPENSION_WARNING,
      NotificationEnum.ACCOUNT_SUSPENDED,
    ],
    instructor: [
      NotificationEnum.COURSE_SUBMITTED,
      NotificationEnum.COURSE_APPROVED,
      NotificationEnum.COURSE_REJECTED,
      NotificationEnum.COURSE_FLAGGED,
      NotificationEnum.COURSE_DRAFT,
      NotificationEnum.PROFILE_INCOMPLETE,
      NotificationEnum.PROFILE_APPROVED,
      NotificationEnum.PROFILE_REJECTED,
      NotificationEnum.NEW_ENROLLMENT,
      NotificationEnum.ACCOUNT_MANAGER_ASSIGNED,
      NotificationEnum.RECOMMENDED_LIST_ADDED,
      NotificationEnum.PAYMENT_ISSUE,
    ],
    course: [
      NotificationEnum.NEW_COURSE_MATCH,
      NotificationEnum.COURSE_SUBMITTED,
      NotificationEnum.COURSE_APPROVED,
      NotificationEnum.COURSE_REJECTED,
      NotificationEnum.COURSE_FLAGGED,
      NotificationEnum.COURSE_DRAFT,
      NotificationEnum.LOW_ENROLLMENTS,
      NotificationEnum.COURSE_PENDING_APPROVAL,
      NotificationEnum.COURSE_REPORTED,
      NotificationEnum.COURSE_AUTO_FLAGGED,
    ],
    enrollments: [
      NotificationEnum.ENROLLMENT_SUBMITTED,
      NotificationEnum.ENROLLMENT_ACCEPTED,
      NotificationEnum.ENROLLMENT_REJECTED,
      NotificationEnum.ENROLLMENT_WITHDRAWN,
      NotificationEnum.NEW_ENROLLMENT,
    ],
    messages: [
      NotificationEnum.NEW_MESSAGE,
      NotificationEnum.FEEDBACK_RECEIVED,
    ],
    reminder: [
      NotificationEnum.PASSWORD_RESET,
      NotificationEnum.NOTIFICATION_PREFERENCES_UPDATED,
      NotificationEnum.PLATFORM_MAINTENANCE,
      NotificationEnum.NEW_FEATURE,
      NotificationEnum.POLICY_UPDATE,
      NotificationEnum.ACCOUNT_SUSPENSION_WARNING,
    ],
    archive: [],
  };

  if (activeTab === "all") return notifications;

  const validTypes = tabMap[activeTab] || [];
  return notifications.filter((n) => validTypes.includes(n.type));
};
