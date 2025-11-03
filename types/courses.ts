import { Category, SupCategory } from ".";

export interface curriculums {
  title: string;
  content: string;
}
export interface instructor {
  name: string;
  job: string;
  image: string;
  rating: number;
  reviews: number;
  students: number;
  courses: number;
  description: string;
  info?: string;
}
export interface review {
  date: string;
  rating: number;
  user: {
    name: string;
    photo: string;
    job: string;
  };
  content: string;
}

// User info inside a review
export interface ReviewUser {
  name: string;
  photo: string;
  job: string;
}

export interface CourseType {
  id: string;
  title: string;
  image: string;
  rating: number;
  lessons: number;
  duration: string;
  tabs: Tab[];
  date: string;
  category: string;
  supCategory: string;
  revenue: string;
  status: string;
  isActive: boolean;
  instructor: instructor;
  type: string;
  level: string;
  students: number;
  price: number;
  description: string;
  questions?: question[];
  materials: CourseMaterial[];
  skills?: string[];
  views?: views[];
  messages?: Message[];
  videoPreveiw: string;
  reviews: review[];
  isEnrolled?: boolean;
  faqs?: {
    question: string;
    answer: string;
  }[];
  quizzes: number;
  certifications: string;
  language: string[];
  related_search?: string[];
  learnOutcome?: string[];
  attends?: string[];
  certificates_list: Certificates[];
  sales?: number;
  graduation?: string;
  videoUrl?: string;
  curriculums?: CurriculumItem[];
}

export interface CourseFormType {
  slug: string;
  type: "recorded" | "live" | "offline" | "hybrid"; // could be union if more types exist
  programType?:
    | "course"
    | "certificate_of_achievement"
    | "professional_diploma"
    | "master"
    | "doctorate";
  level: "beginner" | "intermediate" | "advanced"; // extend as needed
  tags: string[];
  status: "draft" | "published" | "archived"; // extend as needed
  isActive: boolean;

  category: string; // UUID
  subcategory: string; // UUID
  name: string;

  startDate: string | null; // ISO date string
  endDate: string | null; // ISO date string
  // blockContentAfterExpiration: boolean;
  // allowRepurchase: boolean;
  allowPlatformCoupons: boolean;
  // sendEmail: boolean;
  languages: string[];
  isCourseFree: boolean;
  averageRating?: number | null;
  ratingCount?: number | null;

  courseImage: string; // URL
  previewVideo: string; // URL
  courseDuration: number | null;
  courseDurationUnit: "days" | "weeks" | "months";
  lectureFrequency: string; // e.g., "once", "twice"
  lectureFrequencyUnit: "days" | "weeks" | "months";
  numberOfLectures: number;
  totalHours: number | null;

  metadata: CourseMetadata;
  pricings: CoursePricing[];
  studentCount?: number;
  lecturesCount?: number;
  quizzesCount?: number;
  academyInstructorIds: string[]; // UUIDs
  instructorId?: string; // UUID - Admin assigns instructor to course

  sections: CourseSection[];
}

export interface CourseItem
  extends Omit<CourseFormType, "category" | "subcategory" | "sections"> {
  id: string;
  created_at?: string; // iso date string
  updated_at?: string; // iso date string
  category?: Category | null;
  subCategory?: SupCategory | null;
  languages: string[];
  // TODO: add this fields
  modules?: CurriculumModule[];
  rating?: number;
  instructor?: {
    id: string;
    fullName: string | null;
    userName: string | null;
    photoUrl: string | null;
  };
  academy: {
    id: string;
  } | null;
  academyInstructors: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    name: string;
    photoUrl?: string;
    biography?: string;
  }[];
}

export interface SingleCourseResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  createdBy: string;
  type: "recorded" | "live" | "offline" | "hybrid";
  programType:
    | "course"
    | "certificate_of_achievement"
    | "professional_diploma"
    | "master"
    | "doctorate";
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
  sendEmail: boolean;
  courseDuration: number | null;
  courseDurationUnit: "days" | "weeks" | "months";
  lectureFrequency: string;
  lectureFrequencyUnit: "days" | "weeks" | "months";
  totalHours: number | null;
  isCourseFree: boolean;
  courseImage: string;
  previewVideo: string;
  metadata: CourseMetadata;
  academyInstructorIds: string[] | null;
  slug: string;
  averageRating: number;
  ratingCount: number;
  pricings: CoursePricing[];
  sections: SingleCourseSection[];
  instructor: {
    id: string;
    fullName: string;
    userName: string;
    photoUrl: string;
  };
  studentCount: number;
  lecturesCount: number;
  quizzesCount: number;
  relatedCourses?: RelatedCourse[];
}

export interface RelatedCourse {
  id: string;
  name: string;
  courseImage: string;
  studentCount: number;
  isFavorite: boolean;
}

export interface SingleCourseSection {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  description: string;
  order: number;
  items: SingleCourseSectionItem[];
}

export interface SingleCourseSectionItem {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  curriculumType: "lecture" | "assignment" | "quiz";
  order: number;
  lecture: Lecture | null;
  assignment: Assignment | null;
  quiz: SingleCourseQuiz | null;
}

export interface SingleCourseQuiz {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  createdBy: string;
  status: "draft" | "published" | "archived";
  title: string;
  instructions: string;
  standalone: boolean;
  randomize_questions: boolean;
  randomize_answers: boolean;
  immediate_feedback: boolean;
  feedback_by_email: boolean;
  passing_score: number;
  retakes: number;
  availability: "always" | "time_bound";
  start_date: string | null;
  end_date: string | null;
  late_time_minutes: number;
  attempt_mode: "single" | "multiple";
  answer_time_type: "quiz_time" | "question_time";
  answer_time: number;
  quizQuestions: SingleCourseQuizQuestion[];
}

export interface SingleCourseQuizQuestion {
  question: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    type: "mcq" | "true_false" | "short_answer";
    text: string;
    image_url: string;
    points: number;
    explanation: string;
    answers: {
      text: string;
      correct: boolean;
    }[];
  };
}

export interface CourseStudent {
  studentId: string;
  studentEmail: string;
  totalItems: number;
  completedItems: number;
  progressPercentage: number;
}

export interface CurriculumModule {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  name: string;
  description: string;
  order?: number;
  items: CurriculumItem[];
}

export type CurriculumItem = {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  curriculumType: "lecture" | "assignment" | "quiz";
  order?: number;
  lecture: Lecture | null;
  assignment: Assignment | null;
  quiz: Quiz | null;
};

export type Lecture = {
  id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  description?: string | null;
  videoUrl: string;
  title: string;
  materialUrl: string;
  isLectureFree: boolean;
};

export type Quiz = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
  status: "draft" | "published" | "archived";
  title: string;
  instructions: string;
  standalone: boolean;
  randomize_questions: boolean;
  randomize_answers: boolean;
  immediate_feedback: boolean;
  feedback_by_email: boolean;
  passing_score: number; // %
  retakes: number;
  availability: "always" | "time_bound";
  start_date: string | null; // ISO date (e.g. "2025-09-01")
  end_date: string | null; // ISO date
  late_time_minutes: number | null;
  attempt_mode: "single" | "multiple";
  answer_time_type: "quiz_time" | "question_time";
  answer_time: number; // minutes
  quizQuestions: QuizQuestion[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionIds: string[];
  explanation?: string;
};

export type QuizOption = {
  id: string;
  text: string;
};

export interface CourseSection {
  section: {
    id?: string | null;
    name: string;
    description: string;
    order: number;
  };
  items: CourseSectionItem[];
}

export interface CourseSectionItem {
  id?: string;
  curriculumType: string;
  lecture: {
    title: string | null;
    description: string | null;
    videoUrl: string | null;
    materialUrl: string | null;
    isLectureFree: boolean | null;
  };
  quizId: string | null; // UUID
  assignmentId: string | null; // UUID
  order: number;
}

// 🎯 Metadata Section
export interface CourseMetadata {
  courseOverview: string; // HTML content
  whoCanAttend: MetadataSection;
  whatWillYouLearn: MetadataSection;
  faqs: FAQ[];
  seo?: {
    metaTitle: string;
    metaKeywords: string[];
    metaDescription: string;
    metaImage?: string;
  };
}

// 🎯 Metadata Subsections
export interface MetadataSection {
  text: string;
  items: string[];
}

// 🎯 FAQ Interface
export interface FAQ {
  question: string;
  answer: string;
}

// 🎯 Pricing Interface
export interface CoursePricing {
  id?: string;
  currencyCode: string; // e.g., "EGP", "USD"
  regularPrice: number | null;
  salePrice: number | null;
  discountAmount: number | null;
  discountEnabled: boolean | null;
  isActive: boolean;
}

export interface CourseVideo {
  title: string;
  progress: number;
  url: string;
  locked: boolean;
  duration: string;
}

interface TabItem {
  title: string;
  progress?: number;
  name?: string;
  url?: string;
  locked?: boolean;
  duration: string;
  isPreview?: boolean;
  type: "lesson" | "quiz" | "material";
  questions?: number;
  completed?: boolean;
}

export interface Tab {
  title: string;
  total: number;
  completed?: number;
  items?: TabItem[];
}
export interface replies {
  id: string;
  user: {
    name: string;
    image: string;
    info?: string;
  };
  content: string;
  timestamp: number;
  likes: number;
  liked: boolean;
}

export interface question {
  id: string;
  user: {
    name: string;
    image: string;
    info?: string;
  };
  content: string;
  replies: replies[];
  timestamp: number;
  likes: number;
  liked: boolean;
  edited?: boolean;
}
export type CourseContentProps = {
  id: string;
  title: string;
  image: string;
  rating: number;
  lessons: number;
  duration: string;
  tabs: Tab[];
  date: string;
  category: string;
  supCategory: string;
  revenue: string;
  status: string;
  isActive: boolean;
  instructor: instructor;
  createdBy?: string; // Added for admin columns
  type: string;
  level: string;
  students: number;
  price: number;
  description: string;
  questions?: question[];
  materials: CourseMaterial[];
  skills?: string[];
  views?: views[];
  messages?: Message[];
  videoPreveiw: string;
  reviews: review[];
  isEnrolled?: boolean;
  faqs?: {
    question: string;
    answer: string;
  }[];
  quizzes: number;
  certifications: string;
  language: string[];
  related_search?: string[];
  learnOutcome?: string[];
  attends?: string[];
  certificates_list: Certificates[];
  sales?: number;
};

export interface CourseMaterial {
  id: string;
  name: string;
  date: string;
  fileType: string;
  downloadUrl: string;
}
export interface Certificates {
  id: string;
  name: string;
  program: string;
  grade: string;
  issue_date: string;
  serial: string;
  fileType: string;
  downloadUrl: string;
}
export interface views {
  name: string;
  image: string;
}

export interface LiveVidoesType {
  id: string;
  title: string;
  tabs: Tab[];
  instructor: instructor;
  views: views[];
  messages: Message[];
}
export interface Message {
  text: string;
  sender: string;
  avatar: string;
  name: string;
  timestamp: string;
}

// Define a simple Event interface
export interface Event {
  id: number;
  date: string;
  title: string;
  time: string;
  color: string;
  tags: string[];
}

export type InstructorType = {
  name: string;
  image: string;
  rating: number;
  coursesType: string[];
  achievement: number;
  certificate: number;
};
// instructors type

type Reviews = {
  user: {
    name: string;
    image: string;
  };
  content: string;
  rating: number;
};
type Certificate = {
  title: string;
  source: string;
};
export type Instructor = {
  id: string;
  name: string;
  email: string;
  info: string;
  avatar: string;
  phone: string;
  country: string;
  joinDate: string;
  type: string;
  courses: number;
  students: number;
  revenu: string;
  accountManager: string;
  isActive: boolean;
  isTop: boolean;
  education: string;
  age: number;
  status: string;
  reviews: number;
  sales: number;
  details: string;
  qualifications: string[];
  certificates: Certificate[];
  languages: string[];
  experience: number;
  reviews_content: Reviews[];
  amount?: number;
};

// student type
export type StudentProfile = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  country: string;
  state: string;
  studentId: string;
  joinDate: string;
  type: string;
  enrolledCourses: number;
  completedCourses: number;
  gradeAverage: string;
  accountManager: string;
  isActive: boolean;
  isTopPerformer: boolean;
  info: string;
  education: string;
  age: number;
  status: string;
  certificates: Certificate[];
  specializations: string[];
  languages: string[];
  yearOfStudy: number;
  details: string;
  revenue?: number;
  performanceReviews: {
    instructor: {
      name: string;
      image: string;
    };
    content: string;
    rating: number;
  }[];
  gender: "male" | "female";
  speciality: string;
  category: string;
  amount?: number;
};

// event type
export interface EventType {
  id: string;
  title: string;
  image: string;
  date: string;
  time: string;
  location: string;
  ticketsSold: number;
  totalTickets: number;
  description: string;
  status: string;
  ticketSoldPercentage: number;
  category: string;
  price: number;
  organizer: {
    name: string;
    logo?: string;
    email?: string;
    phone?: string;
    website?: string;
  };
  seat_plans: {
    name: string;
    price: number;
    color: string;
    status: string;
  }[];
  terms: {
    title: string;
    items: string[];
  }[];
  merchandise: {
    name: string;
    price: string;
    image: string;
  }[];
  partners: { image: string; url: string }[];
  seatingInfo: string[];
  ticketCategories: {
    name: string;
    price: number;
    description: string;
    status: string;
  }[];
  ticketBenefits: {
    category: string;
    benefits: string[];
    price: number;
  }[];
}

export interface CourseBundle {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  is_free: boolean;
  status: "draft" | "published" | "archived";
  pricings: BundlePricing[];
  courseBundles: {
    id: string;
    created_at?: string;
    course: CourseItem;
  }[];
  active: boolean;
  created_by: string;
  created_at?: string; // iso date string
  updated_at?: string; // iso date string
}

export interface BundlePricing {
  currency_code: string;
  regular_price: number;
  sale_price?: number;
  discount_amount?: number;
  discount_enabled?: boolean;
  is_active?: boolean;
}

export type AssignmentStatus = "draft" | "published" | "archived";
export type AssignmentGrading = "A" | "A-" | "B+" | "B" | "C" | "D" | "F";

// export interface Assignment {
//   id: string;
//   title: string;
//   image: string;
//   status: AssignmentStatus;
//   course: string;
//   dueDate: string;
//   points: number;
//   submissions: number;
//   questions: number;
//   createdAt: string;
//   submissionDate?: string;
//   pdfInstructions: string;
//   grading: AssignmentGrading;
//   subject?: string;
// }

export interface Assignment {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  start_date: string | null;
  end_date: string | null;
  instructions: string;
  attachment_url: string;
  totalPoints: number;
  numberOfQuestions: number;
  createdBy: string;
  academy: string | null;
  submissions: unknown[];
  studentsSubmitted?: number;
  averageScore?: number;
  submissionRate?: number;
  // Deprecated fields (for backwards compatibility)
  title?: string;
  image?: string;
  status?: AssignmentStatus;
  course?: string;
  dueDate?: string;
  points?: number;
  questions?: number;
  createdAt?: string;
  submissionDate?: string;
  pdfInstructions?: string;
  grading?: AssignmentGrading;
  subject?: string;
}
