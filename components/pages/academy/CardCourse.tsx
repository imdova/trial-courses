"use client";

import { useState } from "react";
import {
  BookOpen,
  CircleArrowUp,
  Earth,
  HeartIcon,
  ImageIcon,
  ShoppingBag,
  Star,
  Video,
} from "lucide-react";
import { Button } from "@/components/UI/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/UI/card";

import { cn } from "@/util";
import { Badge } from "@/components/UI/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import Link from "next/link";
import { CourseItem } from "@/types/courses";
import { formatMoney } from "@/util/general";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/UI/Tooltip";

const getBadgeIcon = (type: string): React.ReactNode => {
  switch (type) {
    case "live":
      return <Earth />;
    case "offline":
      return <Video />;
    case "recorded":
      return <Video />;
    default:
      return "";
  }
};

const CardCourse: React.FC<{ course: CourseItem; isOwner?: boolean }> = ({
  course,
  // isOwner,
}) => {
  const [liked, setLiked] = useState<boolean>(false);
  const firstPrice = course.pricings?.[0] || {};
  const price = course.isCourseFree
    ? "Free"
    : (firstPrice?.salePrice as number);
  const hasSale = Number(firstPrice?.discountAmount) > 0;

  const hasMoreThanOneInstructor = course.academyInstructors.length > 1;


  return (
    <Card className="relative flex max-w-md flex-col p-2">
      <Avatar className="aspect-video size-auto w-full rounded-md">
        <AvatarImage src={course.courseImage} alt={course.name} />
        <AvatarFallback>
          <ImageIcon className="size-6" />
        </AvatarFallback>
      </Avatar>
      <Button
        size="iconSm"
        onClick={() => setLiked(!liked)}
        className="bg-secondary/20 hover:bg-secondary/60 absolute end-4 top-4 rounded-full backdrop-blur-sm"
      >
        <HeartIcon
          className={cn(liked ? "fill-primary stroke-primary" : "stroke-white")}
        />
        <span className="sr-only">Like</span>
      </Button>
      <Badge className="bg-secondary/20 absolute start-4 top-4 border backdrop-blur-sm duration-200">
        {getBadgeIcon(course.type)}
        <span className="font-semibold">{course.type}</span>
      </Badge>
      <CardHeader className="px-0">
        <CardTitle className="line-clamp-2 text-base">{course.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Badge variant="outline">
            <BookOpen className="text-primary" />
            {course.lecturesCount} Lessons
          </Badge>
          <Badge variant="outline">
            <Star className="text-orange-400" />
            {course.rating?.toFixed(1)}
          </Badge>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="flex items-center gap-2 mb-1">
          {!hasMoreThanOneInstructor ? (
            <>
              <Avatar className="size-9">
                <AvatarImage
                  src={course.academyInstructors?.[0]?.photoUrl || ""}
                />
                <AvatarFallback>
                  {course.academyInstructors?.[0]?.name?.charAt(0) || ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="truncate text-xs">
                  {course.academyInstructors?.[0]?.name || ""}
                </p>
              </div>
            </>
          ) : (
            <div className="flex -space-x-2">
              {course.academyInstructors.map((instructor, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger>
                    <Avatar className="size-8 transition-all hover:z-10 hover:scale-150 ring-background ring-2">
                      <AvatarImage src={instructor.photoUrl} />
                      <AvatarFallback className="text-muted-foreground text-xs">
                        {instructor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{instructor.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          )}
        </div>
        <div className="text-muted-foreground line-clamp-2 text-xs">
          <div
            className="prose text-wrap"
            dangerouslySetInnerHTML={{ __html: course.metadata.courseOverview }}
          />
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex-1 items-end justify-between gap-3 px-0">
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link href={`/courses/${course.slug}`}>
              Enroll <CircleArrowUp className="rotate-45" />
            </Link>
          </Button>
          <Button size="sm" variant="successOutline">
            <ShoppingBag />
            <span className="sr-only">Add to cart</span>
          </Button>
        </div>
        {hasSale ? (
          <div className="relative flex items-center justify-between px-3">
            <div className="flex">
              <span className="text-foreground text-sm font-extrabold lg:text-base">
                {firstPrice.currencyCode} {price}
              </span>
              <span className="text-muted-foreground decoration-destructive absolute -top-3 truncate text-xs line-through">
                {firstPrice.currencyCode} {firstPrice.regularPrice}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-foreground text-sm font-extrabold lg:text-base">
            {formatMoney(price as number, firstPrice.currencyCode)}
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardCourse;
