import z from "zod";

export interface CouponData {
  id: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  created_by: string;
  name: string; // "Summer Sale 2025"
  code: string; // "SUMMER25"
  offer_type: "PERCENTAGE" | "FLAT";
  amount: string; // 25
  minimum_purchase?: string; // 100
  usage_limit?: number; // 50
  start_date?: string; // 2025-08-01
  end_date?: string; // 2025-08-31
  status?: "ACTIVE" | "INACTIVE" | "EXPIRED";
  applicable_for:
    | "MULTIPLE_COURSES"
    | "CATEGORY_COURSES"
    | "SUBCATEGORY_COURSES"
    | "ALL_INSTRUCTOR_COURSES"
    | "ALL_PLATFORM_COURSES";
  course_ids?: string[];
  category_id?: string | null;
  subcategory_id?: string | null;
}

export interface EditCouponData extends Omit<CouponData, "id"> {
  id?: string | null;
}

export const couponSchema = z
  .object({
    name: z.string().trim().min(1, "Coupon name is required"),
    code: z.string().trim().min(1, "Coupon code is required"),
    offer_type: z.enum(["PERCENTAGE", "FLAT"]),
    amount: z.number().gt(0, "Coupon amount must be greater than 0"),
    minimum_purchase: z.number().optional(),
    usage_limit: z.number().optional(),
    start_date: z.date().optional(),
    end_date: z.date().optional(),
    status: z.enum(["ACTIVE", "INACTIVE", "EXPIRED"]).optional(),
    applicable_for: z.enum(
      [
        "MULTIPLE_COURSES",
        "CATEGORY_COURSES",
        "SUBCATEGORY_COURSES",
        "ALL_INSTRUCTOR_COURSES",
        "ALL_PLATFORM_COURSES",
      ],
      "Applicable for is required",
    ),
    course_ids: z.array(z.string()).optional(),
    category_id: z.string().optional(),
    subcategory_id: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Case 1: MULTIPLE_COURSES → course_ids required
    if (
      data.applicable_for === "MULTIPLE_COURSES" &&
      (!data.course_ids || data.course_ids.length === 0)
    ) {
      ctx.addIssue({
        path: ["course_ids"],
        code: "custom",
        message: "You must select at least one course.",
      });
    }

    // Case 2: CATEGORY_COURSES → category_id required
    if (data.applicable_for === "CATEGORY_COURSES" && !data.category_id) {
      ctx.addIssue({
        code: "custom",
        message: "Category is required for category courses.",
        path: ["category_id"],
      });
    }

    // Case 3: SUBCATEGORY_COURSES → subcategory_id required
    if (data.applicable_for === "SUBCATEGORY_COURSES" && !data.subcategory_id) {
      ctx.addIssue({
        code: "custom",
        message: "Subcategory is required for subcategory courses.",
        path: ["subcategory_id"],
      });
    }

    // Case 4: ALL_INSTRUCTOR_COURSES or ALL_PLATFORM_COURSES → no additional requirements
  });

export type CouponFormData = z.infer<typeof couponSchema>;
