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
import { ArrowRight, BookCopy, GraduationCap, Puzzle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BundleFormData } from "../utils/bundle.schema";

const BundlePreviewSideBar: React.FC<{
  bundle: BundleFormData;
  courses: CourseItem[];
}> = ({ bundle, courses }) => {
  const firstPrice = bundle.pricings?.[0];
  const price = bundle.is_free ? "Free" : (firstPrice.sale_price as number);
  const hasSale = Number(firstPrice.discount_amount) > 0;

  const tags = courses.map((course) => course.tags);
  const uniqueTags = Array.from(new Set(tags.flat()));

  const totalLectures = courses.reduce((acc, course) => {
    return acc + (course.lecturesCount || 0);
  }, 0);
  const totalQuizzes = courses.reduce((acc, course) => {
    return acc + (course.quizzesCount || 0);
  }, 0);
  const totalStudents = courses.reduce((acc, course) => {
    return acc + (course.studentCount || 0);
  }, 0);

  const features = [
    {
      icon: <BookCopy size={16} />,
      label: "Lessons",
      value: totalLectures,
    },
    {
      icon: <Puzzle size={16} />,
      label: "Quizzes",
      value: totalQuizzes,
    },
    {
      icon: <GraduationCap size={16} />,
      label: "Students",
      value: totalStudents,
    },
  ];
  return (
    <div className="space-y-4 lg:w-72">
      {/* Payment checkout content  */}
      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Bundle Features</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="divide-border text-muted-foreground divide-y text-sm">
            <li className="py-2">
              {hasSale ? (
                <div className="relative flex items-center justify-between">
                  <div className="flex">
                    <span className="text-foreground text-lg font-extrabold">
                      {firstPrice.currency_code} {price}
                    </span>
                    <span className="text-muted-foreground line-through">
                      {firstPrice.currency_code} {firstPrice.regular_price}
                    </span>
                  </div>
                  <span className="ml-auto rounded-md bg-green-100 px-2 py-1 text-sm font-medium text-green-800">
                    {firstPrice.discount_amount}% OFF
                  </span>
                </div>
              ) : (
                price + " " + firstPrice.currency_code
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
            Purchases Bundle{" "}
            <ArrowRight className="bg-primary-foreground text-primary size-5 -rotate-45 rounded-full p-1" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="space-y-4">
        <CardHeader>
          <CardTitle>Related Search</CardTitle>
        </CardHeader>
        <CardFooter className="flex-wrap gap-2">
          {uniqueTags.map((tag, index) => {
            return (
              <Button variant="outline" size="xs" asChild key={index}>
                <Link href={`/courses?tags=${tag}`}>{tag}</Link>
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

export default BundlePreviewSideBar;
