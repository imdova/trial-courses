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

const CourseCardList: React.FC<CourseType> = ({
  id,
  image,
  title,
  rating,
  price,
  description,
  instructor,
  lessons,
  duration,
  students,
  type,
  isEnrolled,
}) => {
  const [cartIsActive, setCartIsActive] = useState("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.cart);
  // Update when active in Cart
  useEffect(() => {
    const foundCourse = courses.find((item) => item.id === id);
    if (foundCourse) {
      setCartIsActive("active");
    }
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
      <div className="relative rounded-xl border bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            className="flex items-center justify-between gap-8"
            href={`courses/${id}`}
          >
            <div className="mr-3 h-24 w-[150px] overflow-hidden rounded-md">
              <Image
                className="h-full w-full object-cover"
                src={image}
                alt="image-content"
                width={400}
                height={400}
              />
            </div>
            <div className="flex flex-col items-start">
              <h1 className="mb-3 font-semibold">{title}</h1>
              <div className="mb-3 flex items-center gap-2">
                <Image
                  className="h-8 w-8 rounded-full object-cover"
                  src={instructor.image}
                  width={200}
                  height={200}
                  alt={instructor.name}
                />
                <h2 className="font-semibold">{instructor.name}</h2>
              </div>
              <div className="mb-3 flex w-full gap-3">
                <div className="flex gap-2">
                  <BookOpen className="text-muted-foreground" size={18} />
                  <span className="text-muted-foreground text-xs">
                    {lessons} Lessons
                  </span>
                </div>
                <div className="flex gap-2">
                  <Clock className="text-muted-foreground" size={18} />
                  <span className="text-muted-foreground text-xs">
                    {duration}
                  </span>
                </div>
                <div className="flex gap-2">
                  <GraduationCap className="text-muted-foreground" size={18} />
                  <span className="text-muted-foreground text-xs">
                    {students} Students
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <div className="mb-3">
            <div className="mb-4 flex flex-col items-center gap-1">
              <Rating rating={rating} size={10} />
              <p className="text-muted-foreground text-xs">(5 reviews)</p>
            </div>
            <div>
              {type === "live" && (
                <span className="flex items-center gap-2">
                  <Earth size={18} />
                  <span className="text-xs font-semibold">Online</span>
                </span>
              )}
              {type === "offline" && (
                <span className="flex items-center gap-2">
                  <Video size={18} />
                  <span className="text-xs font-semibold">Offline</span>
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-primary flex items-center gap-1 font-semibold">
              {price} EGP
            </span>
            <div className="mb-3 flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
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
                  className={`text-muted-foreground hover:text-primary hover:border-primary link-smooth flex h-10 w-10 items-center justify-center rounded-2xl border ${
                    cartIsActive ? "!text-primary border-none bg-[#bbf7d0]" : ""
                  }`}
                >
                  <ShoppingCart size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCardList;
