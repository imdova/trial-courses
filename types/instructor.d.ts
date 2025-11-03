interface LocationItem {
  code: string;
  name: string;
}

interface SocialMediaLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface LanguageProficiency {
  language: string;
  proficiency: "basic" | "intermediate" | "fluent" | "native";
}

type MaritalStatus = "single" | "married" | "divorced" | "widowed";

type Certificate = {
  title: string;
  organization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
};

type LanguageProf = {
  name: string;
  proficiency: string;
};

interface UserProfile {
  id: string;
  userName: string;
  phone: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  avatar: string | null;
  birthDate: string | null;
  type: string;
  active: boolean;
  bio: string;
  title: string | null;
  languages?: LanguageProf[] | null;
  resume: string | null;
  socialLinks?: SocialMediaLinks;
  whatsapp: string | null;
  nationality: string | null;
  maritalStatus: MaritalStatus | null;
  qualifications: string[];
  hasDrivingLicence: boolean | null;
  country: LocationItem | null;
  state: LocationItem | null;
  city: string | null;
  isPublic: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  _version: number;
  isLocked: boolean;
  gender: "male" | "female" | "other" | null;
  certificates?: Certificate[];
  experience: number;
  reviews: string;
  rating: number;
  students: number;
  shortcuts: string[];
  skills: string[];
  about?: string;
}

interface InstructorApiResponse {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string | null;
  phoneNumber: string | null;
  hasWhatsapp: boolean;
  phoneNumbertForWhatsapp: string | null;
  dateOfBirth: string | null;
  gender: "male" | "female" | "other" | null;
  nationality: string | null;
  maritalStatus: MaritalStatus | null;
  hasDrivingLicense: boolean;
  resumePath: string | null;
  contactEmail: string | null;
  linkedinUrl: string | null;
  languages: LanguageProf[] | null;
  metadata: string | null;
  isPublic: boolean;
  user: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    email: string;
    role: RoleState;
  };
  category: string | null;
  speciality: string | null;
}

// Alternative shorter version if you prefer
interface InstructorData {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  photoUrl: string | null;
  phoneNumber: string | null;
  hasWhatsapp: boolean;
  phoneNumbertForWhatsapp: string | null;
  dateOfBirth: string | null;
  gender: "male" | "female" | "other" | null;
  nationality: string | null;
  maritalStatus: "single" | "married" | "divorced" | "widowed" | null;
  hasDrivingLicense: boolean;
  resumePath: string | null;
  contactEmail: string | null;
  linkedinUrl: string | null;
  instagramUrl?: string,
  twitterUrl?: string,
  facebookUrl?: string,
  youtubeUrl?: string,
  languages: { name: string; proficiency: string; }[] | null;
  metadata: {
    bio?: string,
    experience: [],
    courses:[],
    skills: [],
    education: [],
    activities: []
  },
  isPublic: boolean;
  user: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    email: string;
    role: "student" | "instructor" | "admin" | "unverified";
  },
  category?: string | null;
  speciality?: string | null;
  about?: string,
  country?: {
    code: string
  },
  state?: {
    name: string,
    code: string
  },
  city?: string,
  languages: [
    {
      language: string,
      level: string
    }
  ],
  completionPercentage: number,
}

interface InstructorProfile extends UserProfile {
  // Academic Information
  departmentId?: string | null;
  department?: string | null;
  specializationId?: string | null;
  specialization?: string | null;
  academicRankId?: string | null;
  academicRank?: string | null;

  // Professional Information
  officeLocation?: string | null;
  officeHours?: string | null;
  website?: string | null;
  bio?: string | null;

  // Teaching Information
  coursesTaught?: string[] | null;
  researchInterests?: string[] | null;
  publications?: string[] | null;

  // Experience (kept from original but renamed for clarity)
  totalYearsExperience?: number | null;
  categoryId?: string | null; // Alias for departmentId if needed
  category?: string | null; // Alias for department if needed
  specialityId?: string | null; // Alias for specializationId if needed
  speciality?: string | null; // Alias for specialization if needed
  careerLevelId?: string | null; // Alias for academicRankId if needed
  careerLevel?: string | null; // Alias for academicRank if needed
  yearStartedTeaching?: string;
  employmentType?: string;
}

type ExperienceData = {
  id: string;
  name: string;
  title: string;
  country: LocationItem;
  state: LocationItem;
  city: string;
  startDate: string;
  endDate: string;
  isPresent: boolean;
};
// For backward compatibility
type UserProfile = InstructorProfile;

interface TrainingCenter {
  id: string;
  name: string;
  cover?: string | File;
  about: string;
  username: string;
  location: {
    city: string;
    country: string;
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  facilities: string[];
  courses: CourseType[];
  instructors: InstructorProfile[];
  rating?: number;
  avatar?: string | File;
  description: string;
  location?: Location;
  completencePercent: number;
  socialLinks?: SocialMediaLinks;
  
}
