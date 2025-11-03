import { useState, useEffect } from "react";
import OfferImg from "@/assets/images/offer.png";
import Image from "next/image";

interface LimitedCounterOfferProps {
  initialCount: number;
  duration: number; // in seconds
}

const LimitedCounterOffer: React.FC<LimitedCounterOfferProps> = ({
  initialCount,
  duration,
}) => {
  const count = initialCount;
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return { hours, minutes, secs };
  };

  const { hours, minutes, secs } = formatTime(timeLeft);

  return (
    <div className="m-12 p-4 bg-[#82C341] text-white rounded-[50px]">
      <div className="flex justify-center flex-col items-center lg:flex-row p-4 gap-6 border border-dashed border-orange-500 rounded-[40px] ">
        <div>
          <Image src={OfferImg} alt="Offer Img" />
        </div>
        <div className="max-w-[400px]">
          <div className="text-sm mt-2 flex justify-center gap-2 mb-3 ">
            <div className="text-center">
              <p className="text-2xl font-bold">
                {hours.toString().padStart(2, "0")}
              </p>
              <p className="text-xs">Hours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {minutes.toString().padStart(2, "0")}
              </p>
              <p className="text-xs">Minutes</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">
                {secs.toString().padStart(2, "0")}
              </p>
              <p className="text-xs">Seconds</p>
            </div>
          </div>
          <h2 className="text-2xl text-center font-bold">
            Don t miss this offer! 50% Discount for only {count} Hours
          </h2>
        </div>
        <button className="block m-auto px-3 py-2 bg-orange-400 text-white rounded-3xl hover:bg-orange-600 link-smooth">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default LimitedCounterOffer;
