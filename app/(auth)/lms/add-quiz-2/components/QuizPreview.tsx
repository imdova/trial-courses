"use client";
import { useState, useEffect } from "react";
import { Timer } from "lucide-react";
import Image from "next/image";
import { UseFormWatch } from "react-hook-form";
import { QuestionOption, QuizFormValuesTwo } from "@/types/forms";

interface QuizPreviewProps {
  watch: UseFormWatch<QuizFormValuesTwo>;
}

export default function QuizPreview({ watch }: QuizPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizTimeLeft, setQuizTimeLeft] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [showResults, setShowResults] = useState(false);

  const timeLimit = watch("timeLimit");
  const questions = watch("questions") || [];
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (timeLimit === 0) return; // No limit mode

    setQuizTimeLeft(timeLimit); // Initialize quiz timer

    const timer = setInterval(() => {
      setQuizTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLimit]);

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
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
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
    return selectedAnswers[questionId] === optionId;
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!showResults) return 0;

    let score = 0;

    questions.forEach((question) => {
      const selectedOptionId = selectedAnswers[question.id];
      const correctOption = question.options?.find((o) => o.isCorrect);

      if (correctOption && selectedOptionId === correctOption.id) {
        score += question.points || 1;
      }
    });

    return score;
  };

  const totalPossibleScore = questions.reduce(
    (sum, question) => sum + (question.points || 1),
    0
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {watch("title") || "Untitled Quiz"}
        </h2>
        {/* Timer Display */}
        {timeLimit !== 0 && quizTimeLeft !== null && (
          <span className="flex items-center justify-center gap-2 px-2 bg-gray-200 rounded-md font-semibold ">
            <Timer size={18} />
            <span className="block text-xs h-fit font-semibold">
              {Math.floor(quizTimeLeft / 60)}:
              {String(quizTimeLeft % 60).padStart(2, "0")}
            </span>
          </span>
        )}
      </div>

      {showResults && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="font-bold text-lg mb-2">Quiz Results</h3>
          <p>
            You scored {calculateScore()} out of {totalPossibleScore} points (
            {Math.round((calculateScore() / totalPossibleScore) * 100)}%)
          </p>
        </div>
      )}

      {watch("instructions") && (
        <div className="prose max-w-none mt-2">
          <p className="text-muted-foreground text-xs">{watch("instructions")}</p>
        </div>
      )}

      <div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs sm:text-sm font-medium">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <span className="text-xs sm:text-sm font-medium">
              {Math.round(((currentIndex + 1) / questions.length) * 100)}%
              Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-600 h-2 rounded-full"
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 sm:p-6">
        {currentQuestion && (
          <div className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
            <div className="flex flex-col gap-2 justify-between items-center sm:flex-row">
              <p className="text-lg font-semibold">{currentQuestion.text}</p>
              <span className="text-sm text-muted-foreground">
                {currentQuestion.points} points
              </span>
            </div>

            {currentQuestion.imageUrl && (
              <div className="mt-2 ">
                <Image
                  src={currentQuestion.imageUrl}
                  alt="Question"
                  width={300}
                  height={300}
                  className="max-h-40 rounded-md"
                />
              </div>
            )}

            {currentQuestion.type === "multiple-choice" &&
              currentQuestion.options && (
                <div className="mt-3 space-y-2">
                  {currentQuestion.options.map(
                    (option: QuestionOption, index: number) => {
                      const isCorrect = checkAnswer(
                        currentQuestion.id,
                        option.id
                      );
                      const isSelected = isOptionSelected(
                        currentQuestion.id,
                        option.id
                      );
                      const showCorrect = showResults && isCorrect;
                      const showIncorrect =
                        showResults && isSelected && !isCorrect;
                      const Alph = ["A", "B", "C", "D"];

                      return (
                        <div
                          key={option.id}
                          className={`flex items-start space-x-2 p-3 border rounded-full cursor-pointer transition-colors ${
                            showCorrect
                              ? "bg-primary"
                              : showIncorrect
                              ? "bg-red-700"
                              : isSelected
                              ? "bg-green-50 border-green-700"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            !showResults &&
                            handleAnswerSelect(currentQuestion.id, option.id)
                          }
                        >
                          <input
                            type="radio"
                            name={`preview-${currentQuestion.id}`}
                            className={`h-4 w-4 mt-1 hidden ${
                              showCorrect
                                ? " border-green-600 accent-green-600"
                                : showIncorrect
                                ? " border-red-600 accent-red-600"
                                : " border-gray-300"
                            }`}
                            checked={isSelected}
                            onChange={() => {}}
                          />
                          <div>
                            <label
                              className={`flex items-center gap-4 text-sm ${
                                showCorrect
                                  ? "text-white"
                                  : showIncorrect
                                  ? "text-white"
                                  : "text-gray-700"
                              }`}
                            >
                              <span className="font-semibold">
                                {Alph[index]}
                              </span>
                              {option?.text?.trim()
                                ? option.text
                                : `Option ${index + 1}`}
                            </label>
                            {option.imageUrl && (
                              <Image
                                src={option.imageUrl}
                                width={300}
                                height={300}
                                alt="Option"
                                className="max-h-32 rounded-md mt-1"
                              />
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

            {currentQuestion.type === "true-false" &&
              currentQuestion.options && (
                <div className="mt-3 space-y-2">
                  {currentQuestion.options.map(
                    (option: QuestionOption, index: number) => {
                      const isCorrect = checkAnswer(
                        currentQuestion.id,
                        option.id
                      );
                      const isSelected = isOptionSelected(
                        currentQuestion.id,
                        option.id
                      );
                      const showCorrect = showResults && isCorrect;
                      const showIncorrect =
                        showResults && isSelected && !isCorrect;
                      const Alph = ["A", "B", "C", "D"];
                      return (
                        <div
                          key={option.id}
                          className={`flex items-center p-3 border rounded-full cursor-pointer transition-colors ${
                            showCorrect
                              ? "bg-primary  "
                              : showIncorrect
                              ? "bg-red-700 "
                              : isSelected
                              ? "bg-green-50 border-green-700"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() =>
                            !showResults &&
                            handleAnswerSelect(currentQuestion.id, option.id)
                          }
                        >
                          <input
                            type="radio"
                            name={`preview-${currentQuestion.id}`}
                            className={`h-4 w-4 hidden ${
                              showCorrect
                                ? "text-green-600 border-green-600"
                                : showIncorrect
                                ? "text-red-600 border-red-600"
                                : "text-green-600 border-gray-300"
                            }`}
                            checked={isSelected}
                            onChange={() => {}}
                          />
                          <label
                            className={`ml-2 flex items-center gap-4 text-sm ${
                              showCorrect
                                ? "text-white"
                                : showIncorrect
                                ? "text-white"
                                : "text-gray-700"
                            }`}
                          >
                            <span className="font-semibold">{Alph[index]}</span>
                            {option.text}
                          </label>
                        </div>
                      );
                    }
                  )}
                </div>
              )}

            {currentQuestion.type === "fill-in-the-blank" && (
              <div className="mt-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                  placeholder="Your answer"
                />
              </div>
            )}

            {currentQuestion.type === "short-answer" && (
              <div className="mt-3">
                <textarea
                  className="w-full px-3 py-2 min-h-[200px] resize-none border border-gray-300 rounded-md focus:outline-none"
                  rows={3}
                  placeholder="Your answer"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          type="button"
          className={`px-6 py-2 border text-sm rounded-md shadow-sm transition focus:outline-none ${
            currentIndex === 0
              ? "text-muted-foreground cursor-not-allowed"
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
            className="px-6 py-2 bg-green-600 text-white text-sm rounded-md shadow-sm hover:bg-green-700 transition focus:outline-none"
            onClick={handleSubmitQuiz}
            disabled={showResults}
          >
            {showResults ? "Quiz Completed" : "Submit Quiz"}
          </button>
        ) : (
          <button
            type="button"
            className="px-6 py-2 bg-green-600 text-white text-sm rounded-md shadow-sm hover:bg-green-700 transition focus:outline-none"
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
