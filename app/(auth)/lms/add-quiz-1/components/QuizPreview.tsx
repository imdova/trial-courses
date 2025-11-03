/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import Image from "next/image";
import { UseFormWatch } from "react-hook-form";
import { QuestionOption, QuizFormValues } from "@/types/forms";

interface QuizPreviewProps {
  watch: UseFormWatch<QuizFormValues>;
}

export default function QuizPreview({ watch }: QuizPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizTimeLeft, setQuizTimeLeft] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string[]>
  >({});
  const [showResults, setShowResults] = useState(false);

  // const timeLimit = watch("timeLimit");
  const questions = watch("questions") || [];
  const currentQuestion = questions[currentIndex];

  // useEffect(() => {
  //   if (timeLimit === 0) return;

  //   setQuizTimeLeft(timeLimit);

  //   const timer = setInterval(() => {
  //     setQuizTimeLeft((prev) => {
  //       if (prev === null || prev <= 1) {
  //         clearInterval(timer);
  //         return 0;
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [timeLimit]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAnswerSelect = (questionId: string, answerId: string) => {
    setSelectedAnswers((prev) => {
      const currentSelections = prev[questionId] || [];
      const isSelected = currentSelections.includes(answerId);

      if (currentQuestion.type === "multiple-choice") {
        return {
          ...prev,
          [questionId]: isSelected
            ? currentSelections.filter((id) => id !== answerId)
            : [...currentSelections, answerId],
        };
      } else {
        // For single-choice questions
        return {
          ...prev,
          [questionId]: isSelected ? [] : [answerId],
        };
      }
    });
  };

  const checkAnswer = (questionId: string, optionId: string) => {
    if (!showResults) return false;

    const question = questions.find((q) => q.id === questionId);
    if (!question) return false;

    const correctOption = question.options?.find((o) => o.isCorrect);
    if (!correctOption) return false;

    return correctOption.id === optionId;
  };

  const isOptionSelected = (questionId: string, optionId: string) => {
    return selectedAnswers[questionId]?.includes(optionId) || false;
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!showResults) return 0;

    let score = 0;

    questions.forEach((question) => {
      const selectedOptionIds = selectedAnswers[question.id] || [];
      const correctOptions = question.options?.filter((o) => o.isCorrect) || [];
      const correctOptionIds = correctOptions.map((o) => o.id);

      if (question.type === "multiple-choice") {
        // Award points only if ALL correct options are selected and NO incorrect ones
        const allCorrectSelected = correctOptionIds.every((id) =>
          selectedOptionIds.includes(id)
        );
        const noIncorrectSelected = selectedOptionIds.every((id) =>
          correctOptionIds.includes(id)
        );

        if (allCorrectSelected && noIncorrectSelected) {
          score += question.points || 1;
        }
      } else {
        // Single-choice scoring (original logic)
        if (
          selectedOptionIds[0] &&
          correctOptionIds.includes(selectedOptionIds[0])
        ) {
          score += question.points || 1;
        }
      }
    });

    return score;
  };

  const totalPossibleScore = questions.reduce(
    (sum, question) => sum + (question.points || 1),
    0
  );

  const renderOptions = (options: QuestionOption[]) => {
    const optionLetters = ["A", "B", "C", "D", "E", "F"];

    return options.map((option: QuestionOption, index: number) => {
      const isCorrect = checkAnswer(currentQuestion.id, option.id);
      const isSelected = isOptionSelected(currentQuestion.id, option.id);
      const showCorrect = showResults && isCorrect;
      const showIncorrect = showResults && isSelected && !isCorrect;
      const currentLetter = optionLetters[index];

      const baseClasses =
        "flex items-start p-3 border rounded-lg cursor-pointer transition-colors";
      const selectedClasses = isSelected
        ? "bg-green-50 border-green-600"
        : "hover:bg-gray-50";
      const resultClasses = showCorrect
        ? "bg-green-600 text-white"
        : showIncorrect
          ? "bg-red-600 text-white"
          : selectedClasses;

      return (
        <div
          key={option.id}
          className={`${baseClasses} ${resultClasses}`}
          onClick={() =>
            !showResults && handleAnswerSelect(currentQuestion.id, option.id)
          }
        >
          <div className="flex items-center h-5 mr-3">
            <input
              type={
                currentQuestion.type === "multiple-choice"
                  ? "checkbox"
                  : "radio"
              }
              checked={isSelected}
              readOnly
              className={`h-4 w-4 ${currentQuestion.type === "multiple-choice" ? "rounded" : ""
                } ${showCorrect
                  ? "accent-white"
                  : showIncorrect
                    ? "accent-white"
                    : "accent-green-600"
                }`}
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <span className="font-semibold">{currentLetter}.</span>
              {option?.text?.trim() || `Option ${index + 1}`}
            </label>
            {option.imageUrl && (
              <div className="mt-2">
                <Image
                  src={option.imageUrl}
                  width={300}
                  height={300}
                  alt="Option"
                  className="max-h-32 rounded-md"
                />
              </div>
            )}
          </div>
        </div>
      );
    });
  };

  // ... (rest of the JSX remains the same as in your original code)
  return (
    <div className="space-y-6">
      {/* Quiz header with timer */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">
          {watch("title") || "Untitled Quiz"}
        </h2>
        {/* {timeLimit !== 0 && quizTimeLeft !== null && (
          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
            <Timer size={18} className="text-gray-600" />
            <span className="font-medium text-gray-700">
              {Math.floor(quizTimeLeft / 60)}:
              {String(quizTimeLeft % 60).padStart(2, "0")}
            </span>
          </div>
        )} */}
      </div>

      {/* Quiz instructions */}
      {watch("instructions") && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-800">{watch("instructions")}</p>
        </div>
      )}

      {/* Results display */}
      {showResults && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-lg text-green-800 mb-1">
            Quiz Results
          </h3>
          <p className="text-green-700">
            You scored {calculateScore()} out of {totalPossibleScore} points (
            {Math.round((calculateScore() / totalPossibleScore) * 100)}%)
          </p>
        </div>
      )}

      {/* Question card */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {currentQuestion?.points}{" "}
              {currentQuestion?.points === 1 ? "point" : "points"}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {currentQuestion && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {currentQuestion.text}
            </h3>
            {currentQuestion.imageUrl && (
              <div className="relative rounded-md overflow-hidden border border-gray-200">
                <Image
                  src={currentQuestion.imageUrl}
                  alt="Question"
                  width={600}
                  height={400}
                  className="w-full max-h-64 object-contain"
                />
              </div>
            )}

            {(currentQuestion.type === "multiple-choice" ||
              currentQuestion.type === "single-choice" ||
              currentQuestion.type === "true-false") &&
              currentQuestion.options && (
                <div className="space-y-3">
                  {renderOptions(currentQuestion.options)}
                </div>
              )}

            {currentQuestion.type === "fill-in-the-blank" && (
              <div className="mt-4">
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Type your answer here..."
                />
              </div>
            )}

            {currentQuestion.type === "short-answer" && (
              <div className="mt-4">
                <textarea
                  className="w-full px-4 py-2 min-h-[120px] border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Type your answer here..."
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className={`px-6 py-2 rounded-md font-medium transition ${currentIndex === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-green-600 text-white hover:bg-green-700"
            }`}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            type="button"
            className={`px-6 py-2 rounded-md font-medium transition ${showResults
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
              }`}
            onClick={handleSubmitQuiz}
            disabled={showResults}
          >
            {showResults ? "Quiz Submitted" : "Submit Quiz"}
          </button>
        ) : (
          <button
            type="button"
            className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
