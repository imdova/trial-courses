export interface InstructorType {
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
  instagramUrl: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  youtubeUrl: string | null;
  languages: string[] | null;
  metadata: object | null; // You might want to define a more specific type for metadata
  isPublic: boolean;
  country: string | null;
  state: string | null;
  city: string | null;
  completionPercentage: number;
  user: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    email: string;
    refreshTokenExpiresAt: string;
    isEmailVerified: boolean;
    emailVerificationToken: string | null;
  };
  category: string | null;
  speciality: string | null;
}
