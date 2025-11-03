import Rating from "@/components/UI/Rating";
import { review } from "@/types/courses";
import Image from "next/image";

type ReviewSlice = {
  Review: review[];
};

const ReviewsSlice = ({ Review }: ReviewSlice) => {
  return (
    <div>
      {Review.map((review, index) => (
        <div key={index} className="mb-6">
          <div className="flex items-center mb-4 gap-3">
            <div>
              <Image
                className="object-cover w-10 h-10 rounded-2xl"
                src={review.user.photo || ""}
                width={90}
                height={90}
                alt="user image"
              />
            </div>
            <div>
              <span>{review.user.name}</span>
              <div className="flex gap-1">
                <span>{review.rating.toFixed(1)}</span>
                <Rating rating={review.rating} size={10} />
                <span className="text-muted-foreground text-sm border-l pl-2">
                  {review.date}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSlice;
