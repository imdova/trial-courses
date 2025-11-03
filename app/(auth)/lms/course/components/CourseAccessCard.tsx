// import { useFormContext } from "react-hook-form";
// import { OptionSelect } from "@/types";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/UI/card";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/UI/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/UI/select";
// import { courseSchema } from "@/constants/schemas/course.schema";
// import { z } from "zod";
// import {
//   Collapsible,
//   CollapsibleContent,
//   CollapsibleTrigger,
// } from "@/components/UI/Collapsible";
// import { Separator } from "@/components/UI/separator";
// import { ChevronDown } from "lucide-react";
// import RecordAccessFields from "./RecordAccessFields";
// import NonRecordAccessFields from "./NonRecordAccessFields";
// import { Badge } from "@/components/UI/badge";

// const courseTypeOptions: OptionSelect[] = [
//   { value: "recorded", label: "Recorded" },
//   { value: "live", label: "Live" },
//   { value: "offline", label: "Offline" },
//   { value: "hybrid", label: "Hybrid (Live + Offline)" },
// ];

// type FormValues = z.infer<typeof courseSchema>; // ✅ same type

// const CourseAccessCard: React.FC = () => {
//   const form = useFormContext<FormValues>();

//   const courseType = form.watch("access.type");
//   const isRecorded = courseType === "recorded";
//   const errors = Object.values(form.formState?.errors?.access || {}).length;

//   return (
//     <Card className="space-y-6 py-0">
//       <Collapsible defaultOpen>
//         <CardHeader className="bg-muted rounded-t-base pt-4 pb-4">
//           <CardTitle>
//             Publishing & Access Settings
//             {errors > 0 && (
//               <Badge
//                 variant="destructive"
//                 className="h-4 min-w-4 rounded-full px-0.5 text-xs tabular-nums"
//               >
//                 {errors}
//               </Badge>
//             )}
//           </CardTitle>
//           {/* <CardDescription>
//             Control how and when your course is published. Manage access
//             options, discounts, notifications, and set a specific schedule for
//             course launch.
//           </CardDescription> */}
//           <CardAction>
//             <CollapsibleTrigger className="focus-visible:ring-ring/50 flex items-center gap-2 rounded-md p-1 outline-none focus-visible:ring-[3px]">
//               <ChevronDown className='size-4 shrink-0 transition-transform [[data-state="open"]>&]:rotate-180' />
//             </CollapsibleTrigger>
//           </CardAction>
//         </CardHeader>
//         <CollapsibleContent>
//           <Separator className="mb-2" />
//           <CardContent className="space-y-4 py-2 pb-6">
//             <FormField
//               control={form.control}
//               name="access.type"
//               defaultValue="recorded"
//               render={({ field }) => (
//                 <FormItem className="w-1/2">
//                   <FormLabel>Course Type</FormLabel>
//                   <Select
//                     onValueChange={field.onChange}
//                     defaultValue={field.value}
//                   >
//                     <FormControl className="w-full">
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select Course Type" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       {courseTypeOptions.map((option) => (
//                         <SelectItem key={option.value} value={option.value}>
//                           {option.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             {isRecorded ? <RecordAccessFields /> : <NonRecordAccessFields />}
//           </CardContent>
//         </CollapsibleContent>
//       </Collapsible>
//     </Card>
//   );
// };

// export default CourseAccessCard;
