"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Plus } from "lucide-react";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { useEffect, useState } from "react";
import { ConfirmDeleteDialog } from "@/components/UI/ConfirmDeleteDialog";
import { useAcademyInstructors } from "@/hooks/useAcademyInstructors";
import { AcademyInstructor } from "@/types/academy";
import { generateAcademyInstructorColumns } from "@/components/columns/AcademyInstructorsColumnss";
import { InstructorDialogForm } from "@/components/shared/instructorDialog";

const CoursesPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const {
    instructors,
    fetching,
    cached,
    getAcademyInstructors,
    deleteAcademyInstructorHandler,
  } = useAcademyInstructors();
  const [item, setItem] = useState<AcademyInstructor | null>(null);

  const actions = (instructorId: string, type: "delete" | "edit") => {
    const instructor = instructors.find(
      (instructor) => instructor.id === instructorId,
    );
    if (!instructor) return;
    if (type === "delete") {
      setItem(instructor);
      setOpenDeleteDialog(true);
    }
    if (type === "edit") {
      setItem(instructor);
      setOpenDialog(true);
    }
  };

  const columns = generateAcademyInstructorColumns(actions);

  useEffect(() => {
    getAcademyInstructors();
  }, [getAcademyInstructors]);

  const filters: {
    key: keyof AcademyInstructor | "placeholder";
    className?: string;
  }[] = [{ key: "created_at", className: "min-w-32 md:min-w-48 md:max-w-48" }];

  return (
    <div className="px-5">
      <InstructorDialogForm
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          setItem(null);
        }}
        item={item}
      />

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        requireInputConfirmation={false}
        onOpenChange={() => {
          setOpenDeleteDialog(false);
          setItem(null);
        }}
        resourceName="Academy Instructor"
        resourceDisplayName={item?.name}
        onConfirm={() => {
          return deleteAcademyInstructorHandler(item!.id);
        }}
      />

      <CardHeader className="mb-5 px-0">
        <CardTitle className="text-lg md:text-2xl">
          Organization Instructors
          <span className="text-muted-foreground ml-1">
            ({instructors?.length})
          </span>
        </CardTitle>
        <CardDescription>
          View, manage, and track all Organization Instructors in one place.
        </CardDescription>
        <CardAction>
          <Button variant="outline" onClick={() => setOpenDialog(true)}>
            <Plus />
            add instructor
          </Button>
        </CardAction>
      </CardHeader>
      <Card>
        <AdvancedDataTable
          columns={columns}
          data={instructors}
          defaultSorting={{
            id: "created_at",
            desc: true,
          }}
          filters={filters}
          loading={fetching || cached === null}
          headerClassName="text-xs"
          cellClassName="text-xs"
          filterClassName="px-5 justify-between"
          paginationClassName="px-5"
          tableClassName="border-t border-b min-h-60 pb-6"
          initialPagination={{
            pageIndex: 0,
            pageSize: 10,
          }}
          hideSearch={false}
          hideExport={false}
          hidePagination={false}
        />
      </Card>
    </div>
  );
};

export default CoursesPage;
