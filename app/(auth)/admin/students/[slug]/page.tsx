"use client";

// import NotFoundPage from "@/app/not-found";
import OptionsDropdown from "@/components/UI/OptionsDropdown";
import {
  Check,
  Download,
  Eye,
  File,
  FileType,
  ListOrdered,
  SquarePen,
  View,
  Copy,
  Mail,
  MessageSquare,
  MessageCircleMore,
  Phone,
  Plus,
  Edit,
  Trash,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import OverviewStudent from "./panels/OverviewStudent";
import { StudentsData } from "@/constants/students.data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/UI/Tabs";
import DataTable from "@/components/UI/data-table";
import { ColumnConfig } from "@/types";
import CertificatesTable from "@/components/UI/tables/CertificatesTable";
import { Card } from "@/components/UI/card";

interface SingleStudentOverviewProps {
  params: Promise<{ slug: string }>;
}
type Instructor = {
  name: string;
  avatar: string;
};
type StudentCourse = {
  id: string;
  title: string;
  image: string;
  isComplete: boolean;
  category: string;
  instructor: Instructor;
  lastActive: string;
  progress: number;
};
type FileType = "pdf" | "jpg" | "png" | "docx";

type Certificate = {
  id: string;
  name: string;
  program: string;
  grade: string;
  issue_date: string;
  serial: string;
  fileType: FileType;
  downloadUrl: string;
};
const certificatesList: Certificate[] = [
  {
    id: "1",
    name: "Digital Marketing Masterclass",
    program: "Digital Marketing",
    grade: "Excellent",
    issue_date: "January 5, 2025",
    serial: "DMM5421562",
    fileType: "pdf",
    downloadUrl: "#",
  },
];

const cvFile = {
  name: "CVjake Medical.pdf",
  url: "/path/to/cv.pdf",
  size: "2.4 MB",
  uploadDate: "May 15, 2023",
};
const menuItems = [
  {
    id: 1,
    title: "Send Email",
    icon: <Mail size={16} className="text-green-500" />,
    action: () => (window.location.href = "mailto:contact@example.com"),
  },
  {
    id: 2,
    title: "Send Web Message",
    icon: <MessageSquare size={16} className="text-green-500" />,
    action: () => console.log("Opening web message form"),
  },
  {
    id: 3,
    title: "Chat on WhatsApp",
    icon: <MessageCircleMore size={16} className="text-green-500" />,
    action: () => window.open("https://wa.me/1234567890", "_blank"),
  },
  {
    id: 4,
    title: "Call",
    icon: <Phone size={16} className="text-green-500" />,
    action: () => (window.location.href = "tel:+1234567890"),
  },
];

const dummyStatisticsCourses: StudentCourse[] = [
  {
    id: "1",
    title: "Introduction to Communication Skills",
    image:
      "https://img.freepik.com/free-photo/education-academy-certification-curriculum-icon_53876-121144.jpg?t=st=1745668615~exp=1745672215~hmac=a8705af5b0a30e320679334ab3e9165dcb19d86e987e90808f5da0d72e2939d3&w=1380",
    isComplete: false,
    category: "category 1",
    instructor: {
      name: "Dr/ Mohhamed farag",
      avatar:
        "https://img.freepik.com/free-photo/portrait-smiling-handsome-businessman-extend-hand-handshake-look-friendly-greet-you-hi-gesture-standing-white-background_1150-63701.jpg?t=st=1745668900~exp=1745672500~hmac=a460565946bf5680373d1cd225d215ed5b63ff766ebb1888421d0e64d82579a5&w=740",
    },
    lastActive: "OVER 30 DAYS AGO",
    progress: 45,
  },
  {
    id: "2",
    title: "Advanced JavaScript Patterns",
    image:
      "https://img.freepik.com/free-photo/woman-learning-study-education-knowledge-word-graphic_53876-64940.jpg?t=st=1745668632~exp=1745672232~hmac=d5110a7f24602fb06dc1a774382d57491dbf114bcac66e200280c1007e996b56&w=1380",
    isComplete: false,
    category: "category 2",
    instructor: {
      name: "Dr/ Mohhamed farag",
      avatar:
        "https://img.freepik.com/free-photo/portrait-smiling-handsome-businessman-extend-hand-handshake-look-friendly-greet-you-hi-gesture-standing-white-background_1150-63701.jpg?t=st=1745668900~exp=1745672500~hmac=a460565946bf5680373d1cd225d215ed5b63ff766ebb1888421d0e64d82579a5&w=740",
    },
    lastActive: "1 WEEK AGO",
    progress: 30,
  },
  {
    id: "3",
    title: "UX Design Fundamentals",
    image:
      "https://img.freepik.com/premium-photo/startup-business-team-meeting-modern-bright-office-interior-working-laptop_52137-1199.jpg?w=1380",
    isComplete: true,
    category: "category 3",
    instructor: {
      name: "Dr/ Mohhamed farag",
      avatar:
        "https://img.freepik.com/free-photo/portrait-smiling-handsome-businessman-extend-hand-handshake-look-friendly-greet-you-hi-gesture-standing-white-background_1150-63701.jpg?t=st=1745668900~exp=1745672500~hmac=a460565946bf5680373d1cd225d215ed5b63ff766ebb1888421d0e64d82579a5&w=740",
    },
    lastActive: "3 MONTHS AGO",
    progress: 100,
  },
];

const enrolledCoursesColumns: ColumnConfig<StudentCourse>[] = [
  {
    header: "Course",
    key: "title",
    sortable: true,
  },
  {
    header: "Category",
    key: "category",
    sortable: true,
  },
  {
    header: "Instructor",
    key: "instructor.name",
    sortable: true,
  },
  {
    header: "Progress",
    key: "progress",
    sortable: true,
    render: (item: StudentCourse) => (
      <div className="h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full bg-green-600"
          style={{ width: `${item.progress}%` }}
        ></div>
      </div>
    ),
  },
  {
    header: "Last Active",
    key: "lastActive",
    sortable: true,
  },
];

export default function SingleStudentOverview({
  params,
}: SingleStudentOverviewProps) {
  const { slug } = use(params);
  const student = StudentsData.find((Student) => Student.id === slug);
  const [copied, setCopied] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [showProfileLink, setShowProfileLink] = useState(false);
  const [availability, setAvailability] = useState(true);

  const profileLink = "modicean.net/mail/blog/LTPSBacios";

  const handleViewCV = () => {
    setCvModalOpen(true);
    console.log("Viewing CV...");
  };

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = "/path/to/CVjake Medical.pdf";
    link.download = "CVjake Medical.pdf";
    link.click();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // if (!student) return <NotFoundPage />;

  return (
    <div className="p-4">
      {/* Tab Buttons */}
      <Tabs defaultValue="studentsOverview" className="mb-4">
        <Card className="w-full rounded-lg border bg-white p-2">
          <TabsList>
            <TabsTrigger value="studentsOverview">
              <View size={15} />
              Students Overview
            </TabsTrigger>
            <TabsTrigger value="enrolledCourses">
              <ListOrdered size={15} />
              Enrolled Courses
            </TabsTrigger>
            <TabsTrigger value="eranedCertificate">
              <ListOrdered size={15} />
              Earned Certificate
            </TabsTrigger>
          </TabsList>
        </Card>

        <Card className="relative mb-4 flex justify-between p-3">
          {/* Student Details */}
          <div className="flex w-full flex-col items-center gap-6 lg:flex-row">
            <Image
              className="h-[250px] max-w-[250px] rounded-lg object-cover lg:h-[120px] lg:w-[150px]"
              src={student?.avatar || ""}
              alt="student image"
              width={300}
              height={300}
            />
            <div className="flex-1">
              <div className="mb-4 flex flex-col items-center justify-between gap-3 lg:flex-row">
                <div>
                  <div className="mb-4 flex flex-col items-center gap-3 lg:flex-row">
                    <h1 className="max-w-[400px] text-xl font-bold">
                      {student?.name || ""}
                    </h1>
                    <span className="bg-primary rounded-full px-2 py-1 text-xs text-white capitalize">
                      {student?.status || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">
                      {student?.info || ""}
                    </span>
                  </div>
                </div>
                <div className="flex h-full items-start justify-end gap-3">
                  <Link
                    className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                    href={"#"}
                  >
                    <SquarePen size={12} />
                    Edit
                  </Link>
                  <Link
                    className="flex w-fit items-center gap-1 rounded-lg border bg-white p-3 text-sm"
                    href={`/admin/students/profile/${student?.id || ""}`}
                  >
                    <Eye size={12} />
                    View Profile
                  </Link>
                  <OptionsDropdown
                    actions={[
                      {
                        label: "View",
                        icon: <Eye className="h-4 w-4" />,
                        onClick: () => console.log("View clicked"),
                      },
                      {
                        label: "Edit",
                        icon: <Edit className="h-4 w-4" />,
                        onClick: () => console.log("Edit clicked"),
                      },
                      {
                        label: "Delete",
                        icon: <Trash className="h-4 w-4" />,
                        onClick: () => console.log("Delete clicked"),
                        danger: true,
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-col text-center md:text-start">
                  <span className="text-muted-foreground text-sm">Country</span>
                  <span className="text-main text-sm font-semibold">
                    {student?.country || ""}
                  </span>
                </div>
                <div className="flex flex-col text-center md:text-start">
                  <span className="text-muted-foreground text-sm">Age</span>
                  <span className="text-main text-sm font-semibold">
                    {student?.age || 0} Years
                  </span>
                </div>
                <div className="flex flex-col text-center md:text-start">
                  <span className="text-muted-foreground text-sm">
                    Education
                  </span>
                  <span className="text-main text-sm font-semibold">
                    {student?.education || ""}
                  </span>
                </div>
                <div className="flex flex-col text-center md:text-start">
                  <span className="text-muted-foreground text-sm">
                    Join Date
                  </span>
                  <span className="text-main text-sm font-semibold">
                    {student?.joinDate || ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <div className="lg:col-span-5">
            <TabsContent value="studentsOverview">
              <OverviewStudent />
            </TabsContent>
            <TabsContent value="enrolledCourses">
              <Card className="mb-4 p-4">
                <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                  <h2 className="text-xl font-semibold">
                    Recent Enrolled Courses
                  </h2>
                  <button className="bg-primary flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-white transition hover:bg-green-700">
                    <Plus size={15} /> Assign to new course
                  </button>
                </div>
                <DataTable
                  data={dummyStatisticsCourses}
                  columns={enrolledCoursesColumns}
                  isSelectable={true}
                  noDataMessage={{
                    title: "No courses found",
                    description:
                      "This student hasn't enrolled in any courses yet.",
                  }}
                />
              </Card>
            </TabsContent>
            <TabsContent value="eranedCertificate">
              <CertificatesTable
                certificates={[...certificatesList]}
                handleView={(id) => console.log("View certificate:", id)}
              />
            </TabsContent>
          </div>

          <div className="space-y-4 lg:col-span-2">
            <div>
              {/* Public Profile Card */}
              <Card className="overflow-hidden">
                <div className="space-y-4 p-3">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-gray-800">
                        Your Public Profile
                      </h1>
                    </div>
                  </div>

                  {/* Profile Link Section with Toggle */}
                  <div className="overflow-hidden">
                    <div>
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Profile Link Visibility
                        </p>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={showProfileLink}
                            onChange={() =>
                              setShowProfileLink(!showProfileLink)
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                      </div>

                      {showProfileLink && (
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 overflow-hidden rounded-md bg-gray-100 p-3">
                            <p className="truncate font-mono text-blue-600">
                              {profileLink}
                            </p>
                          </div>
                          <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-1 rounded-md bg-gray-200 px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-300"
                          >
                            {copied ? (
                              <>
                                <Check size={16} /> Copied
                              </>
                            ) : (
                              <>
                                <Copy size={16} /> Copy
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Availability Toggle */}
                  <div className="overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="mb-1 text-sm text-gray-600">
                            Immediate Availability
                          </p>
                          <p className="text-xs text-gray-500">
                            Let companies know you can start immediately
                          </p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={availability}
                            onChange={() => setAvailability(!availability)}
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 peer-checked:bg-green-500 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                      </div>

                      {availability && (
                        <div className="mt-3 flex items-start rounded-md border border-green-200 bg-green-50 p-3">
                          <Check className="mt-0.5 flex-shrink-0 text-green-500" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">
                              Available for immediate start
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                              Your profile will show youre available to
                              companies
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CV Section */}
                  <div className="overflow-hidden">
                    <div>
                      <div className="rounded-md border border-blue-200 bg-blue-50 p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <File className="flex-shrink-0 text-blue-500" />
                            <div className="ml-3 overflow-hidden">
                              <p className="truncate text-sm font-medium text-blue-800">
                                {cvFile.name}
                              </p>
                              {cvFile.size && (
                                <p className="text-xs text-gray-500">
                                  {cvFile.size} •{" "}
                                  {cvFile.uploadDate || "Uploaded"}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleViewCV}
                              className="rounded-md p-1 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                              title="View CV"
                            >
                              <FileType size={18} />
                            </button>
                            <button
                              onClick={handleDownloadCV}
                              className="rounded-md p-1 text-blue-600 transition-colors hover:bg-blue-100 hover:text-blue-800"
                              title="Download CV"
                            >
                              <Download size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* CV Modal */}
            {cvModalOpen && (
              <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                <div className="mx-4 w-full max-w-2xl rounded-lg bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold">Viewing CV</h3>
                    <button
                      onClick={() => setCvModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="flex h-96 items-center justify-center bg-gray-100">
                    <p>PDF viewer would go here</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => setCvModalOpen(false)}
                      className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
            <Card className="overflow-hidden">
              <div className="p-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    className="flex w-full items-center px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50"
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
