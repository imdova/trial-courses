/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useEnrolledCourses } from "@/app/(auth)/student/my-courses/hooks/useEnrolledCourses";
import {
  Phone,
  Mail,
  Home,
  Users,
  Book,
  Clock,
  Star,
} from "lucide-react";
import Image from "next/image";
import { ProgressNumberCard } from "./ProgressNumberCard";

export default function StudentCard() {
  const {
    activityStats,
    loadingActivity,
    getStudentActivity,
  } = useEnrolledCourses();

  useEffect(() => {
    getStudentActivity();
  }, [getStudentActivity]);

  if (loadingActivity || !activityStats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-10 text-center">
        Loading student data...
      </div>
    );
  }

  const { id, name, avatar, phone, email, address, coursesInProgress, coursesCompleted, certificatesEarned, communitySupport } = activityStats;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="min-w-28">
            <Image
              className="w-28 h-28 object-cover rounded-full"
              src={avatar}
              width={200}
              height={200}
              alt={name}
            />
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">{name}</h1>
            <div className="flex flex-wrap gap-6 mb-6">
              {/* <div className="flex flex-col gap-1">
                <span className="w-20 text-sm text-gray-600">ID</span>
                <span className="font-semibold text-sm">{id}</span>
              </div> */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="w-20 text-sm text-gray-600">Number</span>
                </div>
                <span className="font-semibold text-sm">{phone}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="w-20 text-sm text-gray-600">Email</span>
                </div>
                <span className="font-semibold text-sm">{email}</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <Home className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="w-20 text-sm text-gray-600">Address</span>
                </div>
                <span className="font-semibold text-sm">{address}</span>
              </div>
            </div>
          </div>
        </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
              <ProgressNumberCard
                value={coursesInProgress}
                progressValue={65}
                title="Course in progress"
                icon={<Users className="h-4 w-4" />}
                color="orange"
                size="lg"
              />
              <ProgressNumberCard
                value={coursesCompleted}
                progressValue={82}
                title="Course Completed"
                icon={<Book className="h-4 w-4" />}
                color="green"
                size="lg"
              />
              <ProgressNumberCard
                value={certificatesEarned}
                progressValue={45}
                title="Cretificates Earned"
                icon={<Clock className="h-4 w-4" />}
                color="blue"
                size="lg"
              />
              <ProgressNumberCard
                value={communitySupport}
                progressValue={93}
                title="Community support"
                icon={<Star className="h-4 w-4" />}
                color="purple"
                size="lg"
              />
            </div>
          </div>
        </div>
  );
}
