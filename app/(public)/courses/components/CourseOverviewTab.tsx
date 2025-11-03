import { CourseItem } from "@/types/courses";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import FAQImage from "@/assets/images/FAQs.png";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Button } from "@/components/UI/button";
import { Badge } from "@/components/UI/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/UI/Collapsible";
import { Separator } from "@/components/UI/separator";
import { Suspense } from "react";
import CourseCurriculumSection from "./CourseCurriculumSection";
import CourseCurriculum from "./CourseCurriculum";

type Overview = {
  course: CourseItem;
};

const CourseOverviewTab: React.FC<Overview> = ({ course }) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Course Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="prose text-wrap [&_*]:break-all"
            dangerouslySetInnerHTML={{ __html: course.metadata.courseOverview }}
          />
        </CardContent>
      </Card>

      <div className="flex items-center gap-2">
        <Button variant="outline">
          <Link href={`/course?type=${course.type}`}>{course.type}</Link>
        </Button>
        <Button variant="outline">
          <Link href={`/course?category=${course.category?.name}`}>
            {course.category?.name}
          </Link>
        </Button>
      </div>

      <Card className="bg-primary/10 space-y-4">
        <CardHeader>
          <CardTitle> What You Will Learn In This Course</CardTitle>
          <CardDescription className="break-all">
            {course.metadata.whatWillYouLearn.text}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {course.metadata.whatWillYouLearn.items?.map((learnItem, index) => (
              <li key={index} className="flex items-start gap-2">
                <Badge size="lg" className="mr-3 size-7 rounded-full p-0">
                  <Check />
                </Badge>
                <span>{learnItem}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <CardAction>
            <Button asChild variant="link">
              <Link href="#">
                View All Learning Outcomes <ArrowRight className="-rotate-45" />
              </Link>
            </Button>
          </CardAction>
        </CardFooter>
      </Card>

      <Card className="space-y-4 border-none !shadow-none">
        <CardHeader>
          <CardTitle> Who can attend this course?</CardTitle>
          <CardDescription className="break-all">
            {course.metadata.whoCanAttend.text}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {course.metadata.whoCanAttend.items?.map((learnItem, index) => (
              <li key={index} className="flex items-start gap-2">
                <Badge
                  size="lg"
                  className="bg-secondary mr-3 size-7 rounded-full p-0"
                >
                  <ChevronRight />
                </Badge>
                <span>{learnItem}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Suspense>
        {course.modules?.length && course.modules?.length > 0 ? (
          <CourseCurriculum sections={course.modules} />
        ) : (
          <CourseCurriculumSection course={course} />
        )}
      </Suspense>
      <Card className="bg-primary/10 space-y-4">
        <CardHeader>
          <CardTitle>Knowledge & Skills You Will Learn</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-wrap items-center gap-3">
            {course.tags?.map((skill, index) => (
              <li key={index}>
                <Badge
                  size="lg"
                  variant="outline"
                  className="bg-background p-2 px-4"
                >
                  {skill}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="space-y-6">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-3xl">Frequently Asked Questions</CardTitle>
          <Image src={FAQImage} alt="FAQ" width={200} height={200} />
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {course.metadata.faqs?.map((faq, index) => (
              <li key={index}>
                <Collapsible>
                  <CollapsibleTrigger className="flex w-full justify-between">
                    <span className="text-lg font-semibold">
                      {faq.question}
                    </span>
                    <ChevronDown />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <p className="text-muted-foreground my-2 text-sm">
                      {faq.answer}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
                {course.metadata.faqs.length - 1 !== index && (
                  <Separator className="my-3" />
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseOverviewTab;
