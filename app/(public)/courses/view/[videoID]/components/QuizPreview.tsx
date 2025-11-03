/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { ProgressLine } from "@/components/UI/ProgressLine";
import { Clock, Files, Percent, Check, X, Info, ClipboardList, BookOpen, ChevronLeft } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/UI/radio-group";
import { Label } from "@/components/UI/label";
import { cn } from "@/util";
import { SingleCourseQuiz } from "@/types/courses";
import { submitProgress, QuizAnswer, ProgressSubmissionPayload, QuizSubmissionResponse } from "../api/api";
import { useEnrolledCourses } from "@/app/(auth)/student/my-courses/hooks/useEnrolledCourses";

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string; // Explanation for correct answer
}

interface QuizQuestion {
  question: string;
  imageUrl?: string;
  options: QuizOption[];
  selectedOption?: string;
  explanation?: string;
}

interface QuizPreviewProps {
  quizData?: SingleCourseQuiz | null;
  courseId?: string;
  itemId?: string;
  onBackToCourse?: () => void;
}

const QuizPreview = ({ quizData: apiQuizData, courseId, itemId, onBackToCourse }: QuizPreviewProps) => {
  const { data: session } = useSession();
  const { courseItemsProgress, getCourseItemsProgress } = useEnrolledCourses();
  const [quizStarted, setQuizStarted] = React.useState<boolean>(false);
  const [questionMode, setQuestionMode] = React.useState<"regular" | "random">("regular");
  const [feedbackMode, setFeedbackMode] = React.useState<"quiz" | "test">("quiz");
  const [currentQuestion, setCurrentQuestion] = React.useState<number>(0);
  const [progress, setProgress] = React.useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null);
  const [isAnswered, setIsAnswered] = React.useState<boolean>(false);
  const [userAnswers, setUserAnswers] = React.useState<Map<number, { optionId: string; optionText: string }>>(new Map());
  const [startTime, setStartTime] = React.useState<number>(0);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [quizCompleted, setQuizCompleted] = React.useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = React.useState<QuizSubmissionResponse | null>(null);
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0); // in seconds
  const [isRetake, setIsRetake] = React.useState<boolean>(false);
  const [showSubmitButton, setShowSubmitButton] = React.useState<boolean>(false);

  // Check if quiz was previously completed
  const previousQuizResult = React.useMemo(() => {
    if (!courseItemsProgress?.items || !itemId) return null;
    const progressItem = courseItemsProgress.items.find(item => item.id === itemId);
    if (progressItem && progressItem.completed && progressItem.type === "quiz" && progressItem.score !== null) {
      return {
        completed: true,
        score: progressItem.score,
      };
    }
    return null;
  }, [courseItemsProgress, itemId]);

  // Initialize quiz with previous results if available
  React.useEffect(() => {
    if (previousQuizResult && !isRetake) {
      setQuizCompleted(true);
      setSubmissionResult({
        id: itemId || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted_at: null,
        completed: previousQuizResult.completed,
        score: previousQuizResult.score,
      });
    }
  }, [previousQuizResult, itemId, isRetake]);

  // Transform API data to component format
  const transformedQuestions: QuizQuestion[] = React.useMemo(() => {
    if (!apiQuizData?.quizQuestions) return [];
    
    return apiQuizData.quizQuestions.map((q, index) => {
      const correctAnswers = q.question.answers.filter(a => a.correct);
      const hasMultipleCorrect = correctAnswers.length > 1;
      
      return {
        question: q.question.text,
        imageUrl: q.question.image_url || undefined,
        explanation: q.question.explanation,
        options: q.question.answers.map((answer, answerIndex) => ({
          id: String.fromCharCode(65 + answerIndex), // A, B, C, D...
          text: answer.text,
          isCorrect: answer.correct,
          explanation: answer.correct ? q.question.explanation : undefined,
        })),
      };
    });
  }, [apiQuizData]);

  // Shuffle array function
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Apply question ordering based on mode (only when quiz starts)
  const orderedQuestions = React.useMemo(() => {
    if (!quizStarted) return transformedQuestions; // Don't shuffle until quiz starts
    return questionMode === "random" ? shuffleArray(transformedQuestions) : transformedQuestions;
  }, [transformedQuestions, questionMode, quizStarted]);

  const quizData = React.useMemo(() => {
    if (!apiQuizData) {
      return {
        title: "Quiz",
        totalQuestions: 0,
        timeLimit: 0,
        passingScore: 0,
        questions: [],
      };
    }

    return {
      title: apiQuizData.title,
      totalQuestions: apiQuizData.quizQuestions.length,
      timeLimit: apiQuizData.answer_time, // in minutes
      passingScore: apiQuizData.passing_score,
      questions: orderedQuestions,
    };
  }, [apiQuizData, orderedQuestions]);

  // Update progress when question changes
  React.useEffect(() => {
    if (quizData.totalQuestions > 0) {
      const newProgress = Math.round(((currentQuestion + 1) / quizData.totalQuestions) * 100);
      setProgress(newProgress);
    }
  }, [currentQuestion, quizData.totalQuestions]);

  // Initialize timer when quiz starts
  React.useEffect(() => {
    if (quizStarted && apiQuizData && timeRemaining === 0) {
      // Convert answer_time from minutes to seconds
      setTimeRemaining(apiQuizData.answer_time * 60);
    }
  }, [quizStarted, apiQuizData, timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Submit quiz function
  const handleSubmitQuiz = React.useCallback(async () => {
    if (!apiQuizData || !session?.user?.accessToken || !courseId || !itemId) {
      console.error("Quiz data, token, courseId, or itemId not available");
      return;
    }

    setIsSubmitting(true);

    try {
      // Calculate time taken in minutes
      const timeTaken = (Date.now() - startTime) / 1000 / 60; // Convert to minutes

      // Prepare answers array
      const answers: QuizAnswer[] = apiQuizData.quizQuestions.map((q, index) => {
        const userAnswer = userAnswers.get(index);
        const questionId = q.question.id;
        const chosenOptionText = userAnswer?.optionText || "";
        const correctAnswer = q.question.answers.find(a => a.correct);
        const isCorrect = userAnswer?.optionText === correctAnswer?.text;

        return {
          questionId,
          chosenOptionText,
          correct: isCorrect,
        };
      });

      const payload: ProgressSubmissionPayload = {
        answers,
        timeTaken,
      };

      const result = await submitProgress(courseId, itemId, session.user.accessToken, payload);
      setSubmissionResult(result);
      setQuizCompleted(true);
      
      // Refresh progress data after submission
      if (courseId) {
        getCourseItemsProgress(courseId);
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [apiQuizData, session?.user?.accessToken, courseId, itemId, startTime, userAnswers, getCourseItemsProgress]);

  // Countdown timer
  React.useEffect(() => {
    if (!quizStarted || quizCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time's up - auto submit
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeRemaining, handleSubmitQuiz]);

  const handleAnswerSelect = (optionId: string, optionText: string) => {
    if (!isAnswered) {
      setSelectedAnswer(optionId);
      setIsAnswered(true);
      
      // Store the answer
      const newAnswers = new Map(userAnswers);
      newAnswers.set(currentQuestion, { optionId, optionText });
      setUserAnswers(newAnswers);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= quizData.totalQuestions - 1) {
      // Last question - show submit button
      setShowSubmitButton(true);
    } else {
      // Move to next question
      setSelectedAnswer(null);
      setIsAnswered(false);
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePreviousQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setShowSubmitButton(false);
    setCurrentQuestion(prev => prev - 1);
  };

  const getAnswerStyles = (option: QuizOption) => {
    // In test mode, don't show feedback until quiz is complete
    if (feedbackMode === "test") {
      if (selectedAnswer === option.id) {
        return "bg-blue-100 border-blue-500 text-blue-700 hover:bg-blue-100";
      }
      return "hover:bg-secondary";
    }

    // Quiz mode - show immediate feedback
    if (!isAnswered || selectedAnswer !== option.id) {
      return "hover:bg-secondary";
    }

    if (option.isCorrect) {
      return "bg-green-100 border-green-500 text-green-700 hover:bg-green-100";
    }

    if (selectedAnswer === option.id && !option.isCorrect) {
      return "bg-red-100 border-red-500 text-red-700 hover:bg-red-100";
    }

    return "hover:bg-secondary";
  };

  // Loading or no data state
  if (!apiQuizData) {
    return (
      <Card className="mx-auto w-full max-w-4xl">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No quiz data available</p>
        </CardContent>
      </Card>
    );
  }

  // Quiz Start Screen
  if (!quizStarted) {
    return (
      <TooltipProvider>
        <Card className="mx-auto w-full max-w-4xl">
          <CardHeader className="space-y-6 pb-8">
            <h1 className="text-3xl font-bold">{quizData.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-base">
              <div className="flex items-center gap-2 text-green-600">
                <ClipboardList className="h-6 w-6" />
                <span className="font-semibold">{quizData.totalQuestions} Questions</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <Clock className="h-6 w-6" />
                <span className="font-semibold">{quizData.timeLimit} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <BookOpen className="h-6 w-6" />
                <span className="font-semibold">{quizData.passingScore}%</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 pb-8">
            <p className="text-muted-foreground">
              There are {quizData.totalQuestions} questions available in this quiz.
              You have to get at least {quizData.passingScore}% to pass this quiz
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Question Order Selection */}
              <div className="space-y-4">
                <RadioGroup
                  value={questionMode}
                  onValueChange={(value) => setQuestionMode(value as "regular" | "random")}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="regular" id="regular" />
                    <div className="flex flex-col">
                      <Label htmlFor="regular" className="font-semibold text-base cursor-pointer">
                        Regular
                      </Label>
                      <span className="text-sm text-muted-foreground">1-2-3-4</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="random" id="random" />
                    <div className="flex flex-col">
                      <Label htmlFor="random" className="font-semibold text-base cursor-pointer">
                        Random
                      </Label>
                      <span className="text-sm text-muted-foreground">2-10-1-7</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* Feedback Mode Selection */}
              <div className="space-y-4">
                <RadioGroup
                  value={feedbackMode}
                  onValueChange={(value) => setFeedbackMode(value as "quiz" | "test")}
                >
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="quiz" id="quiz" />
                    <div className="flex flex-col">
                      <Label htmlFor="quiz" className="font-semibold text-base cursor-pointer">
                        Quiz mode
                      </Label>
                      <span className="text-sm text-muted-foreground">Feedback after each question</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem value="test" id="test" />
                    <div className="flex flex-col">
                      <Label htmlFor="test" className="font-semibold text-base cursor-pointer">
                        Test mode
                      </Label>
                      <span className="text-sm text-muted-foreground">Feedback at the end</span>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6">
              <Button 
                variant="outline" 
                className="gap-2"
                onClick={onBackToCourse}
              >
                <ChevronLeft className="h-4 w-4" />
                Back to course
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700 gap-2"
                onClick={() => {
                  setQuizStarted(true);
                  setStartTime(Date.now());
                }}
              >
                Start quiz
                <span className="text-xl">→</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    );
  }

  // Quiz Results Screen
  if (quizCompleted && submissionResult) {
    const score = submissionResult.score;
    const passed = score >= quizData.passingScore;
    const isPreviousResult = previousQuizResult && !isRetake;

    // Show detailed review for test mode
    if (feedbackMode === "test") {
      return (
        <TooltipProvider>
          <div className="space-y-6">
            {/* Results Summary Card */}
            <Card className="mx-auto w-full max-w-4xl">
              <CardHeader className="space-y-4 text-center">
                {isPreviousResult && (
                  <div className="mb-2 rounded-lg bg-blue-50 border border-blue-200 p-3">
                    <Info className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                    <p className="text-sm text-blue-700 font-medium">
                      This is your previous quiz result
                    </p>
                  </div>
                )}
                <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
                  passed ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {passed ? (
                    <Check className="h-10 w-10 text-green-600" />
                  ) : (
                    <X className="h-10 w-10 text-red-600" />
                  )}
                </div>
                <h1 className="text-3xl font-bold">
                  {passed ? "Congratulations! 🎉" : "Quiz Completed"}
                </h1>
                <p className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
                  {passed ? "You passed the quiz!" : "You didn't pass this time"}
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-blue-50 text-center">
                    <div className="text-3xl font-bold text-blue-600">{score}%</div>
                    <div className="text-sm text-muted-foreground mt-1">Your Score</div>
                  </div>
                  <div className="p-4 rounded-lg bg-purple-50 text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {quizData.passingScore}%
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">Passing Score</div>
                  </div>
                </div>

                {submissionResult.completed && (
                  <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                    <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <p className="text-green-700 font-medium">Quiz Completed Successfully</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Detailed Review for Test Mode */}
            <Card className="mx-auto w-full max-w-4xl">
              <CardHeader>
                <h2 className="text-2xl font-bold">Answer Review</h2>
                <p className="text-sm text-muted-foreground">
                  Review your answers and see the correct solutions
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {quizData.questions.map((question, qIndex) => {
                  const userAnswer = userAnswers.get(qIndex);
                  const correctOption = question.options.find(opt => opt.isCorrect);
                  const isCorrect = userAnswer?.optionId === correctOption?.id;

                  return (
                    <div key={qIndex} className={`p-6 rounded-lg border-2 ${
                      isCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'
                    }`}>
                      {/* Question Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect ? 'bg-green-600' : 'bg-red-600'
                        }`}>
                          {isCorrect ? (
                            <Check className="h-5 w-5 text-white" />
                          ) : (
                            <X className="h-5 w-5 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-semibold text-gray-600">
                              Question {qIndex + 1}
                            </span>
                            <span className={`text-xs font-semibold ${
                              isCorrect ? 'text-green-700' : 'text-red-700'
                            }`}>
                              {isCorrect ? 'Correct' : 'Incorrect'}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-800 mb-3">
                            {question.question}
                          </h3>
                          
                          {question.imageUrl && (
                            <div className="mb-4 relative w-full h-48">
                              <Image 
                                src={question.imageUrl} 
                                alt="Question image"
                                fill
                                className="object-contain rounded-lg border"
                              />
                            </div>
                          )}

                          {/* Options */}
                          <div className="space-y-3">
                            {question.options.map((option) => {
                              const isUserAnswer = userAnswer?.optionId === option.id;
                              const isCorrectAnswer = option.isCorrect;

                              return (
                                <div 
                                  key={option.id}
                                  className={`p-4 rounded-lg border-2 ${
                                    isCorrectAnswer 
                                      ? 'border-green-500 bg-green-100' 
                                      : isUserAnswer 
                                      ? 'border-red-500 bg-red-100'
                                      : 'border-gray-200 bg-white'
                                  }`}
                                >
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-start gap-3 flex-1 min-w-0">
                                      <span className="font-semibold text-sm flex-shrink-0 mt-0.5">{option.id}.</span>
                                      <span className={`text-sm leading-relaxed break-words overflow-wrap-anywhere ${
                                        isCorrectAnswer 
                                          ? 'text-green-700 font-medium' 
                                          : isUserAnswer 
                                          ? 'text-red-700'
                                          : 'text-gray-700'
                                      }`}>
                                        {option.text}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                      {isCorrectAnswer && (
                                        <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded-full whitespace-nowrap">
                                          Correct Answer
                                        </span>
                                      )}
                                      {isUserAnswer && !isCorrectAnswer && (
                                        <span className="text-xs font-semibold text-red-700 bg-red-200 px-2 py-1 rounded-full whitespace-nowrap">
                                          Your Answer
                                        </span>
                                      )}
                                      {isUserAnswer && isCorrectAnswer && (
                                        <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded-full whitespace-nowrap">
                                          Your Answer ✓
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Explanation - Always show for correct answer in test mode review */}
                          {correctOption?.explanation && (
                            <div className="mt-4 p-4 rounded-lg bg-green-50 border border-green-200 shadow-sm">
                              <div className="flex items-start gap-3">
                                <Info className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-green-700 font-semibold text-sm mb-2">Explanation:</p>
                                  <p className="text-green-700 text-sm leading-relaxed break-words">
                                    {correctOption.explanation}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-6 flex justify-center gap-4">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setQuizStarted(false);
                      setQuizCompleted(false);
                      setCurrentQuestion(0);
                      setUserAnswers(new Map());
                      setSelectedAnswer(null);
                      setIsAnswered(false);
                      setSubmissionResult(null);
                      setIsRetake(false);
                      setShowSubmitButton(false);
                      onBackToCourse?.();
                    }}
                  >
                    Back to Course
                  </Button>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      setQuizStarted(false);
                      setQuizCompleted(false);
                      setCurrentQuestion(0);
                      setUserAnswers(new Map());
                      setSelectedAnswer(null);
                      setIsAnswered(false);
                      setSubmissionResult(null);
                      setIsRetake(true);
                      setShowSubmitButton(false);
                    }}
                  >
                    {passed ? "Retake Quiz" : "Try Again"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TooltipProvider>
      );
    }

    // Default results screen for quiz mode
    return (
      <TooltipProvider>
        <Card className="mx-auto w-full max-w-4xl">
          <CardHeader className="space-y-4 text-center">
            {isPreviousResult && (
              <div className="mb-2 rounded-lg bg-blue-50 border border-blue-200 p-3">
                <Info className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                <p className="text-sm text-blue-700 font-medium">
                  This is your previous quiz result
                </p>
              </div>
            )}
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <Check className="h-10 w-10 text-green-600" />
              ) : (
                <X className="h-10 w-10 text-red-600" />
              )}
            </div>
            <h1 className="text-3xl font-bold">
              {passed ? "Congratulations! 🎉" : "Quiz Completed"}
            </h1>
            <p className={`text-lg ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? "You passed the quiz!" : "You didn't pass this time"}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 text-center">
                <div className="text-3xl font-bold text-blue-600">{score}%</div>
                <div className="text-sm text-muted-foreground mt-1">Your Score</div>
              </div>
              {/* <div className="p-4 rounded-lg bg-green-50 text-center">
                <div className="text-3xl font-bold text-green-600">
                  {correctAnswers}/{totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Correct Answers</div>
              </div> */}
              <div className="p-4 rounded-lg bg-purple-50 text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {quizData.passingScore}%
                </div>
                <div className="text-sm text-muted-foreground mt-1">Passing Score</div>
              </div>
            </div>

            {submissionResult.completed && (
              <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
                <Check className="h-6 w-6 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium">Quiz Completed Successfully</p>
              </div>
            )}

            <div className="pt-6 flex justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => {
                  setQuizStarted(false);
                  setQuizCompleted(false);
                  setCurrentQuestion(0);
                  setUserAnswers(new Map());
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                  setSubmissionResult(null);
                  setIsRetake(false);
                  setShowSubmitButton(false);
                  onBackToCourse?.();
                }}
              >
                Back to Course
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  setQuizStarted(false);
                  setQuizCompleted(false);
                  setCurrentQuestion(0);
                  setUserAnswers(new Map());
                  setSelectedAnswer(null);
                  setIsAnswered(false);
                  setSubmissionResult(null);
                  setIsRetake(true);
                  setShowSubmitButton(false);
                }}
              >
                {passed ? "Retake Quiz" : "Try Again"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    );
  }

  // Quiz Questions Screen
  return (
    <TooltipProvider>
      <Card className="mx-auto w-full max-w-5xl overflow-hidden">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">{quizData.title}</h2>
            <div className={`flex items-center gap-2 ${
              timeRemaining < 60 ? 'text-red-600 font-semibold' : 
              timeRemaining < 300 ? 'text-orange-600' : ''
            }`}>
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeRemaining)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>
                Question {currentQuestion + 1} of {quizData.totalQuestions}
              </span>
              <span>{progress}% Complete</span>
            </div>
            <ProgressLine progress={progress} height="h-1" />
          </div>

          <div className="text-muted-foreground flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Files className="h-4 w-4" />
              <span>{quizData.totalQuestions} Questions</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{quizData.timeLimit} minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <Percent className="h-4 w-4" />
              <span>{quizData.passingScore}%</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 overflow-hidden">
          <p className="text-muted-foreground text-sm">
            There are {quizData.totalQuestions} questions available in this quiz.
            You have to get at least {quizData.passingScore}% to pass this quiz.
          </p>

          <div className="space-y-4 overflow-hidden">
            <div>
              <h3 className="font-medium mb-4 text-lg leading-relaxed break-words">
                {quizData.questions[currentQuestion].question}
              </h3>
              {quizData.questions[currentQuestion].imageUrl && (
                <div className="mb-4 relative w-full h-64">
                  <Image 
                    src={quizData.questions[currentQuestion].imageUrl} 
                    alt="Question image"
                    fill
                    className="object-contain rounded-lg border"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {quizData.questions[currentQuestion].options.map((option) => (
                <div className="flex flex-col gap-3" key={option.id}>
                  <div className="w-full">
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-between text-left font-normal h-auto min-h-[56px] p-4",
                        getAnswerStyles(option)
                      )}
                      onClick={() => handleAnswerSelect(option.id, option.text)}
                      disabled={(feedbackMode === "quiz" && isAnswered && selectedAnswer !== option.id) || (feedbackMode === "test" && isAnswered)}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-sm font-semibold flex-shrink-0 mt-0.5">{option.id}.</span>
                        <span className="text-sm leading-relaxed break-words overflow-wrap-anywhere text-left">
                          {option.text}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        {/* Only show feedback icons in quiz mode */}
                        {feedbackMode === "quiz" && isAnswered && option.id === selectedAnswer && (
                          option.isCorrect ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <X className="h-5 w-5 text-red-600" />
                          )
                        )}
                        {feedbackMode === "quiz" && isAnswered && option.isCorrect && option.id !== selectedAnswer && (
                          <Check className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                    </Button>
                  </div>

                  {/* Explanation Section - Show only in quiz mode for correct answer */}
                  {feedbackMode === "quiz" && isAnswered && option.isCorrect && option.explanation && (
                    <div className="ml-6 p-4 rounded-lg bg-green-50 border border-green-200 shadow-sm">
                      <div className="flex items-start gap-3">
                        <Info className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-green-700 font-semibold text-sm mb-2">Correct Answer Explanation:</p>
                          <p className="text-green-700 text-sm leading-relaxed break-words">
                            {option.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button 
              variant="outline" 
              disabled={currentQuestion === 0 || isSubmitting || showSubmitButton}
              onClick={handlePreviousQuestion}
            >
              ← Previous
            </Button>
            
            {!showSubmitButton ? (
              <Button 
                variant="default"
                onClick={handleNextQuestion}
                disabled={isSubmitting}
              >
                Next →
              </Button>
            ) : (
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleSubmitQuiz}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default QuizPreview;
