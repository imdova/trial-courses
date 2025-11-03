"use client";
import CourseCardInstructor from "@/components/UI/CourseCardInstructor";
import Pagination from "@/components/UI/Pagination/Pagination";
import Rating from "@/components/UI/Rating";
import ShowMoreText from "@/components/UI/ShowMoreText";
import { courseData } from "@/constants/VideosData.data";
import {
  Award,
  Clock,
  Languages,
  MapPin,
  Pen,
  Plus,
  Share2,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Reviews = {
  user: {
    name: string;
    image: string;
  };
  content: string;
  rating: number;
};
type Certificate = {
  title: string;
  source: string;
};

type Instructor = {
  name: string;
  shortcuts: string;
  avatar: string;
  details: string;
  certificates: Certificate[];
  location: string;
  languages: string[];
  qualifications: string[];
  experience: number;
  reviews: string;
  rating: number;
  students: number;
};
// dummy reviews data
const reviews: Reviews[] = [
  {
    user: {
      name: "Alice Johnson",
      image:
        "https://img.freepik.com/free-photo/woman-with-pleasant-smile-dark-hair-dressed-casual-pink-t-shirt-has-white-perfect-teeth-rejoices-receiving-compliment_176532-9468.jpg?t=st=1744728639~exp=1744732239~hmac=34b713d39303c187520eea43e5dc18aca31356c50ba8f6804d657c762b135908&w=1380",
    },
    content:
      "Dar Al Fouad Hospital is one of the largest and most prominent medical centres in Egypt. It was establishing a state-of-the-art in the Nasr City and has total land area is 13,000 square meters",
    rating: 5,
  },
  {
    user: {
      name: "Michael Chen",
      image:
        "https://img.freepik.com/free-photo/woman-with-pleasant-smile-dark-hair-dressed-casual-pink-t-shirt-has-white-perfect-teeth-rejoices-receiving-compliment_176532-9468.jpg?t=st=1744728639~exp=1744732239~hmac=34b713d39303c187520eea43e5dc18aca31356c50ba8f6804d657c762b135908&w=1380",
    },
    content:
      "Dar Al Fouad Hospital is one of the largest and most prominent medical centres in Egypt. It was establishing a state-of-the-art in the Nasr City and has total land area is 13,000 square meters",
    rating: 4,
  },
  {
    user: {
      name: "Sophia Martinez",
      image:
        "https://img.freepik.com/free-photo/woman-with-pleasant-smile-dark-hair-dressed-casual-pink-t-shirt-has-white-perfect-teeth-rejoices-receiving-compliment_176532-9468.jpg?t=st=1744728639~exp=1744732239~hmac=34b713d39303c187520eea43e5dc18aca31356c50ba8f6804d657c762b135908&w=1380",
    },
    content:
      "Dar Al Fouad Hospital is one of the largest and most prominent medical centres in Egypt. It was establishing a state-of-the-art in the Nasr City and has total land area is 13,000 square meters",
    rating: 4,
  },
];
// dummy instructor data
const instructor: Instructor = {
  name: "DR/ Michael P. M. Truong",
  shortcuts: "Pharmacist | Health Educator | 10+ Years Teaching",
  avatar:
    "https://img.freepik.com/free-photo/beautiful-young-woman-green-sweater-posing-camera_114579-64851.jpg?t=st=1744734281~exp=1744737881~hmac=f2b6e32503c25bfed5e8baa43bc3b7d450c3c6aaab9fee1ff910d34d73eee398&w=1380",
  details:
    "Dar Al Fouad Hospital is one of the largest and most prominent medical centres in Egypt. It was establishing a state-of-the-art in the Nasr City and has total land area is 13,000 square meters (42,651 square feet), the footprint is 7000 square meters (22,966 square feet)Dar Al Fouad Hospital is one of the largest and most prominent medical centres in Egypt. It was establishing a state-of-the-art in the Nasr City and has total land area is 13,000 square ...",
  certificates: [
    { title: "Doctor of Pharmacy (PharmD)", source: "University of Michigan" },
    {
      title: "Board Certified Pharmacotherapy Specialist",
      source: "Board of Pharmacy Specialties",
    },
    {
      title: "Certificate in Medical Education",
      source: "Harvard Medical School",
    },
    {
      title: "Excellence in Teaching Award",
      source: "American Association of Colleges of Pharmacy",
    },
  ],
  location: "Boston, United States",
  languages: ["English", "Spanish"],
  qualifications: ["Pharmacy", "Clinical Training", "Drug Safety"],
  experience: 12,
  reviews: "63,300",
  rating: 4.4,
  students: 298,
};

const InstuctorProfile = () => {
  const [filter, setFilter] = useState<
    "All" | "Pharmacy" | "Health Education" | "Clinical Training"
  >("All");
  const showPageNum = 6;
  const [currentPage, setCurrentPage] = useState(1);
  // handdle filter courses
  const filteredCourses =
    filter === "All"
      ? courseData
      : courseData.filter((course) => course.category === filter);

  // Pagination Logic
  const indexOfLastCourse = currentPage * showPageNum;
  const indexOfFirstCourse = indexOfLastCourse - showPageNum;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  return (
    <div className="flex flex-col gap-3 xl:flex-row">
      {/* instructor informations  */}
      <div className="flex-1">
        <div className="relative mb-12">
          <div className="h-[400px] overflow-hidden rounded-xl border lg:h-[200px]">
            <Image
              className="absolute left-0 top-0 h-full w-full rounded-lg object-cover"
              src={
                "https://img.freepik.com/free-photo/workers-getting-back-office_23-2149161642.jpg?t=st=1741419147~exp=1741422747~hmac=c962c55238a6360ce1ad0c6022d77ed94ac7416367fe5aa1b876ec5499e1ab51&w=1380"
              }
              width={400}
              height={200}
              alt="background"
            />
            <div className="absolute left-0 top-0 h-full w-full rounded-lg bg-[#47b162ea]"></div>
            <div className="absolute right-5 top-5 flex flex-col gap-6 z-10">
              <button className="text-white">
                <Pen size={23} />
              </button>
              <button className="text-white">
                <Share2 size={23} />
              </button>
            </div>
            <div className="relative flex h-full flex-col items-center justify-center gap-6 p-6 text-white lg:flex-row lg:items-end lg:justify-between">
              <div className="hidden w-[140px] lg:block"></div>
              <div className="text-center lg:text-start">
                <h2 className="font-semibold">{instructor.name}</h2>
                <span className="text-xs">{instructor.shortcuts}</span>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-14">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border">
                      <Star size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm">
                      {instructor.rating} ({instructor.reviews})
                    </h2>
                    <span className="text-sm">Reviews</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-14">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border">
                      <User size={25} />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-sm">{instructor.students}</h2>
                    <span className="text-sm">Students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            src={instructor.avatar}
            width={200}
            height={200}
            alt={instructor.name}
            className="absolute -bottom-8 left-1/2 h-[140px] w-[140px] -translate-x-1/2 rounded-full shadow-md border-4 border-white object-cover lg:left-6 lg:-translate-x-0"
          />
        </div>
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">About me</h1>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <div className="py-4">
            <ShowMoreText text={instructor.details} maxChars={250} />
          </div>
        </div>
        {/* Instructor Courses  */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              My Courses <span className="text-xl">({courseData.length})</span>
            </h1>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Plus size={15} />
            </Link>
          </div>
          <div className="flex flex-col w-full lg:w-fit lg:flex-row gap-2 bg-gray-100 p-1 rounded-lg mb-4">
            {["All", "Pharmacy", "Health Education", "Clinical Training"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    setFilter(
                      category as
                        | "All"
                        | "Pharmacy"
                        | "Health Education"
                        | "Clinical Training"
                    )
                  }
                  className={`p-2 lg:w-[150px] flex-1 rounded-lg text-sm ${
                    filter === category
                      ? "bg-white text-primary"
                      : "bg-gray-100 text-muted-foreground"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentCourses.map((course) => {
                return <CourseCardInstructor key={course.id} {...course} />;
              })}
            </div>
            {currentCourses.length === 0 ? (
              <p className="text-center p-4 text-muted-foreground text-sm">{`You dont have courses in ${filter}!`}</p>
            ) : (
              ""
            )}
            {/* Pagination Component */}
            <div className="my-6">
              <Pagination
                total={filteredCourses.length}
                PerPage={showPageNum}
                paginate={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[350px]">
        {/* Top reviews  */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Top Reviews</h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul>
            {reviews.map((review, index) => {
              return (
                <li className="p-3 border rounded-lg mb-3" key={index}>
                  <div className="flex gap-2">
                    <div className="w-12">
                      <Image
                        className="w-12 h-12 rounded-full object-cover"
                        src={review.user.image}
                        alt="Avatar user"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold mb-1">
                        {review.user.name}
                      </h4>
                      <Rating rating={review.rating} size={9} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{review.content}</p>
                </li>
              );
            })}
            <li className="flex justify-center py-3">
              <Link className="text-center text-primary" href={"#"}>
                Real All Reviews
              </Link>
            </li>
          </ul>
        </div>
        {/* Certificates & Credentials */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold max-w-[200px]">
              Certificates & Credentials
            </h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul>
            {instructor.certificates.map((certificate, index) => {
              return (
                <li key={index} className="flex items-center gap-2 mb-4">
                  <Award size={23} />
                  <div>
                    <h4 className="text-sm font-semibold">
                      {certificate.title}
                    </h4>
                    <span className="block text-sm text-muted-foreground">
                      {certificate.source}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Instructor Info */}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold max-w-[200px]">
              Instructor Info
            </h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul>
            <li className="flex items-center gap-2 mb-4">
              <MapPin size={23} />
              <h4 className="text-sm font-semibold">{instructor.location}</h4>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <Languages size={23} />
              <h4 className="text-sm font-semibold">
                {instructor.languages.join(", ")}
              </h4>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <Award size={23} />
              <h4 className="text-sm font-semibold">
                {instructor.qualifications.join(", ")}
              </h4>
            </li>
            <li className="flex items-center gap-2 mb-4">
              <Clock size={23} />
              <h4 className="text-sm font-semibold">
                {instructor.experience} Years Experience
              </h4>
            </li>
          </ul>
        </div>
        {/* Countact Info*/}
        <div className="border bg-white rounded-xl p-4 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold max-w-[200px]">Contact</h2>
            <Link
              className="flex justify-center items-center w-10 h-10 border rounded-md "
              href={"#"}
            >
              <Pen size={15} />
            </Link>
          </div>
          <ul className="space-y-3 text-sm text-gray-700">
            <li className="w-fit">
              <Link
                href="https://facebook.com/username"
                target="_blank"
                className="flex items-center space-x-2 hover:text-blue-600"
              >
                {/* Facebook Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326V22.67c0 .732.593 1.325 1.325 1.325h11.495V14.7h-3.13v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.324-.593 1.324-1.325V1.326C24 .593 23.406 0 22.675 0z" />
                </svg>
                <span>Facebook</span>
              </Link>
            </li>
            <li className="w-fit">
              <Link
                href="https://linkedin.com/in/username"
                target="_blank"
                className="flex items-center space-x-2 hover:text-blue-700"
              >
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5C4.98 4.61 4.09 5.5 2.98 5.5S1 4.61 1 3.5 1.89 1.5 3 1.5 4.98 2.39 4.98 3.5zM.5 8.5H5V24H.5V8.5zM7.5 8.5h4.2v2.1h.06c.58-1.1 2-2.25 4.14-2.25 4.43 0 5.25 2.91 5.25 6.69V24h-4.5v-7.5c0-1.79-.03-4.11-2.5-4.11-2.5 0-2.89 1.95-2.89 3.97V24H7.5V8.5z" />
                </svg>
                <span>LinkedIn</span>
              </Link>
            </li>
            <li className="w-fit">
              <Link
                href="https://github.com/username"
                target="_blank"
                className="flex items-center space-x-2 hover:text-black"
              >
                {/* GitHub Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.648.5.5 5.648.5 12.002c0 5.097 3.292 9.412 7.861 10.945.574.105.785-.25.785-.556 0-.273-.01-1.184-.016-2.15-3.2.697-3.876-1.542-3.876-1.542-.522-1.328-1.276-1.682-1.276-1.682-1.043-.713.08-.698.08-.698 1.153.082 1.76 1.183 1.76 1.183 1.026 1.756 2.694 1.248 3.35.954.105-.743.4-1.248.727-1.536-2.552-.29-5.236-1.275-5.236-5.672 0-1.252.448-2.274 1.183-3.075-.12-.29-.513-1.453.11-3.027 0 0 .965-.31 3.162 1.175a10.97 10.97 0 012.878-.387 10.98 10.98 0 012.878.387c2.197-1.484 3.162-1.175 3.162-1.175.623 1.574.23 2.737.113 3.027.737.801 1.183 1.823 1.183 3.075 0 4.409-2.69 5.377-5.252 5.661.41.353.774 1.049.774 2.116 0 1.527-.014 2.759-.014 3.132 0 .309.208.667.79.554C20.715 21.409 24 17.095 24 12.002 24 5.648 18.852.5 12 .5z" />
                </svg>
                <span>GitHub</span>
              </Link>
            </li>
            <li className="w-fit">
              <Link
                href="https://twitter.com/username"
                target="_blank"
                className="flex items-center space-x-2 hover:text-blue-400"
              >
                {/* Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557a9.828 9.828 0 01-2.828.775A4.933 4.933 0 0023.337 3.1a9.864 9.864 0 01-3.127 1.195A4.916 4.916 0 0016.616 3c-2.717 0-4.92 2.204-4.92 4.92 0 .386.044.762.127 1.124C7.728 8.847 4.1 6.88 1.671 3.905a4.822 4.822 0 00-.666 2.475c0 1.708.869 3.216 2.188 4.099A4.903 4.903 0 01.964 9.14v.062a4.926 4.926 0 003.946 4.827 4.996 4.996 0 01-2.21.084 4.927 4.927 0 004.604 3.42A9.867 9.867 0 010 19.54a13.94 13.94 0 007.548 2.212c9.056 0 14.01-7.496 14.01-13.986 0-.213-.004-.425-.014-.636A10.004 10.004 0 0024 4.557z" />
                </svg>
                <span>Twitter</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default InstuctorProfile;
