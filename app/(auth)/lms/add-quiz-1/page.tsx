/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

import CustomAlert from "@/components/UI/CustomAlert";
import { QuizFormValues } from "@/types/forms";
import { Question as QuizQuestion } from "@/types/quiz";
import QuizHeader from "./components/QuizHeader";
import Tabs from "./components/Tabs";
import QuizPreview from "./components/QuizPreview";
import QuizSummary from "./components/QuizSummary";
import QuizEditor from "./components/QuizEditor";
import QuizContent from "./components/QuizContent";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";
import { API_CREATE_QUIZ_WITH_QUESTIONS } from "@/constants/api/quize";

function QuizFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { createQuizWithQuestionsToApi, updateExistingQuiz, getQuizById, currentQuiz, loading: quizLoading, isLoading } = useQuiz();
  const [activeTab, setActiveTab] = useState<
    "editor" | "questions" | "preview"
  >("editor");
  const [isClient, setIsClient] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [quizId, setQuizId] = useState<string | null>(null);
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    getValues,
    trigger,
    reset,
  } = useForm<QuizFormValues>({
    defaultValues: {
      title: "",
      instructions: "",
      randomize_questions: false,
      immediate_feedback: true,
      feedback_by_email: false,
      start_date: "",
      end_date: "",
      late_time_minutes: 0,
      passing_score: 70,
      retakes: 3,
      questions: [],
    },
    mode: "onBlur",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if we're in edit mode and fetch quiz data
  useEffect(() => {
    const editQuizId = searchParams.get('edit');
    if (editQuizId && editQuizId !== quizId) {
      setQuizId(editQuizId);
      setIsInitialLoad(true); // Reset initial load state when changing quiz
    }
  }, [searchParams, quizId]);

  // Fetch quiz data only when both quizId and token are available
  useEffect(() => {
    if (quizId && typeof window !== 'undefined') {
      // getQuizById will internally check for token
      getQuizById(quizId);
    }
  }, [quizId, getQuizById]);

  // Populate form when quiz data is loaded
  useEffect(() => {

    if (currentQuiz && currentQuiz.id === quizId && isInitialLoad) {
      // Populate questions if they exist
      // API response structure: quizQuestions[].question.id
      const transformedQuestions = (currentQuiz as any).quizQuestions && (currentQuiz as any).quizQuestions.length > 0
        ? (currentQuiz as any).quizQuestions.map((q: any) => ({
            id: q.question.id, // Extract question ID from API response structure
            type: q.question.type === 'mcq' ? 'multiple-choice' : q.question.type,
            text: q.question.text,
            points: q.question.points,
            explanation: q.question.explanation || '',
            imageUrl: q.question.image_url || null,
            options: q.question.answers?.map((opt: any, index: number) => ({
              id: `opt-${index}`, // Generate ID since API doesn't provide it
              text: opt.text,
              isCorrect: opt.correct,
              imageUrl: opt.image_url || null,
            })) || [],
            isExpanded: true, // Expand questions in edit mode
          }))
        : [];

      console.log((currentQuiz as any)?.quizQuestions?.[0]?.question?.answers, "25+6");
      console.log('Transformed questions:', transformedQuestions);

      // Reset the entire form with all values at once
      reset({
        title: currentQuiz.title || '',
        instructions: currentQuiz.instructions || '',
        randomize_questions: (currentQuiz as any).randomize_questions || false,
        immediate_feedback: (currentQuiz as any).immediate_feedback || true,
        feedback_by_email: (currentQuiz as any).feedback_by_email || false,
        start_date: (currentQuiz as any).start_date || '',
        end_date: (currentQuiz as any).end_date || '',
        late_time_minutes: (currentQuiz as any).late_time_minutes || 0,
        passing_score: (currentQuiz as any).passing_score || 70,
        retakes: (currentQuiz as any).retakes || 3,
        questions: transformedQuestions,
      });

      // Switch to questions tab if we have questions
      if (transformedQuestions.length > 0) {
        setActiveTab('questions');
      }

      // Mark initial load as complete
      setIsInitialLoad(false);
    }
  }, [currentQuiz, quizId, reset, isInitialLoad]);


  // Watch form values to check if required fields are filled
  const watchedValues = watch();

  // Function to check if there are unsaved changes
  const checkForChanges = useCallback(() => {
    if (!currentQuiz || !quizId || isInitialLoad) {
      setHasUnsavedChanges(false);
      return;
    }

    const originalQuiz = currentQuiz as any;
    const formData = getValues();

    // Check quiz fields for changes
    const hasQuizChanges = 
      formData.title !== originalQuiz.title ||
      formData.instructions !== originalQuiz.instructions ||
      formData.randomize_questions !== originalQuiz.randomize_questions ||
      formData.immediate_feedback !== originalQuiz.immediate_feedback ||
      formData.feedback_by_email !== originalQuiz.feedback_by_email ||
      formData.passing_score !== originalQuiz.passing_score ||
      formData.retakes !== originalQuiz.retakes ||
      formData.late_time_minutes !== originalQuiz.late_time_minutes;

    // Check questions for changes (improved logic for all scenarios)
    const originalQuestions = originalQuiz.quizQuestions || [];
    const currentQuestions = formData.questions || [];
    
    // Create a map of original questions by ID for easy lookup
    const originalQuestionsMap = new Map();
    originalQuestions.forEach((q: any, index: number) => {
      if (q.question?.id) {
        originalQuestionsMap.set(q.question.id, { ...q.question, originalIndex: index });
      }
    });

    let hasQuestionChanges = false;

    // Check for new questions, updated questions, or reordered questions
    currentQuestions.forEach((currentQ, currentIndex) => {
      const isNewQuestion = !currentQ.id || currentQ.id.startsWith('q');
      const originalQ = originalQuestionsMap.get(currentQ.id);

      if (isNewQuestion) {
        // New question added
        hasQuestionChanges = true;
      } else if (originalQ) {
        // Check if existing question has changed
        const hasQuestionChanged = 
          currentQ.text !== originalQ.text ||
          currentQ.points !== originalQ.points ||
          currentQ.explanation !== (originalQ.explanation || '') ||
          currentQ.type !== (originalQ.type === 'mcq' ? 'multiple-choice' : originalQ.type) ||
          currentQ.imageUrl !== (originalQ.image_url || '') ||
          currentIndex !== originalQ.originalIndex; // Check if order changed

        // Check if options changed
        const currentOptions = currentQ.options || [];
        const originalOptions = originalQ.answers || [];
        let optionsChanged = currentOptions.length !== originalOptions.length;

        if (!optionsChanged) {
          for (let j = 0; j < currentOptions.length; j++) {
            const currentOpt = currentOptions[j];
            const originalOpt = originalOptions[j];
            
            if (!originalOpt ||
                currentOpt.text !== originalOpt.text ||
                currentOpt.isCorrect !== originalOpt.correct) {
              optionsChanged = true;
              break;
            }
          }
        }

        if (hasQuestionChanged || optionsChanged) {
          hasQuestionChanges = true;
        }

        // Remove from map to track which questions still exist
        originalQuestionsMap.delete(currentQ.id);
      }
    });

    // Any remaining questions in the map are deleted
    if (originalQuestionsMap.size > 0) {
      hasQuestionChanges = true;
    }

    setHasUnsavedChanges(hasQuizChanges || hasQuestionChanges);
  }, [currentQuiz, quizId, getValues, isInitialLoad]);

  // Watch for changes in form values (only after initial load)
  useEffect(() => {
    if (quizId && currentQuiz && !isInitialLoad) {
      checkForChanges();
    }
  }, [watchedValues, checkForChanges, quizId, currentQuiz, isInitialLoad]);
  
  // Check if editor form is valid (required fields are filled)
  const isEditorFormValid = () => {
    const { title, passing_score, late_time_minutes, retakes } = watchedValues;
    
    // Check required fields - ensure all return boolean values
    const isTitleValid = Boolean(title && title.trim().length > 0);
    const isPassingScoreValid = Boolean(passing_score >= 0 && passing_score <= 100);
    const isTimeLimitValid = Boolean(late_time_minutes >= 0);
    const isRetakeNumbersValid = Boolean(retakes >= 0);
    
    return isTitleValid && isPassingScoreValid && isTimeLimitValid && isRetakeNumbersValid && !errors.title && !errors.passing_score && !errors.late_time_minutes && !errors.retakes;
  };

  // Helper to transform form data to API shape
  const buildQuizApiPayload = (formData: QuizFormValues, status: 'draft' | 'published') => {
    return {
      quiz: {
        title: formData.title,
        instructions: formData.instructions,
        randomize_questions: formData.randomize_questions,
        randomize_answers: false,
        immediate_feedback: formData.immediate_feedback,
        feedback_by_email: formData.feedback_by_email,
        passing_score: formData.passing_score,
        retakes: formData.retakes,
        availability: 'time_bound',
        // start_date: formData.start_date,
        // end_date: formData.end_date,
        late_time_minutes: formData.late_time_minutes,
        attempt_mode: 'multiple',
        answer_time_type: 'quiz_time',
        answer_time: 45, // You can make this dynamic if needed
        status,
      },
      questions: (formData.questions || []).map((q, idx) => ({
        type: q.type === 'multiple-choice' || q.type === 'single-choice' ? 'mcq' : q.type,
        text: q.text,
        points: q.points,
        explanation: q.explanation || '',
        image_url: q.imageUrl || null,
        answers: (q.options || []).map(opt => ({
          text: opt.text,
          correct: !!opt.isCorrect
        })),
        order: idx + 1,
      }))
    };
  };

  // Helper to detect changes and build minimal payload according to API documentation
  // Supports all scenarios: quiz updates, question updates, new questions, deleted questions, reordered questions
  const buildChangedQuizPayload = (formData: QuizFormValues, status: 'draft' | 'published') => {
    if (!currentQuiz) return buildQuizApiPayload(formData, status);

    const originalQuiz = currentQuiz as any;
    const changedFields: any = {};
    const hasChanges: any = { quiz: false, questions: false };

    // Check quiz fields for changes
    if (formData.title !== originalQuiz.title) {
      changedFields.title = formData.title;
      hasChanges.quiz = true;
    }
    if (formData.instructions !== originalQuiz.instructions) {
      changedFields.instructions = formData.instructions;
      hasChanges.quiz = true;
    }
    if (formData.randomize_questions !== originalQuiz.randomize_questions) {
      changedFields.randomize_questions = formData.randomize_questions;
      hasChanges.quiz = true;
    }
    if (formData.immediate_feedback !== originalQuiz.immediate_feedback) {
      changedFields.immediate_feedback = formData.immediate_feedback;
      hasChanges.quiz = true;
    }
    if (formData.feedback_by_email !== originalQuiz.feedback_by_email) {
      changedFields.feedback_by_email = formData.feedback_by_email;
      hasChanges.quiz = true;
    }
    if (formData.passing_score !== originalQuiz.passing_score) {
      changedFields.passing_score = formData.passing_score;
      hasChanges.quiz = true;
    }
    if (formData.retakes !== originalQuiz.retakes) {
      changedFields.retakes = formData.retakes;
      hasChanges.quiz = true;
    }
    if (formData.late_time_minutes !== originalQuiz.late_time_minutes) {
      changedFields.late_time_minutes = formData.late_time_minutes;
      hasChanges.quiz = true;
    }

    // Always include status if it's changing
    if (status !== originalQuiz.status) {
      changedFields.status = status;
      hasChanges.quiz = true;
    }

    // Build questions payload according to API scenarios
    const originalQuestions = originalQuiz.quizQuestions || [];
    const currentQuestions = formData.questions || [];
    const questionsPayload: any[] = [];

    // Create a map of original questions by ID for easy lookup
    const originalQuestionsMap = new Map();
    originalQuestions.forEach((q: any, index: number) => {
      if (q.question?.id) {
        originalQuestionsMap.set(q.question.id, { ...q.question, originalIndex: index });
      }
    });

    // Process current questions
    currentQuestions.forEach((currentQ, currentIndex) => {
      const isNewQuestion = !currentQ.id || currentQ.id.startsWith('q'); // Temporary ID for new questions
      const originalQ = originalQuestionsMap.get(currentQ.id);

      if (isNewQuestion) {
        // Scenario 4: Add new questions (no ID) - API creates new questions
        questionsPayload.push({
          type: currentQ.type === 'multiple-choice' || currentQ.type === 'single-choice' ? 'mcq' : currentQ.type,
          text: currentQ.text,
          points: currentQ.points,
          explanation: currentQ.explanation || '',
          image_url: currentQ.imageUrl || null,
          answers: (currentQ.options || []).map((opt: any) => ({
            text: opt.text,
            correct: !!opt.isCorrect
          })),
          order: currentIndex + 1,
        });
        hasChanges.questions = true;
      } else if (originalQ) {
        // Check if this existing question has changed
        const hasQuestionChanged = 
          currentQ.text !== originalQ.text ||
          currentQ.points !== originalQ.points ||
          currentQ.explanation !== (originalQ.explanation || '') ||
          currentQ.type !== (originalQ.type === 'mcq' ? 'multiple-choice' : originalQ.type) ||
          currentQ.imageUrl !== (originalQ.image_url || null) ||
          currentIndex !== originalQ.originalIndex; // Check if order changed

        // Check if options changed
        const currentOptions = currentQ.options || [];
        const originalOptions = originalQ.answers || [];
        let optionsChanged = currentOptions.length !== originalOptions.length;

        if (!optionsChanged) {
          for (let j = 0; j < currentOptions.length; j++) {
            const currentOpt = currentOptions[j];
            const originalOpt = originalOptions[j];
            
            if (!originalOpt ||
                currentOpt.text !== originalOpt.text ||
                currentOpt.isCorrect !== originalOpt.correct) {
              optionsChanged = true;
              break;
            }
          }
        }

        if (hasQuestionChanged || optionsChanged) {
          // Scenario 2 & 3: Update existing questions (with ID) - API updates specific fields
          const questionUpdate: any = {
            id: currentQ.id,
          };

          // Only include changed fields (partial updates)
          if (currentQ.text !== originalQ.text) questionUpdate.text = currentQ.text;
          if (currentQ.points !== originalQ.points) questionUpdate.points = currentQ.points;
          if (currentQ.explanation !== (originalQ.explanation || '')) questionUpdate.explanation = currentQ.explanation || '';
          if (currentQ.type !== (originalQ.type === 'mcq' ? 'multiple-choice' : originalQ.type)) {
            questionUpdate.type = currentQ.type === 'multiple-choice' || currentQ.type === 'single-choice' ? 'mcq' : currentQ.type;
          }
          if (currentQ.imageUrl !== (originalQ.image_url || null)) questionUpdate.image_url = currentQ.imageUrl || null;
          if (optionsChanged) {
            questionUpdate.answers = currentOptions.map((opt: any) => ({
              text: opt.text,
              correct: !!opt.isCorrect
            }));
          }
          if (currentIndex !== originalQ.originalIndex) {
            questionUpdate.order = currentIndex + 1; // Scenario 7: Reorder questions
          }

          questionsPayload.push(questionUpdate);
          hasChanges.questions = true;
        }

        // Remove from map to track which questions still exist
        originalQuestionsMap.delete(currentQ.id);
      }
    });

    // Scenario 5 & 6: Delete questions - Any remaining questions in the map are deleted
    originalQuestionsMap.forEach((originalQ) => {
      questionsPayload.push({
        id: originalQ.id,
        delete: true
      });
      hasChanges.questions = true;
    });

    // Build final payload
    const payload: any = {};
    
    if (hasChanges.quiz) {
      payload.quiz = {
        ...changedFields,
        // Always include these required fields
        randomize_answers: false,
        availability: 'time_bound',
        attempt_mode: 'multiple',
        answer_time_type: 'quiz_time',
        answer_time: 45,
      };
    }
    
    if (hasChanges.questions && questionsPayload.length > 0) {
      payload.questions = questionsPayload;
    }

    return payload;
  };

  // Validate questions: each question must have options and at least one correct answer
  const validateQuestions = (questions: any[]): string | null => {
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const options = q.options || [];
      if (!options.length) {
        return `You must add options for question number ${i + 1}`;
      }
      for (let j = 0; j < options.length; j++) {
        if (!options[j].text || !options[j].text.trim()) {
          return `Option number ${j + 1} in question number ${i + 1} is required and cannot be empty.`;
        }
      }
      const hasCorrect = options.some((opt: any) => opt.isCorrect);
      if (!hasCorrect) {
        return `You must select a correct answer for question number ${i + 1}`;      
      }
    }
    return null;
  };

  // Save changes (for edit mode)
  const handleSaveChanges = async () => {
    if (!quizId) return;
    
    setIsCreatingQuiz(true);
    try {
      const formData = getValues();
      const validationError = validateQuestions(formData.questions || []);
      if (validationError) {
        showAlert(validationError, 'error');
        return;
      }
      const payload = buildChangedQuizPayload(formData, 'draft');
      
      console.log('Saving changes:', payload);
      const result = await updateExistingQuiz(quizId, payload);
      
      if (result.meta.requestStatus === 'fulfilled') {
        showAlert('Changes saved successfully!', 'success');
        setHasUnsavedChanges(false);
      } else {
        showAlert('An error occurred while saving changes', 'error');
      }
    } finally {
      setIsCreatingQuiz(false);
    }
  };


  // Save as Draft (for create mode)
  const onSubmit = async (data: QuizFormValues) => {
    const isEditMode = !!quizId;
    const validationError = validateQuestions(data.questions || []);
    if (validationError) {
      showAlert(validationError, 'error');
      return;
    }
    
    if (isEditMode) {
      // In edit mode, this shouldn't be called - use handleSaveChanges instead
      await handleSaveChanges();
    } else {
      // Create new quiz
      setIsCreatingQuiz(true);
      try {
        const payload = buildQuizApiPayload(data, 'draft');
        const result = await createQuizWithQuestionsToApi(payload);
        if (result.meta.requestStatus === 'fulfilled') {
          showAlert('Draft saved successfully!', 'success');
          setActiveTab('questions');
        } else {
          showAlert('An error occurred while saving the draft', 'error');
        }
      } finally {
        setIsCreatingQuiz(false);
      }
    }
  };

  // Publish (for both create and edit mode)
  const handlePublish = async () => {
    const formData = getValues();
    const isEditMode = !!quizId;
    const validationError = validateQuestions(formData.questions || []);
    if (validationError) {
      showAlert(validationError, 'error');
      return;
    }
    
    setIsCreatingQuiz(true);
    try {
      if (isEditMode) {
        // Edit mode: Update quiz and change status to published
        const payload = buildChangedQuizPayload(formData, 'published');
        
        // If there are no changes except status, we still need to update status
        if (!payload.quiz && !payload.questions) {
          payload.quiz = {
            status: 'published',
            randomize_answers: false,
            availability: 'time_bound',
            attempt_mode: 'multiple',
            answer_time_type: 'quiz_time',
            answer_time: 45,
          };
        } else if (!payload.quiz) {
          payload.quiz = { status: 'published' };
        }
        
        console.log('Publishing quiz:', payload);
        const result = await updateExistingQuiz(quizId, payload);
        
        if (result.meta.requestStatus === 'fulfilled') {
          showAlert('Quiz published successfully!', 'success');
          setHasUnsavedChanges(false);
          // Optionally redirect to quizzes list
          setTimeout(() => {
            router.push('/instructor/quizzes');
          }, 1500);
        } else {
          showAlert('An error occurred while publishing the quiz', 'error');
        }
      } else {
        // Create new quiz as published
        const payload = buildQuizApiPayload(formData, 'published');
        const result = await createQuizWithQuestionsToApi(payload);
        if (result.meta.requestStatus === 'fulfilled') {
          showAlert('Quiz published successfully!', 'success');
          router.push('/instructor/quizzes');
        } else {
          showAlert('An error occurred while publishing the quiz', 'error');
        }
      }
    } finally {
      setIsCreatingQuiz(false);
    }
  };

  const handleTabChange = async (tab: "editor" | "questions" | "preview") => {
    if (tab === "questions" && !isEditorFormValid()) {
      await trigger();
      showAlert("Please fill in all required fields in the editor form first", "error");
      return;
    }
    setActiveTab(tab);
  };

  // Show alert messages
  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  if (!isClient) {
    return <div className="min-h-screen bg-gray-50 py-8 px-4">Loading...</div>;
  }

  // Show loading state when fetching quiz data for editing
  if (searchParams.get('edit') && quizLoading) {
    return <div className="min-h-screen bg-gray-50 py-8 px-4">Loading quiz data...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-main relative px-3">
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1">
          <QuizHeader
            activeTab={activeTab}
            setActiveTab={handleTabChange}
            handleSubmit={handleSubmit(onSubmit)}
            onPublish={handlePublish}
            onSaveChanges={handleSaveChanges}
            isLoading={isLoading || isCreatingQuiz}
            isEditMode={!!quizId}
            hasUnsavedChanges={hasUnsavedChanges}
            quizStatus={(currentQuiz as any)?.status}
          />

          <Tabs 
            activeTab={activeTab} 
            setActiveTab={handleTabChange}
            isEditorFormValid={isEditorFormValid()}
          />

          <div className="overflow-hidden">
            <div className="p-0 sm:p-3">
              {activeTab === "editor" && (
                <QuizContent
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
              {activeTab === "questions" && (
                <QuizEditor
                  watch={watch}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  trigger={trigger}
                  getValues={getValues}
                  control={control}
                />
              )}
            </div>
          </div>
        </div>

        <div className="xl:w-[350px] space-y-4">
          <QuizSummary watch={watch} />
        </div>
      </div>
    </form>
  );
}

export default function QuizForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizFormContent />
    </Suspense>
  );
}
