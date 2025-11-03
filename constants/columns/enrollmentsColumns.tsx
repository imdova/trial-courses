import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { Enrollment as DummyEnrollment } from "@/constants/enrollments.data";
import { Enrollment as APIEnrollment } from "@/store/slices/admin-enrollments-list.slice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import Link from "next/link";

type EnrollmentType = DummyEnrollment | APIEnrollment;

export const enrollmentsColumns: ColumnDef<EnrollmentType>[] = [
  {
    accessorKey: "studentName",
    header: "Student",
    cell: ({ row }) => {
      const enrollment = row.original;
      // Get studentId - should be available in both types
      // const studentId = (enrollment as APIEnrollment).studentId || (enrollment as DummyEnrollment).studentId || '';
      const studentPhotoUrl = 'studentPhotoUrl' in enrollment ? enrollment.studentPhotoUrl : undefined;
      const studentName = enrollment.studentName;
      const nameParts = studentName.split(' ');
      const initials = nameParts.length >= 2 
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}` 
        : studentName.substring(0, 2);
      
      return (
        <Link 
          href={`/admin/students/1`}
          className="flex items-center gap-2 hover:bg-gray-50 rounded-md p-1 -m-1 transition-colors cursor-pointer"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={studentPhotoUrl}
              alt={studentName}
            />
            <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
              {initials.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 hover:text-blue-600 transition-colors">{studentName}</span>
            <span className="text-sm text-gray-500">{enrollment.studentEmail}</span>
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "courseName",
    header: "Course",
    cell: ({ row }) => {
      const enrollment = row.original;
      return (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{enrollment.courseName}</span>
          {'courseId' in enrollment && <span className="text-sm text-gray-500">{enrollment.courseId}</span>}
        </div>
      );
    },
  },
  {
    accessorKey: "enrollmentDate",
    header: "Enrollment Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("enrollmentDate"));
      return <span className="text-gray-900">{date.toLocaleDateString()}</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        active: "bg-green-100 text-green-800",
        Active: "bg-green-100 text-green-800",
        completed: "bg-blue-100 text-blue-800",
        Completed: "bg-blue-100 text-blue-800",
        inactive: "bg-red-100 text-red-800",
        Cancelled: "bg-red-100 text-red-800",
        Pending: "bg-yellow-100 text-yellow-800",
      };
      return (
        <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;
      return (
        <div className="flex items-center gap-2">
          <div className="w-16 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{progress}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "instructorName",
    header: "Instructor",
    cell: ({ row }) => {
      const enrollment = row.original;
      const instructorName = 'instructorName' in enrollment 
        ? enrollment.instructorName 
        : 'instructor' in enrollment 
          ? enrollment.instructor 
          : 'N/A';
      return <span className="text-gray-900">{instructorName}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number;
      return <span className="font-medium text-gray-900">${price}</span>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment",
    cell: ({ row }) => {
      const enrollment = row.original;
      if (!('paymentStatus' in enrollment)) {
        return <span className="text-gray-500">N/A</span>;
      }
      const paymentStatus = row.getValue("paymentStatus") as string;
      const paymentColors = {
        Paid: "bg-green-100 text-green-800",
        Pending: "bg-yellow-100 text-yellow-800",
        Refunded: "bg-red-100 text-red-800",
      };
      return (
        <Badge className={paymentColors[paymentStatus as keyof typeof paymentColors] || "bg-gray-100 text-gray-800"}>
          {paymentStatus}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const enrollment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                const id = 'enrollmentId' in enrollment ? enrollment.enrollmentId : 'id' in enrollment ? enrollment.id : '';
                navigator.clipboard.writeText(id);
              }}
            >
              Copy enrollment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit enrollment
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Cancel enrollment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
