import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { ImageIcon } from "lucide-react";
import { Separator } from "@/components/UI/separator";
import Link from "next/link";
import { BundleFormData } from "../utils/bundle.schema";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import BundlePreviewSideBar from "./bundle-preview-sidebar";

const BundlePreview: React.FC<{ bundle: BundleFormData }> = ({ bundle }) => {
  const { courses } = useInstructorCourse();
  const selectedCourses = courses.filter((course) =>
    bundle.courseIds.includes(course.id),
  );

  return (
    <main className="container mx-auto space-y-8 lg:max-w-[1170px]">
      <h1 className="text-center text-2xl font-bold md:text-start md:text-3xl">
        {bundle.title}
      </h1>
      <div className="my-8 flex flex-col gap-4 md:flex-row">
        <div className="flex-1 space-y-4">
          <Avatar className="aspect-video size-auto w-full rounded">
            <AvatarImage src={bundle.thumbnail_url} alt={bundle.title} />
            <AvatarFallback>
              <ImageIcon />
            </AvatarFallback>
          </Avatar>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bundle Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="prose text-wrap [&_*]:break-all"
                  dangerouslySetInnerHTML={{
                    __html: bundle.description,
                  }}
                />
              </CardContent>
            </Card>

            <Card className="bg-primary/10 space-y-4">
              <CardHeader>
                <CardTitle>
                  Courses in the Bundle ({selectedCourses.length}){" "}
                </CardTitle>
                <CardDescription>
                  Explore the individual courses included in this bundle.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1">
                  {selectedCourses.map((course, index) => {
                    return (
                      <div key={course.id}>
                        <div className="flex items-center justify-between gap-4 py-3 text-sm">
                          <div className="flex flex-1 items-center gap-2">
                            <span className="min-w-4">{index + 1}</span>
                            <Avatar className="aspect-video size-auto h-9 rounded">
                              <AvatarImage
                                src={course.courseImage}
                                alt={course.name}
                              />
                              <AvatarFallback>
                                <ImageIcon />
                              </AvatarFallback>
                            </Avatar>
                            <Link
                              href={`/courses/${course.slug}`}
                              className="line-clamp-2 text-wrap break-words hover:underline"
                            >
                              {course.name}
                            </Link>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        <BundlePreviewSideBar bundle={bundle} courses={selectedCourses} />
      </div>
    </main>
  );
};

export default BundlePreview;
