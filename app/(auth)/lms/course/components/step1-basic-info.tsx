"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, type Step1FormData } from "../util/course.schema";
import { useCourseForm } from "../hooks/useCourseForm";
import { Form } from "@/components/UI/form";
import CourseInformationCard from "./CourseInformationCard";
import CoursePricingCard from "./CoursePricing";
import { CourseSidebarSettings } from "./CourseSidebarSettings";
import { FormNavigation } from "./form-navigation";
import { useAutosave } from "../hooks/use-autosave";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useLocationData } from "@/hooks/useLocationData";
import PreventLeaveDialog from "@/components/UI/PreventLeaveDialog";
import { hasFormErrors } from "@/util/forms";
import { useState } from "react";
import { AcademyInstructor } from "@/types/academy";
import { InstructorDialogForm } from "@/components/shared/instructorDialog";
import { useSession } from "next-auth/react";
import InstructorSelector from "@/components/UI/InstructorSelector";

const getDefaultValues = (userCurrency?: string) =>
  ({
    name: "",
    category: "",
    subcategory: "",
    courseImage: "",
    previewVideo: "",
    level: "beginner",
    tags: [],
    type: "recorded",
    programType: "course",
    publishLater: false,
    publishDate: "",
    isCourseFree: false,
    allowPlatformCoupons: false,
    publishTime: "00:00:00",
    academyInstructorIds: [],
    instructorId: "",
    pricing: [
      {
        currencyCode: userCurrency || "USD",
        discountAmount: 0,
        regularPrice: 0,
        salePrice: 0,
      },
    ],
  }) as unknown as Step1FormData;

export function Step1BasicInfo({ onSuccess }: { onSuccess: () => void }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [item, setItem] = useState<Partial<AcademyInstructor> | null>(null);

  const { setCourseInfo, courseInfo } = useCourseForm();
  const { data: session } = useSession();

  const { countries } = useLocationData();
  const { data: locations } = useGeoLocation();
  const userCurrency = countries.find(
    (country) => country.isoCode === locations?.country_code2,
  )?.currency;

  const DEFAULT_VALUES = getDefaultValues(userCurrency);
  const isAdmin = session?.user?.type === "admin";

  const form = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: courseInfo || DEFAULT_VALUES,
  });

  const values = form.watch();
  const isDirty = form.formState.isDirty;

  const { saveToIndexDB } = useAutosave({
    values: { courseInfo: values },
    isDirty: isDirty,
    reset: () => form.reset(values),
    preventSaving: hasFormErrors(form.formState.errors),
  });

  const onSubmit = async (data: Step1FormData) => {
    onSuccess();
    setCourseInfo(data);
    saveToIndexDB({ courseInfo: data });
  };

  return (
    <>
      <InstructorDialogForm
        open={openDialog}
        onOpenChange={setOpenDialog}
        item={item}
        onPending={(instructor) => {
          const instructors = form.getValues("academyInstructorIds") || [];
          form.setValue("academyInstructorIds", [
            ...instructors,
            instructor.id,
          ]);
        }}
        onSuccess={(instructor) => {
          const instructors = form.getValues("academyInstructorIds") || [];
          const newInstructors = instructors.map((d) =>
            String(d).startsWith("temp") ? instructor.id : d,
          );
          form.setValue("academyInstructorIds", newInstructors);
        }}
      />

      <Form {...form}>
        <form
          id="basic-info"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <PreventLeaveDialog />
          <div className="grid gap-2 lg:grid-cols-10 xl:flex-row">
            <div className="space-y-2 lg:col-span-7">
              <CourseInformationCard />
              <CoursePricingCard />

              {/* Instructor Field - Only for Admin Users */}
              {isAdmin && (
                <div className="rounded-lg border border-gray-200 bg-white p-6">
                  <InstructorSelector
                    label="Assign Instructor"
                    value={form.watch("instructorId")}
                    onChange={(value) => form.setValue("instructorId", value)}
                  />
                </div>
              )}
            </div>
            <div className="lg:col-span-3">
              <CourseSidebarSettings
                setOpenDialog={setOpenDialog}
                setItem={setItem} />
            </div>
            <FormNavigation currentStep={1} nextLabel="Next: Details" />
          </div>
        </form>
      </Form>
    </>
  );
}
