"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Button } from "@/components/UI/button";
import { CourseFormType, CourseItem } from "@/types/courses";
import { Video } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/UI/dialog";
import { Separator } from "@/components/UI/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { Input } from "@/components/UI/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/UI/select";
import { useCoursesCategories } from "@/hooks/useCoursesCategories";
import ImageUploadInput from "@/components/UI/ImageUploadInput";
import { useEffect } from "react";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import {
  convertCourseFormToItem,
  mapPricings,
} from "@/app/(auth)/lms/course/util/transformToCourseForm";
import { useControllableState } from "@/hooks/useControllableState";
import {
  getDiscountAmount,
  getSalePrice,
  getYouTubeVideoId,
} from "@/util/forms";
import { ScrollArea } from "@/components/UI/scroll-area";
import {
  QuickEditFormData,
  quickEditSchema,
} from "@/app/(auth)/lms/course/util/course.schema";
import Combobox from "@/components/UI/Combobox";
import { useLocationData } from "@/hooks/useLocationData";
import { formatMoney } from "@/util/general";

export const QuickEditCourseDialogForm = ({
  open: isOpen,
  onOpenChange,
  course,
  children,
}: {
  open?: boolean;
  onOpenChange?: (next: boolean | ((prev: boolean) => boolean)) => void;
  course: CourseItem;
  children?: React.ReactNode;
}) => {
  const { countries } = useLocationData();
  const [open, setOpen] = useControllableState({
    value: isOpen,
    onChange: onOpenChange,
    defaultValue: false,
  });
  const defaultValues = {
    name: course?.name || "",
    category: course?.category?.id || "",
    subcategory: course?.subCategory?.id || "",
    level: course?.level,
    tags: course?.tags || [],
    courseImage: course?.courseImage || "",
    isCourseFree: course.isCourseFree || false,
    previewVideo: course?.previewVideo || "",
    pricing: course.pricings || [],
  } as QuickEditFormData;

  const { quickUpdateExistingCourse } = useInstructorCourse();
  const form = useForm<QuickEditFormData>({
    resolver: zodResolver(quickEditSchema),
    mode: "onSubmit",
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      form.reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const category = form.watch("category");
  const { categories, subCategories } = useCoursesCategories(category);

  async function onSubmit(values: QuickEditFormData) {
    const pricings = mapPricings(values.pricing);
    const updatedCourse: Partial<CourseFormType> = {
      name: values.name,
      category: values.category,
      subcategory: values.subcategory,
      level: values.level,
      tags: values.tags,
      courseImage: values.courseImage,
      previewVideo: values.previewVideo,
      pricings: pricings,
    };
    const template = convertCourseFormToItem(
      updatedCourse,
      categories,
      subCategories,
    );
    quickUpdateExistingCourse(course.id, updatedCourse, template);
    setOpen(false);
    form.reset();
  }

  const onOpenChangeHandler = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    setOpen(open);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="gap-0 p-0 py-5 sm:max-w-xl">
        <DialogHeader className="px-5">
          <DialogTitle>Quick Edit Course</DialogTitle>
          <DialogDescription>
            Here you can find the main information about your course you can
            edit .
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-4" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
            noValidate
          >
            <ScrollArea className="max-h-[60vh]">
              <div className="grid gap-4 p-5">
                <FormField
                  control={form.control}
                  name="name"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Name</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter the name of your course"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full items-start gap-3">
                  <FormField
                    control={form.control}
                    name="category"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.trigger("category");
                          }}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select course category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subcategory"
                    defaultValue=""
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Subcategory</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.trigger("subcategory");
                          }}
                          value={field.value}
                          disabled={!subCategories.length}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select course subcategory" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="pricing.0"
                  render={() => {
                    const item = form.getValues("pricing.0") || {};
                    return (
                      <div className="mt-3 space-y-4 p-1">
                        <div className="flex items-start gap-2">
                          <FormField
                            control={form.control}
                            name={`pricing.0.currencyCode`}
                            render={({ field }) => (
                              <FormItem className="w-full max-w-24">
                                <FormLabel>Currency</FormLabel>
                                <FormControl className="w-full">
                                  <Combobox
                                    placeholder="Currency"
                                    options={countries.map((country) => ({
                                      value: country.currency,
                                      label: (
                                        <p>
                                          {country.currency}{" "}
                                          <span className="text-muted-foreground">
                                            ( {country.name} )
                                          </span>
                                        </p>
                                      ),
                                      accessory: country.currency,
                                    }))}
                                    {...field}
                                    name="Currency"
                                    className="w-24"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`pricing.0.regularPrice`}
                            disabled={form.watch("isCourseFree")}
                            defaultValue={0}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <div className="space-y-2">
                                  <FormLabel>Regular Price</FormLabel>
                                  <div className="relative">
                                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                      <span>{item.currencyCode}</span>
                                    </div>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        className="peer ps-12"
                                        placeholder="00.00"
                                        {...field}
                                        onChange={(e) => {
                                          const value = +e.target.value;
                                          form.setValue(
                                            `pricing.0.salePrice`,
                                            getSalePrice(
                                              value,
                                              item.discountAmount || 0,
                                            ),
                                          );
                                          field.onChange(value);
                                        }}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`pricing.0.salePrice`}
                            defaultValue={0}
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <div className="w-full space-y-2">
                                  <FormLabel>Sale Price</FormLabel>
                                  <div className="relative">
                                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                      <span>{item.currencyCode}</span>
                                    </div>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step="0.01"
                                        className="peer ps-12"
                                        placeholder="00.00"
                                        {...field}
                                        onChange={(e) => {
                                          const value = +e.target.value;
                                          form.setValue(
                                            `pricing.0.discountAmount`,
                                            getDiscountAmount(
                                              item.regularPrice || 0,
                                              value,
                                            ),
                                          );
                                          field.onChange(value);
                                        }}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`pricing.0.discountAmount`}
                            defaultValue={0}
                            render={({ field }) => (
                              <FormItem>
                                <div className="w-full min-w-28 space-y-2">
                                  <FormLabel>Discount</FormLabel>
                                  <div className="relative">
                                    <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex max-w-12 items-center justify-center ps-3 peer-disabled:opacity-50">
                                      <span>%</span>
                                    </div>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        step="1"
                                        className="peer ps-8"
                                        placeholder="0"
                                        {...field}
                                        onChange={(e) => {
                                          const value = +e.target.value;
                                          form.setValue(
                                            `pricing.0.salePrice`,
                                            getSalePrice(
                                              item.regularPrice || 0,
                                              value,
                                            ),
                                          );
                                          field.onChange(value);
                                        }}
                                      />
                                    </FormControl>
                                  </div>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormDescription className="col-span-3 text-xs">
                          {item?.discountAmount?.toFixed(2) ?? 0}% Discount
                          Applied {": "}
                          Regular {": "}
                          {formatMoney(
                            item?.regularPrice || 0,
                            item?.currencyCode,
                          )}
                          {" → Sale: "}
                          {formatMoney(
                            item?.salePrice || 0,
                            item?.currencyCode,
                          )}
                        </FormDescription>
                      </div>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="courseImage"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Course Image</FormLabel>
                      <FormControl>
                        <ImageUploadInput autoUpload {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previewVideo"
                  defaultValue=""
                  render={({ field }) => (
                    <FormItem>
                      <div className="w-full space-y-2">
                        <FormLabel>Preview Video</FormLabel>
                        <div className="flex flex-1 rounded-md shadow-xs">
                          <Avatar className="border-input aspect-video h-9 w-auto rounded-md rounded-r-none border border-r-0">
                            <AvatarImage
                              src={
                                getYouTubeVideoId(field.value)
                                  ? `https://i.ytimg.com/vi/${getYouTubeVideoId(field.value)}/maxresdefault.jpg`
                                  : undefined
                              }
                              alt={"Preview Video"}
                            />
                            <AvatarFallback>
                              <Video />
                            </AvatarFallback>
                          </Avatar>
                          <Input
                            placeholder="Enter Video url"
                            className="-me-px w-full rounded-l-none shadow-none focus-visible:z-1"
                            {...field}
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>

            <Separator className="mb-4" />
            <DialogFooter className="px-5">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={!form.formState.isDirty}>
                Update Course Information
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
