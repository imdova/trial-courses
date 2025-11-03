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
import { useInstructorCoupons } from "@/hooks/useInstructorCoupons";
import { ConfirmDeleteDialog } from "@/components/UI/ConfirmDeleteDialog";
import { CouponData, EditCouponData } from "@/types/coupon";
import { generateCouponsColumns } from "@/components/columns/couponsColumns";
import { CouponDialogForm } from "./components/CouponDialogForm";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";

const CouponsPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { courses, getCourses } = useInstructorCourse();
  const [item, setItem] = useState<EditCouponData | null>(null);

  const {
    coupons,
    fetching,
    loading,
    updateExistingCoupon,
    getCoupons,
    deleteExistingCoupon,
    cached,
  } = useInstructorCoupons();

  const updateData = (rowIndex: number, columnId: string, value: unknown) => {
    const coupon = coupons[rowIndex];
    if (!coupon.id) return;
    updateExistingCoupon(coupon.id, {
      [columnId]: value,
    });
  };

  const actions = (couponId: string, type: "delete" | "edit" | "duplicate") => {
    const coupon = coupons.find((coupon) => coupon.id === couponId);
    if (!coupon) return;
    if (type === "delete") {
      setItem(coupon);
      setOpenDeleteDialog(true);
    }
    if (type === "duplicate") {
      const dub: EditCouponData = { ...coupon };
      dub.id = undefined;
      dub.name = `${coupon.name} (Copy)`;
      dub.code = "";
      setItem(dub);
      setOpenDialog(true);
    }
    if (type === "edit") {
      setItem(coupon);
      setOpenDialog(true);
    }
  };

  const columns = generateCouponsColumns(actions, loading, courses);

  useEffect(() => {
    getCoupons();
    getCourses();
  }, [getCoupons, getCourses]);

  const filters: {
    key: keyof CouponData | "placeholder";
    className?: string;
  }[] = [
    { key: "created_at", className: "min-w-32 md:min-w-48 md:max-w-48" },
    { key: "applicable_for", className: "min-w-32 md:max-w-48" },
    { key: "status", className: "w-32" },
    { key: "offer_type", className: "min-w-32 md:max-w-44" },
    { key: "amount", className: "min-w-32 md:max-w-44" },
    { key: "usage_limit", className: "min-w-32 md:max-w-44" },
    { key: "minimum_purchase", className: "min-w-48 md:max-w-48" },
  ];

  return (
    <div className="px-5">
      <CouponDialogForm
        open={openDialog}
        onOpenChange={(open) => {
          setOpenDialog(open);
          setItem(null);
        }}
        coupon={item}
      />

      <ConfirmDeleteDialog
        open={openDeleteDialog}
        requireInputConfirmation={false}
        onOpenChange={() => {
          setOpenDeleteDialog(false);
          setItem(null);
        }}
        resourceName="Coupon"
        resourceDisplayName={item?.name}
        onConfirm={() => {
          if (item?.id) deleteExistingCoupon(item?.id);
        }}
      />

      <CardHeader className="mb-5 px-0">
        <CardTitle className="text-lg md:text-2xl">
          My Coupons
          <span className="text-muted-foreground ml-1">
            ({coupons?.length})
          </span>
        </CardTitle>
        <CardDescription>
          View, manage, and track all your course discount codes in one place.
        </CardDescription>
        <CardAction>
          <Button variant="outline" onClick={() => setOpenDialog(true)}>
            <Plus />
            add coupon
          </Button>
        </CardAction>
      </CardHeader>
      <Card>
        <AdvancedDataTable
          columns={columns}
          data={coupons}
          updateData={updateData}
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
          hideColumnManager={false}
        />
      </Card>
    </div>
  );
};

export default CouponsPage;
