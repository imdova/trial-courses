"use client";

    // import NotFoundPage from "@/app/not-found";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import { quizzes } from "@/constants/quizzes.data";
import {
  Award,
  BookOpen,
  Clock,
  Edit,
  Eye,
  ListOrdered,
  ReceiptText,
  SquarePen,
  Target,
  Trash,
  TrendingUp,
  Users,
  View,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { Card } from "@/components/UI/card";
import QuizStudentsList from "./panels/QuizStudentsList";
import QuizSubmissions from "./panels/QuizSubmissions";

interface SingleQuizOverviewProps {
  params: Promise<{ slug: string }>;
}

export default function SingleQuizOverview({
  params,
}: SingleQuizOverviewProps) {
  const { slug } = use(params);
  const quiz = quizzes.find((q) => q.id === slug);
  const [activeTab, setActiveTab] = useState("quizOverview");

//   if (!quiz) return <NotFoundPage />;    

  // Calculate quiz statistics
  const totalStudents = quiz?.students?.length || 156;
  const averageScore = quiz?.avarageScore || 0;
  const totalQuestions = quiz?.questionsNum || 0;
  const completionRate = 85; // Mock data

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <div className="flex space-y-3 md:space-x-3 md:space-y-0 flex-wrap mb-4">
        <button
          onClick={() => setActiveTab("quizOverview")}
          className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm transition ${
            activeTab === "quizOverview"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          <View size={15} />
          Quiz Overview
        </button>
        <button
          onClick={() => setActiveTab("studentList")}
          className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm transition ${
            activeTab === "studentList"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          <ListOrdered size={15} />
          Student List
        </button>
        <button
          onClick={() => setActiveTab("quizDetails")}
          className={`flex items-center gap-1 py-2 px-4 rounded-lg text-sm transition ${
            activeTab === "quizDetails"
              ? "bg-primary text-white"
              : "text-muted-foreground"
          }`}
        >
          <ReceiptText size={15} />
          Quiz Details
        </button>
      </div>

      {/* Quiz Header Card */}
      <div className="relative flex justify-between p-4 rounded-lg border bg-white shadow-sm mb-4">
        <div className="flex flex-col items-center gap-6 w-full md:flex-row">
          {/* Quiz Icon/Image */}
          <div className="w-full md:w-[150px] h-[120px] rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <BookOpen size={60} className="text-white" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col items-center gap-3 justify-between lg:flex-row mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold max-w-[400px]">
                  {quiz?.title || ""}
                </h1>
                <span className="px-2 py-1 text-xs rounded-full text-white bg-primary capitalize">
                  {quiz?.status || ""}
                </span>
              </div>
              <div className="flex justify-end items-start h-full gap-3">
                <Link
                  className="flex items-center gap-1 p-3 w-fit text-sm bg-white border rounded-lg hover:bg-gray-50 transition"
                  href={`/admin/quizzes/${quiz?.id || ""}/edit`}
                >
                  <SquarePen size={12} />
                  Edit
                </Link>
                <Link
                  className="flex items-center gap-1 p-3 w-fit text-sm bg-white border rounded-lg hover:bg-gray-50 transition"
                  href={`/admin/quizzes/${quiz?.id || ""}/preview`}
                >
                  <Eye size={12} />
                  Preview
                </Link>
                <OptionsDropdown
                  actions={[
                    {
                      label: "View",
                      icon: <Eye className="w-4 h-4" />,
                      onClick: () => console.log("View clicked"),
                    },
                    {
                      label: "Edit",
                      icon: <Edit className="w-4 h-4" />,
                      onClick: () => console.log("Edit clicked"),
                    },
                    {
                      label: "Delete",
                      icon: <Trash className="w-4 h-4" />,
                      onClick: () => console.log("Delete clicked"),
                      danger: true,
                    },
                  ]}
                />
              </div>
            </div>

            {/* Instructor Info */}
            {quiz?.instructor && (
              <div className="flex justify-center items-center gap-3 mb-4 lg:justify-start">
                <Image
                  className="w-12 h-12 rounded-full object-cover"
                  src={quiz?.instructor.avatar || ""}
                  alt="instructor image"
                  width={48}
                  height={48}
                />
                <div>
                  <span className="text-muted-foreground text-sm">
                    Instructor
                  </span>
                  <h2 className="text-sm font-semibold">
                    {quiz?.instructor.name || ""}
                  </h2>
                </div>
              </div>
            )}

            {/* Quiz Meta Information */}
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground text-sm">
                  Questions
                </span>
                <span className="text-main text-sm font-semibold">
                  {totalQuestions}
                </span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground text-sm">
                  Time Limit
                </span>
                <span className="text-main text-sm font-semibold">
                  {quiz?.timeLimit || 0} min
                </span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground text-sm">
                  Passing Score
                </span>
                <span className="text-main text-sm font-semibold">
                  {quiz?.passingScore || 0}%
                </span>
              </div>
              <div className="flex text-center flex-col md:text-start">
                <span className="text-muted-foreground text-sm">
                  Retakes Allowed
                </span>
                <span className="text-main text-sm font-semibold">
                  {quiz?.retakeNumbers || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Overview Tab */}
      {activeTab === "quizOverview" && (
        <div>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mb-4">
            <Card className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#E4F8FFE5] text-[#55BEE6]">
                <Users size={20} />
              </div>
              <div>
                <span className="block text-sm">Total Attempts</span>
                <h1 className="font-bold">{totalStudents}</h1>
                <span className="block text-xs text-primary">
                  +12% from last month
                </span>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#DCFCE7] text-[#008236]">
                <Target size={20} />
              </div>
              <div>
                <span className="block text-sm">Average Score</span>
                <h1 className="font-bold">{averageScore}%</h1>
                <span className="block text-xs text-primary">
                  +5% from last month
                </span>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#F3E8FF] text-[#AD46FF]">
                <Award size={20} />
              </div>
              <div>
                <span className="block text-sm">Completion Rate</span>
                <h1 className="font-bold">{completionRate}%</h1>
                <span className="block text-xs text-primary">
                  +3% from last month
                </span>
              </div>
            </Card>

            <Card className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex justify-center items-center rounded-md w-16 h-16 bg-[#FCE7F3] text-[#F6339A]">
                <TrendingUp size={20} />
              </div>
              <div>
                <span className="block text-sm">Pass Rate</span>
                <h1 className="font-bold">72%</h1>
                <span className="block text-xs text-primary">
                  +8% from last month
                </span>
              </div>
            </Card>
          </div>

          {/* Quiz Performance Chart */}
          <div className="mb-4">
            <Card className="p-6 rounded-lg border bg-white shadow-sm">
              <h3 className="text-lg font-semibold mb-4">
                Quiz Performance Over Time
              </h3>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                <div className="text-center text-gray-500">
                  <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Performance chart will be displayed here</p>
                  <p className="text-sm mt-1">
                    Showing attempts and average scores
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Students Who Took Quiz */}
          <div className="mb-4">
            <QuizStudentsList quizId={quiz?.id || ""} />
          </div>

          {/* Quiz Submissions */}
          <div>
            <QuizSubmissions quizId={quiz?.id || ""} />
          </div>
        </div>
      )}

      {/* Student List Tab */}
      {activeTab === "studentList" && (
        <div className="space-y-4">
          <QuizStudentsList quizId={quiz?.id || ""} />
          <QuizSubmissions quizId={quiz?.id || ""} />
        </div>
      )}

      {/* Quiz Details Tab */}
      {activeTab === "quizDetails" && (
        <div>
          <Card className="p-6 rounded-lg border bg-white shadow-sm mb-4">
            <h3 className="text-lg font-semibold mb-4">Quiz Information</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Title
                  </label>
                  <p className="text-base mt-1">{quiz?.title || ""}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Status
                  </label>
                  <p className="text-base mt-1 capitalize">
                    {quiz?.status || ""}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Time Limit
                  </label>
                  <p className="text-base mt-1">
                    <Clock className="inline w-4 h-4 mr-1" />
                    {quiz?.timeLimit || 0} minutes
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Passing Score
                  </label>
                  <p className="text-base mt-1">
                    <Target className="inline w-4 h-4 mr-1" />
                    {quiz?.passingScore || 0}%
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Retakes Allowed
                  </label>
                  <p className="text-base mt-1">{quiz?.retakeNumbers || 0} times</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Total Questions
                  </label>
                  <p className="text-base mt-1">
                    <BookOpen className="inline w-4 h-4 mr-1" />
                    {totalQuestions} questions
                  </p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-600">
                  Instructions
                </label>
                <p className="text-base mt-1 text-gray-700">
                  {quiz?.instructions || ""}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Question Order
                  </label>
                  <p className="text-base mt-1 capitalize">
                    {quiz?.randomizeQuestions ? "Randomized" : "Fixed Order"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">
                    Feedback Type
                  </label>
                  <p className="text-base mt-1">
                    {quiz?.immediateFeedback
                      ? "Immediate Feedback"
                      : "End of Quiz"}
                    {quiz?.feedbackByEmail ? " + Email" : ""}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Questions List */}
          <Card className="p-6 rounded-lg border bg-white shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Questions ({totalQuestions})
            </h3>
            <div className="space-y-4">
              {quiz?.questions?.map((question, index) => (
                <div
                  key={question.id}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {question.text}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="capitalize">
                            Type: {question.type}
                          </span>
                          <span>Points: {question.points}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {question.options && (
                    <div className="ml-11 mt-3 space-y-2">
                      {question.options.map((option) => (
                        <div
                          key={option.id}
                          className={`p-2 rounded text-sm ${
                            option.isCorrect
                              ? "bg-green-50 text-green-800 border border-green-200"
                              : "bg-gray-50 text-gray-700"
                          }`}
                        >
                          {option.text}
                          {option.isCorrect && (
                            <span className="ml-2 text-green-600 font-semibold">
                              ✓ Correct
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {question.explanation && (
                    <div className="ml-11 mt-3 p-3 bg-blue-50 rounded text-sm text-blue-900">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

