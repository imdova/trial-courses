"use client";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import CustomAlert from "@/components/UI/CustomAlert";
import { QuizFormValuesTwo } from "@/types/forms";
import QuizHeader from "./components/QuizHeader";
import Tabs from "./components/Tabs";
import QuizEditor from "./components/QuizEditor";
import QuizPreview from "./components/QuizPreview";
import QuizSettings from "./components/QuizSettings";
import QuestionContent from "./components/QuestionContent";

export default function QuizForm() {
  const [activeTab, setActiveTab] = useState<"info" | "questions" | "preview">(
    "info"
  );
  const [isClient, setIsClient] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    trigger,
  } = useForm<QuizFormValuesTwo>({
    defaultValues: {
      title: "",
      instructions: "",
      randomizeQuestions: false,
      immediateFeedback: true,
      feedbackByEmail: false,
      timeControl: "flexible",
      startDate: "",
      endDate: "",
      timeLimit: 0,
      lateTime: 1,
      passingScore: 70,
      retakeNumbers: 3,
      questions: [
        {
          id: "q1",
          type: "multiple-choice",
          text: "What is the Output of Tuned?",
          points: 5,
          options: [
            { id: "q1-o1", text: "Option 1", isCorrect: false },
            { id: "q1-o2", text: "Option 2", isCorrect: true },
            { id: "q1-o3", text: "Option 3", isCorrect: false },
            { id: "q1-o4", text: "Option 4", isCorrect: false },
          ],
          isExpanded: true,
        },
      ],
    },
    mode: "onBlur",
  });
  const methods = useForm<QuizFormValuesTwo>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const onSubmit = (data: QuizFormValuesTwo) => {
    console.log("Quiz submitted:", data);
    showAlert("Quiz saved successfully!", "success");
  };

  if (!isClient) {
    return <div className="min-h-screen bg-gray-50 py-8 px-4">Loading...</div>;
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-main relative px-4"
      >
        {alert && (
          <CustomAlert
            message={alert.message}
            type={alert.type}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="bg-white shadow-sm border border-gray-200 rounded-lg mb-6 p-3">
          <div>
            <QuizHeader
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleSubmit={handleSubmit(onSubmit)}
            />

            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="overflow-hidden">
              <div className="p-0 sm:p-3">
                {activeTab === "info" && (
                  <>
                    <QuizEditor
                      control={control}
                      register={register}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                      getValues={getValues}
                      trigger={trigger}
                    />
                    <div className="space-y-4">
                      <QuizSettings
                        register={register}
                        errors={errors}
                        watch={watch}
                        control={control}
                        setValue={setValue}
                      />
                    </div>
                  </>
                )}
                {activeTab === "questions" && (
                  <QuestionContent
                    control={control}
                    register={register}
                    errors={errors}
                    watch={watch}
                    setValue={setValue}
                    getValues={getValues}
                    trigger={trigger}
                  />
                )}
                {activeTab === "preview" && <QuizPreview watch={watch} />}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
