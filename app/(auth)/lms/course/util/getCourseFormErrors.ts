// import { z } from "zod";
// import { CourseFormValues, courseSchema } from "@/constants/schemas/course.schema";

// type SectionErrorCounts = {
//   informationErrors: number;
//   accessErrors: number;
//   pricingErrors: number;
//   overViewInfoErrors: number;
//   settingsErrors: number;
//   assetsErrors: number;
//   sectionsErrors: number;
// };

// export function getFormErrors(
//   values: CourseFormValues,
//   displayError: boolean = true,
// ): SectionErrorCounts {
//   const result = courseSchema.safeParse(values);

//   if (result.success || !displayError) {
//     return {
//       informationErrors: 0,
//       accessErrors: 0,
//       pricingErrors: 0,
//       overViewInfoErrors: 0,
//       settingsErrors: 0,
//       assetsErrors: 0,
//       sectionsErrors: 0,
//     };
//   }

//   const { fieldErrors } = z.flattenError(result.error);

//   return {
//     informationErrors: fieldErrors.information?.length || 0,
//     accessErrors: fieldErrors.access?.length || 0,
//     pricingErrors: fieldErrors.pricing?.length || 0,
//     overViewInfoErrors: fieldErrors.overViewInfo?.length || 0,
//     settingsErrors: fieldErrors.settings?.length || 0,
//     assetsErrors: fieldErrors.assets?.length || 0,
//     sectionsErrors: fieldErrors.sections?.length || 0,
//   };
// }
