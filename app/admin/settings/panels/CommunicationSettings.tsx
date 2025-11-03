"use client";

import Toggle from "@/components/UI/form/Toggle";
import { formDataSettings } from "@/types/forms";
import { UseFormRegister } from "react-hook-form";

interface CommunicationProps {
  register: UseFormRegister<formDataSettings>;
}

const CommunicationSettings: React.FC<CommunicationProps> = ({ register }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Communication Settings
      </h1>
      <p className="text-gray-600 mb-6">
        Manage how and when you receive notifications about your course and
        students.
      </p>

      <div className="space-y-8">
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Email Notifications
          </h2>

          <div className="space-y-4">
            <Toggle
              id="newEnrollment"
              className="font-semibold"
              label="New Enrollment"
              details="Receive an email when a student enrolls in your course"
              {...register("newEnrollment")}
            />
            <Toggle
              id="courseCompletion"
              className="font-semibold"
              label="Course Completion"
              details="Receive an email when a student completes your course"
              {...register("courseCompletion")}
            />
            <Toggle
              id="studentQuestions"
              className="font-semibold"
              label="Student Questions"
              details="Receive an email when a student asks a question"
              {...register("studentQuestions")}
            />
            <Toggle
              id="reviewNotifications"
              className="font-semibold"
              label="Review Notifications"
              details="Receive an email when a student leaves a review"
              {...register("reviewNotifications")}
            />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Platform Notifications
          </h2>

          <div className="space-y-4">
            <Toggle
              id="announcements"
              className="font-semibold"
              label="Announcements"
              details="Receive notifications about platform announcements"
              {...register("announcements")}
            />
            <Toggle
              id="systemUpdates"
              className="font-semibold"
              label="system Updates"
              details="Receive notifications about system updates and maintenance"
              {...register("systemUpdates")}
            />
            <Toggle
              id="weeklyReports"
              className="font-semibold"
              label="Weekly Reports"
              details="Receive weekly reports about your courses and earnings"
              {...register("weeklyReports")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationSettings;
