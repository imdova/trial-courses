// 🔔 General Notifications Enum (includes all roles)
export enum NotificationEnum {
  // Student Notifications
  NEW_COURSE_MATCH = "NEW_COURSE_MATCH",
  ENROLLMENT_SUBMITTED = "ENROLLMENT_SUBMITTED",
  ENROLLMENT_ACCEPTED = "ENROLLMENT_ACCEPTED",
  ENROLLMENT_REJECTED = "ENROLLMENT_REJECTED",
  ENROLLMENT_WITHDRAWN = "ENROLLMENT_WITHDRAWN",

  // Instructor Notifications
  COURSE_SUBMITTED = "COURSE_SUBMITTED",
  COURSE_APPROVED = "COURSE_APPROVED",
  COURSE_REJECTED = "COURSE_REJECTED",
  COURSE_FLAGGED = "COURSE_FLAGGED",
  COURSE_DRAFT = "COURSE_DRAFT",
  PROFILE_APPROVED = "PROFILE_APPROVED",
  PROFILE_REJECTED = "PROFILE_REJECTED",
  NEW_ENROLLMENT = "NEW_ENROLLMENT",
  RECOMMENDED_LIST_ADDED = "RECOMMENDED_LIST_ADDED",
  ACCOUNT_MANAGER_ASSIGNED = "ACCOUNT_MANAGER_ASSIGNED",
  PAYMENT_ISSUE = "PAYMENT_ISSUE",

  // General
  NEW_MESSAGE = "NEW_MESSAGE",
  PROFILE_INCOMPLETE = "PROFILE_INCOMPLETE",
  ACCOUNT_SUSPENSION_WARNING = "ACCOUNT_SUSPENSION_WARNING",
  ACCOUNT_SUSPENDED = "ACCOUNT_SUSPENDED",
  PASSWORD_RESET = "PASSWORD_RESET",
  NOTIFICATION_PREFERENCES_UPDATED = "NOTIFICATION_PREFERENCES_UPDATED",
  PLATFORM_MAINTENANCE = "PLATFORM_MAINTENANCE",
  NEW_FEATURE = "NEW_FEATURE",
  POLICY_UPDATE = "POLICY_UPDATE",

  // Admin Notifications
  USER_REPORTED = "USER_REPORTED",
  ACCOUNT_SUSPENSION_REQUEST = "ACCOUNT_SUSPENSION_REQUEST",
  BULK_ACTION_COMPLETED = "BULK_ACTION_COMPLETED",
  COURSE_PENDING_APPROVAL = "COURSE_PENDING_APPROVAL",
  COURSE_REPORTED = "COURSE_REPORTED",
  INSTRUCTOR_PAYMENT_ISSUE = "INSTRUCTOR_PAYMENT_ISSUE",
  LOW_ENROLLMENTS = "LOW_ENROLLMENTS",
  COURSE_AUTO_FLAGGED = "COURSE_AUTO_FLAGGED",
  PLATFORM_ISSUE = "PLATFORM_ISSUE",
  HIGH_USER_ACTIVITY = "HIGH_USER_ACTIVITY",
  LOW_ENGAGEMENT = "LOW_ENGAGEMENT",
  ANALYTICS_REPORT = "ANALYTICS_REPORT",
  BROADCAST_SENT = "BROADCAST_SENT",
  TARGETED_NOTIFICATION_SENT = "TARGETED_NOTIFICATION_SENT",
  FEEDBACK_RECEIVED = "FEEDBACK_RECEIVED",
}

// 👨‍🎓 Student Notifications
export enum Student_Notifications_Enum {
  // New course posted that matches student’s interests
  // MetaData: Course (title, id), Instructor (name, username, image)
  NEW_COURSE_MATCH = "NEW_COURSE_MATCH",

  // Enrollment submitted by student
  // MetaData: Course (title, id), Instructor (name, username, image)
  ENROLLMENT_SUBMITTED = "ENROLLMENT_SUBMITTED",

  // Enrollment accepted by instructor
  // MetaData: Course (title, id), Instructor (name, username, image)
  ENROLLMENT_ACCEPTED = "ENROLLMENT_ACCEPTED",

  // Enrollment rejected by instructor
  // MetaData: Course (title, id), Instructor (name, username, image), rejection reason
  ENROLLMENT_REJECTED = "ENROLLMENT_REJECTED",

  // Student withdrew enrollment
  // MetaData: Course (title, id), withdrawal date
  ENROLLMENT_WITHDRAWN = "ENROLLMENT_WITHDRAWN",

  // New message received
  // MetaData: Sender’s name, message preview
  NEW_MESSAGE = "NEW_MESSAGE",

  // Student profile incomplete
  // MetaData: List of missing sections, completion percentage
  PROFILE_INCOMPLETE = "PROFILE_INCOMPLETE",

  // Account warnings & system
  ACCOUNT_SUSPENSION_WARNING = "ACCOUNT_SUSPENSION_WARNING", // MetaData: reason, deadline
  ACCOUNT_SUSPENDED = "ACCOUNT_SUSPENDED", // MetaData: reason, support contact
  PASSWORD_RESET = "PASSWORD_RESET", // MetaData: reset link expiry
  NOTIFICATION_PREFERENCES_UPDATED = "NOTIFICATION_PREFERENCES_UPDATED", // MetaData: changes summary
  PLATFORM_MAINTENANCE = "PLATFORM_MAINTENANCE", // MetaData: maintenance window
  NEW_FEATURE = "NEW_FEATURE", // MetaData: feature details
  POLICY_UPDATE = "POLICY_UPDATE", // MetaData: policy summary
}

// 👨‍🏫 Instructor Notifications
export enum Instructor_Notifications_Enum {
  // New course submitted by instructor
  // MetaData: Course (title, id), Instructor (name, email, image)
  COURSE_SUBMITTED = "COURSE_SUBMITTED",

  // Course approved by admin
  // MetaData: Course (title, id), approval date
  COURSE_APPROVED = "COURSE_APPROVED",

  // Course rejected by admin
  // MetaData: Course (title, id), rejection reason
  COURSE_REJECTED = "COURSE_REJECTED",

  // Course flagged for review (inappropriate words or content)
  // MetaData: Course (title, id), flagged reason
  COURSE_FLAGGED = "COURSE_FLAGGED",

  // Course saved as draft
  // MetaData: Course (title, id), last edited date
  COURSE_DRAFT = "COURSE_DRAFT",

  // Instructor profile status
  PROFILE_APPROVED = "PROFILE_APPROVED", // MetaData: approval date
  PROFILE_REJECTED = "PROFILE_REJECTED", // MetaData: rejection reason

  // New enrollment received from student
  // MetaData: Course (title, id), Student (id, name, username, image)
  NEW_ENROLLMENT = "NEW_ENROLLMENT",

  // Students added to recommended list
  // MetaData: number of students, course title
  RECOMMENDED_LIST_ADDED = "RECOMMENDED_LIST_ADDED",

  // Account manager assigned to instructor
  // MetaData: Manager (name, email, image, id)
  ACCOUNT_MANAGER_ASSIGNED = "ACCOUNT_MANAGER_ASSIGNED",

  // Payment issue detected
  // MetaData: issue details, due date, message
  PAYMENT_ISSUE = "PAYMENT_ISSUE",

  // Messages & profile
  NEW_MESSAGE = "NEW_MESSAGE", // MetaData: sender details, preview
  PROFILE_INCOMPLETE = "PROFILE_INCOMPLETE", // MetaData: missing sections, %
  ACCOUNT_SUSPENSION_WARNING = "ACCOUNT_SUSPENSION_WARNING", // MetaData: reason, deadline
  ACCOUNT_SUSPENDED = "ACCOUNT_SUSPENDED", // MetaData: reason, support contact
  PASSWORD_RESET = "PASSWORD_RESET", // MetaData: expiry time
  NOTIFICATION_PREFERENCES_UPDATED = "NOTIFICATION_PREFERENCES_UPDATED",
  PLATFORM_MAINTENANCE = "PLATFORM_MAINTENANCE",
  NEW_FEATURE = "NEW_FEATURE",
  POLICY_UPDATE = "POLICY_UPDATE",
}

// 🛠️ Admin Notifications
export enum Admin_Notifications_Enum {
  // New course submitted by instructor
  // MetaData: Course (title, id), Instructor (name, email, image)
  COURSE_SUBMITTED = "COURSE_SUBMITTED",

  // Course approved by admin
  // MetaData: Course (title, id), Instructor (name, email, image)
  COURSE_APPROVED = "COURSE_APPROVED",

  // Course rejected by admin
  // MetaData: Course (title, id), Instructor (name, email, image), rejection reason
  COURSE_REJECTED = "COURSE_REJECTED",

  // Course flagged for review
  // MetaData: Course (title, id), Instructor info, reason
  COURSE_FLAGGED = "COURSE_FLAGGED",

  // Course saved as draft
  // MetaData: Course (title, id), Instructor info
  COURSE_DRAFT = "COURSE_DRAFT",

  // Instructor profile status
  PROFILE_APPROVED = "PROFILE_APPROVED",
  PROFILE_REJECTED = "PROFILE_REJECTED",

  // New enrollment received
  // MetaData: Course (title, id), Student info, Instructor info
  NEW_ENROLLMENT = "NEW_ENROLLMENT",

  // Students added to recommended list
  // MetaData: number of students, course title
  RECOMMENDED_LIST_ADDED = "RECOMMENDED_LIST_ADDED",

  // Payment issues for instructors
  // MetaData: issue details, account manager info
  INSTRUCTOR_PAYMENT_ISSUE = "INSTRUCTOR_PAYMENT_ISSUE",

  // System / platform level
  NEW_MESSAGE = "NEW_MESSAGE",
  PASSWORD_RESET = "PASSWORD_RESET",
  USER_REPORTED = "USER_REPORTED", // MetaData: reported user, reason
  ACCOUNT_SUSPENSION_REQUEST = "ACCOUNT_SUSPENSION_REQUEST", // MetaData: user info, reason
  BULK_ACTION_COMPLETED = "BULK_ACTION_COMPLETED", // MetaData: action type, count
  COURSE_PENDING_APPROVAL = "COURSE_PENDING_APPROVAL", // MetaData: course title, date
  COURSE_REPORTED = "COURSE_REPORTED", // MetaData: course, reason, reporter
  LOW_ENROLLMENTS = "LOW_ENROLLMENTS", // MetaData: course title, count
  COURSE_AUTO_FLAGGED = "COURSE_AUTO_FLAGGED", // MetaData: reason
  PLATFORM_ISSUE = "PLATFORM_ISSUE", // MetaData: issue summary
  HIGH_USER_ACTIVITY = "HIGH_USER_ACTIVITY", // MetaData: activity summary
  LOW_ENGAGEMENT = "LOW_ENGAGEMENT", // MetaData: engagement summary
  ANALYTICS_REPORT = "ANALYTICS_REPORT", // MetaData: report type, date
  BROADCAST_SENT = "BROADCAST_SENT", // MetaData: message summary
  TARGETED_NOTIFICATION_SENT = "TARGETED_NOTIFICATION_SENT", // MetaData: notification summary
  FEEDBACK_RECEIVED = "FEEDBACK_RECEIVED", // MetaData: feedback type, user info
}
