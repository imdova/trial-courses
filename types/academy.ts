import {
  emailSchema,
  imageUrlSchema,
  phoneSchema,
  slugSchema,
} from "@/constants/schemas";
import { nameSchema } from "@/constants/schemas/schemas";
import z from "zod";

// types.ts
export interface AcademyInstructor {
  id: string;
  name: string;
  photoUrl?: string;
  biography?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface Review {
  student: string;
  program: string;
  feedback: string;
}

export interface AcademyKeyword {
  id: string;
  name: string;
}

export interface Academy {
  id: string;
  name: string;
  image: string;
  cover: string;
  description: string;
  slug: string;
  about: string;
  keyWords?: string[]; // admin will enter a list of key words and the academy admin can select from them at least 3
  type: "Training Center" | "Academy" | "College" | "University";
  size:
    | "1-10"
    | "11-50"
    | "51-100"
    | "101-500"
    | "501-1000"
    | "1001-5000"
    | "5000+"; // recommend better sizing cause it will used for search
  foundedYear: number;
  createdBy?: {
    id: string;
    name: string;
    photo: string;
    role: string;
  };
  address: string;
  city?: {
    name: string;
    code: string;
  } | null;
  country?: {
    name: string;
    code: string;
  } | null;
  email: string;
  contactEmail: string;
  phone: string;
  completionPercentage?: number;
  socialLinks?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
    snapchat?: string;
    pinterest?: string;
    reddit?: string;
    discord?: string;
    telegram?: string;
    whatsapp?: string;
  };
  gallery?: string[]; // Center images
  instructors: AcademyInstructor[];
  studentsCount: number;
  fakeStudentsCount: number;
  displayRealStudentsCount: boolean;
  reviews: Review[];
  isVerified?: boolean; // admin will set if this academy is verified or not (Used for verified icon)

  // for authorized user
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isIdentityVerified: boolean;
}

export interface EditAcademy extends Omit<Academy, "id"> {
  id?: string | null;
}

export const academySchema = z.object({
  name: nameSchema.optional(),
  contactEmail: emailSchema.optional(),
  slug: slugSchema.optional(),
  phone: phoneSchema.optional(),
  image: imageUrlSchema.optional(),
  cover: imageUrlSchema.optional(),

  about: z
    .string()
    .min(10, "About should be at least 10 characters long")
    .max(10000, "About must be less than 10000 characters")
    .optional(),
  fakeStudentsCount: z.number().optional(),
  displayRealStudentsCount: z.boolean().optional(),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters long")
    .max(50, "Description must be less than 50 characters")
    .optional(),

  keyWords: z
    .array(z.string().min(1))
    .min(3, "At least 3 keywords are required")
    .optional(),

  type: z
    .enum(["Training Center", "Academy", "College", "University"], {
      message: "Type is required",
    })
    .optional(),

  size: z
    .enum(
      ["1-10", "11-50", "51-100", "101-500", "501-1000", "1001-5000", "5000+"],
      {
        message: "Size is required",
      },
    )
    .optional(),

  foundedYear: z
    .number("Founded year must be a number")
    .int()
    .gte(1800, "Founded year must be after 1800")
    .lte(new Date().getFullYear(), "Founded year cannot be in the future")
    .optional(),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(255, "Address must be less than 255 characters long")
    .optional(),

  city: z
    .object({
      name: z.string().min(2, "City name is too short"),
      code: z.string().min(1, "City code is required"),
    })
    .nullable()
    .optional(),

  country: z
    .object({
      name: z.string().min(2, "Country name is too short"),
      code: z.string().min(1, "Country code is required"),
    })
    .nullable()
    .optional(),

  socialLinks: z
    .object({
      website: z.string().optional(),
      facebook: z.string().optional(),
      twitter: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      youtube: z.string().optional(),
      tiktok: z.string().optional(),
      snapchat: z.string().optional(),
      pinterest: z.string().optional(),
      reddit: z.string().optional(),
      discord: z.string().optional(),
      telegram: z.string().optional(),
      whatsapp: z.string().optional(),
    })
    .optional(),
});

export const academyInstructorSchema = z.object({
  name: nameSchema,
  photoUrl: imageUrlSchema,
  biography: z
    .string()
    .min(10, "Biography should be at least 10 characters long")
    .max(1000, "Biography must be less than 1000 characters"),
});

export type AcademyForm = z.output<typeof academySchema>;
export type AcademyInstructorForm = z.output<typeof academyInstructorSchema>;
