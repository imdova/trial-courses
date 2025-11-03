"use client";
import { generateCoursesColumns } from "@/components/columns/coursesColumns";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { useEffect, useState } from "react";
import { AlertDialogCourseDelete } from "./components/AlertDialogCourseDelete";
import { CourseItem } from "@/types/courses";
import { QuickEditCourseDialogForm } from "./components/QuickEditCourseDialogForm";
import { useSession } from "next-auth/react";

const CoursesPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteCourse, setCourseToDelete] = useState<CourseItem | null>(null);

  const [openQuickEditDialog, setOpenQuickEditDialog] = useState(false);
  const [quickEditCourse, setQuickEditCourse] = useState<CourseItem | null>(
    null,
  );

  const {
    courses,
    fetching,
    getCourses,
    quickUpdateExistingCourse,
    loading,
  } = useInstructorCourse();

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    const course = courses[rowIndex];
    if (!course) return;
    quickUpdateExistingCourse(course.id, {
      [columnId]: value,
    });
  };

  const actions = (rowIndex: number, type: "delete" | "quicEdit") => {
    const course = courses[rowIndex];
    if (!course) return;
    if (type === "delete") {
      setCourseToDelete(course);
      setOpenDeleteDialog(true);
    } else if (type === "quicEdit") {
      setQuickEditCourse(course);
      setOpenQuickEditDialog(true);
    }
  };

  const columns = generateCoursesColumns(actions, loading, user?.hasAcademy);

  useEffect(() => {
    getCourses({
      page: 1,
      limit: 100,
    });
  }, [getCourses]);

  return (
    <div className="px-5">
      <AlertDialogCourseDelete
        course={deleteCourse}
        open={openDeleteDialog}
        onOpenChange={() => {
          setOpenDeleteDialog(false);
          setCourseToDelete(null);
        }}
      />
      {quickEditCourse && (
        <QuickEditCourseDialogForm
          course={quickEditCourse}
          open={openQuickEditDialog}
          onOpenChange={() => {
            setOpenQuickEditDialog(false);
            setQuickEditCourse(null);
          }}
        />
      )}
      <CardHeader className="mb-5 px-0">
        <CardTitle className="text-2xl">
          My Courses
          <span className="text-muted-foreground ml-1">
            ({courses?.length})
          </span>
        </CardTitle>
        <CardAction>
          <Button asChild variant="outline">
            <Link href="/lms/course/add">
              <Plus />
              Create Course
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <Card>
        <AdvancedDataTable
          columns={columns}
          data={courses}
          updateData={updateData}
          defaultSorting={{
            id: "created_at",
            desc: true,
          }}
          filters={[
            { key: "created_at" },
            { key: "category", className: "min-w-32" },
            { key: "subCategory", className: "min-w-32" },
            { key: "type", className: "min-w-32" },
            { key: "status", className: "min-w-32" },
          ]}
          loading={fetching}
          headerClassName="text-xs"
          cellClassName="text-xs"
          filterClassName="px-5 justify-between"
          paginationClassName="px-5"
          tableClassName="border-t border-b min-h-60 pb-6"
          initialPagination={{
            pageIndex: 0,
            pageSize: 20,
          }}
          hideSearch={false}
          hideExport={false}
          hidePagination={false}
          hideColumnManager={false}
        />
      </Card>
    </div>
  );
};

export default CoursesPage;
