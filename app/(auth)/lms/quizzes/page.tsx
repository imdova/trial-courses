"use client";
import QuizsTable from "@/components/UI/tables/QuizesTable";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

export default function Quizzes() {
  return (
    <section className="w-full px-4 md:px-5">
      <div className="flex flex-col justify-between sm:items-center pb-4 gap-4  sm:flex-row">
        <div className="flex gap-6 items-center">
          <button className="p-2 border text-muted-foreground rounded-md">
            <ArrowLeft size={15} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">My Quizzes</h1>
        </div>
      </div>
      <Suspense>
        <QuizsTable isStudent />
      </Suspense>
    </section>
  );
}
