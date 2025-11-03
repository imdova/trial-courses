// components/Advertisement.tsx
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

type AdType = "banner" | "rectangle" | "skyscraper" | "custom";

interface AdvertisementProps {
  type?: AdType; // Made optional since children might define their own layout
  content?: string | React.ReactNode;
  imageUrl?: string;
  link?: string; // Made optional for cases where children handle their own links
  altText?: string;
  className?: string;
  rotationInterval?: number;
  ads?: Array<{
    content?: string | React.ReactNode;
    imageUrl?: string;
    link?: string;
    altText?: string;
  }>;
  closable?: boolean;
  onClose?: () => void;
  localStorageKey?: string;
  children?: React.ReactNode; // Added children prop
}

const Advertisement: React.FC<AdvertisementProps> = ({
  type = "banner", // Default type
  content,
  imageUrl,
  link,
  altText = "Advertisement",
  className = "",
  rotationInterval = 0,
  ads = [],
  closable = true,
  children,
}) => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isClosed, setIsClosed] = useState(false);
  const adsToDisplay =
    ads.length > 0 ? ads : [{ content, imageUrl, link, altText }];

  React.useEffect(() => {
    if (rotationInterval > 0 && adsToDisplay.length > 1 && !isClosed) {
      const interval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % adsToDisplay.length);
      }, rotationInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [rotationInterval, adsToDisplay.length, isClosed]);

  const getDimensions = () => {
    switch (type) {
      case "banner":
        return "w-full h-16 md:h-20";
      case "rectangle":
        return "w-[300px] h-[250px]"; // Fixed Tailwind classes
      case "skyscraper":
        return "w-[160px] h-[600px]"; // Fixed Tailwind classes
      default:
        return "w-full h-auto";
    }
  };

  const handleClose = () => {
    setIsClosed(true);
  };

  if (isClosed) return null;

  const currentAd = adsToDisplay[currentAdIndex];

  return (
    <div>
      <div
        className={`ad-container relative ${getDimensions()} ${className} bg-gray-50 rounded-md overflow-hidden`}
      >
        {closable && (
          <button
            onClick={handleClose}
            aria-label="Close advertisement"
            className="absolute top-1 right-1 z-10 p-1 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Render children if provided, otherwise render default ad content */}
        {children ? (
          <div className="w-full h-full">{children}</div>
        ) : (
          <Link
            href={currentAd.link || ""}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            {currentAd.imageUrl ? (
              <Image
                src={currentAd.imageUrl}
                alt={currentAd.altText || ""}
                className="w-full h-full object-contain"
                width={400}
                height={400}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 p-2">
                {currentAd.content || "Advertisement"}
              </div>
            )}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Advertisement;
