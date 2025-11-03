"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Timer from "@/components/UI/Timer";
import { quizzes } from "@/constants/quizzes.data";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { use } from "react";
import { Check, ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import Image from "next/image";

interface QuizQuestionPageProps {
  params: Promise<{
    quizID: string;
    questionNumber: string;
  }>;
}

type QuestionOrder = "regular" | "random";
type QuizMode = "quiz" | "test";
type TimerMode = "no-limit" | "hidden" | "normal";
interface UserAnswer {
  selectedOption?: number; // For multiple choice/true-false
  textAnswer?: string; // For text answers
}
interface QuestionStatus {
  answered: boolean;
  correct?: boolean;
}

type UserAnswers = Record<number, UserAnswer>;

export default function QuizQuestionPage({ params }: QuizQuestionPageProps) {
  // Unwrap the params promise
  const { quizID, questionNumber } = use(params);
  const searchParams = useSearchParams();
  const quiz = quizzes.find((q) => q.id === quizID);
  const questionNum = parseInt(questionNumber);

  // State for quiz options and user answers
  const [quizOptions, setQuizOptions] = useState<{
    questionOrder: QuestionOrder;
    quizMode: QuizMode;
    timerMode: TimerMode;
  }>({
    questionOrder: "regular",
    quizMode: "quiz",
    timerMode: "normal",
  });
  console.log(quizOptions);

  const [answers, setAnswers] = useState<UserAnswers>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questionsStatus, setQuestionsStatus] = useState<
    Record<number, QuestionStatus>
  >({});
  const initialized = useRef(false);

  // 1. Initial load - set options once
  useEffect(() => {
    if (initialized.current) return;

    const urlOptions = {
      questionOrder: (searchParams.get("order") as QuestionOrder) || "regular",
      quizMode: (searchParams.get("mode") as QuizMode) || "quiz",
      timerMode: (searchParams.get("timer") as TimerMode) || "no-limit",
    };

    const storedOptions = JSON.parse(
      localStorage.getItem("quizOptions") || "{}"
    );

    setQuizOptions({
      questionOrder: storedOptions.questionOrder || urlOptions.questionOrder,
      quizMode: storedOptions.quizMode || urlOptions.quizMode,
      timerMode: storedOptions.timerMode || urlOptions.timerMode,
    });

    initialized.current = true;
  }, [searchParams]);

  // 2. Separate effect for loading answers when quizID changes
  useEffect(() => {
    const savedAnswers = JSON.parse(
      localStorage.getItem(`quizAnswers_${quizID}`) || "{}"
    ) as UserAnswers;
    setAnswers(savedAnswers);
  }, [quizID]);

  // 3. Save options whenever they change
  useEffect(() => {
    localStorage.setItem("quizOptions", JSON.stringify(quizOptions));
  }, [quizOptions]);

  if (!quiz || isNaN(questionNum)) {
    notFound();
  }
  const [orderedQuestions, setOrderedQuestions] = useState([...quiz.questions]);
  useEffect(() => {
    if (quizOptions.questionOrder === "random") {
      const seed =
        localStorage.getItem("quizSessionSeed") || Math.random().toString();
      localStorage.setItem("quizSessionSeed", seed);

      // Fisher-Yates shuffle with seeded random
      const shuffled = [...quiz.questions];
      const random = (max: number) => {
        const x = Math.sin(parseInt(seed) + max) * 10000;
        return Math.floor((x - Math.floor(x)) * max);
      };

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = random(i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      setOrderedQuestions(shuffled);
    } else {
      setOrderedQuestions([...quiz.questions]);
    }
  }, [quiz.questions, quizOptions.questionOrder]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("quizSessionSeed");
    };
  }, []);

  const currentQuestion = orderedQuestions[questionNum - 1];
  const startPageUrl = `/lms/quizzes/${quizID}/start`;
  const completePageUrl = `/lms/quizzes/${quizID}/complete`;

  if (!currentQuestion) {
    notFound();
  }

  // Handle answer selection
  useEffect(() => {
    setSelectedOption(answers[questionNum - 1]?.selectedOption ?? null);
  }, [questionNum, answers]);

  const handleTextAnswerChange = (value: string) => {
    const newAnswers: UserAnswers = {
      ...answers,
      [questionNum - 1]: {
        ...answers[questionNum - 1],
        textAnswer: value,
      },
    };
    setAnswers(newAnswers);
    localStorage.setItem(`quizAnswers_${quizID}`, JSON.stringify(newAnswers));
  };
  useEffect(() => {
    const newStatus: Record<number, QuestionStatus> = {};

    orderedQuestions.forEach((question, index) => {
      const answer = answers[index];
      let correct: boolean | undefined = undefined;

      if (answer) {
        if (
          question.type === "multiple-choice" ||
          question.type === "true-false"
        ) {
          correct = answer.selectedOption === question.answerCorrect;
        } else {
          correct = answer.textAnswer === question.answerCorrect;
        }
        newStatus[index + 1] = { answered: true, correct };
      } else {
        newStatus[index + 1] = { answered: false };
      }
    });

    setQuestionsStatus(newStatus);
  }, [answers, orderedQuestions]);

  const handleAnswerSelect = (index: number) => {
    const newAnswers: UserAnswers = {
      ...answers,
      [questionNum - 1]: {
        ...answers[questionNum - 1],
        selectedOption: index,
      },
    };
    setAnswers(newAnswers);
    setSelectedOption(index);
    localStorage.setItem(`quizAnswers_${quizID}`, JSON.stringify(newAnswers));
  };
  console.log(answers);
  // Quiz mode configuration
  const isTestMode = quizOptions.quizMode === "test";
  const showCorrectAnswers = !isTestMode;

  // Timer configuration
  const hasTimeLimit =
    quizOptions.timerMode === "normal" || quizOptions.timerMode === "hidden";
  const timerLimit = hasTimeLimit ? quiz.timeLimit : 0;

  // Calculate score
  const calculateScore = () => {
    const correctAnswers = orderedQuestions.reduce((acc, question, index) => {
      if (
        question.type === "multiple-choice" ||
        question.type === "true-false"
      ) {
        return answers[index]?.selectedOption === question.answerCorrect
          ? acc + 1
          : acc;
      } else {
        // For text answers, compare lowercase trimmed strings
        const userAnswer = answers[index]?.textAnswer?.toLowerCase().trim();
        const correctAnswer = question.answerCorrect;
        return userAnswer === correctAnswer ? acc + 1 : acc;
      }
    }, 0);
    return Math.round((correctAnswers / orderedQuestions.length) * 100);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const score = calculateScore();
    const result = {
      quizId: quizID,
      score,
      totalQuestions: orderedQuestions.length,
      answers,
      completedAt: new Date().toISOString(),
    };

    localStorage.setItem(`quizResult_${quizID}`, JSON.stringify(result));
    localStorage.removeItem(`quizAnswers_${quizID}`);
    localStorage.removeItem("quizSessionSeed");
    window.location.href = `${completePageUrl}`;
  };
  return (
    <div className="relative flex flex-col gap-6 px-4 lg:flex-row">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (questionNum === orderedQuestions.length) {
            handleSubmit();
          }
        }}
      >
        <div className="shadow-sm rounded-lg border-gray-200 border p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold">
              {quiz.title} ({isTestMode ? "Test Mode" : "Quiz Mode"})
            </h1>
            <Timer
              timeLimit={timerLimit}
              mode={quizOptions.timerMode}
              onTimeUp={handleSubmit}
              resetKey={quiz.id} // Changes when starting new quiz
              storageKey={`quizTimer_${quiz.id}`} // Unique per quiz
              onTimeUpdate={(taken) => console.log(`Time used: ${taken}s`)}
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="text-sm font-semibold">
                Question {questionNum} of {orderedQuestions.length}
                {quizOptions.questionOrder === "random" && "(Random Order)"}
              </span>
              <span className="text-sm font-semibold">
                {`${(questionNum / quiz.questions.length) * 100}% Complete`}
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{
                  width: `${(questionNum / quiz.questions.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium mb-2">
                {currentQuestion.text}
              </h2>
              <span className="text-sm">{currentQuestion.points} points</span>
            </div>
            {/* Add question image if exists */}
            {currentQuestion.imageUrl && (
              <div className="flex justify-center relative  h-64 my-4 rounded-lg overflow-hidden">
                <Image
                  src={currentQuestion.imageUrl}
                  alt={currentQuestion.imageAlt || "Question image"}
                  width={500}
                  height={500}
                  className="object-contain max-w-[400px]"
                />
              </div>
            )}
            {isTestMode && (
              <p className="text-sm text-gray-500">
                Test mode: Answers will be shown at the end
              </p>
            )}
          </div>

          <div className="space-y-3 mb-8">
            {currentQuestion.type === "multiple-choice" && (
              <div
                className={`w-full gap-4 ${
                  currentQuestion.options?.some((opt) => opt.imageUrl)
                    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2" // grid for image options
                    : "flex flex-col" // vertical list for text options
                }`}
              >
                {currentQuestion.options?.map((option, index) => {
                  const optionLetters = ["A", "B", "C", "D"];
                  const isSelected = selectedOption === index;
                  const isCorrect = option.isCorrect;
                  const showCorrect = showCorrectAnswers && isCorrect;
                  const showIncorrect =
                    showCorrectAnswers && isSelected && !isCorrect;

                  return (
                    <div
                      key={option.id}
                      onClick={() => handleAnswerSelect(index)}
                      className={`
            flex items-start gap-4 cursor-pointer transition-colors 
            ${
              option.imageUrl
                ? `
                  border rounded-lg p-6 
                  ${
                    isSelected
                      ? showCorrect
                        ? "border-green-700"
                        : showIncorrect
                        ? "border-red-700"
                        : "bg-white border-gray-700 hover:bg-white"
                      : "bg-white hover:border-gray-700"
                  }
                `
                : `
                  rounded-full p-3 
                  ${
                    isSelected
                      ? showCorrect
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : showIncorrect
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-green-500 text-white hover:bg-green-600"
                      : "bg-gray-100 hover:bg-gray-200"
                  }
                `
            }
          `}
                    >
                      <div className="flex gap-3 w-full">
                        <span
                          className={`flex justify-center items-center w-8 h-8 rounded-full text-sm font-medium bg-gray-200 text-main`}
                        >
                          {optionLetters[index]}
                        </span>

                        <input
                          type="radio"
                          id={`option-${index}`}
                          name="answer"
                          value={index}
                          checked={isSelected}
                          className="hidden"
                          onChange={() => {}}
                        />

                        <label
                          htmlFor={`option-${index}`}
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                        >
                          <div className="flex flex-col justify-center h-full flex-1">
                            <h2> {option.text}</h2>
                            {option.imageUrl && (
                              <div className="relative w-full max-w-[200px] rounded-md overflow-hidden mt-2">
                                <Image
                                  src={option.imageUrl}
                                  alt={option.imageAlt || "Option image"}
                                  width={500}
                                  height={500}
                                  className="object-contain"
                                />
                              </div>
                            )}
                          </div>
                          {(showCorrect || showIncorrect) && isSelected && (
                            <span
                              className={`flex justify-center items-center w-8 h-8 rounded-full bg-white ${
                                isCorrect ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {isCorrect ? (
                                <Check size={15} />
                              ) : (
                                <X size={15} />
                              )}
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === "true-false" && (
              <div>
                {[true, false].map((value, index) => {
                  const isSelected = selectedOption === index;
                  const isCorrect = index === currentQuestion.answerCorrect;
                  const optionLetters = ["A", "B", "C", "D"];
                  const showCorrect = showCorrectAnswers && isCorrect;
                  const showIncorrect =
                    showCorrectAnswers && isSelected && !isCorrect;

                  return (
                    <div
                      key={index}
                      className={`flex items-center p-4 rounded-full cursor-pointer transition-colors mb-3 ${
                        isSelected
                          ? showCorrect
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : showIncorrect
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                      onClick={() => handleAnswerSelect(index)}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex justify-center items-center w-8 h-8 rounded-full text-sm font-medium text-main ${
                            isSelected || showCorrect || showIncorrect
                              ? "bg-white"
                              : "bg-gray-200"
                          }`}
                        >
                          {optionLetters[index]}
                        </span>

                        <div>
                          {" "}
                          <input
                            type="radio"
                            id={`tf-${index}`}
                            name="true-false"
                            value={index}
                            checked={isSelected}
                            className="hidden"
                            onChange={() => {}}
                          />
                          <label
                            htmlFor={`tf-${index}`}
                            className="block cursor-pointer font-medium"
                          >
                            {value ? "True" : "False"}
                          </label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {currentQuestion.type === "fill-in-the-blank" && (
              <div className="mt-3">
                <label className="block text-sm text-muted-foreground mb-1">
                  Answer
                </label>
                <input
                  type="text"
                  value={answers[questionNum - 1]?.textAnswer || ""}
                  onChange={(e) => handleTextAnswerChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none "
                  placeholder="Type your answer here..."
                />
              </div>
            )}

            {currentQuestion.type === "short-answer" && (
              <div className="mt-3">
                <label className="block text-sm text-muted-foreground mb-1">
                  Answer
                </label>
                <textarea
                  value={answers[questionNum - 1]?.textAnswer || ""}
                  onChange={(e) => handleTextAnswerChange(e.target.value)}
                  className="w-full px-3 py-2 min-h-[100px] border border-gray-300 rounded-md focus:outline-none "
                  placeholder="Write your answer here..."
                />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            {questionNum === 1 ? (
              <div></div>
            ) : (
              <Link
                href={
                  questionNum > 1
                    ? `/lms/quizzes/${quizID}/${questionNum - 1}`
                    : startPageUrl
                }
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm bg-gray-100 hover:bg-gray-200 text-muted-foreground
               `}
              >
                <ChevronLeft size={15} /> Previous
              </Link>
            )}

            {questionNum === orderedQuestions.length ? (
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md disabled:opacity-50"
              >
                {isTestMode ? "Submit Test" : "Finish Quiz"}
              </button>
            ) : (
              <Link
                href={`/lms/quizzes/${quizID}/${questionNum + 1}`}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-sm text-white rounded-md"
              >
                Next <ChevronRight size={15} />
              </Link>
            )}
          </div>
        </div>
        {/* Explanation shown only in quiz mode for incorrect answers */}
        {!isTestMode &&
          selectedOption !== null &&
          selectedOption !== currentQuestion.answerCorrect &&
          currentQuestion.explanation && (
            <div className="mt-4 p-4 col-span-1 sm:col-span-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="flex items-center gap-2 text-sm text-main">
                <Info className="text-red-600" size={15} />
                <span className="font-semibold text-sm">Explanation:</span>{" "}
                {currentQuestion.explanation}
              </p>
            </div>
          )}
      </form>
      {!isTestMode && (
        <div className="shadow-sm rounded-lg border-gray-200 border md:w-[300px] h-fit p-6">
          <div className="flex justify-between mb-4">
            <h2 className="font-semibold">Qustions</h2>
            <span className="text-muted-foreground text-sm font-semibold">
              {orderedQuestions.length}
            </span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {orderedQuestions.map((_, index) => {
              const questionNum = index + 1;
              const status = questionsStatus[questionNum];

              return (
                <Link
                  key={questionNum}
                  href={`/lms/quizzes/${quizID}/${questionNum}`}
                  className={`w-8 h-8 flex items-center justify-center text-sm rounded-full bg-gray-300
                  ${
                    status?.answered
                      ? status.correct
                        ? "bg-green-600 text-white"
                        : "bg-red-600 text-white"
                      : ""
                  }
                   ${
                     questionNum === parseInt(questionNumber)
                       ? "opacity-100"
                       : "opacity-80"
                   }
                   `}
                >
                  {questionNum}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
