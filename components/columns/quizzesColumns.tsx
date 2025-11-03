 
import { ColumnDef } from "@tanstack/react-table";
import { Users, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Quiz } from "@/types/quiz";
import QuizActions from "@/components/QuizActions";


export const generateQuizzColumns = (): ColumnDef<Quiz>[] => [
  {
    accessorKey: "title",
    header: "Quiz Title",
    cell: ({ row }) => {
      const quiz = row.original;
      return (
        <Link
          href={`/instructor/quizzes/overview/${quiz.id}`}
          className="font-medium hover:underline"
        >
          {quiz.title}
        </Link>
      );
    },
  },
  {
    accessorKey: "questionsCount",
    header: "Questions",
    cell: ({ getValue }) => {
      const count = getValue<number>();
      return <span>{count}</span>;
    },
  },
  {
    accessorKey: "studentsCount",
    header: "Students",
    cell: ({ getValue }) => {
      const count = getValue<number>();
      return (
        <div className="flex items-center gap-1">
          <Users className="h-4 w-4 text-gray-500" />
          <span>{count}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "averageTime",
    header: "Average Time",
    cell: ({ getValue }) => {
      const time = getValue<string>();
      return (
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4 text-gray-500" />
          <span>{time}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "success_rate",
    header: "Success Rate",
    cell: ({ getValue }) => {
      const rate = getValue<number>();
      return (
        <span className="text-sm font-medium text-green-600">
          {rate}%
        </span>
      );
    },
  },
  {
    accessorKey: "average_score",
    header: "Average Score",
    cell: ({ getValue }) => {
      const score = getValue<number>();
      return <span>{score}</span>;
    },
  },
  {
    accessorKey: "retakes",
    header: "Retakes",
    cell: ({ getValue }) => {
      const retakes = getValue<number>();
      return <span>{retakes}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Quiz["status"]>();
      // const colors: Record<Quiz["status"], string> = {
      //   Active: "bg-green-100 text-green-700",
      //   Draft: "bg-yellow-100 text-yellow-700",
      //   Closed: "bg-red-100 text-red-700",
      // };
      return (
        <span
          // className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${colors[status]}`}
        >
          <CheckCircle className="mr-1 h-3 w-3" />
          {status}
        </span>
      );
    },
  },
{
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const quiz = row.original;
    return <QuizActions quiz={quiz} />;
  },
},
];