import { slugSchema } from "@/constants/schemas";
import { z } from "zod";

const PriceSchema = z
  .object({
    currency_code: z
      .string()
      .length(3, "Currency must be a valid 3-letter ISO code")
      .regex(
        /^[A-Z]{3}$/,
        "Currency must be uppercase ISO code (e.g. USD, EUR)",
      ),
    regular_price: z
      .number("Regular price is required")
      .gt(0, "Regular price must be greater than 0"),
    sale_price: z.number().optional(),
    discount_amount: z.number().optional(),
  })
  .refine((data) => Number(data.sale_price) <= data.regular_price, {
    path: ["sale_price"],
    message: "Sale price cannot exceed regular price",
  });

const FreePricingSchema = z.object({
  currency_code: z.string().optional(),
  regular_price: z.number().optional(),
  sale_price: z.number().optional(),
  discount_amount: z.number().optional(),
  discount_enabled: z.boolean().optional(),
});

const PricingBaseSchema = z.object({
  is_free: z.boolean(),
  pricings: z.array(PriceSchema),
});

// Schema for free course
const freeSchema = PricingBaseSchema.extend({
  is_free: z.literal(true),
  pricings: z.array(FreePricingSchema),
});

// Schema for paid course
const paidSchema = PricingBaseSchema.extend({
  is_free: z.literal(false),
  pricings: z.array(PriceSchema),
});

const PricingSchema = z.discriminatedUnion("is_free", [freeSchema, paidSchema]);

export const bundleSchema = z
  .object({
    title: z.string().trim().min(1, "Bundle Title is required"),
    slug: slugSchema,
    description: z.string().trim().min(1, "Bundle Description is required"),
    thumbnail_url: z.url("Invalid image URL"),
    status: z.enum(["draft", "published", "archived"], {
      message: "Invalid course status",
    }),
    courseIds: z
      .array(z.string().trim())
      .min(2, "At least two courses are required"),
  })
  .and(PricingSchema);

export type BundleFormData = z.infer<typeof bundleSchema>;
