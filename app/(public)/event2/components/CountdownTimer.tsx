"use client";

import { MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";

const CountdownTimer: React.FC = () => {
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 1); // Set to 1 day from now

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate.getTime() - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        style={{ backgroundImage: `url("/images/event2.png")` }}
        className="absolute -bottom-16 left-1/2 hidden w-full max-w-4xl -translate-x-1/2 rounded-2xl bg-white/10 bg-cover bg-center p-6 shadow-lg md:block lg:max-w-6xl"
      >
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-white">
            <h1 className="text-lg font-bold lg:text-3xl">Hurry Up!</h1>
            <p className="mt-2 text-sm lg:text-lg">Book Your Seat Now</p>
          </div>
          <div className="flex-1">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-lg bg-white p-4 text-center">
                <div className="text-lg font-bold lg:text-4xl">{days}</div>
                <div className="text-xs tracking-wider uppercase lg:text-sm">
                  Days
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center">
                <div className="text-lg font-bold lg:text-4xl">{hours}</div>
                <div className="text-xs tracking-wider uppercase lg:text-sm">
                  Hours
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center">
                <div className="text-lg font-bold lg:text-4xl">{minutes}</div>
                <div className="text-xs tracking-wider uppercase lg:text-sm">
                  Minutes
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 text-center">
                <div className="text-lg font-bold lg:text-4xl">{seconds}</div>
                <div className="text-xs tracking-wider uppercase lg:text-sm">
                  Seconds
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white">
            <MapPin className="h-6 w-6 lg:h-12 lg:w-12" />
            <div>
              <div className="max-w-[150px] text-xs font-semibold underline lg:text-sm">
                23rd Avenue, 4th Street,Chicago, Illinois, USA
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
