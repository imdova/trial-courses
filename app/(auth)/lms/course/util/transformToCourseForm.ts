import { Category, SupCategory } from "@/types";
import {
  CourseFormType,
  CourseSection,
  CourseSectionItem,
  CoursePricing,
  CourseItem,
  CurriculumModule,
} from "@/types/courses";
import { generateUUID } from "@/util";
import z from "zod";
import {
  SectionItemSchema,
  Step1FormData,
  Step2FormData,
  Step3FormData,
  Step5SEOFormData,
} from "./course.schema";
import { InstructorType } from "@/types/instructor-type";
import { CourseFormState } from "../hooks/useCourseForm";

type SectionItem = z.infer<typeof SectionItemSchema>;

// 🛠️ Pricing Mapper
export function mapPricings(raw: Step1FormData["pricing"]): CoursePricing[] {
  return (
    raw?.map((p) => ({
      currencyCode: p.currencyCode || "",
      regularPrice: p.regularPrice || null,
      salePrice: p.salePrice || null,
      discountAmount: p.discountAmount || null,
      discountEnabled: p.discountAmount && p.discountAmount > 0 ? true : false,
      isActive: true,
    })) || []
  );
}
// 🛠️ Section Item Mapper
function mapSectionItem(item: SectionItem, index: number): CourseSectionItem {
  return {
    id: item.id,
    curriculumType: item.curriculumType,
    lecture: {
      title: item.lecture?.title || "",
      description: null,
      videoUrl: item.lecture?.videoUrl || "",
      materialUrl: item.lecture?.materialUrl || "",
      isLectureFree: item.lecture?.isLectureFree || false,
    },
    quizId: item.quizId || "",
    assignmentId: item.assignmentId || "",
    order: index + 1,
  };
}
// 🛠️ Section Mapper
function mapSections(raw: Step3FormData["sections"]): CourseSection[] {
  return (
    raw?.map((section, sectionIndex) => ({
      id: section.id,
      section: {
        name: section.name,
        description: section.description || "",
        order: sectionIndex + 1,
      },
      items: section.items.map((item: SectionItem, i: number) =>
        mapSectionItem(item, i),
      ),
    })) || []
  );
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // split accented letters
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric chars
    .replace(/\s+/g, "-") // replace spaces with -
    .replace(/-+/g, "-"); // collapse multiple -
}

export function convertCourseFormToItem(
  form: Partial<CourseFormType>,
  categories?: Category[],
  subcategories?: SupCategory[],
): Partial<CourseItem> {
  const categoryObj = categories?.find((c) => c.id === form.category);
  const subCategoryObj = subcategories?.find(
    (sc) => sc.id === form.subcategory,
  );
  if (categoryObj) {
    return {
      ...form,
      category: categoryObj ?? null,
      subCategory: subCategoryObj ?? null,
    };
  }
  return form as unknown as Partial<CourseItem>;
}

function nonRecordedData(
  courseInfo: Step1FormData | null,
  courseCurriculum: Step3FormData | null,
) {
  const numberOfLectures =
    courseCurriculum?.sections?.reduce(
      (count, s) =>
        count + s.items.filter((i) => i.curriculumType === "lecture").length,
      0,
    ) || 0;

  if (
    courseInfo?.type === "live" ||
    courseInfo?.type === "offline" ||
    courseInfo?.type === "hybrid"
  ) {
    return {
      courseDuration: courseInfo.courseDuration ?? null,
      courseDurationUnit: courseInfo.courseDurationUnit ?? "weeks",
      lectureFrequency: courseInfo.lectureFrequency ?? "once",
      lectureFrequencyUnit: courseInfo.lectureFrequencyUnit ?? "weeks",
      totalHours: courseInfo.totalHours ?? null,
      numberOfLectures: courseInfo.numberOfLectures ?? 0,
    };
  }

  return {
    courseDuration: null,
    courseDurationUnit: "weeks" as CourseItem["courseDurationUnit"],
    lectureFrequency: "once" as CourseItem["lectureFrequency"],
    lectureFrequencyUnit: "weeks" as CourseItem["lectureFrequencyUnit"],
    totalHours: null,
    numberOfLectures: numberOfLectures,
  };
}

export function CourseStepsToCourseItem({
  courseInfo,
  courseDetails,
  courseCurriculum,
  categories,
  subcategories,
  instructor,
}: {
  courseInfo: Step1FormData | null;
  courseDetails: Step2FormData | null;
  courseCurriculum: Step3FormData | null;
  categories: Category[];
  subcategories: SupCategory[];
  instructor: InstructorType | null;
}): Omit<CourseItem, "created_at" | "updated_at"> | null {
  const recordedAccess = courseInfo?.type === "recorded" ? courseInfo : null;

  const nonRecordedAccess = nonRecordedData(courseInfo, courseCurriculum);
  const categoryObj = categories?.find((c) => c.id === courseInfo?.category);
  const subCategoryObj = subcategories?.find(
    (sc) => sc.id === courseInfo?.subcategory,
  );

  const modules: CurriculumModule[] =
    courseCurriculum?.sections.map((section) => ({
      id: section.id || generateUUID(),
      description: section.description || "",
      name: section.name,
      items: section.items.map((item) => ({
        ...item,
        lecture: {
          videoUrl: item.lecture?.videoUrl || "",
          materialUrl: item.lecture?.materialUrl || "",
          isLectureFree: item.lecture?.isLectureFree || false,
          id: generateUUID(),
          title: item.lecture?.title || "",
        },
        id: item.id || generateUUID(),
        assignment: null,
        quiz: null,
      })),
    })) || [];

  return {
    id: generateUUID(), // Provide a default or generate as needed
    status: "draft", // Provide a default or pass as parameter
    slug: slugify(courseInfo?.name || ""),
    type: courseInfo?.type || "recorded",
    level: courseInfo?.level || "beginner",
    tags: courseInfo?.tags || [],
    isActive: true,
    languages: courseInfo?.languages || [],
    category: categoryObj ?? null,
    subCategory: subCategoryObj ?? null,
    name: courseInfo?.name || "",

    startDate: recordedAccess?.publishDate ?? null,
    endDate: recordedAccess?.publishDate ?? null,
    allowPlatformCoupons: recordedAccess?.allowPlatformCoupons ?? false,
    programType: courseInfo?.programType || "course",
    isCourseFree: courseInfo?.isCourseFree || false,

    courseImage: courseInfo?.courseImage || "",
    previewVideo: courseInfo?.previewVideo || "",
    academyInstructorIds: courseInfo?.academyInstructorIds || [],

    courseDuration: nonRecordedAccess.courseDuration,
    courseDurationUnit: nonRecordedAccess.courseDurationUnit,
    lectureFrequency: nonRecordedAccess.lectureFrequency,
    lectureFrequencyUnit: nonRecordedAccess.lectureFrequencyUnit,
    totalHours: nonRecordedAccess.totalHours,
    numberOfLectures: nonRecordedAccess.numberOfLectures,
    instructor: instructor
      ? {
          fullName: instructor.firstName + " " + instructor.lastName,
          id: instructor.id,
          photoUrl: instructor.photoUrl,
          userName: instructor.userName,
        }
      : undefined,
    academyInstructors: [], // TODO: Handle instructors array
    academy: null, // TODO: Handle academy
    metadata: {
      courseOverview: courseDetails?.courseOverview || "",
      whoCanAttend: {
        text: courseDetails?.whoCanAttend?.text || "",
        items: courseDetails?.whoCanAttend?.items || [],
      },
      whatWillYouLearn: {
        text: courseDetails?.whatWillYouLearn?.text || "",
        items: courseDetails?.whatWillYouLearn?.items || [],
      },
      faqs: courseDetails?.faqs || [],
    },
    pricings: courseInfo?.isCourseFree
      ? []
      : mapPricings(courseInfo?.pricing || []),
    modules: modules,
  };
}
export function CourseStepsToCourseFormType({
  courseInfo,
  courseDetails,
  courseCurriculum,
  seo,
}: {
  courseInfo: Step1FormData | null;
  courseDetails: Step2FormData | null;
  courseCurriculum: Step3FormData | null;
  seo?: Step5SEOFormData | null;
}): CourseFormType | null {
  if (!courseInfo || !courseDetails || !courseCurriculum) return null;
  const recordedAccess = courseInfo?.type === "recorded" ? courseInfo : null;

  const nonRecordedAccess = nonRecordedData(courseInfo, courseCurriculum);

  return {
    slug: slugify(courseInfo.name),
    type: courseInfo.type,
    programType: courseInfo.programType,
    level: courseInfo.level,
    tags: courseInfo.tags || [],
    status: "published",
    isActive: true,

    languages: courseInfo.languages || [],
    category: courseInfo.category,
    subcategory: courseInfo.subcategory,
    name: courseInfo.name,

    startDate: recordedAccess?.publishDate || null,
    endDate: recordedAccess?.publishDate || null,
    academyInstructorIds: courseInfo?.academyInstructorIds || [],
    allowPlatformCoupons: recordedAccess?.allowPlatformCoupons ?? false,
    isCourseFree: courseInfo.isCourseFree,

    courseImage: courseInfo.courseImage,
    previewVideo: courseInfo.previewVideo,
    instructorId: courseInfo.instructorId || undefined,

    courseDuration: nonRecordedAccess.courseDuration,
    courseDurationUnit: nonRecordedAccess.courseDurationUnit,
    lectureFrequency: nonRecordedAccess.lectureFrequency,
    lectureFrequencyUnit: nonRecordedAccess.lectureFrequencyUnit,
    totalHours: nonRecordedAccess.totalHours,
    numberOfLectures: nonRecordedAccess.numberOfLectures,

    metadata: {
      courseOverview: courseDetails.courseOverview || "",
      whoCanAttend: {
        text: courseDetails.whoCanAttend?.text || "",
        items: courseDetails.whoCanAttend?.items || [],
      },
      whatWillYouLearn: {
        text: courseDetails.whatWillYouLearn?.text || "",
        items: courseDetails.whatWillYouLearn?.items || [],
      },
      faqs: courseDetails.faqs || [],
      // Include SEO fields if provided (admin only)
      ...(seo && {
        seo: {
          metaTitle: seo.metaTitle,
          metaKeywords: seo.metaKeywords,
          metaDescription: seo.metaDescription,
          metaImage: seo.metaImage,
        },
      }),
    },
    pricings: courseInfo?.isCourseFree ? [] : mapPricings(courseInfo?.pricing),
    sections: mapSections(courseCurriculum.sections),
  };
}

export const courseToCourseForm = (
  course: Omit<CourseItem, "id"> & { id?: CourseItem["id"] },
  duplicateId?: string,
): Partial<CourseFormState> => {
  const mapSections =
    (course.modules?.map((section) => ({
      items: section.items.map((item) => ({
        itemId: item.id,
        curriculumType: item.curriculumType,
        lecture: item.lecture || {},
        quizId: item.quiz?.id || "",
        assignmentId: item.assignment?.id || "",
      })),
      name: section.name,
      description: section.description,
      id: duplicateId ? undefined : section.id,
      sectionId: section.id,
    })) as Step3FormData["sections"]) || [];

  const courseInfo = {
    name: course.name,
    category: course.category?.id || "",
    subcategory: course.subCategory?.id || "",
    courseImage: course.courseImage,
    previewVideo: course.previewVideo,
    level: course.level,
    tags: course.tags,
    type: course.type,
    languages: course.languages,
    programType: course.programType || "course",
    publishLater: course.startDate ? true : false,
    publishDate: course.startDate || undefined,
    publishTime: course.startDate || undefined,
    isCourseFree: course.isCourseFree,
    academyInstructorIds: course.academyInstructorIds || [],
    instructorId: (course as CourseItem & { instructorId?: string }).instructorId || "",
    allowPlatformCoupons: course.allowPlatformCoupons,
    pricing: course.pricings as Step1FormData["pricing"],
  } as Step1FormData;

  return {
    duplicateId: duplicateId,
    courseId: course.id,
    currentStep: 0,
    courseInfo: courseInfo,
    courseDetails: {
      courseOverview: course.metadata.courseOverview,
      whoCanAttend: course.metadata.whoCanAttend,
      faqs: course.metadata.faqs,
      whatWillYouLearn: course.metadata.whatWillYouLearn,
    },
    courseCurriculum: {
      sections: mapSections,
    },
    seo: course.metadata?.seo
      ? {
          metaTitle: course.metadata.seo.metaTitle,
          metaKeywords: course.metadata.seo.metaKeywords || [],
          metaDescription: course.metadata.seo.metaDescription || "",
          metaImage: course.metadata.seo.metaImage || "",
        }
      : undefined,
    completedSteps: [],
    status: course.status,
    lastSaved: null,
  };
};
