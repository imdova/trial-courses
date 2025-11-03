import { AcademyFormData } from "@/types/forms";
import { Path } from "react-hook-form";
import z from "zod";

export const AcademySchema = z.object({
  name: z.string().min(1, "Name is required"),
  avatar: z
    .union([
      z.string().url("Must be a valid URL"), // URL
      z.instanceof(File), // File
      z.undefined(), // undefined
      z.literal(""), // empty string
    ])
    .optional(),
  category: z.string().min(1, "Category is required"),
  speciality: z.array(z.string()).min(1, "At least one speciality is required"),
  type: z.enum(["University", "Academy", "Institute", "Online Platform"]),
  foundedYear: z
    .number()
    .min(1800, "Year must be after 1800")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  accreditation: z.string().optional(),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
  }),
  contactInfo: z.object({
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone is required"),
    website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    socialLinks: z
      .object({
        facebook: z
          .string()
          .url("Must be a valid URL")
          .optional()
          .or(z.literal("")),
        linkedin: z
          .string()
          .url("Must be a valid URL")
          .optional()
          .or(z.literal("")),
        twitter: z
          .string()
          .url("Must be a valid URL")
          .optional()
          .or(z.literal("")),
      })
      .optional(),
  }),
  about: z.string().min(10, "About must be at least 10 characters"),
  programsOffered: z
    .array(z.string())
    .min(1, "At least one program is required"),
  facilities: z.array(z.string()).min(1, "At least one facility is required"),
  instructors: z
    .array(
      z.object({
        name: z.string().min(1, "Instructor name is required"),
        title: z.string().min(1, "Instructor title is required"),
        photo: z
          .string()
          .url("Must be a valid URL")
          .optional()
          .or(z.literal("")),
        id: z.string().min(1, "Instructor ID is required"),
        bio: z.string().optional(),
      }),
    )
    .optional(),
  studentsCount: z.number().min(0, "Student count cannot be negative"),
  alumniNetwork: z.string().optional(),
  tuitionFeesRange: z.string().min(1, "Tuition fees range is required"),
  admissionRequirements: z
    .array(z.string())
    .min(1, "At least one admission requirement is required"),
});

// Step 1: Basic Info
export const Step1Schema = AcademySchema.pick({
  name: true,
  avatar: true,
  category: true,
  type: true,
  foundedYear: true,
});

// Step 2: Location & Contact
export const Step2Schema = AcademySchema.pick({
  location: true,
  contactInfo: true,
});

// Step 3: Programs & Facilities
export const Step3Schema = AcademySchema.pick({
  about: true,
  programsOffered: true,
  facilities: true,
  admissionRequirements: true,
  speciality: true,
});

// Step 4: Additional Info
export const Step4Schema = AcademySchema.pick({
  studentsCount: true,
  alumniNetwork: true,
  tuitionFeesRange: true,
  instructors: true,
});

export function getStepFields<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>,
): Path<AcademyFormData>[] {
  return Object.keys(schema.shape) as Path<AcademyFormData>[];
}
