/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CourseContentProps } from "@/types/courses";
import { Grid, List, MoreHorizontal } from "lucide-react";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { generateCoursesColumns } from "@/components/columns/coursesColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import CourseCard from "@/components/shared/CourseCard";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { useEffect, useMemo, useState, useCallback } from "react";
import { CourseFormType, CourseItem } from "@/types/courses";
import { useSession } from "next-auth/react";
import { Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/UI/dialog";
import InstructorSelector from "@/components/UI/InstructorSelector";
import { QuickEditCourseDialogForm } from "@/app/(auth)/instructor/courses/components/QuickEditCourseDialogForm";

interface CoursesListProps {
  courses: CourseContentProps[];
}

const CoursesList: React.FC<CoursesListProps> = () => {
  const { courses, fetching, getCourses, quickUpdateExistingCourse, loading } = useInstructorCourse();
  const { data: session } = useSession();
  const isAdmin = session?.user?.type === "admin";
  const [reassignDialogOpen, setReassignDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [newInstructor, setNewInstructor] = useState("");
  const [quickEditDialogOpen, setQuickEditDialogOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState<CourseItem | null>(null);
  
  // Handle quick updates (like active/inactive toggle, price changes, status changes)
  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    const course = courses[rowIndex];
    if (!course) return;
    quickUpdateExistingCourse(course.id, {
      [columnId]: value,
    });
  }, [courses, quickUpdateExistingCourse]);
  
  // Handle actions from table
  const handleActions = useCallback((rowIndex: number, type: "delete" | "quicEdit") => {
    const course = courses[rowIndex];
    if (type === "quicEdit") {
      setCourseToEdit(course);
      setQuickEditDialogOpen(true);
    } else if (type === "delete") {
      // Handle delete action
      console.log("Delete course:", course);
    }
  }, [courses]);
  
  // Generate custom columns with modified status column for approval
  const columns = useMemo(() => {
    const baseColumns = generateCoursesColumns(handleActions, loading);
    
    // Find the status column and replace it with approval column
    const modifiedColumns = baseColumns.map((column) => {
      if (column.accessorKey === "status") {
        return {
          ...column,
          header: "Approval",
          cell: ({ row, column, table }: any) => {
            const status = row.getValue("status") as CourseFormType["status"];
            const isApproved = status === "published";
            
            return (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-2 px-2"
                  >
                    <Badge
                      variant={isApproved ? "success" : "warning"}
                      className="cursor-pointer"
                    >
                      {isApproved ? "Approved" : "Pending"}
                    </Badge>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Change Approval Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() =>
                      table.options.meta?.updateData(row.index, column.id, "published")
                    }
                    className="text-green-600"
                  >
                    ✓ Approve Course
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      table.options.meta?.updateData(row.index, column.id, "draft")
                    }
                    className="text-orange-600"
                  >
                    ⏸ Reject Course
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            );
          },
        };
      }
      return column;
    });

    // Add admin-only columns if user is admin
    if (isAdmin) {
      // Insert Created By column after Date column
      const dateColumnIndex = modifiedColumns.findIndex(col => col.accessorKey === "created_at");
      if (dateColumnIndex !== -1) {
        modifiedColumns.splice(dateColumnIndex + 1, 0, {
          accessorKey: "createdBy" as any,
          header: "Created By",
          accessorFn: (row: any) => {
            return row.createdBy || "Unknown";
          },
          cell: ({ row }) => {
            const createdBy = (row.original as any).createdBy || "Unknown";
            return (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{createdBy}</span>
              </div>
            );
          },
          meta: { filterVariant: "select" },
        });

        // Insert Instructor column after Created By
        modifiedColumns.splice(dateColumnIndex + 2, 0, {
          accessorKey: "instructor" as any,
          header: "Instructor",
          accessorFn: (row: any) => {
            const instructor = row.instructor;
            if (!instructor) return "No instructor";
            if (typeof instructor === 'string') return 'Loading...';
            
            // Check for profile.firstName and profile.lastName first (API response structure)
            if (instructor.profile?.firstName || instructor.profile?.lastName) {
              const firstName = instructor.profile.firstName || '';
              const lastName = instructor.profile.lastName || '';
              return `${firstName} ${lastName}`.trim() || "Unknown";
            }
            
            // Fallback to other possible name fields
            return instructor.fullName || instructor.userName || instructor.name || "Unknown";
          },
          cell: ({ row }) => {
            const instructor = (row.original as any).instructor;
            const course = row.original;
            
            if (!instructor) {
              return (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">No instructor</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0"
                    onClick={() => {
                      setSelectedCourse(course);
                      setReassignDialogOpen(true);
                    }}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                </div>
              );
            }
            
            // Handle case where instructor is an object or just a string ID
            let instructorName = "Unknown";
            
            if (typeof instructor === 'string') {
              instructorName = 'Loading...';
            } else {
              // Check for profile.firstName and profile.lastName first (API response structure)
              if (instructor.profile?.firstName || instructor.profile?.lastName) {
                const firstName = instructor.profile.firstName || '';
                const lastName = instructor.profile.lastName || '';
                instructorName = `${firstName} ${lastName}`.trim() || "Unknown";
              } else {
                // Fallback to other possible name fields
                instructorName = instructor.fullName || instructor.userName || instructor.name || "Unknown";
              }
            }
            
            return (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {instructorName}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => {
                    setSelectedCourse(course);
                    setReassignDialogOpen(true);
                  }}
                >
                  <Edit2 className="h-3 w-3" />
                </Button>
              </div>
            );
          },
          meta: { filterVariant: "select" },
        });
      }
    }

    return modifiedColumns;
  }, [isAdmin, handleActions, loading]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  return (
    <Tabs defaultValue="list">
      {/* <Modal isOpen={activeModal} onClose={() => setActiveModal(false)}>
        <QuickEdit />
      </Modal> */}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Courses
            <span className="text-muted-foreground ml-1">
              ({courses.length})
            </span>
          </CardTitle>
          <CardAction>
            <TabsList className="gap-0 inline-flex w-fit -space-x-px rounded-md shadow-xs rtl:space-x-reverse">
              <Button
                className="rounded-s-base rounded-none shadow-none focus-visible:z-10"
                variant="outline"
                asChild
              >
                <TabsTrigger value="list">
                  <List />
                  <span className="sr-only">List</span>
                </TabsTrigger>
              </Button>
              <Button
                className="rounded-e-base rounded-none shadow-none focus-visible:z-10"
                variant="outline"
                asChild
              >
                <TabsTrigger value="grid">
                  <Grid />
                </TabsTrigger>
              </Button>
            </TabsList>
          </CardAction>
        </CardHeader>
      </Card>

      <TabsContent value="list">
        <Card>
          <AdvancedDataTable
            columns={columns}
            data={courses}
            updateData={updateData}
            filters={[
              { key: "category", className: "min-w-32" },
              { key: "subCategory", className: "min-w-32" },
              { key: "type", className: "min-w-32" },
              { key: "status", className: "min-w-32" },
              ...(isAdmin ? [
                { key: "createdBy", className: "min-w-32" },
                { key: "instructor", className: "min-w-32" },
              ] : []),
            ]}
            defaultSorting={{
              id: "name",
              desc: false,
            }}
            loading={fetching}
            headerClassName="text-sm"
            cellClassName="text-xs"
            filterClassName="px-5 py-2 justify-between"
            paginationClassName="px-5 py-2"
            tableClassName="border-t border-b"
            hideSearch={false}
            hideExport={false}
            hideColumnManager={false}
            hidePagination={false}
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
          />
        </Card>
      </TabsContent>
      <TabsContent value="grid">
        <div className="my-8 grid grid-cols-1 justify-center gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </TabsContent>

      {/* Instructor Reassignment Dialog - Admin Only */}
      {isAdmin && (
        <Dialog open={reassignDialogOpen} onOpenChange={setReassignDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Reassign Instructor</DialogTitle>
              <DialogDescription>
                Select a new instructor for the course: <strong>{selectedCourse?.name}</strong>
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <InstructorSelector
                label="New Instructor"
                value={newInstructor}
                onChange={setNewInstructor}
                required
              />
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setReassignDialogOpen(false);
                  setSelectedCourse(null);
                  setNewInstructor("");
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  if (selectedCourse?.id && newInstructor) {
                    await quickUpdateExistingCourse(selectedCourse.id, {
                      instructorId: newInstructor
                    });
                    // Add small delay for backend to process, then refetch
                    await new Promise(resolve => setTimeout(resolve, 300));
                    await getCourses();
                    setReassignDialogOpen(false);
                    setSelectedCourse(null);
                    setNewInstructor("");
                  }
                }}
                disabled={!newInstructor || loading}
              >
                {loading ? "Reassigning..." : "Reassign Instructor"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Quick Edit Course Dialog */}
      {courseToEdit && (
        <QuickEditCourseDialogForm
          open={quickEditDialogOpen}
          onOpenChange={setQuickEditDialogOpen}
          course={courseToEdit}
        />
      )}
    </Tabs>
  );
};

export default CoursesList;
