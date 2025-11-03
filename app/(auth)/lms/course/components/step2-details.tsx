"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema, type Step2FormData } from "../util/course.schema";
import { useCourseForm } from "../hooks/useCourseForm";
import { Form } from "@/components/UI/form";
import { FormNavigation } from "./form-navigation";
import CourseOverViewCard from "./CourseOverViewCard";
import { useAutosave } from "../hooks/use-autosave";
import PreventLeaveDialog from "@/components/UI/PreventLeaveDialog";
import { hasFormErrors } from "@/util/forms";

const DEFAULT_VALUES = {
  courseOverview: "",
  whoCanAttend: {
    text: "You must have these to attend this course",
    items: [],
  },
  whatWillYouLearn: {
    text: "After this course you will be able to",
    items: [],
  },
  faqs: [],
  step: 2,
} as unknown as Step2FormData;

export function Step2Details({ onSuccess }: { onSuccess: () => void }) {
  const { setCurrentStep, setCourseDetails, courseDetails } = useCourseForm();

  const form = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: courseDetails || DEFAULT_VALUES,
  });

  const values = form.watch();
  const isDirty = form.formState.isDirty;

  const { saveToIndexDB } = useAutosave({
    values: { courseDetails: values },
    isDirty: isDirty,
    reset: () => form.reset(values),
    preventSaving: hasFormErrors(form.formState.errors),
  });

  const onSubmit = async (data: Step2FormData) => {
    onSuccess();
    setCourseDetails(data);
    saveToIndexDB({ courseDetails: data });
  };

  const onBack = () => {
    const data = form.getValues();
    setCurrentStep(0);
    setCourseDetails(data);
    saveToIndexDB({ courseDetails: data, currentStep: 0 });
  };

  return (
    <Form {...form}>
      <form
        id="details"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
      >
        <PreventLeaveDialog />
        <div className="space-y-2">
          <CourseOverViewCard />
          <FormNavigation
            currentStep={2}
            onBack={onBack}
            nextLabel="Next: (3) Curriculum"
            backLabel="Back: (1) Basic Info"
          />
        </div>
      </form>
    </Form>
  );
}
