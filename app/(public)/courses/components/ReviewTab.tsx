import Rating from "@/components/UI/Rating";
import { CourseItem } from "@/types/courses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/UI/card";

const reviews = [
  {
    date: "Mar 15, 2024",
    rating: 5.0,
    user: {
      name: "Alice Johnson",
      photo:
        "https://img.freepik.com/free-photo/smiling-young-man_23-2148324321.jpg?w=740",
      job: "Software Engineer",
    },
    content:
      "This course was incredibly insightful and well-structured. I learned a lot!",
  },
  {
    date: "Feb 28, 2024",
    rating: 4.5,
    user: {
      name: "Bob Williams",
      photo:
        "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?w=740",
      job: "Marketing Specialist",
    },
    content:
      "Good content, but some parts were a bit fast-paced for beginners.",
  },
  {
    date: "Jan 20, 2024",
    rating: 4.0,
    user: {
      name: "Charlie Brown",
      photo:
        "https://img.freepik.com/free-photo/portrait-handsome-african-american-man_23-2149072166.jpg?w=740",
      job: "Student",
    },
    content: "Helpful course, though I wished for more practical examples.",
  },
  {
    date: "Dec 5, 2023",
    rating: 5.0,
    user: { name: "Diana Prince", photo: "", job: "Project Manager" },
    content: "Excellent course! The instructor was very clear and engaging.",
  },
];

const ReviewTab = ({}: { course: CourseItem }) => {
  return (
    <div className="space-y-2">
      {reviews.map((review, index) => (
        <Card key={index}>
          <CardHeader className="flex gap-3">
            <Avatar className="size-10">
              <AvatarImage src={review.user.photo || undefined} />
              <AvatarFallback>
                {review.user.name.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex gap-2">
                <CardTitle className="text-sm">{review.user.name}</CardTitle>
                <Rating rating={review.rating} size={10} />
              </div>
              <p className="text-muted-foreground text-xs font-thin">
                {review.date}
              </p>
              <CardDescription>{review.content}</CardDescription>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};
export default ReviewTab;
