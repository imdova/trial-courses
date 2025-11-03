"use client";
import { useEffect, useRef, useState } from "react";
import { Bell, BellRing } from "lucide-react";
import { Notification } from "@/types";
import Image from "next/image";
import Link from "next/link";
import MainBtn from "./Buttons/MainBtn";

interface notificationProps {
  notification: Notification[];
}

const AlertDropDown: React.FC<notificationProps> = ({ notification }) => {
  const [isAlertMenuOpen, setIsAlertMenuOpen] = useState(false);
  const AlertMenuRef = useRef<HTMLDivElement | null>(null);
  const toggleDropdown = () => setIsAlertMenuOpen((prev) => !prev);
  const closeDropdown = () => setIsAlertMenuOpen(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        AlertMenuRef.current &&
        !AlertMenuRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown when pressing Escape key
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") closeDropdown();
  };

  return (
    <div className="relative">
      {notification.length ? (
        <span className="flex justify-center items-center absolute text-[7px] w-3 h-3 rounded-full bg-orange-500 -top-2 -right-1 ">
          {notification.length}
        </span>
      ) : (
        ""
      )}
      {/* Alert Button */}
      <div ref={AlertMenuRef}>
        <button
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          type="button"
          className="flex justify-center items-center focus:outline-none cursor-pointer"
          id="user-menu-button"
          aria-expanded={isAlertMenuOpen}
          aria-haspopup="true"
        >
          <span className="sr-only">Open Alert menu</span>
          <Bell size={18} />
        </button>

        {/* Dropdown Menu */}
        {isAlertMenuOpen && (
          <div className="box-content absolute top-12 -right-16 md:right-0 w-[280px] md:w-[400px] rounded-md min-h-[100px] p-4 bg-white">
            {notification.length ? (
              <div>
                {notification.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex items-center justify-between gap-2  border-b py-3 border-gray-100"
                  >
                    <div className="flex items-center space-x-5">
                      <Image
                        className="w-8 h-8 rounded-full"
                        src={notification.user.image || ""} // Correct reference to user photo
                        alt={notification.user.firstName || ""} // Correct reference to user name
                        width={32} // Small width for user photo
                        height={32} // Small height for user photo
                      />
                      <div>
                        <h4 className="font-semibold text-black">
                          {notification.title}
                        </h4>
                        {/* Correct reference to title */}
                        <p className="text-sm text-gray-600">
                          {notification.message}
                        </p>
                        {/* Correct reference to message */}
                      </div>
                    </div>
                    <div>
                      <Link
                        href={notification.action.url} // Correct reference to action URL
                        className="flex items-center text-xs font-medium text-secondary hover:text-primary"
                      >
                        {notification.action.label}
                        {/* Correct reference to action label */}
                      </Link>
                    </div>
                  </div>
                ))}
                <MainBtn width="100%">View All</MainBtn>
              </div>
            ) : (
              // if notfcation is Empty
              <div className="flex justify-center items-center h-[400px] w-full">
                <div className="flex flex-col items-center">
                  <div className="flex justify-center items-center w-28 h-28 bg-[#eee] rounded-full mb-6">
                    <BellRing className="text-muted-foreground" size={40} />
                  </div>
                  <h2 className="text-lg text-black font-semibold">
                    No Notifications Yet
                  </h2>
                  <span className="text-muted-foreground text-xs">
                    You have no notifications right now. Come back later
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertDropDown;
