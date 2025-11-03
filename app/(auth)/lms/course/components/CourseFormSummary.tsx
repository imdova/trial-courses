// import { courseSchema } from "@/constants/schemas/course.schema";
// import { cn } from "@/util";
// import { Check } from "lucide-react";
// import { useMemo } from "react";
// import { useFormContext } from "react-hook-form";
// import { z } from "zod";

// export default function CourseFormSummary() {
//   const { watch } = useFormContext();
//   const values = watch();

//   const summary = useMemo(() => {
//     const result = courseSchema.safeParse(values);

//     if (result.success) {
//       return {
//         requiredComplete: true,
//         structureComplete: true,
//         pricingComplete: true,
//         instructorComplete: true,
//       };
//     }
//     const { fieldErrors } = z.flattenError(result.error);

//     return {
//       requiredComplete: !(
//         fieldErrors.information ||
//         fieldErrors.access ||
//         fieldErrors.overViewInfo ||
//         fieldErrors.assets
//       ),
//       structureComplete: !fieldErrors.sections,
//       pricingComplete: !fieldErrors.pricing,
//       instructorComplete: !fieldErrors.settings,
//     };
//   }, [values]);

//   return (
//     <div className="space-y-3">
//       <SummaryItem
//         label="All required fields are complete"
//         complete={summary.requiredComplete}
//       />
//       <SummaryItem
//         label="Course structure is organized"
//         complete={summary.structureComplete}
//       />
//       <SummaryItem
//         label="Pricing and enrollment options are set"
//         complete={summary.pricingComplete}
//       />
//       {/* <SummaryItem
//         label="Instructor information is provided"
//         complete={summary.instructorComplete}
//       /> */}
//     </div>
//   );
// }

// function SummaryItem({
//   label,
//   complete,
// }: {
//   label: string;
//   complete: boolean;
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <div
//         className={`size-5 shrink-0 rounded-full p-0.5 ${
//           complete ? "bg-primary" : "border-2 border-gray-300"
//         }`}
//       >
//         {complete && <Check className="size-4 text-white" />}
//       </div>
//       <span
//         className={cn(
//           "text-sm",
//           complete ? "text-primary" : "text-muted-foreground",
//         )}
//       >
//         {label}
//       </span>
//     </div>
//   );
// }
