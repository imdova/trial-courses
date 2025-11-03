"use client";
import * as React from "react";
import { Suspense } from "react";
// import DynamicTable from "@/components/UI/tables/DTable";
import { generateQuizzColumns } from "@/components/columns/quizzesColumns";
import DynamicTableFilter from "@/components/UI/DynamicTableFilter";
import {
  FileText,
  Timer,
  Percent,
  RefreshCcw,
  Eye,
  Layers,
  LayoutTemplate,
} from "lucide-react";
import { FilterConfigTable } from "@/types";
// import { quizzes } from "@/constants/quizzes.data";
// import { Quiz } from "@/types/quiz";
// import Link from "next/link";
import { useSearchParams } from "next/navigation";
import QuizCard from "../QuizCard";
import AdvancedDataTable from "../AdvancedDataTable";
import { useQuiz } from "@/app/(auth)/instructor/quizzes/hooks/useQuiz";

const QuizsTableContent: React.FC<{ isStudent?: boolean }> = ({
  isStudent = false,
}) => {
  const searchParams = useSearchParams();
  const { quizzes, loading, error, getQuizzes, searchByTitle, applyFilters } = useQuiz();
  const view = searchParams.get("view");
  // const router = useRouter();
  const columns = generateQuizzColumns();
  // Fetch quizzes on component mount
  React.useEffect(() => {
    getQuizzes();
  }, [getQuizzes]);

  // Watch for URL parameter changes and apply filters
  React.useEffect(() => {
    const searchTerm = searchParams.get("q");
    
    // Extract filters from URL parameters
    const status = searchParams.get("status");
    const title = searchParams.get("title");
    const questionsCount = searchParams.get("questionsCount");
    const avarageScore = searchParams.get("avarageScore");
    const success_rate = searchParams.get("success_rate");
    const retakeNumbers = searchParams.get("retakeNumbers");
    const timeLimit = searchParams.get("timeLimit");
    
    // Build filters object only with actual values
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const urlFilters: any = {};
    
    if (status) urlFilters.status = status;
    if (title) urlFilters.title = title;
    
    // Map question count ranges to API filters
    if (questionsCount) {
      switch (questionsCount) {
        case "0-5":
          urlFilters.minQuestionCount = 0;
          urlFilters.maxQuestionCount = 5;
          break;
        case "6-10":
          urlFilters.minQuestionCount = 6;
          urlFilters.maxQuestionCount = 10;
          break;
        case "11-20":
          urlFilters.minQuestionCount = 11;
          urlFilters.maxQuestionCount = 20;
          break;
        case "20+":
          urlFilters.minQuestionCount = 20;
          break;
      }
    }
    
    // Map average score ranges to API filters
    if (avarageScore) {
      switch (avarageScore) {
        case "0-50":
          urlFilters.minAverageScore = 0;
          urlFilters.maxAverageScore = 50;
          break;
        case "51-75":
          urlFilters.minAverageScore = 51;
          urlFilters.maxAverageScore = 75;
          break;
        case "76-90":
          urlFilters.minAverageScore = 76;
          urlFilters.maxAverageScore = 90;
          break;
        case "91-100":
          urlFilters.minAverageScore = 91;
          urlFilters.maxAverageScore = 100;
          break;
      }
    }
    
    // Map success rate ranges to API filters
    if (success_rate) {
      switch (success_rate) {
        case "0-50":
          urlFilters.minSuccessRate = 0;
          urlFilters.maxSuccessRate = 50;
          break;
        case "51-70":
          urlFilters.minSuccessRate = 51;
          urlFilters.maxSuccessRate = 70;
          break;
        case "71-90":
          urlFilters.minSuccessRate = 71;
          urlFilters.maxSuccessRate = 90;
          break;
        case "90+":
          urlFilters.minSuccessRate = 90;
          break;
      }
    }
    
    // Map retake numbers to API filters
    if (retakeNumbers) {
      switch (retakeNumbers) {
        case "0":
          urlFilters.retakes = "$gte:0";
          break;
        case "1":
          urlFilters.retakes = "$eq:1";
          break;
        case "2-3":
          urlFilters.retakes = "$gte:2,$lte:3";
          break;
        case "4+":
          urlFilters.retakes = "$gte:4";
          break;
      }
    }
    
    // Map time limit ranges to API filters
    if (timeLimit) {
      switch (timeLimit) {
        case "0":
          urlFilters.maxAnswerTime = 0;
          break;
        case "1-10":
          urlFilters.minAnswerTime = 1;
          urlFilters.maxAnswerTime = 10;
          break;
        case "11-30":
          urlFilters.minAnswerTime = 11;
          urlFilters.maxAnswerTime = 30;
          break;
        case "30+":
          urlFilters.minAnswerTime = 30;
          break;
      }
    }
    
    // Apply search if present
    if (searchTerm) {
      searchByTitle(searchTerm);
    } else {
      // Apply filters or fetch all quizzes
      if (Object.keys(urlFilters).length > 0) {
        applyFilters(urlFilters);
      } else {
        getQuizzes();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterConfig: FilterConfigTable[] = [
    {
      id: "status",
      label: "Status",
      options: [
        { value: "published", label: "Published", count: 24 },
        { value: "draft", label: "Draft", count: 6 },
      ],
      placeholder: "Select status",
      icon: Eye,
    },
    {
      id: "title",
      label: "Quiz Title",
      options: [
        { value: "javascript", label: "JavaScript", count: 8 },
        { value: "react", label: "React", count: 10 },
        { value: "css", label: "CSS", count: 12 },
      ],
      placeholder: "Select title",
      icon: FileText,
      isSearchable: true,
    },
    {
      id: "questionsCount",
      label: "Question Count",
      options: [
        { value: "0-5", label: "0 - 5" },
        { value: "6-10", label: "6 - 10" },
        { value: "11-20", label: "11 - 20" },
        { value: "20+", label: "20+" },
      ],
      placeholder: "Select question range",
      icon: Layers,
    },
    {
      id: "timeLimit",
      label: "Time Limit",
      options: [
        { value: "0", label: "No limit" },
        { value: "1-10", label: "1 - 10 mins" },
        { value: "11-30", label: "11 - 30 mins" },
        { value: "30+", label: "30+ mins" },
      ],
      placeholder: "Select time",
      icon: Timer,
    },
    {
      id: "success_rate",
      label: "Success Rate",
      options: [
        { value: "0-50", label: "Below 50%" },
        { value: "51-70", label: "51% - 70%" },
        { value: "71-90", label: "71% - 90%" },
        { value: "90+", label: "90%+" },
      ],
      placeholder: "Select score",
      icon: Percent,
    },
    {
      id: "retakeNumbers",
      label: "Retake Limit",
      options: [
        { value: "0", label: "Unlimited" },
        { value: "1", label: "1 Time" },
        { value: "2-3", label: "2 - 3 Times" },
        { value: "4+", label: "4+ Times" },
      ],
      placeholder: "Select retakes",
      icon: RefreshCcw,
    },
    {
      id: "avarageScore",
      label: "Average Score",
      options: [
        { value: "0-50", label: "0% - 50%" },
        { value: "51-75", label: "51% - 75%" },
        { value: "76-90", label: "76% - 90%" },
        { value: "91-100", label: "91% - 100%" },
      ],
      placeholder: "Select average",
      icon: LayoutTemplate,
    },
  ];
  // const columnss = [
  //   {
  //     key: "title" as keyof Quiz,
  //     header: "Quiz Title",
  //     sortable: true,
  //     render: (quiz: Quiz) => (
  //       <Link
  //         href={
  //           isStudent
  //             ? `quizzes/${quiz.id}/start`
  //             : `quizzes/overview/${quiz.id}`
  //         }
  //         className="flex items-center gap-3"
  //       >
  //         <div className="bg-green-100 p-2 rounded-lg">
  //           <FileText className="w-5 h-5 text-green-600" />
  //         </div>
  //         <div>
  //           <h3 className="text-sm font-medium">{quiz.title}</h3>
  //         </div>
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: "questions" as keyof Quiz,
  //     header: "Questions",
  //     sortable: true,
  //     render: (quiz: Quiz) => (
  //       <span className="text-sm">{quiz?.questions?.length}</span>
  //     ),
  //   },
  //   {
  //     key: "students" as keyof Quiz,
  //     header: "students",
  //     sortable: true,
  //     render: (quiz: Quiz) => (
  //       <span className="text-sm">{quiz.students?.length ?? "-"}</span>
  //     ),
  //   },
  //   {
  //     key: "timeLimit" as keyof Quiz,
  //     header: "Avarage Time",
  //     sortable: true,
  //     render: (quiz: Quiz) => (
  //       <div className="flex items-center gap-1">
  //         <Timer className="w-4 h-4 text-gray-500" />
  //         <span className="text-sm">
  //           {quiz.timeLimit === 0 ? "No limit" : `${quiz.timeLimit} mins`}
  //         </span>
  //       </div>
  //     ),
  //   },
  //   {
  //     key: "passingScore" as keyof Quiz,
  //     header: "Success Rate",
  //     sortable: true,
  //     render: (quiz: Quiz) => {
  //       const color =
  //         quiz.passingScore >= 80
  //           ? "text-green-600 bg-green-50"
  //           : quiz.passingScore >= 50
  //           ? "text-yellow-600 bg-yellow-50"
  //           : "text-red-600 bg-red-50";

  //       return (
  //         <span className={`text-xs px-2 py-1 rounded-lg font-medium ${color}`}>
  //           {quiz.passingScore}%
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "avarageScore" as keyof Quiz,
  //     header: "Average Score",
  //     sortable: true,
  //     render: (quiz: Quiz) => {
  //       const color =
  //         quiz.avarageScore >= 80
  //           ? "text-green-600 bg-green-50"
  //           : quiz.avarageScore >= 50
  //           ? "text-yellow-600 bg-yellow-50"
  //           : "text-red-600 bg-red-50";

  //       return (
  //         <span className={`text-xs px-2 py-1 rounded-lg font-medium ${color}`}>
  //           {quiz.avarageScore}%
  //         </span>
  //       );
  //     },
  //   },
  //   {
  //     key: "retakeNumbers" as keyof Quiz,
  //     header: "Retakes",
  //     sortable: true,
  //     render: (quiz: Quiz) => (
  //       <span className="text-sm">
  //         {quiz.retakeNumbers === 0 ? "Unlimited" : quiz.retakeNumbers}
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "status" as keyof Quiz,
  //     header: "Status",
  //     sortable: true,
  //     render: () => (
  //       <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
  //         Published
  //       </span>
  //     ),
  //   },
  //   {
  //     key: "actions",
  //     header: "Actions",
  //     align: "right",
  //     actions: {
  //       primaryActions: [
  //         {
  //           label: "Play",
  //           icon: <Play size={15} />,
  //           onClick: (quiz: Quiz) =>
  //             router.replace(`/lms/quizzes/${quiz.id}/start`),
  //           className: "text-blue-600 hover:bg-blue-50",
  //         },
  //         {
  //           label: "Edit",
  //           icon: <SquarePen size={15} />,
  //           onClick: () => console.log("Edit clicked"),
  //           className: "text-green-600 hover:bg-green-50",
  //         },
  //         {
  //           label: "Delete",
  //           icon: <Trash2 size={15} />,
  //           onClick: () => console.log("Delete clicked"),
  //           className: "text-red-600 hover:bg-red-50",
  //         },
  //       ],
  //       dropdownActions: [
  //         {
  //           label: "Publish",
  //           icon: <Send size={14} />,
  //           onClick: () => console.log("Publish clicked"),
  //         },
  //         {
  //           label: "Quick Edit",
  //           icon: <FileText size={14} />,
  //           onClick: () => console.log("Quick Edit clicked"),
  //         },
  //         {
  //           label: "Edit",
  //           icon: <Edit size={14} />,
  //           onClick: () => console.log("Edit clicked"),
  //         },
  //         {
  //           label: "Archive",
  //           icon: <Archive size={14} />,
  //           onClick: () => console.log("Archive clicked"),
  //           className: "text-orange-600",
  //         },
  //       ],
  //     },
  //   },
  // ];

  // Show loading state
  // if (loading) {
  //   return (
  //     <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
  //       <div className="flex items-center justify-center h-64">
  //         <div className="text-gray-500">Loading quizzes...</div>
  //       </div>
  //     </div>
  //   );
  // }

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div className="text-gray-500">Loading quizzes...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
        <div className="flex items-center justify-center h-64">
          <div className="text-red-500">Error loading quizzes: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <React.Suspense fallback={<div>Loading...</div>}>
        <DynamicTableFilter
          filters={filterConfig}
          columns={4}
          showSearch={true}
          showClearAll={true}
          className="mb-6"
          defaultViewMode="list"
          showViewModeToggle={!isStudent}
        />
      </React.Suspense>

      {view === "grid" || isStudent ? (
        loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <div className="text-gray-500">Loading quizzes...</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {quizzes.map((quiz) => (
              <QuizCard isStudent={isStudent} key={quiz.id} quiz={quiz} />
            ))}
          </div>
        )
      ) : (
        // <DynamicTable<Quiz>
        //   data={quizzes}
        //   columns={columns}
        //   pagination={true}
        //   itemsPerPage={5}
        //   className="border border-gray-200 rounded-lg"
        //   headerClassName="bg-gray-100 text-gray-700"
        //   rowClassName="hover:bg-gray-50 border-b"
        //   cellClassName="p-3 text-center"
        //   emptyMessage="No quizzes found"
        //   rowIdKey="id"
        //   selectable
        //   showRowNumbers
        // />
        <AdvancedDataTable 
           columns={columns}
            data={quizzes}
            loading={loading}
            defaultSorting={{
              id: "title",
              desc: false,
            }}
            headerClassName="text-sm"
            cellClassName="text-xs"
            filterClassName="px-5"
            paginationClassName="px-5"
            tableClassName="border-t border-b"
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
            hideSearch={false}
            hideExport={false}
            hideColumnManager={false}
            hidePagination={false}
        />
      )}
    </div>
  );
};

const QuizsTable: React.FC<{ isStudent?: boolean }> = ({ isStudent = false }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <QuizsTableContent isStudent={isStudent} />
    </Suspense>
  );
};

export default QuizsTable;
