"use client";
// import NotFoundPage from "@/app/not-found";
import { use, useEffect } from "react";
import OverviewPanel from "./panels/Overview";
import SolidTabs from "@/components/UI/SolidTabs";
import StudentsListPanel from "./panels/studentList";
import QuestionList from "./panels/QuestionList";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";

interface SingleQuizeOverviewProps {
  params: Promise<{ slug: string }>;
}

export default function SingleQuizeOverview({
  params,
}: SingleQuizeOverviewProps) {
  const { slug } = use(params);
  const { quizOverview, loadingOverview, error, getQuizOverview } = useQuiz();

  useEffect(() => {
    if (slug) {
      getQuizOverview(slug);
    }
  }, [slug, getQuizOverview]);

  // Show loading state
  if (loadingOverview) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading quiz...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">Error loading quiz: {error}</div>
      </div>
    );
  }

  // Show not found if no quiz
  if (!quizOverview) {
    return null;
  }

  const tabItems = [
    {
      label: "Overview",
      content: <OverviewPanel quiz={quizOverview} />,
    },
    {
      label: "Students List",
      content: <StudentsListPanel />,
    },
    {
      label: "Questions",
      content: <QuestionList quiz={quizOverview}  />,
    },
  ];

  return (
    <div className="px-3">
      <SolidTabs tabs={tabItems} />
    </div>
  );
}
