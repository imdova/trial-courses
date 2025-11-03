"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Link, Mail, Facebook, Twitter } from "lucide-react";
import IconButton from "./Buttons/IconButton";

type SharePlatform = "copy" | "email" | "facebook" | "twitter";

interface ShareOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  action: () => void;
}

interface ShareDropdownProps {
  url?: string;
  title?: string;
  options?: SharePlatform[] | Partial<ShareOption>[];
  customOptions?: ShareOption[];
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  onShare?: (platform: string) => void;
}

const ShareDropdown = ({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "",
  options = ["copy", "email", "facebook", "twitter"],
  customOptions = [],
  className = "",
  buttonClassName = "",
  dropdownClassName = "",
  onShare,
}: ShareDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Default share actions
  const defaultActions: Record<SharePlatform, ShareOption> = {
    copy: {
      id: "copy",
      name: "Copy Link",
      icon: <Link size={16} />,
      action: () => {
        navigator.clipboard.writeText(url);
        onShare?.("copy");
      },
    },
    email: {
      id: "email",
      name: "Email",
      icon: <Mail size={16} />,
      action: () => {
        window.open(
          `mailto:?subject=${encodeURIComponent(
            title
          )}&body=${encodeURIComponent(`${title}\n\n${url}`)}`
        );
        onShare?.("email");
      },
    },
    facebook: {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook size={16} />,
      action: () => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`
        );
        onShare?.("facebook");
      },
    },
    twitter: {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter size={16} />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            title
          )}&url=${encodeURIComponent(url)}`
        );
        onShare?.("twitter");
      },
    },
  };

  // Generate share options based on props
  const generateShareOptions = (): ShareOption[] => {
    const enabledOptions = options.map((option) => {
      if (typeof option === "string") {
        return defaultActions[option];
      }
      return {
        ...defaultActions[option.id as SharePlatform],
        ...option,
      };
    });

    return [...enabledOptions, ...customOptions];
  };

  const shareOptions = generateShareOptions();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <IconButton
        Icon={Share2}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Share options"
        className={buttonClassName}
      />

      {isOpen && (
        <div
          className={`absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${dropdownClassName}`}
        >
          <div className="py-1">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  option.action();
                  setIsOpen(false);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span className="mr-3">{option.icon}</span>
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareDropdown;
