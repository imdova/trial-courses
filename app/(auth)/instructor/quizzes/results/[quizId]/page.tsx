"use client";

import CustomSelect from "@/components/UI/DynamicSelectWithIcon"; // Ensure this path is correct
import { quizzes } from "@/constants/quizzes.data"; // Ensure this path is correct
import { StudentsData } from "@/constants/students.data"; // Ensure this path is correct
import { Question, Quiz } from "@/types/quiz"; // Use types from your quiz.ts file

import {
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  Mail,
  SquareCheck,
  Timer,
  User,
  X,
} from "lucide-react";
import { use, useEffect, useState } from "react";
import Image from "next/image";
import { OptionSelect } from "@/types";

// Define an interface for the mapped question results
// This combines the original Question with student-specific answer data
interface QuestionResult extends Question {
  studentAnswer: string | null; // ID of chosen option or string for text answers
  isCorrect: boolean; // Whether the student's answer was correct
  correctAnswer: string | null; // ID of the correct option or string of correct answer
}

interface QuizResultPageProps {
  params: Promise<{ quizId: string }>;
}

const dateOptions: OptionSelect[] = [
  { label: "All Dates", value: "all" },
  { label: "Fri, Aug 1", value: "2025-08-01" },
  { label: "Sat, Aug 2", value: "2025-08-02" },
  { label: "Sun, Aug 3", value: "2025-08-03" },
  { label: "Mon, Aug 4", value: "2025-08-04" },
  { label: "Tue, Aug 5", value: "2025-08-05" },
];

const studentOptions: OptionSelect[] = [
  { label: "Ahmed Ali", value: "student_1" },
  { label: "Sara Youssef", value: "student_2" },
  { label: "Mohamed Fathy", value: "student_3" },
  { label: "Laila Hassan", value: "student_4" },
  { label: "Omar Khaled", value: "student_5" },
];

export default function QuizResultPage({ params }: QuizResultPageProps) {
  const { quizId } = use(params);

  // Find the quiz based on quizID
  const quiz: Quiz | undefined = quizzes.find((q) => q.id === quizId);

  // Assuming StudentsData is an array of objects with a 'name' property
  const student = StudentsData.length > 0 ? StudentsData[0] : null;

  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].value);
  const [selectedRespondent, setSelectedRespondent] = useState(
    studentOptions[0].value
  );

  // Derive quizResult values dynamically where possible
  const totalQuestions = quiz?.questions.length || 0;
  // In a real application, correctAnswers and score would come from actual student results
  const correctAnswersMock = 2; // Mock value
  const scoreMock = `${(correctAnswersMock / totalQuestions) * 100 || 0}%`;

  const quizResult = {
    passed: correctAnswersMock >= totalQuestions / 2, // Simple passing criteria for mock
    score: scoreMock,
    correctAnswers: correctAnswersMock,
    totalQuestions: totalQuestions,
    timeSpent: "00:00:10", // Mock value
    timeLimit: `00:${quiz?.timeLimit?.toString().padStart(2, "0") || "00"}:00`,
    startTime: "17:47", // Mock value
    endTime: "17:47", // Mock value
    date: "2025-07-16", // Mock value
    feedback: "No feedback has been added",
    timePercentage: 25, // Mock value, calculate based on timeSpent/timeLimit
  };

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const questionResults: QuestionResult[] =
    quiz?.questions.map((question) => {
      let correctAnswerValue: string | null = null;
      let studentAnswerValue: string | null = null;
      // This `isCorrect` is for mocking purposes. In a real app,
      // it would be determined by comparing studentAnswerValue to correctAnswerValue.
      const isCorrectMock = Math.random() > 0.3;

      if (
        question.type === "multiple-choice" ||
        question.type === "true-false"
      ) {
        const correctOptionIndex =
          typeof question.answerCorrect === "number"
            ? question.answerCorrect
            : -1;
        correctAnswerValue = question.options?.[correctOptionIndex]?.id ?? null;

        if (isCorrectMock && correctAnswerValue) {
          studentAnswerValue = correctAnswerValue;
        } else {
          // If mocking an incorrect answer, pick a random wrong option ID
          const wrongOptions = (question.options ?? []).filter(
            (_, idx) => idx !== correctOptionIndex
          );
          studentAnswerValue =
            wrongOptions.length > 0
              ? wrongOptions[Math.floor(Math.random() * wrongOptions.length)]
                  ?.id ?? null
              : null; // Fallback to null if no wrong options (e.g., true/false with only one option)
        }
      } else if (
        question.type === "fill-in-the-blank" ||
        question.type === "short-answer"
      ) {
        correctAnswerValue =
          typeof question.answerCorrect === "string"
            ? question.answerCorrect
            : null;
        studentAnswerValue = isCorrectMock
          ? correctAnswerValue
          : "Mock Incorrect Answer"; // Replace with actual student's text input
      }

      // Determine actual correctness based on mock answers for display
      const finalIsCorrect = studentAnswerValue === correctAnswerValue;

      return {
        ...question,
        studentAnswer: studentAnswerValue,
        isCorrect: finalIsCorrect, // Use the final calculated correctness
        correctAnswer: correctAnswerValue,
        options: question.options ?? [], // Ensure options is always an array
      };
    }) || []; // Ensure questionResults is always an array, even if quiz or questions are undefined

  const TimeTaken = () => {
    const [formattedTime, setFormattedTime] = useState<string | null>(null);

    useEffect(() => {
      const timeTaken = Math.floor(Math.random() * 55) + 5;
      const formatted = `${Math.floor(timeTaken / 60)}:${(timeTaken % 60)
        .toString()
        .padStart(2, "0")}`;
      setFormattedTime(formatted);
    }, []);

    if (!formattedTime)
      return <span className="text-gray-400">Loading...</span>;

    return formattedTime;
  };

  // Helper function to render content based on question type
  const renderQuestionContent = (
    question: Question,
    result: QuestionResult // Ensure result has the studentAnswer, isCorrect, correctAnswer properties
  ) => {
    if (
      question.type === "fill-in-the-blank" ||
      question.type === "short-answer"
    ) {
      return (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg">
          <p className="font-medium">Correct answer:</p>
          <p className="mt-1 text-green-700 font-semibold">
            {result.correctAnswer || "N/A"}
          </p>
          <p className="font-medium mt-3">Choosed Answer:</p>
          <p
            className={`mt-1 ${
              result.isCorrect ? "text-green-700" : "text-red-700"
            }`}
          >
            {result.studentAnswer || "No answer provided"}
          </p>
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
      );
    }

    // For multiple-choice and true-false questions
    return (
      question.options?.map((option, optionIndex) => {
        const optionLetter = String.fromCharCode(65 + optionIndex);
        const isCorrectOption = option.id === result.correctAnswer;
        const isStudentChosen = option.id === result.studentAnswer;

        return (
          <div key={option.id} className="mt-2">
            <div
              className={`flex items-center gap-2 p-4 rounded-full ${
                isCorrectOption && isStudentChosen // Correct and chosen
                  ? "bg-white text-primary font-bold"
                  : isCorrectOption // Correct but not chosen by student
                  ? "bg-white text-primary "
                  : isStudentChosen // Chosen by student but incorrect
                  ? "text-red-500 font-bold"
                  : " text-gray-600" // Neither correct nor chosen
              }`}
            >
              <div
                className={`flex-shrink-0 w-6 h-6 rounded-full mr-3 mt-0.5 flex items-center justify-center ${
                  isCorrectOption && isStudentChosen
                    ? "bg-white text-primary" // White background, primary text for selected correct
                    : ""
                }`}
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
                  className={`text-sm mt-1 ${
                    result.isCorrect ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.isCorrect
                    ? "Choosed answer is correct."
                    : `Choosed answer is incorrect.`}
                </p>
              )}
              {!result.isCorrect && isCorrectOption && (
                <p className="text-sm text-green-600 mt-1">
                  This is the correct answer.
                </p>
              )}
            </div>
          </div>
        );
      }) || null
    ); // Return null if no options
  };

  // Handle cases where quiz or student data is not found
  if (!quiz) {
    return (
      <div className="mx-4 text-center py-10 text-gray-600">
        Quiz not found for ID: {quizId}.
      </div>
    );
  }

  if (!student) {
    return (
      <div className="mx-4 text-center py-10 text-gray-600">
        Student data not found.
      </div>
    );
  }

  return (
    <div className="mx-4">
      <div className="flex flex-col gap-3 justify-between mb-6 items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200 sm:flex-row">
        <h1 className="text-2xl font-bold text-gray-800">Quiz review</h1>
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          Respondent:
          <CustomSelect
            value={selectedRespondent}
            onChange={setSelectedRespondent}
            options={studentOptions}
            className="border-none"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-between rounded-lg border border-gray-200 mb-6 sm:flex-row">
        <div className="flex p-2 items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Calendar size={18} /> Dates:
          <CustomSelect
            value={selectedDate}
            onChange={setSelectedDate}
            options={dateOptions}
            className="border-none"
          />
        </div>
        <div className="flex justify-around">
          <button className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-black py-2 px-4 border-r border-gray-200">
            <User size={15} /> Respondent View
          </button>
          <button className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-black py-2 px-4 border-r border-gray-200">
            <Download size={15} /> Download
          </button>
          <button className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-black py-2 px-4">
            <Mail size={15} /> Send
          </button>
        </div>
      </div>
      <div className="mb-8">
        <div className="bg-gray-50 p-4 mb-6 border border-gray-200 rounded-lg">
          <h3 className="font-medium text-sm text-gray-800 mb-2">RESPONDENT</h3>
          <p className="flex items-center gap-2 font-semibold">
            <User size={16} /> {student.name}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg mb-6 border border-gray-200">
            <h3 className="font-medium text-sm text-gray-800 mb-2">RESULTS</h3>
            <div className="flex gap-3">
              <div className="flex-1">
                <div>
                  <p
                    className={`flex items-center gap-1 font-bold ${
                      quizResult.passed ? "text-primary" : "text-red-600"
                    }`}
                  >
                    <SquareCheck size={16} />{" "}
                    {quizResult.passed ? "Test passed" : "Test failed"}
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
                    stroke={quizResult.passed ? "#2ba149" : "#EF4444"} // Green for pass, red for fail
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                    strokeDashoffset={100 - parseInt(quizResult.score)}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-gray-800">
                    {quizResult.score}
                  </span>
                  <p className="text-xs text-gray-600">
                    {quizResult.correctAnswers}/{quizResult.totalQuestions} p.
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
                    {quizResult.timeSpent}{" "}
                    <span className="text-gray-400">
                      / {quizResult.timeLimit}
                    </span>
                  </p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-black h-2.5 rounded-full"
                    style={{ width: `${quizResult.timePercentage}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm mt-3">
                  <div>
                    <p className="text-gray-600 text-sm">Start time</p>
                    <p className="text-xs">{quizResult.startTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">End time</p>
                    <p className="text-xs">{quizResult.endTime}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Date</p>
                    <p className="text-xs">{quizResult.date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-sm text-gray-800 mb-4">
            QUESTIONS ({quiz.questions.length}){" "}
            {/* quiz is guaranteed to exist here */}
          </h3>
          <div className="space-y-4">
            {questionResults.map((questionResult, index) => {
              return (
                <div
                  key={questionResult.id}
                  className="border-b border-gray-100 pb-4 last:border-0"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleQuestion(questionResult.id)}
                  >
                    <div className="font-medium text-gray-800">
                      <span className="text-gray-500">Q.{index + 1}</span>{" "}
                      {questionResult.text}
                      {questionResult.imageUrl && (
                        <div className="mt-2">
                          <Image
                            src={questionResult.imageUrl}
                            alt={questionResult.imageAlt || "Question image"}
                            width={300}
                            height={200}
                            className="rounded-md object-contain max-h-40"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex  justify-end items-center gap-6 mb-1">
                        <div className="flex items-center gap-1 text-xs text-primary px-3 py-1 rounded-md  bg-green-50">
                          <Timer size={18} />
                          <span className="text-sm">{TimeTaken()}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {questionResult.points} point
                          {questionResult.points !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <span className="text-gray-500">
                        {expandedQuestions[questionResult.id] ? (
                          <ChevronUp size={15} />
                        ) : (
                          <ChevronDown size={15} />
                        )}
                      </span>
                    </div>
                  </div>

                  {expandedQuestions[questionResult.id] && (
                    <div className="mt-3 pl-5">
                      <div className="space-y-3">
                        {renderQuestionContent(questionResult, questionResult)}
                      </div>
                      {questionResult.explanation && (
                        <div className="mt-3 p-3 bg-green-50 rounded-md text-sm text-gray-700">
                          <p className="font-medium text-sm mb-2">
                            Explanation:
                          </p>
                          <p className="text-sm">
                            {questionResult.explanation}
                          </p>
                          {/* Only show explanation image if it's relevant to the explanation itself */}
                          {questionResult.imageUrl && ( // Assuming explanation image is same as question image here
                            <div className="mt-2">
                              <Image
                                src={questionResult.imageUrl}
                                alt={
                                  questionResult.imageAlt || "Explanation image"
                                }
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
