import { phoneSchema, userNameSchema } from "@/constants/schemas";
import { z } from "zod";
import { WithdrawMethods } from "./finance";

// Common base schema

export interface InstructorWithdrawal {
  id: string;
  amount: number; // The gross amount requested/withdrawn
  feeAmount: number; // The fees deducted by the platform/payment processor
  netAmount: number; // The net amount received by the instructor (amount - feeAmount)
  currency: string;
  method: WithdrawMethods; // e.g., 'PayPal', 'Bank Transfer'
  status: "Pending" | "Processed" | "Rejected" | "Failed";
  note?: string | null; // in case rejected or failed admin should provide a message
  created_at: string; // Date string
  updated_at?: string | null; // Optional Date string
}


const amountSchema = (min: number, max: number) =>
  z
    .number("Amount must be a number")
    .min(min, `Minimum withdrawal amount is ${min}`)
    .max(max, `Maximum withdrawal amount is ${max}`);

const currencySchema = z
  .string("Currency is required")
  .min(3, "Currency must be a valid code (e.g. EGP, USD)");

// ------------------------------
// InstaPay
// ------------------------------

const instaPaySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("userName"),
    userName: userNameSchema,
    phoneNumber: z.string().optional(),
    amount: amountSchema(10, 50000),
    currency: currencySchema,
  }),
  z.object({
    type: z.literal("phoneNumber"),
    phoneNumber: phoneSchema,
    userName: z.string().optional(),
    amount: amountSchema(10, 50000),
    currency: currencySchema,
  }),
]);

// ------------------------------
// E-Wallet
// ------------------------------

const eWalletSchema = z.object({
  company: z.enum(["orange", "vodafone", "etisalat", "we"]),
  phoneNumber: phoneSchema,
  amount: amountSchema(10, 50000),
  currency: currencySchema,
});

// ------------------------------
// Bank Transfer (International)
// ------------------------------
const bankTransferSchema = z.object({
  iban: z
    .string("IBAN is required")
    .regex(/^[A-Z0-9]{15,34}$/, "Enter a valid IBAN"),
  swiftCode: z
    .string()
    .regex(/^[A-Z0-9]{8,11}$/, "Enter a valid SWIFT code")
    .optional(),
  amount: amountSchema(10, 50000),
  currency: currencySchema,
});

// ------------------------------
// PayPal
// ------------------------------
const paypalSchema = z.object({
  paypalEmail: z.email("Enter a valid email address"),
  amount: amountSchema(10, 50000),
  currency: currencySchema,
});

export { instaPaySchema, bankTransferSchema, paypalSchema, eWalletSchema };

export type InstaPayFormData = z.infer<typeof instaPaySchema>;
export type eWalletFormData = z.infer<typeof eWalletSchema>;
export type BankTransferFormData = z.infer<typeof bankTransferSchema>;
export type PayPalFormData = z.infer<typeof paypalSchema>;
