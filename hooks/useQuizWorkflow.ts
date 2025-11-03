/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";
import { Quiz } from "@/types/quiz";
import { QuizFormValues, QuizFormValuesTwo } from "@/types/forms";

interface QuizWorkflowState {
  currentQuizId: string | null;
  step: "create" | "add-questions" | "publish";
  isLoading: boolean;
  error: string | null;
}

export const useQuizWorkflow = () => {
  const { createNewQuiz, updateExistingQuiz, loading, error } = useQuiz();
  
  const [workflowState, setWorkflowState] = useState<QuizWorkflowState>({
    currentQuizId: null,
    step: "create",
    isLoading: false,
    error: null,
  });

  // Step 1: Create Quiz as Draft
  const createQuizDraft = useCallback(
    async (formData: QuizFormValues | QuizFormValuesTwo) => {
      setWorkflowState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        // Prepare quiz data with draft status
        const quizData: Partial<Quiz> = {
          title: formData.title,
          instructions: formData.instructions,
          // randomizeQuestions: formData.randomizeQuestions,
          // immediateFeedback: formData.immediateFeedback,
          // feedbackByEmail: formData.feedbackByEmail,
          // timeLimit: formData.timeLimit,
          // passingScore: formData.passingScore,
          // retakeNumbers: formData.retakeNumbers,
          // status: "draft", // Set as draft initially
          questions: [], // Empty questions initially
        };

        const result = await createNewQuiz(quizData);
        
        if (result.payload && typeof result.payload === 'object' && 'id' in result.payload) {
          const createdQuiz = result.payload as Quiz;
          setWorkflowState(prev => ({
            ...prev,
            currentQuizId: createdQuiz.id,
            step: "add-questions",
            isLoading: false,
          }));
          
          return {
            success: true,
            quizId: createdQuiz.id,
            quiz: createdQuiz,
          };
        } else {
          throw new Error("Failed to create quiz");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to create quiz";
        setWorkflowState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [createNewQuiz]
  );

  // Step 2: Add Questions to Quiz
  const addQuestionsToQuiz = useCallback(
    async (quizId: string, questions: any[]) => {
      if (!quizId) {
        throw new Error("Quiz ID is required");
      }

      setWorkflowState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await updateExistingQuiz(quizId, {
          questions: questions,
        });
        
        if (result.payload) {
          setWorkflowState(prev => ({
            ...prev,
            step: "publish",
            isLoading: false,
          }));
          
          return {
            success: true,
            quiz: result.payload,
          };
        } else {
          throw new Error("Failed to add questions");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to add questions";
        setWorkflowState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [updateExistingQuiz]
  );

  // Step 3: Publish Quiz
  const publishQuiz = useCallback(
    async (quizId: string) => {
      if (!quizId) {
        throw new Error("Quiz ID is required");
      }

      setWorkflowState(prev => ({ ...prev, isLoading: true, error: null }));
      
      try {
        const result = await updateExistingQuiz(quizId, {
          // status: "published",
        });
        
        if (result.payload) {
          setWorkflowState(prev => ({
            ...prev,
            isLoading: false,
            currentQuizId: null,
            step: "create", // Reset for next quiz
          }));
          
          return {
            success: true,
            quiz: result.payload,
          };
        } else {
          throw new Error("Failed to publish quiz");
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to publish quiz";
        setWorkflowState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
        
        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    [updateExistingQuiz]
  );

  // Reset workflow
  const resetWorkflow = useCallback(() => {
    setWorkflowState({
      currentQuizId: null,
      step: "create",
      isLoading: false,
      error: null,
    });
  }, []);

  // Set current quiz ID (for continuing existing workflow)
  const setCurrentQuizId = useCallback((quizId: string) => {
    setWorkflowState(prev => ({
      ...prev,
      currentQuizId: quizId,
      step: "add-questions",
    }));
  }, []);

  return {
    // State
    workflowState,
    isLoading: workflowState.isLoading || loading,
    error: workflowState.error || error,
    
    // Actions
    createQuizDraft,
    addQuestionsToQuiz,
    publishQuiz,
    resetWorkflow,
    setCurrentQuizId,
    
    // Getters
    getCurrentQuizId: () => workflowState.currentQuizId,
    getCurrentStep: () => workflowState.step,
    isReadyToPublish: () => workflowState.step === "publish" && workflowState.currentQuizId,
  };
};