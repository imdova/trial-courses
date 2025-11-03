/* eslint-disable @typescript-eslint/no-explicit-any */
import { Path, RegisterOptions } from "react-hook-form";
import { StudentProfile } from "./courses";

export type FilterSchema<T extends object> = {
  [K in keyof T]: [string, string];
};

export type ButtonColor =
  | "primary"
  | "secondary"
  | "danger"
  | "error"
  | "success"
  | "warning";

export interface FileWithPreview extends File {
  preview: string;
  uploaded?: boolean;
}
export type formDataSettings = {
  // profile
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  website: string;
  userAvatar: FileList;
  //Communication
  newEnrollment: boolean;
  courseCompletion: boolean;
  studentQuestions: boolean;
  reviewNotifications: boolean;
  announcements: boolean;
  systemUpdates: boolean;
  weeklyReports: boolean;
  //Payout
  payoutMethod: "bank" | "instapay" | "mobile";
  accountHolderName: string;
  accountNumber: string;
  routingNumber: string;
  instapayUsername: string;
  walletNumber: string;
  taxId: string;
  country: string;
  payoutSchedule: string;
  // Security
  email: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  countryCode: string;
  phoneNumber: string;
};

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "time"
  | "phone"
  | "password"
  | "date"
  | "textEditor"
  | "select"
  | "search-select"
  | "checkbox"
  | "component"
  | "radio"
  | "file"
  | "textArea"
  | "otp"
  | "multi-text"
  | "color"
  | "code"
  | "upload-area";

export interface GridProps {
  xs?: number;
  sm?: number;
  md?: number;
  rowXs?: number;
  rowSm?: number;
  rowMd?: number;
}

export interface Option<T = Record<string, unknown>> {
  value: keyof T;
  label: React.ReactNode | string;
  accessory?: React.ReactNode | string;
  searchValue?: string;
  pattern?: string;
  icon?: React.ReactNode;
}
export type ErrorField = {
  field: string; // e.g., "photo" or "content.status"
  label?: string; // e.g., "Photo"
  message?: string;
  tab?: string | number;
};
export interface FieldConfig<T = any> {
  id?: string;
  name: Path<T>;
  label?: string;
  type?: FieldType;

  required?: boolean;
  dependsOn?: string;
  rules?: Record<string, any>;
  multiple?: boolean;
  returnOption?: boolean;

  resetFields?: string[];
  hideFieldNames?: string[];
  unHideFieldNames?: string[];

  onChange?: (value: any) => void;

  // Layout & UI
  gridProps?: GridProps;

  // Field-specific props
  fileProps?: Partial<FileProps>;
  textFieldProps?: Record<string, any>;
  dateFieldProps?: Record<string, any>;
  selectProps?: Record<string, any>;

  // Custom Component
  component?: React.ComponentType<any>;
  componentProps?: Record<string, any>;

  // Selectable Options (for dropdowns etc.)
  options?: Option[];
  icon?: React.ReactNode;
}

export type FileFieldType = "profile" | "image" | "images" | "files";

export interface FileProps {
  type?: FileFieldType;
  maxFiles?: number;
  multiple?: boolean;
  previewType?: "image" | "list" | "grid" | "pdf";
  maxSize?: number; // in KB/MB
  acceptedFileTypes?: string[];
  size?: number | "full"; // for layout
  className?: string;
  imageClass?: string;
  shape?: "circle" | "square";
  urlField?: boolean;
  autoUpload?: boolean;
}

export interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

export interface FormContentProps {
  fields: FieldConfig[];
  onSubmit?: (data: any) => any;
  formMethods: any;
  hiddenFields: string[];
  onDelete?: (data: any) => void;
  resetValues: (fieldNames: (string | number)[]) => void;
  onCheckboxChange: (field: any) => (event: any) => void;
  children?: React.ReactNode;
  loading?: boolean;
  error?: string;
  deleteLoading?: boolean;
  onCancel: () => void;
  submitButtonText?: React.ReactNode;
  deleteButtonText?: string;
  cancelButtonText?: string;
  onChange?: (fieldName: string, value: string) => void;
  removeField?: (fieldName: string) => void;
  dialog?: boolean;
  enableResetButton?: boolean;
  onReset?: () => void;
  resetAfterSubmit?: string;
}

export interface FormModalProps {
  open: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  onClose?: () => void;
  onChange?: (fieldName: string, value: string) => void;
  onSubmit?: (data: any) => Promise<{ error?: boolean } | void> | void;
  onDelete?: (data: any) => void;
  fields?: FieldConfig[];
  title?: string;
  description?: React.ReactNode;
  initialValues?: Record<string, any>;
  children?: React.ReactNode;
  loading?: boolean;
  deleteLoading?: boolean;
  error?: string;
  removeField?: (fieldName: string) => void;
  mode?: "onBlur" | "onChange" | "onSubmit" | "onTouched" | "all" | undefined;
  ///
  submitButtonText?: React.ReactNode;
  deleteButtonText?: string;
  cancelButtonText?: string;
  enableResetButton?: boolean;
  resetAfterSubmit?: "default" | "new";
}

export interface ActionOption<T = object> {
  value?: string;
  label: ((item?: T) => React.ReactNode) | React.ReactNode;
  action?: (item?: T) => void;
  icon?: React.ReactNode;
}

export interface NoDataMessage {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: {
    label: React.ReactNode;
    href?: string;
    onClick?: () => void;
  };
}

// types/quiz.ts
export type QuestionOption = {
  id: string;
  text: string;
  imageUrl?: string | null;
  isCorrect: boolean;
};

export type QuestionType =
  | "multiple-choice"
  | "single-choice"
  | "true-false"
  | "short-answer"
  | "fill-in-the-blank";

export type Question = {
  id: string;
  type: QuestionType;
  text: string;
  points: number;
  imageUrl?: string | null;
  options?: QuestionOption[];
  explanation?: string;
  isExpanded: boolean;
};

export type QuizFormValues = {
  title: string;
  instructions: string;
  randomize_questions: boolean;
  immediate_feedback: boolean;
  feedback_by_email: boolean;
  start_date: string;
  end_date: string;
  late_time_minutes: number;
  retakes: number;
  passing_score: number;
  questions: Question[];
};

// types for quiz two
export type QuizFormValuesTwo = {
  // Basic Info
  title: string;
  instructions: string;

  // Schedule
  startDate: string;
  endDate: string;
  availability: string;
  timeControl: string; // Default selection
  quizTimer: {
    minutes: number;
    seconds: number;
  };
  limitQuestionTime: {
    minutes: number;
    seconds: number;
  };
  // Attempts & Retakes
  retakeNumbers: number;
  takenTime: string;
  lateTime: number;
  multipleTakenTime: number;
  perPersonPerDayTakenTime: number;
  per_person_per_day: boolean;

  // Scoring & Passing
  passingScoreAllawed: boolean;
  passingScore: number;

  // Behavior Settings
  randomizeQuestions: boolean;
  randomizeAnswers: boolean;
  immediateFeedback: boolean;
  feedbackByEmail: boolean;
  answerSummary: boolean;

  // Timer Settings
  enableQuizTimer: boolean;
  timeLimit: number; // total quiz time in minutes
  timeLimitperQuestion: boolean;

  // Questions
  questions: Question[];
};

export type RadioGroupOption = {
  value: string;
  label: string;
  description?: string;
  showInput?: boolean;
  inputProps?: {
    name: keyof QuizFormValuesTwo;
    placeholder?: string;
    label?: string;
    type?: string;
    className?: string;
    validation?: RegisterOptions<QuizFormValuesTwo, keyof QuizFormValuesTwo>;
  };
};

// Define the Invoice Form Data
export interface InvoiceFormData {
  id: string;
  subject: string;
  student: StudentProfile;
  issueDate: string;
  dueDate: string;
  currency: string;
  description: string;
  items: {
    courseId: string;
    quantity: number;
    price: number;
    taxRate: number;
    title: string;
    image: string;
  }[];
  tax: number;
  subtotal: number;
  total: number;
  invoiceNumber: string;
  status: "Pending" | "Paid" | "Cancelled";
  addCoupon: boolean;
  couponId: string;
  addDiscount: boolean;
  discount: number;
}

// Academy form valus type
export interface AcademyFormData {
  name: string;
  avatar?: string | File | undefined;
  category: string;
  speciality: string[];
  type: "University" | "Academy" | "Institute" | "Online Platform";
  foundedYear: number;
  accreditation?: string;
  location: {
    address: string;
    city: string;
    country: string;
  };
  contactInfo: {
    email: string;
    phone: string;
    website?: string;
    socialLinks?: {
      facebook?: string;
      linkedin?: string;
      twitter?: string;
    };
  };
  about: string;
  programsOffered: string[];
  facilities: string[];
  images?: string[];
  instructors?: AcademyInstructor[];
  studentsCount: number;
  alumniNetwork?: string;
  tuitionFeesRange: string;
  durationOfPrograms?: Record<string, string>;
  admissionRequirements: string[];
  reviews?: Review[];
}

export interface AcademyInstructor {
  name: string;
  title: string;
  photo?: string;
  id: string;
  bio?: string;
}

export interface Review {
  student: string;
  program: string;
  feedback: string;
}
