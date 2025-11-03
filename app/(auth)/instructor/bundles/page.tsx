"use client";
import { Card, CardAction, CardHeader, CardTitle } from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { useEffect, useState } from "react";
import { CourseBundle } from "@/types/courses";
import { useInstructorBundles } from "@/hooks/useInstructorBundles";
import { ConfirmDeleteDialog } from "@/components/UI/ConfirmDeleteDialog";
import { generateBundlesColumns } from "@/components/columns/bundlesColumns";

const BundlesPage = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setToDelete] = useState<CourseBundle | null>(null);

  const {
    bundles,
    fetching,
    loading,
    updateExistingBundle,
    getBundles,
    deleteExistingBundle,
    cached,
  } = useInstructorBundles();

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    const bundle = bundles[rowIndex];
    if (!bundle) return;
    updateExistingBundle(bundle.id, {
      [columnId]: value,
    });
  };

  const actions = (rowIndex: number, type: "delete" | "edit") => {
    const bundle = bundles[rowIndex];
    if (!bundle) return;
    if (type === "delete") {
      setToDelete(bundle);
      setOpenDeleteDialog(true);
    }
  };

  const columns = generateBundlesColumns(actions, loading);

  useEffect(() => {
    getBundles();
  }, [getBundles]);

  return (
    <div className="px-5">
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onOpenChange={() => {
          setOpenDeleteDialog(false);
          setToDelete(null);
        }}
        resourceName="Bundle"
        resourceDisplayName={deleteItem?.title}
        onConfirm={() => {
          if (deleteItem?.id) deleteExistingBundle(deleteItem?.id);
        }}
      />

      <CardHeader className="mb-5 px-0">
        <CardTitle className="text-2xl">
          My Bundles
          <span className="text-muted-foreground ml-1">
            ({bundles?.length})
          </span>
        </CardTitle>
        <CardAction>
          <Button asChild variant="outline">
            <Link href="/lms/bundle/add">
              <Plus />
              Create New bundle
            </Link>
          </Button>
        </CardAction>
      </CardHeader>
      <Card>
        <AdvancedDataTable
          columns={columns}
          data={bundles}
          updateData={updateData}
          defaultSorting={{
            id: "created_at",
            desc: true,
          }}
          filters={[
            { key: "created_at", className: "w-full min-w-48 max-w-48" },
            { key: "placeholder", className: "flex-1" },
            { key: "sale_price", className: "min-w-32 max-w-44" },
            { key: "status", className: "min-w-32 max-w-44" },
          ]}
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
          hideColumnManager={false}
        />
      </Card>
    </div>
  );
};

export default BundlesPage;
