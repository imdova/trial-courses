import Image from "next/image";
import Rating from "@/components/UI/Rating";
import { review } from "@/types/courses";
type Review = {
  reviews: review[];
};
const ReviewSlice: React.FC<Review> = ({ reviews }) => {
  return (
    <ul className="">
      {reviews.map((review, index) => {
        return (
          <li key={index} className="py-5 border-b">
            <span className="block mb-3 text-muted-foreground">{review.date}</span>
            <Rating rating={review.rating} size={10} />
            <div className="flex gap-3 items-center my-4">
              <div>
                <Image
                  src={review.user.photo || ""}
                  className="w-12 h-12 object-cover rounded-full"
                  width={500}
                  height={500}
                  alt="Avater"
                />
              </div>
              <h2 className="font-semibold">{review.user.name}</h2>
            </div>
            <div>
              <span className="block mb-2 text-muted-foreground">
                {review.user.job}
              </span>
              <p>{review.content}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default ReviewSlice;
