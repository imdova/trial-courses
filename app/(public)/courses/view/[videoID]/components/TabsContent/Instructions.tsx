import React from "react";
import { CourseType, SingleCourseResponse, SingleCourseSection } from "@/types/courses";
import {
  ChevronRight,
  Check,
  Clock,
  BookOpen,
  FileText,
  ClipboardList,
} from "lucide-react";
interface InstructionsProps {
  Video: CourseType;
  courseData?: SingleCourseResponse | null;
  currentItem?: SingleCourseSection['items'][0];
  currentSection?: SingleCourseSection;
}

const Instructions = ({ Video, courseData, currentItem, currentSection }: InstructionsProps) => {
  // Use API data if available, otherwise fallback to dummy data
  const metadata = courseData?.metadata;
  
  // Get current lecture/item details
  const currentLecture = currentItem?.curriculumType === "lecture" ? currentItem.lecture : null;
  const currentQuiz = currentItem?.curriculumType === "quiz" ? currentItem.quiz : null;
  const currentAssignment = currentItem?.curriculumType === "assignment" ? currentItem.assignment : null;

  return (
    <div className="space-y-8 rounded-lg border p-6">
      {/* Current Lecture/Item Information */}
      {currentItem && currentSection && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border-2 border-green-200 p-6 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {currentItem.curriculumType === "lecture" && (
                <div className="bg-green-600 rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
              )}
              {currentItem.curriculumType === "quiz" && (
                <div className="bg-blue-600 rounded-full p-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              )}
              {currentItem.curriculumType === "assignment" && (
                <div className="bg-orange-600 rounded-full p-3">
                  <ClipboardList className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="mb-2 flex items-center gap-2 flex-wrap">
                <span className="inline-block rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white uppercase">
                  {currentItem.curriculumType}
                </span>
                <span className="text-sm text-gray-600">
                  Section: {currentSection.name}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {currentLecture?.title || currentQuiz?.title || currentAssignment?.name || "Current Item"}
              </h2>
              
              {/* Lecture Description */}
              {currentLecture?.description && (
                <p className="text-sm text-gray-700 mb-3 bg-white/50 p-3 rounded-md">
                  {currentLecture.description}
                </p>
              )}
              
              {/* Quiz Instructions */}
              {currentQuiz?.instructions && (
                <div className="bg-white/50 p-3 rounded-md mb-3">
                  <p className="text-sm text-gray-700 mb-2">
                    {currentQuiz.instructions}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{currentQuiz.quizQuestions?.length || 0} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{currentQuiz.answer_time} minutes</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Passing Score: {currentQuiz.passing_score}%</span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Assignment Instructions */}
              {currentAssignment?.instructions && (
                <div className="bg-white/50 p-3 rounded-md mb-3">
                  <p className="text-sm text-gray-700 mb-2">
                    {currentAssignment.instructions}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      <span>{currentAssignment.numberOfQuestions || 0} Questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Due: {currentAssignment.end_date ? new Date(currentAssignment.end_date).toLocaleDateString() : "No deadline"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>{currentAssignment.totalPoints || 0} Points</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Course Overview */}
      <div>
        <h3 className="text-md mb-4 font-semibold">Course Overview</h3>
        <div className="prose max-w-none">
          {metadata?.courseOverview ? (
            <div dangerouslySetInnerHTML={{ __html: metadata.courseOverview }} className="text-gray-700" />
          ) : (
            <p className="text-gray-700">
              {Video?.description || "No description available for this course."}
            </p>
          )}
        </div>
      </div>

      {/* What Will You Learn */}
      {metadata?.whatWillYouLearn && (
        <div>
          <h3 className="text-md mb-4 font-semibold">What Will You Learn?</h3>
          <p className="mb-4 text-sm text-gray-600">
            {metadata.whatWillYouLearn.text}
          </p>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {metadata.whatWillYouLearn.items.map((item, index) => (
              <li className="flex items-center gap-2 p-2" key={index}>
                <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                  <Check size={15} />
                </span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Who Can Attend */}
      <div>
        <h3 className="text-md mb-4 font-semibold">
          Who can attend this course?
        </h3>
        <p className="mb-4 text-sm text-gray-600">
          {metadata?.whoCanAttend?.text || 
            "This course is designed for professionals and learners who want to advance their knowledge and skills."}
        </p>
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {(metadata?.whoCanAttend?.items || Video.attends || []).map((attend, index) => (
            <li className="flex items-center gap-2 p-2" key={index}>
              <span className="bg-primary flex h-8 w-8 items-center justify-center rounded-full text-white">
                <ChevronRight size={15} />
              </span>
              <span className="text-gray-700">{attend}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQs */}
      {metadata?.faqs && metadata.faqs.length > 0 && (
        <div>
          <h3 className="text-md mb-4 font-semibold">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {metadata.faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border border-gray-200 p-4">
                <h4 className="mb-2 font-semibold text-gray-800">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Instructions;
