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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/UI/Tabs";
import { CourseBundle } from "@/types/courses";
import { formatDate } from "@/util";
import {
  ArrowLeft,
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
  generateTopAgesColumns,
  generateTopCategoriesColumns,
  generateTopCountriesColumns,
  topAgeGroupsData,
  topCategoriesData,
  topCountriesData,
} from "./columns";
import StatsCard from "@/components/UI/StatsCard";
import { useInstructorBundles } from "@/hooks/useInstructorBundles";
import { ConfirmDeleteDialog } from "@/components/UI/ConfirmDeleteDialog";
import { formatMoney } from "@/util/general";
import { generateCoursesColumns } from "@/components/columns/coursesColumns";
import { useInstructorCourse } from "@/hooks/useInstructorCourse";

interface SingleBundleOverviewProps {
  params: Promise<{ id: string }>;
}

export default function SingleBundleOverview({
  params,
}: SingleBundleOverviewProps) {
  const { id } = use(params);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItem, setToDelete] = useState<CourseBundle | null>(null);

  const {
    fetching,
    cachedId,
    bundle,
    getBundleById,
    updateExistingBundle,
    deleteExistingBundle,
  } = useInstructorBundles();

  const {
    courses,
    getCourses,
    fetching: courseFetching,
    quickUpdateExistingCourse,
  } = useInstructorCourse();

  const selectedCourses = courses.filter((course) =>
    bundle?.courseBundles.map((x) => x.course.id).includes(course.id),
  );

  const columns = generateCoursesColumns();
  const topCountriesColumns = generateTopCountriesColumns();
  const topCategoriesColumns = generateTopCategoriesColumns();
  const topAgesColumns = generateTopAgesColumns();

  useEffect(() => {
    getBundleById(id);
  }, [id, getBundleById]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  if (fetching) {
    return <Loading className="h-[80vh]" />;
  }

  if (!fetching && cachedId === id && !bundle) {
    return notFound();
  }

  if (!bundle) {
    return <Loading className="h-[80vh]" />;
  }

  const updateData = (key: string, value: unknown) => {
    updateExistingBundle(bundle.id, {
      [key]: value,
    });
  };

  const updateCourseData = (
    rowIndex: number,
    columnId: string,
    value: unknown,
  ) => {
    const course = courses[rowIndex];
    if (!course) return;
    quickUpdateExistingCourse(course.id, {
      [columnId]: value,
    });
  };
  // const price: BundlePricing | undefined = bundle.pricings[0];
  const firstPrice = bundle.pricings?.[0];
  const price = bundle.is_free ? "Free" : (firstPrice.sale_price as number);
  const hasSale = Number(firstPrice.discount_amount) > 0;

  const totalLectures = bundle.courseBundles.reduce((acc, courseBundle) => {
    return acc + (courseBundle.course.lecturesCount || 0);
  }, 0);
  const totalQuizzes = bundle.courseBundles.reduce((acc, courseBundle) => {
    return acc + (courseBundle.course.quizzesCount || 0);
  }, 0);

  return (
    <div className="space-y-2 px-4">
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onOpenChange={() => {
          setOpenDeleteDialog(false);
          setToDelete(null);
        }}
        resourceName="Bundle"
        resourceDisplayName={deleteItem?.title}
        onConfirm={() => {
          if (deleteItem?.id) deleteExistingBundle(deleteItem?.id);
        }}
      />
      <Link
        href="/instructor/courses"
        className="group flex w-fit items-center"
      >
        <ArrowLeft className="group-hover:bg-primary bg-border mr-2 h-8 w-8 rounded-full p-2 transition-transform duration-300 group-hover:-translate-x-2 group-hover:text-white" />
        <span className="group-hover:underline">Back To Bundles List</span>
      </Link>
      <Card>
        <CardHeader className="flex justify-between gap-4">
          <CardTitle>
            <Avatar className="aspect-video size-auto h-28 rounded-md">
              <AvatarImage src={bundle.thumbnail_url} alt={bundle.title} />
              <AvatarFallback>
                <ImageIcon className="size-6" />
              </AvatarFallback>
            </Avatar>
          </CardTitle>
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-foreground text-xl font-semibold">
                {bundle.title}
                <Badge
                  className="ml-2"
                  variant={bundle.status === "draft" ? "warning" : "success"}
                >
                  {bundle.status}
                </Badge>
              </h2>
              <div className="inline-flex w-fit">
                <Button
                  variant="outline"
                  className="rounded-s-base rounded-none border-r-0 shadow-none focus-visible:z-10"
                  asChild
                >
                  <Link href={`/lms/bundle/edit/${bundle.id}`}>
                    <Pen />
                    Edit
                  </Link>
                </Button>
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
                        <Link href={`/bundles/${bundle.id}`}>View</Link>
                      </DropdownMenuItem>
                      {bundle.status === "draft" ? (
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
                        <Link href={`/lms/bundle/add?duplicate=${bundle.id}`}>
                          Duplicate
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/lms/bundle/edit/${bundle.id}`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setToDelete(bundle);
                          setOpenDeleteDialog(true);
                        }}
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
                value={formatDate(bundle.created_at || "")}
              />
              <InfoBlock label="Courses" value={bundle.courseBundles.length} />

              <InfoBlock label="Lectures" value={totalLectures.toString()} />
              <InfoBlock label="Quizzes" value={totalQuizzes.toString()} />
              <InfoBlock
                label="Price"
                value={
                  hasSale ? (
                    <div className="flex gap-1">
                      <span className="text-foreground">
                        {typeof price === "number"
                          ? formatMoney(price, firstPrice.currency_code)
                          : price}
                      </span>
                      <span className="text-muted-foreground text-xs line-through">
                        {formatMoney(
                          firstPrice.regular_price || 0,
                          firstPrice.currency_code,
                        )}
                      </span>
                    </div>
                  ) : (
                    <p>
                      {typeof price === "number"
                        ? formatMoney(price, firstPrice.currency_code)
                        : price}
                    </p>
                  )
                }
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
        <StatsCard
          title="Total Purchase"
          value={40}
          icon={<UsersRound size={20} />}
          iconBg="bg-sky-100"
          iconColor="text-sky-500"
        />
        <StatsCard
          title="Bundle Revenue"
          value={formatMoney(40000, "EGP")}
          change="+8% from last month"
          icon={<DollarSign size={20} />}
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Views"
          value={678}
          icon={<Eye size={20} />}
          iconBg="bg-purple-100"
          iconColor="text-purple-500"
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
            <CardTitle className="text-2xl">
              Bundle Courses ({selectedCourses.length}){" "}
            </CardTitle>
            <CardDescription>
              List of all ({selectedCourses.length}) Courses
            </CardDescription>
          </CardHeader>
          <AdvancedDataTable
            columns={columns}
            data={selectedCourses}
            updateData={updateCourseData}
            defaultSorting={{
              id: "created_at",
              desc: true,
            }}
            filters={[]}
            loading={courseFetching}
            headerClassName="text-xs"
            cellClassName="text-xs"
            filterClassName="px-5 justify-between"
            paginationClassName="px-5"
            tableClassName="border-t border-b min-h-60 pb-6"
            initialPagination={{
              pageIndex: 0,
              pageSize: 10,
            }}
          />
        </Card>
      </div>
    </div>
  );
}
