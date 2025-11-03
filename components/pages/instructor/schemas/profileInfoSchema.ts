import { z } from "zod";

export const instructorProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  email: z.string().optional(),
  avatar: z.string().optional(),
  phoneNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  hasWhatsapp: z.boolean().optional(),
  birthDate: z.string().optional(),
  gender: z.string().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.string().optional(),
  hasDrivingLicense: z.boolean().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  category: z.string().optional(),
  specialization: z.string().optional(),
  linkedinUrl: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export type InstructorProfileFormData = z.infer<typeof instructorProfileSchema>;