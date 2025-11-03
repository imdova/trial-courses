"use client";
import { Button } from "@/components/UI/button";
import { Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";

import { CouponFormData, couponSchema, EditCouponData } from "@/types/coupon";
import { useInstructorCoupons } from "@/hooks/useInstructorCoupons";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/UI/sheet";
import DateSelector from "@/components/UI/DateSelector";
import { getDisabledDates } from "@/util/forms";
import CouponCourseSection from "./coupon-courses-section";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/UI/scroll-area";

const getDefaultValues = (coupon?: EditCouponData | null) => ({
  name: coupon?.name || "",
  code: coupon?.code || "",
  offer_type: coupon?.offer_type || "PERCENTAGE",
  amount: Number(coupon?.amount) || 0,
  start_date: coupon?.start_date ? new Date(coupon?.start_date) : undefined,
  end_date: coupon?.end_date ? new Date(coupon?.end_date) : undefined,
  status: coupon?.status || "ACTIVE",
  usage_limit: coupon?.usage_limit || 0,
  minimum_purchase: Number(coupon?.minimum_purchase) || 0,
  course_ids: coupon?.course_ids || [],
  category_id: coupon?.category_id || "",
  subcategory_id: coupon?.subcategory_id || "",
  applicable_for: coupon?.applicable_for || undefined,
});

export const CouponDialogForm = ({
  open,
  onOpenChange,
  coupon,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  coupon?: EditCouponData | null;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { updateExistingCoupon, createNewCoupon, loading } =
    useInstructorCoupons();

  const isEdit = Boolean(coupon?.id);

  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    mode: "onSubmit",
    defaultValues: getDefaultValues(coupon),
  });

  useEffect(() => {
    form.reset(getDefaultValues(coupon));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function onSubmit(values: CouponFormData) {
    if (coupon?.id) {
      await updateExistingCoupon(coupon?.id, values);
    } else {
      await createNewCoupon(values);
    }
    onOpenChange(false);
    form.reset();
  }

  const onOpenChangeHandler = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  const applicable_for = form.watch("applicable_for");
  return (
    <Sheet open={open} onOpenChange={onOpenChangeHandler}>
      <SheetContent className="min-w-sm sm:max-w-lg">
        <ScrollArea className="h-full">
          <SheetHeader className="bg-background sticky top-0 z-[2] border-b">
            <SheetTitle>{isEdit ? "Edit Coupon" : "Create Coupon"}</SheetTitle>
            <SheetDescription>
              {isEdit
                ? "Here you can find the main information about your coupon you can edit."
                : "Here you can find the main information about your coupon you can create."}
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
              noValidate
            >
              <div className="grid gap-4 p-5">
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g. Summer Sale 2025"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="code"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Coupon Code</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="e.g. SUMMER25"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 items-start gap-4 ">
                  <FormField
                    control={form.control}
                    name="offer_type"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Offer Type</FormLabel>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select offer type" />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            <SelectItem value="PERCENTAGE">
                              Percentage
                            </SelectItem>
                            <SelectItem value="FLAT">Flat</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <div className="relative">
                          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                            <span>
                              {form.watch("offer_type") === "PERCENTAGE"
                                ? "%"
                                : "$"}
                            </span>
                          </div>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder={"e.g. 20"}
                              className="peer pl-9"
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usage_limit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Usage Limit
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-sm">
                                The maximum number of times this coupon can be
                                used across all users. Leave empty for unlimited
                                use.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 50 (empty for unlimited)"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="minimum_purchase"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Minimum Purchase
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="text-muted-foreground size-4" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-sm">
                                The minimum total amount a user must spend to
                                use this coupon. Leave empty if not required.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 100 (empty if not required)"
                            {...field}
                            onChange={(e) => field.onChange(+e.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="start_date"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-xs">
                        <FormLabel>Start Date</FormLabel>
                        <DateSelector
                          withFormControl
                          value={
                            field.value
                              ? new Date(field.value).toLocaleDateString()
                              : undefined
                          }
                          placeholder="Start data"
                          mode="single"
                          disabled={getDisabledDates()}
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(value) =>
                            field.onChange(value ? new Date(value) : undefined)
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="end_date"
                    render={({ field }) => (
                      <FormItem className="w-full max-w-xs">
                        <FormLabel>End Date</FormLabel>

                        <DateSelector
                          withFormControl
                          value={
                            field.value
                              ? new Date(field.value).toLocaleDateString()
                              : undefined
                          }
                          placeholder="End data"
                          mode="single"
                          disabled={getDisabledDates(form.watch("start_date"))}
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(value) =>
                            field.onChange(value ? new Date(value) : undefined)
                          }
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="applicable_for"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Apply Coupon To</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          setDialogOpen(
                            value === "MULTIPLE_COURSES" &&
                              form.getValues("course_ids")?.length === 0,
                          );
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select offer type" />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          <SelectItem value="MULTIPLE_COURSES">
                            Specific Courses
                          </SelectItem>
                          <SelectItem value="ALL_INSTRUCTOR_COURSES">
                            All Courses
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {applicable_for === "MULTIPLE_COURSES" && (
                  <CouponCourseSection
                    open={dialogOpen}
                    onOpenChange={setDialogOpen}
                  />
                )}
              </div>

              <SheetFooter className="bg-background sticky bottom-0 z-[2] flex-row justify-end border-t px-5">
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit" disabled={loading}>
                  {loading
                    ? "Loading..."
                    : isEdit
                      ? "Update Coupon"
                      : "Create Coupon"}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
