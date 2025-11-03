import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "@/components/UI/form";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { useState } from "react";
import { ImageIcon, Plus, Search, Trash2Icon } from "lucide-react";
import { Button } from "@/components/UI/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogPortal,
  DialogTitle,
} from "@/components/UI/dialog";
import { Separator } from "@/components/UI/separator";
import { CourseItem } from "@/types/courses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { ScrollArea } from "@/components/UI/scroll-area";
import { Input } from "@/components/UI/input";
import { formatMoney } from "@/util/general";
import { CouponFormData } from "@/types/coupon";
import { Checkbox } from "@/components/UI/Check-Box";
import { cn } from "@/util";
import { Spinner } from "@/components/UI/spinner";

const CouponCourseSection: React.FC<{
  open: boolean;
  onOpenChange: (next: boolean) => void;
}> = ({ open, onOpenChange }) => {
  const form = useFormContext<CouponFormData>();
  const { courses, fetching } = useInstructorCourse();
  const activeCourses = courses.filter(
    (course) => course.isActive && course.status === "published",
  );

  return (
    <FormField
      control={form.control}
      name="course_ids"
      render={({ field }) => (
        <FormItem className="w-full">
          <SelectCourseDialog
            open={open}
            onOpenChange={onOpenChange}
            courses={activeCourses}
            selectedCourses={field.value || []}
            onChange={field.onChange}
            fetching={fetching}
          />
          <CourseList
            courses={activeCourses}
            onOpenChange={onOpenChange}
            {...field}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CouponCourseSection;

const CourseList: React.FC<{
  onOpenChange: (open: boolean) => void;
  courses: CourseItem[];
  value?: string[];
  onChange: (value: string[]) => void;
}> = ({ onOpenChange, courses, value, onChange }) => {
  const selectedCourses = courses.filter((course) =>
    value?.includes(course.id),
  );
  const removeItem = (courseId: string) => {
    const newSelectedCourses = value?.filter((id) => id !== courseId) || [];
    onChange(newSelectedCourses);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs font-medium">
          {value?.length} courses added
        </p>
        <Button onClick={() => onOpenChange(true)} variant="outline" size="sm">
          <Plus /> add course
        </Button>
      </div>
      <Separator className="mt-4" />

      {selectedCourses.map((course) => {
        const firstPrice = course.pricings?.[0] || {};
        const price = course.isCourseFree
          ? "Free"
          : (firstPrice.salePrice as number);
        const hasSale = Number(firstPrice?.discountAmount) > 0;
        return (
          <div key={course.id}>
            <div className="flex items-center justify-between gap-4 py-3 text-xs">
              <div className="flex flex-1 items-center gap-2">
                <Avatar className="aspect-video size-auto h-7 rounded">
                  <AvatarImage src={course.courseImage} alt={course.name} />
                  <AvatarFallback>
                    <ImageIcon />
                  </AvatarFallback>
                </Avatar>
                <p className="line-clamp-2 text-wrap break-words">
                  {course.name}
                </p>
              </div>
              <div className="flex items-center gap-4">
                {hasSale ? (
                  <div className="flex gap-1">
                    <span className="text-foreground">
                      {typeof price === "number"
                        ? formatMoney(price, firstPrice.currencyCode)
                        : price}
                    </span>
                    <span className="text-muted-foreground decoration-destructive hidden text-xs line-through md:block">
                      {formatMoney(
                        firstPrice.regularPrice || 0,
                        firstPrice.currencyCode,
                      )}
                    </span>
                  </div>
                ) : (
                  <p>{price + " " + firstPrice.currencyCode}</p>
                )}
                <Button
                  onClick={() => removeItem(course.id)}
                  size="iconSm"
                  variant="destructiveOutline"
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
            <Separator />
          </div>
        );
      })}
    </div>
  );
};

const SelectCourseDialog = ({
  open,
  onOpenChange,
  courses,
  selectedCourses = [],
  onChange,
  fetching,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: CourseItem[];
  selectedCourses: string[];
  onChange: (value: string[]) => void;
  fetching: boolean;
}) => {
  const [searchValue, setSearchValue] = useState("");
  const filterCourses = (courses: CourseItem[], searchValue: string) => {
    if (!searchValue) {
      return courses;
    }
    return courses.filter((course) =>
      course.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  };

  const onSelectCourse = (courseId: string) => {
    const newSelectedCourses = selectedCourses.includes(courseId)
      ? selectedCourses.filter((id) => id !== courseId)
      : [...selectedCourses, courseId];
    onChange(newSelectedCourses);
  };

  const filteredCourses = filterCourses(courses, searchValue);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogContent className="gap-0 p-0 py-5 sm:max-w-3xl">
          <DialogHeader className="px-5">
            <DialogTitle>Add Course</DialogTitle>
            <DialogDescription>Select Course you want to add</DialogDescription>
          </DialogHeader>
          <Separator className="mt-4" />
          <div className="p-4">
            <div className="relative">
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <Search className="size-4" />
                <span className="sr-only">search</span>
              </div>
              <Input
                type="text"
                placeholder="Search Course..."
                className="peer pl-9"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <Separator />
          <ScrollArea className="h-[50vh]">
            {filteredCourses.length > 0 ? (
              <div>
                <div className="bg-muted flex justify-between px-5 py-3 text-sm font-medium">
                  <p>Name</p>
                  <p>Price</p>
                </div>
                <Separator />

                {filteredCourses.map((course) => {
                  const firstPrice = course.pricings?.[0] || {};
                  const price = course.isCourseFree
                    ? "Free"
                    : (firstPrice.salePrice as number);
                  const hasSale = Number(firstPrice?.discountAmount) > 0;
                  const isSelected = selectedCourses.includes(course.id);

                  return (
                    <div key={course.id}>
                      <div
                        onClick={() => onSelectCourse(course.id)}
                        className={cn(
                          "hover:bg-accent flex cursor-pointer items-center justify-between px-5 py-3 text-sm",
                          isSelected && "bg-primary/15",
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => onSelectCourse(course.id)}
                          />
                          <Avatar className="aspect-video size-auto h-9 rounded">
                            <AvatarImage
                              src={course.courseImage}
                              alt={course.name}
                            />
                            <AvatarFallback>
                              <ImageIcon />
                            </AvatarFallback>
                          </Avatar>
                          <p className="line-clamp-2 max-w-4/5 text-wrap break-words">
                            {course.name}
                          </p>
                        </div>
                        {hasSale ? (
                          <div className="flex gap-1">
                            <span className="text-foreground">
                              {firstPrice.currencyCode} {price}
                            </span>
                            <span className="text-muted-foreground text-xs line-through">
                              {firstPrice.currencyCode}
                              {firstPrice.regularPrice}
                            </span>
                          </div>
                        ) : (
                          <p>{price + " " + firstPrice.currencyCode}</p>
                        )}
                      </div>
                      <Separator />
                    </div>
                  );
                })}
              </div>
            ) : fetching ? (
              <div className="flex items-center justify-center p-6">
                <Spinner className="text-primary size-6" />
                <h6 className="ml-2">Loading...</h6>
              </div>
            ) : (
              <div className="flex items-center justify-center p-6">
                <p className="text-muted-foreground text-sm font-medium">
                  No Courses Found
                </p>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
