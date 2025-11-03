import z from "zod";

export const settingsSchema = z.object({
  platformName: z.string().min(1, "Platform name is required"),
  platformCurrency: z.string().min(1, "Currency is required"),
  serviceFee: z
    .number()
    .min(0, "Service fee cannot be negative")
    .max(100, "Service fee cannot exceed 100%"),
  taxRate: z
    .number()
    .min(0, "Tax rate cannot be negative")
    .max(100, "Tax rate cannot exceed 100%"),
  minWithdrawalAmount: z
    .number()
    .min(0, "Minimum withdrawal amount cannot be negative"),
  payoutProcessingTime: z.number().min(0, "Processing time cannot be negative"),
  referralBonus: z.number().min(0, "Referral bonus cannot be negative"),
  courseCommissionRate: z
    .number()
    .min(0, "Commission rate cannot be negative")
    .max(100, "Commission rate cannot exceed 100%"),
  courseMinPrice: z.number().min(0, "Minimum price cannot be negative"),
  courseMaxPrice: z.number().min(0, "Maximum price cannot be negative"),
  mentorshipCommissionRate: z
    .number()
    .min(0, "Commission rate cannot be negative")
    .max(100, "Commission rate cannot exceed 100%"),
  mentorshipMaxPrice: z.number().min(0, "Maximum price cannot be negative"),
  courseApprovalRequired: z.boolean(),
  mentorshipPlans: z.boolean(),
  referralProgram: z.boolean(),
  taxDeduction: z.boolean(),
  emailNotifications: z.boolean(),
  smsNotifications: z.boolean(),
  maintenanceMode: z.boolean(),
  maintenanceMessage: z.string(),
  supportEmail: z.string().email("Please enter a valid email address"),
  supportPhone: z.string().min(1, "Support phone is required"),
});
