"use client";

import { Check, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Quiz } from "@/types/quiz";
import { useQuiz } from "../../../hooks/useQuiz";
import { QuizQuestionStats } from "@/store/slices/quizSlice";

interface QuestionListProps {
  quiz: Quiz;
}

export default function QuestionList({
  quiz,
}: QuestionListProps) {
  console.log(quiz, "quiz");
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});
  
  const { quizQuestionsStats, loadingStats, getQuizQuestionsStats } = useQuiz();

  // Fetch quiz questions stats when component mounts
  useEffect(() => {
    if (quiz?.id) {
      getQuizQuestionsStats(quiz.id);
    }
  }, [quiz?.id, getQuizQuestionsStats]);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const renderQuestionOptions = (questionStats: QuizQuestionStats) => {
    if (!questionStats) return null;

    const totalAttempts = questionStats.correctCount + questionStats.incorrectCount;

    switch (questionStats.type) {
      case "mcq":
        return questionStats.answers?.map((answer, answerIndex) => {
          const optionLetter = String.fromCharCode(65 + answerIndex);
          const isCorrectAnswer = answer.correct;
          const count = answer.chosenCount;
          const percentage = parseFloat(answer.chosenPercentage);

          return (
            <div key={answerIndex} className="space-y-1">
              <div className="flex justify-between items-center gap-3">
                <div
                  className={`flex flex-1 items-center gap-2 p-4 rounded-full ${
                    isCorrectAnswer
                      ? "bg-primary text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full mr-3 flex items-center justify-center">
                    {optionLetter}
                  </div>
                  <p className="flex-1">{answer.text}</p>
                  {isCorrectAnswer && <Check size={15} />}
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-sm text-muted-foreground">
                    {count}
                  </span>
                  <span
                    className={`flex items-center justify-center text-xs font-medium px-2 py-1 rounded-lg ${
                      percentage >= 75
                        ? "text-green-600 bg-green-50"
                        : percentage >= 40
                        ? "text-yellow-500 bg-yellow-50"
                        : "text-red-500 bg-red-50"
                    }`}
                  >
                    {percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              {isCorrectAnswer && (
                <p className="text-sm text-green-600 mt-1">
                  Correct answer (chosen by {count} students)
                </p>
              )}
            </div>
          );
        });

      case "fill-in-the-blank":
      case "short-answer":
        const correctCount = questionStats.correctCount;
        const correctPercentage = parseFloat(questionStats.correctPercentage);

        return (
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center gap-3">
                <div className="flex flex-1 items-center gap-2 p-4 rounded-full text-primary font-bold ">
                  Correct Answers:
                </div>
                <div className="flex gap-3">
                  <span className="font-medium text-sm text-muted-foreground">
                    {correctCount}/{totalAttempts}
                  </span>
                  <span className="flex items-center justify-center text-xs font-medium px-2 py-1 rounded-lg text-green-600 bg-green-50">
                    {correctPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-medium text-sm text-gray-800 mb-4">
          QUESTIONS ({quizQuestionsStats?.questions?.length || quiz?.questions?.length || 0})
        </h3>
        <div className="space-y-4">
          {loadingStats ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-3 text-gray-500">Loading question statistics...</p>
            </div>
          ) : quizQuestionsStats?.questions && quizQuestionsStats.questions.length > 0 ? (
            quizQuestionsStats.questions.map((questionStats: QuizQuestionStats, index: number) => (
              <div
                key={questionStats.questionId}
                className="border-gray-200 p-3 border rounded-lg"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleQuestion(questionStats.questionId)}
                >
                  <div className="font-medium text-gray-800">
                    <span className="text-gray-500">Q.{index + 1}</span>{" "}
                    {questionStats.text}
                  </div>
                  <span className="text-gray-500">
                    {expandedQuestions[questionStats.questionId] ? (
                      <ChevronUp size={15} />
                    ) : (
                      <ChevronDown size={15} />
                    )}
                  </span>
                </div>

                {expandedQuestions[questionStats.questionId] && (
                  <div className="mt-3 pl-5">
                    <div className="space-y-3">
                      {renderQuestionOptions(questionStats)}
                    </div>
                    <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-700">Overall Statistics:</p>
                          <p className="text-gray-600 mt-1">
                            Correct: <span className="font-semibold text-green-600">{questionStats.correctCount}</span> students
                          </p>
                          <p className="text-gray-600">
                            Incorrect: <span className="font-semibold text-red-600">{questionStats.incorrectCount}</span> students
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary">
                            {parseFloat(questionStats.correctPercentage).toFixed(1)}%
                          </p>
                          <p className="text-xs text-gray-500">Success Rate</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No statistics available yet.</p>
              <p className="text-sm text-gray-400 mt-2">Statistics will appear once students start taking the quiz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
