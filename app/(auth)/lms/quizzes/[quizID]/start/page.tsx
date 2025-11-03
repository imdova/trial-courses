// "use client";

// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { quizzes } from "@/constants/quizzes.data";
// import { ChevronRight } from "lucide-react";
// import { use, useState } from "react";
// import { OptionSelect } from "@/types";
// import CustomSelect from "@/components/UI/DynamicSelectWithIcon";

// interface StartQuizPageProps {
//   params: Promise<{
//     quizID: string;
//   }>;
// }
// const QuestionOrederOptions: OptionSelect[] = [
//   { label: "Regular", value: "regular" },
//   { label: "Random", value: "random" },
// ];
// const QuizModeOptions: OptionSelect[] = [
//   { label: "Quiz", value: "quiz" },
//   { label: "Test", value: "test" },
// ];
// const TimerOptions: OptionSelect[] = [
//   { label: "No limit", value: "no-limit" },
//   { label: "Hidden", value: "hidden" },
//   { label: "Normal", value: "normal" },
// ];

// export default function StartQuizPage({ params }: StartQuizPageProps) {
//   const { quizID } = use(params);
//   const quiz = quizzes.find((q: { id: string }) => q.id === quizID);

//   // State for select dropdowns
//   const [questionOrder, setQuestionOrder] = useState(
//     QuestionOrederOptions[0].value
//   );
//   const [quizMode, setQuizMode] = useState(QuizModeOptions[0].value);
//   const [timerType, setTimerType] = useState(TimerOptions[0].value);

//   if (!quiz) {
//     notFound();
//   }

//   // Function to handle quiz start with selected options
//   const handleStartQuiz = () => {
//     // You can use these values to customize the quiz experience
//     const quizOptions = {
//       questionOrder,
//       quizMode,
//       timerType,
//     };

//     // Store options in localStorage or pass via URL
//     localStorage.setItem("quizOptions", JSON.stringify(quizOptions));

//     // Navigate to first question with options as query params
//     return `/lms/quizzes/${quiz.id}/1?order=${questionOrder}&mode=${quizMode}&timer=${timerType}`;
//   };

//   return (
//     <div className="mx-auto px-4 py-8 max-w-4xl">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
//         <p className="text-sm text-muted-foreground mb-4">{quiz.instructions}</p>
//       </div>
//       <div className="rounded-lg shadow-sm p-6 border border-gray-200">
//         <div className="grid grid-cols-1 sm:grid-cols-2 space-y-4 mb-8">
//           <div className="flex flex-col gap-2">
//             <span className="block text-sm text-muted-foreground mb-2">
//               Questions:
//             </span>
//             <span className="font-semibold">{quiz.questions.length}</span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <span className="block text-sm text-muted-foreground mb-2">
//               Time Limit:
//             </span>
//             <span className="font-semibold">
//               {" "}
//               {quiz.timeLimit && quiz.timeLimit > 0
//                 ? (() => {
//                   const totalSeconds = quiz.timeLimit;
//                   const hours = Math.floor(totalSeconds / 3600); // Total hours
//                   const minutes = Math.floor((totalSeconds % 3600) / 60); // Remaining minutes
//                   const seconds = totalSeconds % 60; // Remaining seconds
//                   return hours > 0
//                     ? `${hours} hour${hours > 1 ? "s" : ""} ${minutes > 0
//                       ? `${minutes} minute${minutes > 1 ? "s" : ""}`
//                       : ""
//                     } ${seconds > 0
//                       ? `${seconds} second${seconds > 1 ? "s" : ""}`
//                       : ""
//                     }`
//                     : `${minutes} minute${minutes > 1 ? "s" : ""} ${seconds > 0
//                       ? `${seconds} second${seconds > 1 ? "s" : ""}`
//                       : ""
//                     }`;
//                 })()
//                 : "No limit"}
//             </span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <span className="block text-sm text-muted-foreground mb-2">
//               Passing Score:
//             </span>
//             <span className="font-semibold">{quiz.passingScore}%</span>
//           </div>
//           <div className="flex flex-col gap-2">
//             <span className="block text-sm text-muted-foreground mb-2">
//               Total Points:
//             </span>
//             <span className="font-semibold">
//               {quiz.questions.reduce(
//                 (total, question) => total + question.points,
//                 0
//               )}
//             </span>
//           </div>
//         </div>

//         <div className="flex flex-col justify-between gap-3 mb-8 md:flex-row border-b pb-4">
//           <div className="w-full">
//             <CustomSelect
//               label="Question Order"
//               value={questionOrder}
//               onChange={setQuestionOrder}
//               options={QuestionOrederOptions}
//             />
//           </div>
//           <div className="w-full">
//             <CustomSelect
//               label="Mode"
//               value={quizMode}
//               onChange={setQuizMode}
//               options={QuizModeOptions}
//             />
//           </div>
//           <div className="w-full">
//             <CustomSelect
//               label="Timer"
//               value={timerType}
//               onChange={setTimerType}
//               options={TimerOptions}
//             />
//           </div>
//         </div>

//         <div className="flex items-center justify-end">
//           <Link
//             href={handleStartQuiz()}
//             className="flex gap-2 items-center bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
//           >
//             Start Quiz
//             <ChevronRight size={15} />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function StartQuizPage(){
  return (
    <></>
  )
}
