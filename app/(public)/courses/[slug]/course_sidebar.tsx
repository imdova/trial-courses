"use client";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import Payment from "@/assets/images/payment.png";
import PlansImage from "@/assets/images/planss.png";
import { CourseItem } from "@/types/courses";
import {
  ArrowRight,
  BookCopy,
  ChartNoAxesColumnIncreasing,
  GraduationCap,
  Puzzle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseSidebar: React.FC<{ course: CourseItem }> = ({ course }) => {
  const features = courseFeatures(course);
  const firstPrice = course.pricings?.[0] || {};
  const price = course.isCourseFree
    ? "Free"
    : (firstPrice?.salePrice as number);
  const hasSale = Number(firstPrice?.discountAmount) > 0;

  return (
    <div className="space-y-4 lg:w-72">
      {/* Payment checkout content  */}
      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Course Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="divide-border text-muted-foreground divide-y text-sm">
            <li className="py-2">
              {hasSale ? (
                <div className="relative flex items-center justify-between">
                  <div className="flex">
                    <span className="text-foreground text-lg font-extrabold">
                      {firstPrice.currencyCode} {price}
                    </span>
                    <span className="text-muted-foreground line-through">
                      {firstPrice.currencyCode} {firstPrice.regularPrice}
                    </span>
                  </div>
                  <span className="ml-auto rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                    {firstPrice.discountAmount}% OFF
                  </span>
                </div>
              ) : (
                price + " " + firstPrice.currencyCode
              )}
            </li>
            {features.map((item, i) => (
              <li key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-1.5">
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </div>
                <span className="text-muted-foreground">{item.value}</span>
              </li>
            ))}
          </ul>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Secure Payment</h2>
            <Image
              className="w-3/4 rounded-xl object-cover"
              src={Payment}
              alt="course image"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full">
            Enroll in Course{" "}
            <ArrowRight className="bg-primary-foreground text-primary size-5 -rotate-45 rounded-full p-1" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Related Search</CardTitle>
        </CardHeader>
        <CardFooter className="flex-wrap gap-3">
          {course.tags?.map((tag, index) => {
            return (
              <Button variant="outline" asChild key={index}>
                <Link href="#">{tag}</Link>
              </Button>
            );
          })}
        </CardFooter>
      </Card>

      <Card className="p-0">
        <Image
          className="w-full"
          src={PlansImage}
          alt="Plan image"
          width={400}
          height={600}
        />
      </Card>
    </div>
  );
};

export default CourseSidebar;

const courseFeatures = (course: CourseItem) => [
  {
    icon: <ChartNoAxesColumnIncreasing size={16} />,
    label: "Level",
    value: course.level,
  },
  {
    icon: <BookCopy size={16} />,
    label: "Lessons",
    value: course.lecturesCount,
  },
  {
    icon: <Puzzle size={16} />,
    label: "Quizzes",
    value: course.quizzesCount,
  },
  {
    icon: <GraduationCap size={16} />,
    label: "Students",
    value: course.studentCount,
  },
];
