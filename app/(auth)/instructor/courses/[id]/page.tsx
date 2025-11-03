"use client";
import Loading from "@/components/loading/loading";
import AdvancedDataTable from "@/components/UI/AdvancedDataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Badge } from "@/components/UI/badge";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";
import EnrollmentChart from "@/components/UI/Charts/EnrollmentChart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/UI/dropdown-menu";
import InfoBlock from "@/components/UI/info-block";
import { Switch } from "@/components/UI/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/Tabs";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";
import { CoursePricing } from "@/types/courses";
import { formatDate } from "@/util";
import {
  ArrowLeft,
  Award,
  ChevronDown,
  DollarSign,
  Eye,
  ImageIcon,
  Pen,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import {
  courseStudentsColumns,
  generateTopAgesColumns,
  generateTopCategoriesColumns,
  generateTopCountriesColumns,
  topAgeGroupsData,
  topCategoriesData,
  topCountriesData,
} from "./columns";
import { StudentsData } from "@/constants/students.data";
import StatsCard from "@/components/UI/StatsCard";
import { QuickEditCourseDialogForm } from "../components/QuickEditCourseDialogForm";
import { AlertDialogCourseDelete } from "../components/AlertDialogCourseDelete";

interface SingleCourseOverviewProps {
  params: Promise<{ id: string }>;
}

export default function SingleCourseOverview({
  params,
}: SingleCourseOverviewProps) {
  const { id } = use(params);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const {
    course,
    fetching,
    getCourseById,
    getCourseStudentsById,
    students,
    fetchingStudents,
    quickUpdateExistingCourse,
    cachedId,
  } = useInstructorCourse();
  const topCountriesColumns = generateTopCountriesColumns();
  const topCategoriesColumns = generateTopCategoriesColumns();
  const topAgesColumns = generateTopAgesColumns();

  useEffect(() => {
    getCourseById(id);
    getCourseStudentsById(id);
  }, [id, getCourseById, getCourseStudentsById]);

  if (fetching) {
    return <Loading className="h-[80vh]" />;
  }

  if (!fetching && cachedId === id && !course) {
    return notFound();
  }

  if (!course) {
    // While waiting for fetch, don't break. Just render loading.
    return <Loading className="h-[80vh]" />;
  }

  const updateData = (key: string, value: unknown) => {
    quickUpdateExistingCourse(course.id, {
      [key]: value,
    });
  };
  const price: CoursePricing | undefined = course.pricings[0];

  return (
    <div className="space-y-2 px-4">
      <AlertDialogCourseDelete
        course={course}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />
      <Link
        href="/instructor/courses"
        className="group flex w-fit items-center"
      >
        <ArrowLeft className="group-hover:bg-primary bg-border mr-2 h-8 w-8 rounded-full p-2 transition-transform duration-300 group-hover:-translate-x-2 group-hover:text-white" />
        <span className="group-hover:underline">Back To Courses List</span>
      </Link>
      <Card>
        <CardHeader className="flex justify-between gap-4">
          <CardTitle>
            <Avatar className="aspect-video size-auto h-28 rounded-md">
              <AvatarImage src={course.courseImage} alt={course.name} />
              <AvatarFallback>
                <ImageIcon className="size-6" />
              </AvatarFallback>
            </Avatar>
          </CardTitle>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground text-xl font-semibold">
                {course.name}
                <Badge
                  className="ml-2"
                  variant={course.status === "draft" ? "warning" : "success"}
                >
                  {course.status}
                </Badge>
              </h2>
              <div className="inline-flex w-fit">
                <QuickEditCourseDialogForm course={course}>
                  <Button
                    variant="outline"
                    className="rounded-s-base rounded-none border-r-0 shadow-none focus-visible:z-10"
                  >
                    <Pen />
                    Quick Edit
                  </Button>
                </QuickEditCourseDialogForm>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-e-base rounded-s-none focus-visible:z-10"
                    >
                      <ChevronDown />
                      <span className="sr-only">Select option</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="bottom"
                    sideOffset={4}
                    align="end"
                    className="max-w-64 md:max-w-xs!"
                  >
                    <DropdownMenuRadioGroup>
                      <DropdownMenuItem asChild>
                        <Link href={`/courses/${course.slug}`}>View</Link>
                      </DropdownMenuItem>
                      {course.status === "draft" ? (
                        <DropdownMenuItem
                          onClick={() => updateData("status", "published")}
                        >
                          Publish
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => updateData("status", "draft")}
                          className="bg-orange-50 text-orange-500"
                        >
                          Draft
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Link href={`/lms/course/add?duplicate=${course.id}`}>
                          Duplicate
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/lms/course/edit/${course.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setOpenDeleteDialog(true)}
                        className="bg-red-50 text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex gap-4">
              <InfoBlock
                label="Date"
                value={formatDate(course.created_at || "")}
              />
              <InfoBlock
                label="Type"
                value={
                  <Badge
                    variant={course.type === "recorded" ? "info" : "premium"}
                  >
                    {course.type}
                  </Badge>
                }
              />
              <InfoBlock
                label="Level"
                value={
                  <Badge
                    variant={
                      course.level === "beginner"
                        ? "info"
                        : course.level === "intermediate"
                          ? "warning"
                          : "premium"
                    }
                  >
                    {course.level}
                  </Badge>
                }
              />
              {/* <InfoBlock label="Duration" value={plan.duration + " Months"} /> */}
              <InfoBlock
                label="Price"
                value={
                  <div className="text-main text-sm">
                    {price?.currencyCode}:{" "}
                    <span className="text-muted-foreground mr-1 line-through">
                      {price?.regularPrice}
                    </span>
                    <span className="font-medium">{price?.salePrice}</span>
                  </div>
                }
              />
              <InfoBlock label="category" value={course.category?.name} />
              <InfoBlock
                label="Sub Category"
                value={course.subCategory?.name}
              />
              <InfoBlock
                label="Status"
                value={
                  <div className="flex items-center gap-2">
                    <Switch
                      id="airplane-mode"
                      checked={course.isActive}
                      onCheckedChange={(value) => updateData("isActive", value)}
                    />
                    <Badge
                      variant={course.isActive ? "default" : "destructive"}
                    >
                      {course.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                }
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StatsCard
          title="Total Enrollments"
          value={students.length}
          icon={<UsersRound size={20} />}
          iconBg="bg-sky-100"
          iconColor="text-sky-500"
        />
        <StatsCard
          title="Course Revenue"
          value={
            course.status === "published"
              ? (price?.salePrice || 0) * students.length +
                " " +
                price?.currencyCode
              : "0"
          }
          change="+8% from last month"
          icon={<DollarSign size={20} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Views"
          value={students.length * 5}
          icon={<Eye size={20} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-500"
        />
        <StatsCard
          title="Completion Rate"
          value={
            students.reduce(
              (acc, student) => acc + student.progressPercentage,
              0,
            ) / students.length
          }
          icon={<Award size={20} />}
          iconBg="bg-pink-100"
          iconColor="text-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-2 lg:grid-cols-8">
        <div className="col-span-1 h-full lg:col-span-5">
          <EnrollmentChart />
        </div>
        <Tabs
          defaultValue="top-countries"
          className="col-span-1 flex flex-col gap-3 lg:col-span-3"
        >
          <Card className="h-full space-y-0 py-0">
            <TabsList>
              <TabsTrigger value="top-countries" className="text-xs">
                Top Countries
              </TabsTrigger>
              <TabsTrigger value="top-categories" className="text-xs">
                Top Categories
              </TabsTrigger>
              <TabsTrigger value="top-ages" className="text-xs">
                Top Ages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="top-countries">
              <AdvancedDataTable
                columns={topCountriesColumns}
                data={topCountriesData}
                defaultSorting={{
                  id: "id",
                  desc: false,
                }}
                headerClassName="text-xs"
                cellClassName="text-xs"
                tableClassName="border-t border-b"
                initialPagination={{
                  pageIndex: 0,
                  pageSize: 10,
                }}
              />
            </TabsContent>
            <TabsContent value="top-categories">
              <AdvancedDataTable
                columns={topCategoriesColumns}
                data={topCategoriesData}
                defaultSorting={{
                  id: "id",
                  desc: false,
                }}
                headerClassName="text-xs"
                cellClassName="text-xs"
                tableClassName="border-t border-b"
                initialPagination={{
                  pageIndex: 0,
                  pageSize: 10,
                }}
              />
            </TabsContent>
            <TabsContent value="top-ages">
              <AdvancedDataTable
                columns={topAgesColumns}
                data={topAgeGroupsData}
                defaultSorting={{
                  id: "id",
                  desc: false,
                }}
                headerClassName="text-xs"
                cellClassName="text-xs"
                tableClassName="border-t border-b"
                initialPagination={{
                  pageIndex: 0,
                  pageSize: 10,
                }}
              />
            </TabsContent>
          </Card>
        </Tabs>
      </div>
      <div>
        <Card className="space-y-6 pb-0">
          <CardHeader>
            <CardTitle className="text-2xl">Students </CardTitle>
            <CardDescription>
              List of all ({StudentsData.length}) students
            </CardDescription>
          </CardHeader>
          <AdvancedDataTable
            columns={courseStudentsColumns}
            data={students}
            loading={fetchingStudents}
            defaultSorting={{
              id: "progressPercentage",
              desc: false,
            }}
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
            headerClassName="py-3"
            cellClassName="py-6"
            tableClassName="border-t border-b"
          />
        </Card>
      </div>
    </div>
  );
}
