export interface EnrolledCourse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  createdBy: string;
  type: "recorded" | "live" | "offline" | "hybrid";
  level: "beginner" | "intermediate" | "advanced";
  tags: string[];
  status: "draft" | "published" | "archived";
  isActive: boolean;
  name: string;
  startDate: string | null;
  endDate: string | null;
  blockContentAfterExpiration: boolean;
  allowRepurchase: boolean;
  allowPlatformCoupons: boolean;
  programType: "course" | "certificate_of_achievement" | "professional_diploma" | "master" | "doctorate";
  sendEmail: boolean;
  courseDuration: number;
  courseDurationUnit: "days" | "weeks" | "months";
  lectureFrequency: string;
  lectureFrequencyUnit: "days" | "weeks" | "months";
  totalHours: number;
  isCourseFree: boolean;
  courseImage: string;
  previewVideo: string;
  metadata: {
    courseOverview: string;
    whoCanAttend: {
      text: string;
      items: string[];
    };
    whatWillYouLearn: {
      text: string;
      items: string[];
    };
    faqs: {
      question: string;
      answer: string;
    }[];
  };
  academyInstructorIds: string[];
  slug: string;
  averageRating: number;
  ratingCount: number;
  pricings: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    currencyCode: string;
    regularPrice: number;
    salePrice: number;
    discountAmount: number;
    discountEnabled: boolean;
    isActive: boolean;
  }[];
  instructor: {
    id: string;
    fullName: string;
    userName: string;
    photoUrl: string;
  };
  studentCount: number;
  lecturesCount: number;
  quizzesCount: number;
  progress?: number; // Added for student progress
  progressPercentage?: number; // Progress percentage from API
  category?: {
    id: string;
    name: string;
  };
}

export interface EnrolledCoursesApiResponse {
  data: EnrolledCourse[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    sortBy: [string, string][];
  };
  links: {
    current: string;
    first?: string;
    previous?: string;
    next?: string;
    last?: string;
  };
}

export type EnrolledCoursesResponse = EnrolledCourse[];

export interface LatestCourseItem {
  id: string;
  type: "video" | "quiz" | "assignment" | "lecture";
  sectionName: string;
  lastStudiedAt: string;
}

export interface LatestEnrolledCourse {
  course: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    createdBy: string;
    type: "recorded" | "live" | "offline" | "hybrid";
    level: "beginner" | "intermediate" | "advanced";
    tags: string[];
    status: "draft" | "published" | "archived";
    isActive: boolean;
    name: string;
    startDate: string | null;
    endDate: string | null;
    allowPlatformCoupons: boolean;
    programType: string;
    languages: string[];
    courseDuration: number | null;
    courseDurationUnit: "days" | "weeks" | "months";
    lectureFrequency: string;
    lectureFrequencyUnit: "days" | "weeks" | "months";
    totalHours: number | null;
    isCourseFree: boolean;
    courseImage: string;
    previewVideo: string;
    metadata: {
      courseOverview: string;
      whoCanAttend: {
        text: string;
        items: string[];
      };
      whatWillYouLearn: {
        text: string;
        items: string[];
      };
      faqs: {
        question: string;
        answer: string;
      }[];
    };
    academyInstructorIds: string[] | null;
    slug: string;
    averageRating: number;
    ratingCount: number;
  };
  totalProgress: number;
  latestItem: LatestCourseItem;
}

export type LatestCoursesResponse = LatestEnrolledCourse[];

export interface RelatedCourse {
  id: string;
  name: string;
  courseImage: string;
  studentCount: number;
  isFavorite: boolean;
}

export type RelatedCoursesResponse = RelatedCourse[];

export interface CourseProgressItem {
  id: string;
  type: "lecture" | "quiz" | "assignment" | "video";
  completed: boolean;
  score: number | null;
}

export interface CourseItemsProgress {
  courseId: string;
  studentId: string;
  totalItems: number;
  completedItems: number;
  progressPercentage: number;
  items: CourseProgressItem[];
}

