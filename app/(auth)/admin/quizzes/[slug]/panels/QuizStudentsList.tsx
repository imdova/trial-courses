"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { Eye, Mail, Clock } from "lucide-react";

interface QuizStudentsListProps {
  quizId: string;
}

// Mock data for students who took the quiz
const mockStudents = [
  {
    id: "STU001",
    name: "Ahmed Hassan",
    email: "ahmed.hassan@email.com",
    photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    attempts: 2,
    bestScore: 85,
    lastAttempt: "2025-01-20",
    status: "passed" as const,
  },
  {
    id: "STU002",
    name: "Fatima Al-Zahra",
    email: "fatima.alzahra@email.com",
    photoUrl: "https://randomuser.me/api/portraits/women/2.jpg",
    attempts: 1,
    bestScore: 92,
    lastAttempt: "2025-01-19",
    status: "passed" as const,
  },
  {
    id: "STU003",
    name: "Omar Khalil",
    email: "omar.khalil@email.com",
    photoUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    attempts: 3,
    bestScore: 65,
    lastAttempt: "2025-01-18",
    status: "failed" as const,
  },
  {
    id: "STU004",
    name: "Layla Mohammed",
    email: "layla.mohammed@email.com",
    photoUrl: "https://randomuser.me/api/portraits/women/4.jpg",
    attempts: 1,
    bestScore: 78,
    lastAttempt: "2025-01-21",
    status: "passed" as const,
  },
  {
    id: "STU005",
    name: "Youssef Ibrahim",
    email: "youssef.ibrahim@email.com",
    photoUrl: "https://randomuser.me/api/portraits/men/5.jpg",
    attempts: 2,
    bestScore: 88,
    lastAttempt: "2025-01-17",
    status: "passed" as const,
  },
];

const QuizStudentsList = ({ quizId }: QuizStudentsListProps) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Students Who Took This Quiz</CardTitle>
            <CardDescription>
              {mockStudents.length} students have attempted this quiz
            </CardDescription>
          </div>
          <Button size="sm" variant="outline">
            Export List
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {mockStudents.map((student) => {
            const nameParts = student.name.split(' ');
            const initials = nameParts.length >= 2 
              ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` 
              : student.name.substring(0, 2);

            return (
              <div
                key={student.id}
                className="p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Student Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Link 
                      href={`/admin/students/${student.id}`}
                      className="flex-shrink-0"
                    >
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={student.photoUrl}
                          alt={student.name}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-700">
                          {initials.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link 
                        href={`/admin/students/${student.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors block truncate"
                      >
                        {student.name}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{student.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6">
                    <div className="text-center hidden sm:block">
                      <p className="text-xs text-gray-500 mb-1">Attempts</p>
                      <p className="font-semibold text-gray-900">{student.attempts}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xs text-gray-500 mb-1">Best Score</p>
                      <p className="font-semibold text-gray-900">{student.bestScore}%</p>
                    </div>

                    <div className="hidden md:block">
                      <Badge
                        className={
                          student.status === "passed"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {student.status === "passed" ? "Passed" : "Failed"}
                      </Badge>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <Link href={`/admin/quizzes/${quizId}/submissions?student=${student.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Last Attempt Info - Mobile */}
                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500 sm:hidden">
                  <Clock className="h-3 w-3" />
                  <span>Last attempt: {new Date(student.lastAttempt).toLocaleDateString()}</span>
                  <Badge
                    className={
                      student.status === "passed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {student.status === "passed" ? "Passed" : "Failed"}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        {mockStudents.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No students yet</p>
            <p className="text-sm mt-1">
              Students who take this quiz will appear here
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizStudentsList;

