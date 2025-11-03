export type NotificationFilter = {
  page?: number;
  limit?: number;
  seekerId?: string | null;
  employeeId?: string | null;
  isRead?: string;
  createdFrom?: string;
  createdTo?: string;
};

export type NotificationSettings = {
  receiveRecommendations: boolean;
  receiveCourses: boolean;
  receiveQuizzes: boolean;
  receiveAssignments: boolean;
  receiveMessages: boolean;
  receiveAnnouncements: boolean;
};
