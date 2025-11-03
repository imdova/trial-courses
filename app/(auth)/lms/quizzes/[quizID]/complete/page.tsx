"use client";
import { quizzes } from "@/constants/quizzes.data";
import { Question, Quiz } from "@/types/quiz";

import {
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  SquareCheck,
  Timer,
  X,
} from "lucide-react";
import { notFound } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { use, useEffect, useState } from "react";
import Image from "next/image";

interface QuizCompletePageProps {
  params: Promise<{
    quizID: string;
  }>;
}

interface QuizAnswer {
  selectedOption?: number;
  textAnswer?: string;
}

interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  answers: Record<number, QuizAnswer>;
  completedAt: string;
}

export default function QuizCompletePage({ params }: QuizCompletePageProps) {
  const { quizID } = use(params);
  const searchParams = useSearchParams();
  const quiz = quizzes.find((q) => q.id === quizID) as Quiz | undefined;
  const [result, setResult] = useState<QuizResult | null>(null);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});
  const urlScore = searchParams.get("score");

  useEffect(() => {
    const data = localStorage.getItem(`quizTimer_${quizID}`);

    if (data) {
      const parsedData = JSON.parse(data);
      setTimeTaken(parsedData.timeTaken);
    } else {
      setTimeTaken(0);
    }
  }, [quizID]);

  useEffect(() => {
    const savedResult = localStorage.getItem(`quizResult_${quizID}`);
    if (savedResult) {
      setResult(JSON.parse(savedResult));
    } else if (urlScore) {
      setResult({
        quizId: quizID,
        score: parseInt(urlScore),
        totalQuestions: quiz?.questions.length || 0,
        answers: {},
        completedAt: new Date().toISOString(),
      });
    }
  }, [quizID, urlScore, quiz]);

  if (!quiz) {
    notFound();
  }

  if (!result) {
    return (
      <div className="mx-4 text-center py-10 text-gray-600">
        Loading results...
      </div>
    );
  }

  const isAnswerCorrect = (question: Question, answer: QuizAnswer): boolean => {
    if (!answer) return false;

    if (question.type === "multiple-choice" || question.type === "true-false") {
      return answer.selectedOption === question.answerCorrect;
    }

    const userAnswer = answer.textAnswer?.toLowerCase().trim() || "";
    const correctAnswer = String(question.answerCorrect).toLowerCase().trim();

    if (userAnswer === correctAnswer) return true;

    if (correctAnswer.includes("|")) {
      const possibleAnswers = correctAnswer.split("|").map((a) => a.trim());
      return possibleAnswers.includes(userAnswer);
    }

    if (!isNaN(Number(userAnswer)) && !isNaN(Number(correctAnswer))) {
      return Number(userAnswer) === Number(correctAnswer);
    }

    const normalize = (str: string) =>
      str
        .replace(/\b(a|an|the|and|or|of|in|on|at)\b/g, "")
        .replace(/\s+/g, " ")
        .trim();

    return normalize(userAnswer) === normalize(correctAnswer);
  };

  const calculateCorrectAnswers = (quiz: Quiz, result: QuizResult) => {
    return quiz.questions.reduce((count, question, index) => {
      return isAnswerCorrect(question, result.answers[index])
        ? count + 1
        : count;
    }, 0);
  };

  const correctAnswers = calculateCorrectAnswers(quiz, result);
  const score = Math.round((correctAnswers / result.totalQuestions) * 100);
  const passed = score >= quiz.passingScore;

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return hours > 0
      ? `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      : `${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
  };

  const getAnswerText = (question: Question, answer: QuizAnswer) => {
    if (!answer) return "Not answered";

    if (question.type === "true-false") {
      if (typeof answer.selectedOption !== "number") return "Not answered";
      return answer.selectedOption ? "True" : "False";
    }

    if (question.type === "multiple-choice") {
      return (
        question.options?.[answer.selectedOption ?? -1]?.text ?? "Not answered"
      );
    }

    return answer.textAnswer || "Not answered";
  };

  const getCorrectAnswerText = (question: Question) => {
    if (question.type === "true-false") {
      return question.answerCorrect ? "True" : "False";
    }

    if (question.type === "multiple-choice") {
      return question.options?.[question.answerCorrect as number]?.text ?? "";
    }

    const correctAnswer = String(question.answerCorrect);
    if (correctAnswer.includes("|")) {
      return `Acceptable answers: ${correctAnswer.split("|").join(", ")}`;
    }

    return correctAnswer;
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const TimeTaken = ({ seconds }: { seconds: number }) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return (
      <span>
        {minutes}:{secs.toString().padStart(2, "0")}
      </span>
    );
  };

  const renderQuestionContent = (question: Question, index: number) => {
    const userAnswer = result.answers[index];
    const isCorrect = isAnswerCorrect(question, userAnswer);
    const userAnswerText = getAnswerText(question, userAnswer);
    const correctAnswerText = getCorrectAnswerText(question);

    if (
      question.type === "fill-in-the-blank" ||
      question.type === "short-answer"
    ) {
      return (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">Correct answer:</p>
          <p className="mt-1 text-green-700 font-semibold">
            {correctAnswerText || "N/A"}
          </p>
          <p className="font-medium mt-3">Written answer:</p>
          <p
            className={`mt-1 ${isCorrect ? "text-green-700" : "text-red-700"}`}
          >
            {userAnswerText || "No answer provided"}
          </p>
        </div>
      );
    }

    return (
      question.options?.map((option, optionIndex) => {
        const optionLetter = String.fromCharCode(65 + optionIndex);
        const isCorrectOption = optionIndex === question.answerCorrect;
        const isStudentChosen = optionIndex === userAnswer?.selectedOption;

        return (
          <div key={optionIndex} className="mt-2">
            <div
              className={`flex items-center gap-2 p-4 rounded-full ${isCorrectOption && isStudentChosen
                  ? option.imageUrl
                    ? "bg-white text-primary font-bold"
                    : "bg-primary text-white font-bold"
                  : isCorrectOption
                    ? "bg-white text-primary"
                    : isStudentChosen
                      ? option.imageUrl
                        ? "text-red-500 font-bold"
                        : "bg-red-500 text-white font-bold"
                      : "text-gray-600"
                }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full mr-3 mt-0.5 flex items-center justify-center `}
              >
                {optionLetter}
              </div>
              <div className="flex-1">
                {option.imageUrl ? (
                  <Image
                    src={option.imageUrl}
                    alt={option.imageAlt || "Option image"}
                    width={200}
                    height={150}
                    className="rounded-md object-contain max-h-40"
                  />
                ) : (
                  <p className={isStudentChosen ? "font-medium" : ""}>
                    {option.text}
                  </p>
                )}
              </div>
              {isCorrectOption && <Check size={15} />}
              {!isCorrectOption && isStudentChosen && <X size={15} />}
            </div>
            <div className="flex-1">
              {isStudentChosen && (
                <p
                  className={`text-sm mt-1 ${isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {isCorrect
                    ? "Chosen answer is correct."
                    : `Chosen answer is incorrect.`}
                </p>
              )}
              {!isCorrect && isCorrectOption && (
                <p className="text-sm text-green-600 mt-1">
                  This is the correct answer.
                </p>
              )}
            </div>
          </div>
        );
      }) || null
    );
  };

  return (

    <div className="px-4">
      <div className="flex flex-col gap-3 justify-between mb-6 items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 sm:flex-row">
        <h1 className="text-2xl font-bold text-gray-800">Quiz Results</h1>
      </div>
      <div className="mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg mb-6 border border-gray-200">
            <h3 className="font-medium text-sm text-gray-800 mb-2">RESULTS</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <div>
                  <p
                    className={`flex items-center gap-1 font-bold ${passed ? "text-primary" : "text-red-600"
                      }`}
                  >
                    <SquareCheck size={16} />{" "}
                    {passed ? "Test passed" : "Test failed"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Respondent result is available
                  </p>
                </div>
              </div>
              <div className="relative w-36 h-36 mr-4">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={passed ? "#2ba149" : "#EF4444"}
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                    strokeDashoffset={100 - score}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-800">
                    {score}%
                  </span>
                  <p className="text-xs text-gray-600">
                    {correctAnswers}/{result.totalQuestions} p.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg mb-6 border border-gray-200">
            <h3 className="font-medium text-sm text-gray-800 mb-2">TIMER</h3>
            <div className="flex gap-2">
              <Clock className="mt-1" size={17} />
              <div className="flex-1">
                <div className="mb-2">
                  <p className="font-bold mt-0.5">Total time</p>
                  <p className="mt-2">
                    {formatTime(timeTaken)}{" "}
                    <span className="text-gray-400">
                      / {quiz.timeLimit?.toString().padStart(2, "0")}:00
                    </span>
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-black h-2.5 rounded-full"
                    style={{
                      width: `${(timeTaken / (quiz.timeLimit * 60)) * 100 || 0
                        }%`,
                    }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="text-xs">
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-sm text-gray-800 mb-4">
            QUESTIONS ({quiz.questions.length})
          </h3>
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              return (
                <div
                  key={question.id}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleQuestion(question.id)}
                  >
                    <div className="font-medium text-gray-800">
                      <span className="text-gray-500">Q.{index + 1}</span>{" "}
                      {question.text}
                      {question.imageUrl && (
                        <div className="mt-2">
                          <Image
                            src={question.imageUrl}
                            alt={question.imageAlt || "Question image"}
                            width={300}
                            height={200}
                            className="rounded-md object-contain max-h-40"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex justify-end items-center gap-6 mb-1">
                        <div className="flex items-center gap-1 text-xs text-primary px-3 py-1 rounded-md bg-green-50">
                          <Timer size={18} />
                          <span className="text-sm">
                            <TimeTaken seconds={timeTaken} />
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.round(100 / quiz.questions.length)} point
                          {quiz.questions.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        {expandedQuestions[question.id] ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        )}
                      </span>
                    </div>
                  </div>

                  {expandedQuestions[question.id] && (
                    <div className="mt-3 pl-5">
                      <div className="space-y-3">
                        {renderQuestionContent(question, index)}
                      </div>
                      {question.explanation && (
                        <div className="mt-3 p-3 bg-green-50 rounded-md text-sm text-gray-700">
                          <p className="font-medium text-sm mb-2">
                            Explanation:
                          </p>
                          <p className="text-sm">{question.explanation}</p>
                          {question.imageUrl && (
                            <div className="mt-2">
                              <Image
                                src={question.imageUrl}
                                alt={question.imageAlt || "Explanation image"}
                                width={300}
                                height={200}
                                className="rounded-md object-contain max-h-40"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
