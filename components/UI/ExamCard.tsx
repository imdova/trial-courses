"use client";
import Image from "next/image";
import { ArrowRight, BookOpen, Clock, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Exams } from "@/types/exams";

const ExamCard: React.FC<Exams> = ({
  id,
  images,
  title,
  qustions,
  exam_date,
  category,
  providers,
  price,
}) => {
  return (
    <>
      {/* Course Card */}
      <div className="rounded-lg border p-5">
        <div className="flex h-full flex-col justify-between">
          <Link href={`/prometric-exams/${id}`}>
            <div className="mb-3 h-40 w-full overflow-hidden rounded-md">
              <Image
                className="h-full w-full object-cover"
                src={
                  Array.isArray(images) && images.length > 0
                    ? images[0]
                    : "/fallback.png"
                }
                alt="Exam Thumbnail"
                width={400}
                height={400}
              />
            </div>
            <span className="text-primary my-3 flex w-fit items-center gap-3 rounded-full bg-[#2BA14933] px-4 py-2">
              <span className="text-xs">{category.title}</span>
            </span>
            <h1 className="mb-3 text-xl font-semibold">{title}</h1>
            <div className="mb-3 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
              <div className="flex gap-2">
                <BookOpen className="text-muted-foreground" size={18} />
                <span className="text-muted-foreground text-xs">
                  {qustions} Qustions
                </span>
              </div>
              <div className="flex gap-2">
                <Clock className="text-muted-foreground" size={18} />
                <span className="text-muted-foreground text-xs">
                  {exam_date}
                </span>
              </div>
              <div className="flex gap-2">
                <GraduationCap className="text-muted-foreground" size={18} />
                <span className="text-muted-foreground text-xs">
                  {providers} healthcare Providers
                </span>
              </div>
            </div>
          </Link>
          <div className="flex w-full items-center justify-between">
            <Link
              href={`exams/${id}`}
              className="bg-primary link-smooth flex w-fit items-center justify-center gap-2 rounded-lg p-2 px-4 text-xs text-white hover:bg-black"
            >
              Enroll
              <ArrowRight size={18} />
            </Link>
            <span className="text-primary font-semibold">{price} EGP</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExamCard;
