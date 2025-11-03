import React from "react";
import Image from "next/image";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/Tabs";
import { BookText, FileBadge, FileText, NotepadText, Send, Check, Folder, Award, Settings } from "lucide-react";
import NotesSection from "./TabsContent/NotesSection";
import { CourseType, SingleCourseResponse, SingleCourseSection } from "@/types/courses";
import { question } from "@/types/courses";
import Instructions from "./TabsContent/Instructions";
import Community from "./TabsContent/Community";
import Material from "./TabsContent/Material";
import Certificate from "./TabsContent/Certificate";

interface TabsCourseProps {
  Video: CourseType;
  courseData?: SingleCourseResponse | null;
  currentItem?: SingleCourseSection['items'][0];
  currentSection?: SingleCourseSection;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  questionText: string;
  setQuestionText: (text: string) => void;
  handleQuestionLike: (id: string) => void;
  questions: question[];
  replyIndex: string | null;
  setReplyIndex: (index: string | null) => void;
  setReply: (reply: string) => void;
  handleReplySubmit: (e: React.FormEvent<HTMLFormElement>, id: string) => void;
  handleView: (id: string) => void;
  handleDownload: (url: string, name: string) => void;
  handleReplyLike: (questionId: string, replyId: string) => void;
  reply: string;
}

const TabsCourse = ({
  Video,
  courseData,
  currentItem,
  currentSection,
  handleSubmit,
  questionText,
  setQuestionText,
  handleQuestionLike,
  questions,
  replyIndex,
  setReplyIndex,
  setReply,
  handleReplySubmit,
  handleView,
  handleDownload,
  handleReplyLike,
  reply,
}: TabsCourseProps) => {
  const instructor = courseData?.instructor;

  return (
    <div className="col-span-1 lg:col-span-4">
      {/* Shadcn Tabs */}
      <Tabs defaultValue="instructions" className="my-4">
        <TabsList className="mb-2 w-full rounded-lg border border-gray-200 bg-white px-2 py-4">
          <TabsTrigger value="instructions">
            <NotepadText size={15} />
            Instructions
          </TabsTrigger>
          <TabsTrigger value="community">
            <Send size={15} />
            Community
          </TabsTrigger>
          <TabsTrigger value="courseMaterial">
            <BookText size={15} />
            Material
          </TabsTrigger>
          {/* <TabsTrigger value="courseCertificate">
            <FileBadge size={15} />
            Certificate
          </TabsTrigger> */}
          <TabsTrigger value="courseResources">
            <FileBadge size={15} />
            Resources
          </TabsTrigger>
          <TabsTrigger value="notes">
            <NotepadText size={15} />
            Notes
          </TabsTrigger>
        </TabsList>

        {/* Instructions Tab */}
        <TabsContent value="instructions">
          <Instructions 
            Video={Video} 
            courseData={courseData} 
            currentItem={currentItem}
            currentSection={currentSection}
          />
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community">
          <Community
            courseId={courseData?.id || Video.id}
            Video={Video}
            handleSubmit={handleSubmit}
            questionText={questionText}
            setQuestionText={setQuestionText}
            questions={questions}
            handleQuestionLike={handleQuestionLike}
            setReplyIndex={setReplyIndex}
            replyIndex={replyIndex}
            handleReplySubmit={handleReplySubmit}
            reply={reply}
            handleReplyLike={handleReplyLike}
            setReply={setReply}
          />
        </TabsContent>

        {/* Course Material Tab */}
        <TabsContent value="courseMaterial">
          <Material
            Video={Video}
            courseData={courseData}
            handleView={handleView}
            handleDownload={handleDownload}
          />
        </TabsContent>

        {/* Course Certificate Tab */}
        <TabsContent value="courseCertificate">
          <Certificate
            Video={Video}
            handleView={handleView}
            handleDownload={handleDownload}
          />
        </TabsContent>

        {/* Course Resources Tab */}
        <TabsContent value="courseResources">
        <div className="flex justify-between gap-4">
        {/* Instructor Section */}
        <div className="w-1/2">
          <h3 className="text-md mb-4 font-semibold">Instructor</h3>
          <div className="flex items-start gap-4 rounded-lg bg-gray-50 p-4">
            <div className="relative">
              <Image
                src={
                  instructor?.photoUrl || Video.instructor?.image || "/images/default-instructor.jpg"
                }
                alt={instructor?.fullName || Video.instructor?.name || "Instructor"}
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-md mb-1 font-semibold text-gray-800">
                {instructor?.fullName || Video.instructor?.name || "Course Instructor"}
              </h4>
              <p className="mb-3 text-sm text-gray-600">
                {instructor?.userName || Video.instructor?.job ||
                  "Experienced professional and educator"}
              </p>
            </div>
          </div>
          <button className=" mt-2 inline-flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200">
            <Check size={16} />
            Following on LinkedIn
          </button>
        </div>

        {/* Related to this course Section */}
        <div className="w-1/2">
          <h3 className="text-md mb-4 font-semibold">Related to this course</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Folder className="text-gray-600" size={16} />
                <span className="text-sm text-gray-800">
                  Exercise Files (2)
                </span>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-blue-600 hover:text-blue-800"
              >
                Show all
              </a>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Award className="text-gray-600" size={16} />
                <span className="text-sm text-gray-800">Certificates</span>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-blue-600 hover:text-blue-800"
              >
                Show all
              </a>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <Settings className="text-gray-600" size={16} />
                <span className="text-sm text-gray-800">Organizations</span>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-blue-600 hover:text-blue-800"
              >
                Show more
              </a>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
              <div className="flex items-center gap-3">
                <FileText className="text-gray-600" size={16} />
                <span className="text-sm text-gray-800">Exam</span>
              </div>
              <a
                href="#"
                className="text-[12px] font-medium text-blue-600 hover:text-blue-800"
              >
                Resume exam
              </a>
            </div>
          </div>
        </div>
      </div>
        </TabsContent>
        {/* Notes Tab */}
        <TabsContent value="notes">
          <NotesSection courseId={courseData?.id || Video.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsCourse;
