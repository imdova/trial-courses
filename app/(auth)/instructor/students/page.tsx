/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import { ScrollArea, ScrollBar } from "@/components/UI/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { ColumnConfig } from "@/constants/columns";
import { allStudentsColumns } from "@/constants/columns/studentsColums";
import { StudentsData } from "@/constants/students.data";
import { useStudents } from "@/hooks/useStudents";
import { StudentProfile } from "@/types/courses";
import { generatePrefixId } from "@/util/user";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const StudentsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const session = useSession();
  const userId = session.data?.user.id;

  // In any component
const { students, loading, fetchStudents } = useStudents();

// Fetch students for an instructor
useEffect(() => {
  if(userId){
    fetchStudents(userId, { page: 1, limit: 10 });
  }
}, [fetchStudents, userId]);

  return (
    <div className="space-y-3">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Students</CardTitle>
        <CardDescription>
          Manage and track all your students in one place
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="all">
          <Card className="p-0">
            <ScrollArea className="grid max-w-full p-0">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recorded">Recorded</TabsTrigger>
                <TabsTrigger value="online-offline">
                  Online / Offline
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Card>
        </Tabs>
        <Card>
          {

            <AdvancedDataTable<StudentProfile>
              columns={allStudentsColumns(
                actions,
                activeTab === "online-offline",
              )}
              data={students}
              filters={[
                { key: "age", className: "flex-1 min-w-32 lg:max-w-32" },
                { key: "gender", className: "flex-1 min-w-20 lg:max-w-44" },
                { key: "category", className: "flex-1 min-w-32 lg:max-w-44" },
                { key: "speciality", className: "flex-1 min-w-32 lg:max-w-44" },
              ]}
              defaultSorting={{
                id: "name",
                desc: false,
              }}
              cellClassName="text-xs"
              filterClassName="px-5"
              paginationClassName="px-5"
              tableClassName="border-t border-b"
              initialPagination={{
                pageIndex: 0,
                pageSize: 10,
              }}
            />

          }
        </Card>
      </CardContent>
    </div>
  );
};

const actions: ColumnConfig<StudentProfile> = {
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => {
    const student = row.original;

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(student.studentId)}
          >
            Copy Student ID
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Message Student</DropdownMenuItem>
          <DropdownMenuItem>View Student Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
};
export default StudentsPage;
