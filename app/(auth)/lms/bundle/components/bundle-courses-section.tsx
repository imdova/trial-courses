import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/UI/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/UI/form";
import { BundleFormData } from "../utils/bundle.schema";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { useEffect, useState } from "react";
import {
  BookOpenText,
  DollarSign,
  ImageIcon,
  Plus,
  Search,
  XIcon,
} from "lucide-react";
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
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/UI/empty";
import { Input } from "@/components/UI/input";
import { formatMoney } from "@/util/general";
import { Checkbox } from "@/components/UI/Check-Box";
import { cn } from "@/util";
import { getSalePrice } from "@/util/forms";

export function getTotalRegularPrice(courses: CourseItem[]): number {
  return courses.reduce((total, course) => {
    const firstPricing = course.pricings?.[0];
    const regularPrice = course.isCourseFree
      ? 0
      : firstPricing?.regularPrice || 0;
    return total + regularPrice;
  }, 0);
}

const BundleCourseSection: React.FC = () => {
  const [open, setOpen] = useState(false);
  const form = useFormContext<BundleFormData>();
  const { courses, getCourses } = useInstructorCourse();

  useEffect(() => {
    getCourses();
  }, [getCourses]);
  return (
    <Card className="space-y-6">
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="courseIds"
          render={({ field }) => {
            const onChange = (e: string[]) => {
              field.onChange(e);
              const discountAmount =
                form.getValues("pricings.0.discount_amount") || 0;
              const totalRegularPrice = getTotalRegularPrice(
                courses.filter((course) => e.includes(course.id)),
              );
              const salePrice = getSalePrice(totalRegularPrice, discountAmount);
              form.setValue("pricings.0.regular_price", totalRegularPrice);
              form.setValue("pricings.0.sale_price", salePrice);
            };

            return (
              <FormItem className="w-full">
                <FormLabel>Courses</FormLabel>
                <SelectCourseDialog
                  open={open}
                  onOpenChange={setOpen}
                  courses={courses}
                  selectedCourses={field.value}
                  onChange={onChange}
                />
                {field.value.length === 0 ? (
                  <CoursesEmptyCard
                    courses={courses}
                    onOpenChange={setOpen}
                    {...field}
                    onChange={onChange}
                  />
                ) : (
                  <CourseList
                    courses={courses}
                    onOpenChange={setOpen}
                    {...field}
                    onChange={onChange}
                  />
                )}
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </CardContent>
    </Card>
  );
};

export default BundleCourseSection;

const CoursesEmptyCard: React.FC<{
  courses: CourseItem[];
  value: string[];
  onChange: (value: string[]) => void;
  onOpenChange: (open: boolean) => void;
}> = ({ onOpenChange }) => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BookOpenText />
        </EmptyMedia>
        <EmptyTitle>No Courses Added Yet</EmptyTitle>
        <EmptyDescription>
          You haven&apos;t added any courses yet. Get started by adding course.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <div className="flex gap-2">
          <Button onClick={() => onOpenChange(true)} variant="secondary">
            <Plus /> add course
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  );
};

const CourseList: React.FC<{
  onOpenChange: (open: boolean) => void;
  courses: CourseItem[];
  value: string[];
  onChange: (value: string[]) => void;
}> = ({ onOpenChange, courses, value, onChange }) => {
  const selectedCourses = courses.filter((course) => value.includes(course.id));
  const removeItem = (courseId: string) => {
    const newSelectedCourses = value.filter((id) => id !== courseId);
    onChange(newSelectedCourses);
  };

  const totalRegularPrice = selectedCourses.reduce((acc, course) => {
    const firstPrice = course.pricings?.[0] || {};
    const price = course.isCourseFree ? 0 : (firstPrice.regularPrice as number);
    return acc + price;
  }, 0);
  const totalSalePrice = selectedCourses.reduce((acc, course) => {
    const firstPrice = course.pricings?.[0] || {};
    const price = course.isCourseFree ? 0 : (firstPrice.salePrice as number);
    return acc + price;
  }, 0);

  const currency = selectedCourses[0]?.pricings?.[0]?.currencyCode;

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{value.length} courses added</p>
        <Button onClick={() => onOpenChange(true)} variant="secondary">
          <Plus /> add course
        </Button>
      </div>
      <Separator className="mt-4" />

      {selectedCourses.map((course, index) => {
        const firstPrice = course.pricings?.[0] || {};
        const price = course.isCourseFree
          ? "Free"
          : (firstPrice.salePrice as number);
        const hasSale = Number(firstPrice?.discountAmount) > 0;
        return (
          <div key={course.id}>
            <div className="flex items-center justify-between gap-4 py-3 text-sm">
              <div className="flex flex-1 items-center gap-2">
                <span className="min-w-4">{index + 1}</span>
                <Avatar className="aspect-video size-auto h-9 rounded">
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
                    <span className="text-muted-foreground text-xs line-through">
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
                  variant="outline"
                >
                  <XIcon />
                </Button>
              </div>
            </div>
            <Separator />
          </div>
        );
      })}

      <div className="mt-4 space-y-4">
        <p className="text-sm font-medium">Selection Overview</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p>
            <DollarSign className="text-muted-foreground mr-2 inline size-4" />
            <span>
              <strong>{totalRegularPrice + " " + currency}</strong> total price
            </span>
          </p>
          <p>
            <DollarSign className="text-muted-foreground mr-2 inline size-4" />
            <span>
              <strong>{totalSalePrice + " " + currency}</strong> total sale
              price
            </span>
          </p>
          {/* <div>
            <Clock className="text-muted-foreground mr-2 inline size-4" />
            <span>
              <strong>00:00</strong> minutes total duration
            </span>
          </div> */}
          {/* <div>
            <FileQuestionIcon className="text-muted-foreground mr-2 inline size-4" />
            <span>
              <strong>{totalQuizzes}</strong> total quizzes
            </span>
          </div>
          <div>
            <File className="text-muted-foreground mr-2 inline size-4" />
            <span>
              <strong>{totalLectures}</strong> total lectures
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

const SelectCourseDialog = ({
  open,
  onOpenChange,
  courses,
  selectedCourses = [],
  onChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  courses: CourseItem[];
  selectedCourses: string[];
  onChange: (value: string[]) => void;
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
