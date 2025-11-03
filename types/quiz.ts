import { Instructor } from "./courses";

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Question {
  id: string;
  type: "multiple-choice" | "true-false" | "fill-in-the-blank" | "short-answer";
  text: string;
  points: number;
  options?: Option[];
  explanation: string;
  answerCorrect?: number | string;
  imageUrl?: string;
  imageAlt?: string;
}

export interface Quiz {
  id: string;
  title: string;
  instructions: string;
  randomizeQuestions: boolean;
  immediateFeedback: boolean;
  feedbackByEmail: boolean;
  timeLimit: number;
  passingScore: number;
  retakeNumbers: number;
  questions: Question[];
  students?: {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
  }[];
  avarageScore: number;
  instructor: Instructor;
  takeTime: string;
  questionsOrder: string;
  date?: string;
  status?: "published" | "draft" | "closed"; // Updated to use string literals matching the Record in quizzesColumns
  isActive?: boolean;
  // Overview API response properties
  totalStudents?: number;
  enrollments?: number;
  averageScore?: number;
  averageTime?: number;
  category?: string;
  supCategory?: string;
  studentsNum?: number;
  revenue?: number;
  type?: string;
  questionsNum?: number;
  viewLink?: string;
  downloadLink?: string;
  isExpanded?: boolean;
  isLocked?: boolean;
  success_rate?: number;
}

export interface LatestQuiz {
  quizId: string;
  quizTitle: string;
  quizStatus: "published" | "draft" | "closed";
  passingScore: number;
  score: number;
  passed: boolean;
  attemptedAt: string;
  course: {
    id: string;
    name: string;
    slug: string;
  };
}
