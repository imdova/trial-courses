"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { 
  Eye, 
  Download, 
  CheckCircle2, 
  XCircle,
  Calendar,
  Timer 
} from "lucide-react";

interface QuizSubmissionsProps {
  quizId: string;
}

// Mock data for quiz submissions
const mockSubmissions = [
  {
    id: "SUB001",
    studentId: "STU001",
    studentName: "Ahmed Hassan",
    studentEmail: "ahmed.hassan@email.com",
    studentPhotoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    attemptNumber: 1,
    score: 85,
    maxScore: 100,
    percentage: 85,
    timeTaken: 45, // minutes
    status: "passed" as const,
    submittedAt: "2025-01-20T14:30:00",
    questionsAnswered: 18,
    totalQuestions: 20,
  },
  {
    id: "SUB002",
    studentId: "STU002",
    studentName: "Fatima Al-Zahra",
    studentEmail: "fatima.alzahra@email.com",
    studentPhotoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    attemptNumber: 1,
    score: 92,
    maxScore: 100,
    percentage: 92,
    timeTaken: 38,
    status: "passed" as const,
    submittedAt: "2025-01-19T10:15:00",
    questionsAnswered: 20,
    totalQuestions: 20,
  },
  {
    id: "SUB003",
    studentId: "STU003",
    studentName: "Omar Khalil",
    studentEmail: "omar.khalil@email.com",
    studentPhotoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    attemptNumber: 3,
    score: 65,
    maxScore: 100,
    percentage: 65,
    timeTaken: 52,
    status: "failed" as const,
    submittedAt: "2025-01-18T16:45:00",
    questionsAnswered: 20,
    totalQuestions: 20,
  },
  {
    id: "SUB004",
    studentId: "STU004",
    studentName: "Layla Mohammed",
    studentEmail: "layla.mohammed@email.com",
    studentPhotoUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    attemptNumber: 1,
    score: 78,
    maxScore: 100,
    percentage: 78,
    timeTaken: 42,
    status: "passed" as const,
    submittedAt: "2025-01-21T09:20:00",
    questionsAnswered: 19,
    totalQuestions: 20,
  },
  {
    id: "SUB005",
    studentId: "STU005",
    studentName: "Youssef Ibrahim",
    studentEmail: "youssef.ibrahim@email.com",
    studentPhotoUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    attemptNumber: 2,
    score: 88,
    maxScore: 100,
    percentage: 88,
    timeTaken: 40,
    status: "passed" as const,
    submittedAt: "2025-01-17T13:30:00",
    questionsAnswered: 20,
    totalQuestions: 20,
  },
];

const QuizSubmissions = ({ quizId }: QuizSubmissionsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Quiz Submissions</CardTitle>
            <CardDescription>
              {mockSubmissions.length} total submissions from all students
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attempt
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockSubmissions.map((submission) => {
                const nameParts = submission.studentName.split(' ');
                const initials = nameParts.length >= 2 
                  ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` 
                  : submission.studentName.substring(0, 2);

                return (
                  <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                    {/* Student Info */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Link 
                        href={`/admin/students/${submission.studentId}`}
                        className="flex items-center gap-3 group"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={submission.studentPhotoUrl}
                            alt={submission.studentName}
                          />
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {initials.toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                            {submission.studentName}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {submission.studentEmail}
                          </p>
                        </div>
                      </Link>
                    </td>

                    {/* Attempt Number */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Attempt #{submission.attemptNumber}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-semibold text-gray-900">
                              {submission.percentage}%
                            </span>
                            <span className="text-xs text-gray-500">
                              ({submission.score}/{submission.maxScore})
                            </span>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1">
                            <div 
                              className={`h-1.5 rounded-full ${
                                submission.percentage >= 70 
                                  ? 'bg-green-600' 
                                  : 'bg-red-600'
                              }`}
                              style={{ width: `${submission.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Time Taken */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-700">
                        <Timer className="h-4 w-4 text-gray-400" />
                        {formatDuration(submission.timeTaken)}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        className={
                          submission.status === "passed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {submission.status === "passed" ? (
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {submission.status === "passed" ? "Passed" : "Failed"}
                      </Badge>
                    </td>

                    {/* Submitted Date */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="h-3 w-3" />
                        {formatDate(submission.submittedAt)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="outline"
                        asChild
                      >
                        <Link href={`/admin/quizzes/${quizId}/submissions/${submission.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Link>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {mockSubmissions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No submissions yet</p>
            <p className="text-sm mt-1">
              Student quiz submissions will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizSubmissions;

