"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, type Step3FormData } from "../util/course.schema";
import { useCourseForm } from "../hooks/useCourseForm";
import { Form } from "@/components/UI/form";
import CourseSectionsCard from "./CourseSectionsCard";
import { FormNavigation } from "./form-navigation";
import { useAutosave } from "../hooks/use-autosave";
import { hasFormErrors } from "@/util/forms";

export function Step3Curriculum({ onSuccess }: { onSuccess: () => void }) {
  const { setCurrentStep, setCourseCurriculum, courseCurriculum } =
    useCourseForm();

  const form = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: courseCurriculum || { sections: [] },
  });

  const values = form.watch();
  const isDirty = form.formState.isDirty;

  const { saveToIndexDB } = useAutosave({
    values: { courseCurriculum: values },
    isDirty: isDirty,
    reset: () => form.reset(values),
    preventSaving: hasFormErrors(form.formState.errors),
  });

  const onSubmit = async (data: Step3FormData) => {
    onSuccess();
    setCourseCurriculum(data);
    saveToIndexDB({ courseCurriculum: data });
  };

  const onBack = () => {
    const data = form.getValues();
    setCurrentStep(1);
    setCourseCurriculum(data);
    saveToIndexDB({ courseCurriculum: data, currentStep: 1 });
  };

  return (
    <Form {...form}>
      <form
        id="curriculum"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <CourseSectionsCard />
        <FormNavigation
          currentStep={3}
          nextLabel="Next: (4) Preview"
          backLabel="Back: (2) Details"
          onBack={onBack}
        />
      </form>
    </Form>
  );
}
