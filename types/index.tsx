/* eslint-disable @typescript-eslint/no-explicit-any */
import { JobWorkPlace } from "@/constants/enums/work-place.enum";
import { Permission } from "./permissions";
import { Gender } from "@/constants/enums/gender.enum";
import { EducationLevel } from "@/constants/enums/education-level.enum";
import { StartDateType } from "@/constants/enums/start-type.enum";
import { SalaryCurrency } from "@/constants/enums/currency.enum";
import { CompanyStatus } from "@/constants/enums/company-status.enum";
import { CompanySize } from "@/constants/enums/company-size.enum";
import { StaticImageData } from "next/image";
import { User } from "next-auth";
import { Path } from "react-hook-form";
import { LucideIcon } from "lucide-react";
import { StudentProfile } from "./courses";
import { Permission_Keys } from "@/constants/enums/Permission_Keys.enum";
import { NotificationEnum } from "@/constants/enums/notifications.enum";
import { ColumnDef } from "@tanstack/react-table";
import { SubscriptionPlan } from "./finance";
import { RoleState } from "./next-auth";
import { RegisterCategory } from "@/constants/enums/register-category.enum";

export interface Location {
  country?: {
    code: string;
    name: string;
  };
  state?: {
    code: string;
    name: string;
  };
  city?: string;
  address?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export type Country = {
  name: string;
  isoCode: string;
  flag: string;
  phonecode: string;
  currency: string;
  latitude: string;
  longitude: string;
};
export type CountryMin = {
  name: string;
  code: string;
};

export type State = {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
};
export type City = {
  name: string;
  isoCode: string;
  countryCode: string;
  latitude: string;
  longitude: string;
};

export interface Result<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number; // ms
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  // you can add more props like icon, title, etc.
}

export interface UserState {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  type: User[];
  photo: string | null;
  phone: string | null;
  companyId: string | null;
  permissions: Permission[];
}

export interface registerData {
  firstName: string;
  lastName: string;
  email: string;
  rolesIds: string[];
  type: RoleState;
  category?: RegisterCategory;
  password?: string;
  metaData?: {
    companyId?: string;
    title?: string;
    departmentId?: string;
  };
}

export interface BaseHeaderProps {
  user?: User;
  pathname: string;
}
export interface Action {
  label: string;
  url: string;
}

export interface NotificationType {
  id: string;
  studentId?: string;
  type: NotificationEnum; // You can add other types if known
  title: string;
  message: string;
  isRead: boolean;
  metaData: {
    student?: {
      id?: string;
      name?: string;
      title?: string;
      username?: string;
      image?: string | null;
    };
    instructor?: {
      id?: string;
      name?: string;
      title?: string;
      username?: string;
      image?: string | null;
    };
    course?: {
      id?: string;
      title?: string;
      applicationCount?: number;
    };

    percentage?: number;
  };
  //TODO : Must add those
  created_at: string; // ISO timestamp for when the notification was created
}

export interface Notification {
  id: number;
  typee: "info" | "error" | "warning" | "success";
  message: string;
  title: string;
  timestamp: string;
  read: boolean;
  user: Partial<User>;
  action: Action;
}

export declare enum PrefetchKind {
  AUTO = "auto",
  FULL = "full",
  TEMPORARY = "temporary",
}
export interface AppRouterInstance {
  back(): void;
  forward(): void;
  refresh(): void;
  push(href: string, options?: { scroll?: boolean }): void;
  replace(href: string, options?: { scroll?: boolean }): void;
  prefetch(href: string, options?: { kind: PrefetchKind }): void;
}

export type BadgeVariant =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "neutral"
  | "complete"
  | "missing-title"
  | "missing-description"
  | "premium"
  | "needs-review";

export interface Experience {
  name: string;
  country: CountryMin;
  startDate: string;
  endDate: string;
}

export interface Education {
  name: string;
  country: CountryMin;
  specialty: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ContactInfo {
  whatsapp: string;
  phoneNumber: string;
  email: string;
}

export interface Doctor {
  id: string;
  image: string;
  name: string;
  location: string;
  specialty: string;
  yearsOfExperience: number;
  consultant: boolean;
  field: string;
  contactInfo: ContactInfo;
  experience: Experience[];
  education: Education[];
  available: boolean;
}

type CountryInData = {
  name: string;
  code: string;
};

export interface Company {
  id: string;
  name: string;
  username: string;
  title?: string | null;
  about?: string;
  completencePercent?: number;
  isPrivate?: boolean;
  isProfitable?: boolean;
  status?: CompanyStatus | null;
  country?: CountryInData | null;
  state?: CountryInData | null;
  city?: string;
  size?: CompanySize | null;
  phone?: string;
  cover?: string;
  email?: string;
  yearFounded?: number | string;
  avatar?: string | null;
  socialLinks?: SocialMediaLinks | null;
  visible?: boolean;
  profileUrl?: string;
  companyTypeId?: string | null;
  companySectorId?: string | null;
  banner1?: string | null;
  banner2?: string | null;
  banner3?: string | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  _version?: number;
  token?: string | null;
  phoneOtp?: string | null;
  unverifiedPhone?: string | null;
  companySectorName?: string | null;
  companyTypeName?: string | null;

  plan?: SubscriptionPlan; // no
  openJobs?: number | null; // no
  revenue?: number | null; // no
}
// TODO: add open jobs
export interface Department {
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
}
export interface MiniCompany {
  name: string;
  industry: string;
  website: string;
  contact: string;
}

export type Sector = {
  id: string;
  name: string;
};
export interface Job {
  id: string;
  title: string;
  location: string;
  education: string;
  specialty: string;
  features: string[];
  timeStamps: Date;
  description: string;
  requirements: string[];
  additionalDetails: string;
  skills: string[];
  relatedSearch: string[];
  company: MiniCompany;
}

export interface JobData {
  id?: string;
  companyId: string;
  title: string;
  jobIndustryId: string;
  jobSectorId: string | null;
  jobSpecialityId: string | null;
  jobCategoryId: string | null;
  jobCareerLevelId: string | null;
  jobEmploymentTypeId: string | null;
  jobWorkPlace: JobWorkPlace | null;
  gender: Gender | null;
  minAge: number | null;
  maxAge: number | null;
  educationLevel: EducationLevel | null;
  countryCode: string | null;
  city: string | null;
  maxExpYears: number | null;
  minExpYears: number | null;
  hideSalary: boolean | null;
  salaryRangeStart: number | null;
  salaryRangeEnd: number | null;
  salaryCurrency: SalaryCurrency | null;
  availableVacancies: number | null;
  description: string | null;
  requirements: string | null;
  salaryDetails: string | null;
  keywords: string[] | null;
  skills: string[] | null;
  questions: string[] | null;
  showCompany: boolean | null;
  recieveEmails: boolean | null;
  jobEmail: string | null;
  draft: boolean | null;
  active: boolean | null;
  closed: boolean | null;
  validTo: string | null; // ISO date string
  startDateType: StartDateType | null;
}

export interface FilterOption {
  label: string;
  count: number;
  value: string;
}

export interface FilterSectionType {
  key: string;
  title: string;
  options: FilterOption[];
}

export interface Folder {
  id: number;
  name: string;
  candidates: number;
  lastModified: Date;
}

export interface SortFolders {
  key: keyof Folder;
  direction: "asc" | "desc";
}

export interface Specialty {
  id: number | string;
  image: string;
  title: string;
  jobsNumber: number;
  link: string;
}

export interface CompanyItem {
  id: string | number;
  image: string;
  title: string;
  description: string;
  tag: string;
}

export interface NotificationItem {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: { status: "normal" | "warning" | "error" | "success"; text: string }[];
  timeStamp: Date;
  isRead: boolean;
  readTime: Date | null;
  category: string;
  image: string;
}

export interface HeaderLink {
  title: string;
  url: string;
}
export type CommonLinksType = "home";

export type RoleBasedLinks = {
  [key in User["type"] | "default"]: NavItem[];
};

export type CommonLinks = {
  [key in CommonLinksType]: HeaderLink[];
};

export type NavItem = {
  id: number;
  icon?: React.ElementType;
  label?: string;
  path?: string;
  pattern?: string;
  notifications?: number;
  section?: string; // Optional section header
  permissions: Permission_Keys[];
  type?:
    | "divider"
    | "text"
    | "collapse"
    | "supLink"
    | "profile"
    | "notification"
    | "chat";
  links?: NavItem[];
};

export interface Option<T = Record<string, any>> {
  value: keyof T;
  label: React.ReactNode;
  pattern?: string;
  icon?: React.ReactNode;
}

export interface ActiveLinkResult {
  activeIndex: number;
  parentId: number | null;
}

export type Role = {
  permissions: { name: Permission }[];
};

// Define the type for each object in the array
type LanguageItem = {
  id: string | number;
  title: string;
  src: StaticImageData;
};

// Define the type for the array of LanguageItem objects
export type CommonLangouge = LanguageItem[];

// Define the type for Status of Employers
export type StateType = "Active" | "Inactive" | "Processing";

export interface RowDataEmployer {
  id: number;
  name: string;
  email: string;
  avatar: string;
  reg_date: string;
  phone: number | string;
  country: string;
  type: string;
  Sector: string;
  Plan: string;
  job: number;
  status: "Active" | "Inactive" | "Processing";
}
export interface RowDataJobs {
  id: number;
  job_title: string;
  employer_name: string;
  reg_date: string;
  country: string;
  view: number;
  applicant: number;
  status: "Active" | "Inactive" | "Processing";
}
export interface RowDataCountry {
  id: number;
  avatar_country: string;
  country: string;
  job: number;
  Employers_jobs: number;
  revenue: string | number;
}

// type for phon numer country
export interface CountryPhone {
  code: string;
  label: string;
  phone: string;
}

// **************
// Define the User type
export type UserProps = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  type: User["type"];
};

export interface Industry {
  id: string;
  name: string;
}

export interface ColumnConfig<T> {
  key?: Path<T>; // Field to display
  header?: string; // Column header text
  sortable?: boolean; // Enable sorting
  render?: (item: T, index: number) => React.ReactNode | void; // Add index as optional param
  width?: string | number; // Optional column width
}

export interface SortConfig<T> {
  key: Path<T>;
  direction: "asc" | "desc";
}

export type AdvancedColumnConfig<T> = ColumnDef<T> & {
  accessorKey?: Path<T>;
};

export interface Category {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  createdBy: string;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  priority?: number;
  isActive?: boolean;
  parent: Omit<Category, "parent" | "subcategories"> | null;
  subcategories: SupCategory[];

  // TODO: add this field to the database
  coursesNumber?: number | null;
}
export type SupCategory = Omit<Category, "parent" | "subcategories">;

export interface GridProps {
  xs?: number;
  sm?: number;
  md?: number;
  rowXs?: number;
  rowSm?: number;
  rowMd?: number;
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
}

export interface OptionTab<T = Record<string, any>> {
  value: keyof T;
  label: React.ReactNode;
  pattern?: string;
  icon?: React.ReactNode;
  matchChildren?: boolean;
}

export interface FilterOptionTable {
  label: string;
  count?: number;
  value: string;
}

export interface FilterConfigTable {
  id: string;
  label: string;
  options: FilterOptionTable[];
  icon?: LucideIcon;
  placeholder?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
    onChange?: (value: string) => void; 
}

// add coures form
// Type for curriculum items
export type Lecture = {
  isExpanded: boolean;
  id: string;
  title: string;
  videoUri: string;
  materialUris: string[];
  freeLecture: boolean;
  quizId: string | null;
  preview?: boolean;
  isLocked?: boolean;
};

export type Quiz = {
  isExpanded: boolean;
  id: string;
  title: string;
  isLocked?: boolean;
};

export type ContentItem = {
  id: string;
  type: "lecture" | "quiz";
  data: Lecture | Quiz;
};

export interface Section {
  id: string;
  title: string;
  description: string;
  isExpanded: boolean;
  content?: ContentItem[];
}
export type FAQ = {
  question: string;
  answer: string;
};
export type Currency = "USD" | "EGP" | "SAR";

// Define types for the form
export type CourseFormValues = {
  // ────────────── Identifiers ──────────────
  id: string;
  courseName: string;

  // ────────────── Categories ──────────────
  mainCategory: string;
  subCategory: string;
  courseType: string;
  level: string;
  tags: string[];
  tagsInput: string[];

  // ────────────── Course Content ──────────────
  courseOverview: string;
  learningOutcomes: string[];
  learnDescribe: string;
  requirements: string;
  sections: Section[];
  faqs: FAQ[];

  // ────────────── Target Audience ──────────────
  attendees: string[];
  attendDescribe: string;

  // ────────────── Pricing ──────────────
  free_coures: boolean;
  regularPrice: Record<Currency, number>;
  salePrice: Record<Currency, number>;
  lastChangedField?: string;
  discounts: Record<
    Currency,
    {
      active: boolean;
      percentage: number;
    }
  >;
  discountedPrice: number;
  discountValue: number;
  currency: string;
  allowPlatformCoupons: boolean;
  discountAmount: number;

  // ────────────── Enrollment & Access ──────────────
  EnrollmentRequirement: boolean;
  allowRepurchase: boolean;
  repurchaseAction: string;
  blockContentAfterExpiration: boolean;

  // ────────────── Scheduling ──────────────
  courseDuration: number;
  numberOfLectures: number;
  totalHours: number;
  courseDurationType: string;
  lectureFrequency: string;
  lectureInterval: string;
  publishDateTime: string;
  presaleStart?: string;
  presaleEnd?: string;
  normalSaleStart?: string;
  normalSaleEnd?: string;

  // ────────────── Instructor Management ──────────────
  instructors: string[];
  selectedinstructors: string[];
  selectedinstructor: string;

  // ────────────── Media ──────────────
  courseImage: FileList | null;
  previewVideo: string;

  // ────────────── Communication ──────────────
  sendEmail: boolean;
};

export type FormBundelValues = {
  title: string;
  courses: string[];
  priceType: string;
  price: number;
  discounts: Record<
    Currency,
    {
      active: boolean;
      percentage: number;
    }
  >;
  thumbnail?: File | string | null;
  details: string;
  // ────────────── Pricing ──────────────
  bundle_free: boolean;
  regularPrice: Record<Currency, number>;
  salePrice: Record<Currency, number>;
  lastChangedField?: string;
  discountedPrice: number;
  discountValue: number;
  currency: string;
  offerDiscount: boolean;
  discountAmount: number;
};

export type ColumnDefinition<T> = {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  align?: string;
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
};

export interface OptionSelect {
  label: string;
  value: string;
  icon?: React.ReactNode;
  image?: string;
}

export interface Coupon {
  id: string;
  offerName: string;
  mode: "Coupon" | "Voucher";
  offerType: "Flat" | "Percentage";
  amount: string;
  startDate: string;
  endDate: string;
  status: "Active" | "Expired" | "Inactive";
  totalUsage: number;
}

export interface Invoice {
  id: string;
  student: StudentProfile;
  subject: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  description: string;
  items: {
    courseId: string;
    quantity: number;
    taxRate: number;
    price: number;
    title: string;
    image: string;
  }[];
  tax: number;
  discount: number;
  subtotal: number;
  total: number;
  invoiceNumber: string;
  status: "Pending" | "Paid" | "Cancelled"; // Assuming status can be one of these
}
export type ExperienceItemData = {
  id: string;
  title: string;
  company: string;
  startDate: string | Date;
  endDate?: string | Date;
  isPresent: boolean;
  location?: LocationType;
  description?: string;
};

export type ValidationRule = {
  field: string; // e.g., "photo" or "content.status"
  label?: string; // e.g., "Photo"
  message?: string;
  tab?: string | number;
  regex?: RegExp; // Optional if using a custom validator
  validate?: (value: any) => boolean; // Custom function to validate
};

export type ErrorField = {
  field: string; // e.g., "photo" or "content.status"
  label?: string; // e.g., "Photo"
  message?: string;
  tab?: string | number;
};
