"use client";
import { useState, useEffect } from "react";

const useScrollDetection = (triggerHeight = 150) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        if (window.scrollY >= triggerHeight) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [triggerHeight]);

  return isScrolled;
};

export default useScrollDetection;
