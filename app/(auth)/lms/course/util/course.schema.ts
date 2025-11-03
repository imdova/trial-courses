import { z } from "zod";

const recordedSchema = {
  allowPlatformCoupons: z.boolean(),
  publishLater: z.boolean(),
  publishDate: z.string().optional(),
  publishTime: z.string().optional(),
};

// Extra fields for non-recorded courses
const nonRecordedSchema = {
  courseDuration: z
    .number("Course duration is required")
    .positive("Course duration must be a positive number"),
  courseDurationUnit: z.enum(
    ["days", "weeks", "months"],
    "Course duration unit is required",
  ),
  lectureFrequency: z.enum(
    ["once", "twice", "three_times"],
    "Lecture frequency is required",
  ),
  lectureFrequencyUnit: z.enum(
    ["days", "weeks", "months"],
    "Lecture frequency unit is required",
  ),
  numberOfLectures: z
    .number("Number of lectures is required")
    .int("Number of lectures must be an integer")
    .positive("Number of lectures must be at least 1"),
  totalHours: z
    .number("Total hours is required")
    .positive("Total hours must be greater than 0"),
};

const CourseAccessSchema = z.discriminatedUnion("type", [
  z
    .object({
      type: z.literal("recorded"),
      ...recordedSchema,
    })
    .superRefine((data, ctx) => {
      if (data.publishLater) {
        if (!data.publishDate) {
          ctx.addIssue({
            path: ["publishDate"],
            code: "custom",
            message: "Publish date is required when publishLater is true",
          });
        }
        if (!data.publishTime) {
          ctx.addIssue({
            path: ["publishTime"],
            code: "custom",
            message: "Publish time is required when publishLater is true",
          });
        }
      }
    }),
  z.object({
    type: z.literal("live"),
    ...nonRecordedSchema,
  }),
  z.object({
    type: z.literal("offline"),
    ...nonRecordedSchema,
  }),
  z.object({
    type: z.literal("hybrid"),
    ...nonRecordedSchema,
  }),
]);

//////

const PricingSchema = z
  .object({
    currencyCode: z
      .string()
      .length(3, "Currency must be a valid 3-letter ISO code")
      .regex(
        /^[A-Z]{3}$/,
        "Currency must be uppercase ISO code (e.g. USD, EUR)",
      ),
    regularPrice: z
      .number("Regular price is required")
      .gt(0, "Regular price must be greater than 0"),
    salePrice: z.number().optional(),
    discountAmount: z.number().optional(),
  })
  .refine((data) => Number(data.salePrice) <= data.regularPrice, {
    path: ["salePrice"],
    message: "Sale price cannot exceed regular price",
  });

const FreePricingSchema = z.object({
  currencyCode: z.string().optional(),
  regularPrice: z.number().optional(),
  salePrice: z.number().optional(),
  discountAmount: z.number().optional(),
  discountEnabled: z.boolean().optional(),
});

const CoursePricingBaseSchema = z.object({
  isCourseFree: z.boolean(),
  pricing: z.array(PricingSchema),
});

// Schema for free course
const freeSchema = CoursePricingBaseSchema.extend({
  isCourseFree: z.literal(true),
  pricing: z.array(FreePricingSchema),
});

// Schema for paid course
const paidSchema = CoursePricingBaseSchema.extend({
  isCourseFree: z.literal(false),
  pricing: z.array(PricingSchema),
});

const CoursePricingSchema = z.discriminatedUnion("isCourseFree", [
  freeSchema,
  paidSchema,
]);

export const step1Schema = z
  .object({
    name: z.string().trim().min(1, "Course name is required"),
    category: z.uuid("Invalid category ID"),
    subcategory: z.uuid("Invalid subcategory ID"),
    courseImage: z.url("Invalid image URL"),
    previewVideo: z.url("Invalid video URL"),
    level: z.enum(["beginner", "intermediate", "advanced"], {
      message: "Invalid course level",
    }),
    academyInstructorIds: z
      .array(z.string().min(1))
      .optional(),
    tags: z.array(z.string().trim()).min(1, "At least one tag is required"),
    languages: z
      .array(z.string().trim())
      .min(1, "At least one language is required"),
    programType: z.enum(
      [
        "course",
        "certificate_of_achievement",
        "professional_diploma",
        "master",
        "doctorate",
      ],
      "Program type is required",
    ),
    instructorId: z.string().uuid("Invalid instructor ID").optional().or(z.literal("")),
  })
  .and(CourseAccessSchema)
  .and(CoursePricingSchema);

const stripHtml = (input: string) => input.replace(/<[^>]*>/g, "").trim();

export const step2Schema = z.object({
  courseOverview: z
    .string()
    .trim()
    .refine((val) => stripHtml(val).length > 0, {
      message: "Course overview is required",
    }),
  whoCanAttend: z.object({
    text: z.string().trim().min(1),
    items: z
      .array(z.string().trim())
      .nonempty("At least one audience item is required"),
  }),
  whatWillYouLearn: z.object({
    text: z.string().trim().min(1),
    items: z
      .array(z.string().trim())
      .nonempty("At least one learning outcome is required"),
  }),
  faqs: z.array(
    z.object({
      question: z.string().trim().min(1, "Question is required"),
      answer: z.string().trim().min(1, "Answer is required"),
    }),
  ),
});

const LectureItemSchema = z.object({
  id: z.string().optional(),
  itemId: z.string().optional(),
  curriculumType: z.literal("lecture"),
  lecture: z.object({
    title: z.string().trim().min(1, "Title is required"),
    videoUrl: z.string().trim().min(1, "Must be Valid URL or Video id"),
    materialUrl: z.url("Please enter a valid URL").or(z.literal("")),
    isLectureFree: z.boolean().optional(),
  }),
  quizId: z.string().optional(),
  assignmentId: z.string().optional(),
});

// ✅ Quiz schema
const QuizItemSchema = z.object({
  id: z.string().optional(),
  itemId: z.string().optional(),
  curriculumType: z.literal("quiz"),
  lecture: z.object({
    title: z.string().optional(),
    videoUrl: z.string().optional(),
    materialUrl: z.string().optional(),
    isLectureFree: z.boolean().optional(),
  }),
  quizId: z.uuid("Quiz ID must be a valid UUID"),
  assignmentId: z.string().optional(),
});

// ✅ Assignment schema
const AssignmentItemSchema = z.object({
  id: z.string().optional(),
  itemId: z.string().optional(),
  curriculumType: z.literal("assignment"),
  lecture: z.object({
    title: z.string().optional(),
    videoUrl: z.string().optional(),
    materialUrl: z.string().optional(),
    isLectureFree: z.boolean().optional(),
  }),
  quizId: z.string().optional(),
  assignmentId: z.uuid("Assignment ID must be a valid UUID"),
});

// ✅ Union of all item types
export const SectionItemSchema = z.discriminatedUnion("curriculumType", [
  LectureItemSchema,
  QuizItemSchema,
  AssignmentItemSchema,
]);

const SectionSchema = z.object({
  id: z.string().optional().or(z.literal(null)).or(z.literal(undefined)),
  sectionId: z.string().optional(),
  name: z.string().trim().min(1, "Section name is required"),
  description: z.string().trim().optional(),
  items: z
    .array(SectionItemSchema)
    .nonempty("Section must contain at least one Lecture or Quiz"),
});

const CourseSectionsSchema = z
  .array(SectionSchema, "Course must have at least one section")
  .min(1, "Course must have at least one section");

export const step3Schema = z.object({
  sections: CourseSectionsSchema,
});

export const quickEditSchema = z
  .object({
    name: z.string().trim().min(1, "Course name is required"),
    category: z.uuid("Invalid category ID"),
    subcategory: z.uuid("Invalid subcategory ID"),
    level: z.enum(["beginner", "intermediate", "advanced"], {
      message: "Invalid course level",
    }),
    tags: z.array(z.string().trim()).min(1, "Course tags are required"),
    courseImage: z.url("Invalid Image URL"),
    previewVideo: z.url("Invalid video URL"),
  })
  .and(CoursePricingSchema);
export const step5SEOSchema = z.object({
  metaTitle: z.string().trim().min(1, "Meta title is required"),
  metaKeywords: z
    .array(z.string())
    .min(1, "At least one meta keyword is required"),
  metaDescription: z.string().trim().min(1, "Meta description is required"),
  metaImage: z.string().optional().or(z.literal("")),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type QuickEditFormData = z.infer<typeof quickEditSchema>;
export type Step5SEOFormData = z.infer<typeof step5SEOSchema>;
