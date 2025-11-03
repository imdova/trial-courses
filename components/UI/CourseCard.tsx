"use client";
import Image from "next/image";
import Rating from "./Rating";
import {
  BookOpen,
  Clock,
  Earth,
  GraduationCap,
  MoveRight,
  ShoppingCart,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import CustomAlert from "./CustomAlert";
import { CourseType } from "@/types/courses";
import { addCourse } from "@/store/slices/cartSlice";

const CourseCard: React.FC<CourseType> = ({
  id,
  image,
  title,
  rating,
  instructor,
  lessons,
  students,
  status,
  price,
  duration,
  description,
  isEnrolled,
}) => {
  const [cartIsActive, setCartIsActive] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.cart);

  // Update Cart Active State
  useEffect(() => {
    setCartIsActive(courses.some((item) => item.id === id));
  }, [courses, id]);

  // Show Alert Function
  const showAlert = (message: string, type: "success" | "error") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Hide after 3 seconds
  };

  // Add to Cart Function
  const addToCart = () => {
    if (!cartIsActive) {
      dispatch(addCourse({ id, title, price, image, description }));
      showAlert("Added to cart!", "success");
    } else {
      showAlert("Already in cart!", "error");
    }
  };

  return (
    <>
      {/* Global Alert Display */}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Course Card */}
      <div className="relative flex flex-col justify-between rounded-xl border bg-white p-5">
        <Link href={isEnrolled ? `courses/view/${id}` : `courses/${id}`}>
          {status === "Online" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 rounded-full bg-gray-100 px-3 py-2">
              <Earth size={18} />
              <span className="text-xs font-semibold">Online</span>
            </span>
          )}
          {status === "Recorded" && (
            <span className="absolute top-7 left-7 flex items-center gap-3 rounded-full bg-gray-100 px-3 py-2">
              <Video size={18} />
              <span className="text-xs font-semibold">Recorded</span>
            </span>
          )}
          <div className="mb-3 h-40 w-full overflow-hidden rounded-md">
            <Image
              className="h-full w-full object-cover"
              src={image}
              alt="Course Thumbnail"
              width={400}
              height={400}
            />
          </div>
          <div className="flex w-full items-center justify-between">
            <h1 className="mb-3 font-semibold">{title}</h1>
            <div className="flex flex-col items-center gap-1">
              <Rating rating={rating} size={10} />
              <span className="text-muted-foreground text-[10px]">
                ({rating} Reviews)
              </span>
            </div>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <Image
              className="h-9 w-9 rounded-full object-cover"
              width={90}
              height={90}
              src={instructor.image}
              alt="Instructor"
            />
            <span className="text-xs">{instructor.name}</span>
          </div>
          <div className="mb-3 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
            <div className="flex gap-2">
              <BookOpen className="text-muted-foreground" size={18} />
              <span className="text-muted-foreground text-xs">
                {lessons} Lessons
              </span>
            </div>
            <div className="flex gap-2">
              <Clock className="text-muted-foreground" size={18} />
              <span className="text-muted-foreground text-xs">{duration}</span>
            </div>
            <div className="flex gap-2">
              <GraduationCap className="text-muted-foreground" size={18} />
              <span className="text-muted-foreground text-xs">
                {students} Students
              </span>
            </div>
          </div>
        </Link>
        <div className="mb-3 flex w-full justify-between">
          <div className="flex gap-2">
            {isEnrolled ? (
              <Link
                href={`courses/view/${id}`}
                className="bg-primary flex items-center gap-2 rounded-2xl p-2 px-4 text-xs text-white hover:bg-black"
              >
                View Course Content
              </Link>
            ) : (
              <Link
                href={`courses/view/${id}`}
                className="bg-primary flex items-center gap-2 rounded-2xl p-2 px-4 text-xs text-white hover:bg-black"
              >
                Enroll <MoveRight size={15} />
              </Link>
            )}
            <button
              onClick={addToCart}
              className={`text-muted-foreground hover:text-primary hover:border-primary flex h-10 w-10 items-center justify-center rounded-2xl border ${
                cartIsActive ? "!text-primary border-none bg-[#bbf7d0]" : ""
              }`}
            >
              <ShoppingCart size={15} />
            </button>
          </div>
          <span className="text-primary flex items-center gap-1 font-semibold">
            ${price}
          </span>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
