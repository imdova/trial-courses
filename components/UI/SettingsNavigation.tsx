"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import { OptionTab } from "@/types";

const SettingsNavTab = ({
  tab,
  isActive,
}: {
  tab: OptionTab;
  isActive: boolean;
}) => {
  return (
    <Link
      href={tab.value}
      className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? "border-b-2 border-primary text-primary"
          : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {tab.icon}
      {tab.label}
    </Link>
  );
};

const SettingsNavTabs = ({ tabs }: { tabs: OptionTab[] }) => {
  const pathname = usePathname();

  const isCurrentTab = (tab: OptionTab) => {
    const currentPath = pathname.replace(/\/$/, ""); // remove trailing slash
    const tabPath = tab.value.replace(/\/$/, "");

    if (tab.pattern) {
      return new RegExp(tab.pattern).test(currentPath);
    }

    // Split paths into segments
    const currentSegments = currentPath.split("/").filter(Boolean);
    const tabSegments = tabPath.split("/").filter(Boolean);

    // Check if current path starts with all tab segments exactly
    if (currentSegments.length < tabSegments.length) {
      return false;
    }

    for (let i = 0; i < tabSegments.length; i++) {
      if (currentSegments[i] !== tabSegments[i]) {
        return false;
      }
    }

    // If paths are exactly the same, or tab is a parent and we allow child matches
    return (
      currentSegments.length === tabSegments.length ||
      (tab.matchChildren && currentSegments.length > tabSegments.length)
    );
  };

  return (
    <div className="grid  w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto scroll-bar-hidden">
        <nav className="flex min-w-fit">
          {tabs.map((tab) => (
            <SettingsNavTab
              key={tab.value}
              tab={tab}
              isActive={isCurrentTab(tab) ?? false}
            />
          ))}
        </nav>
      </div>
    </div>
  );
};

const SettingsNavTabsSkeleton = ({ length }: { length: number }) => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <nav className="flex animate-pulse">
          {Array.from({ length }).map((_, index) => (
            <div key={index} className="h-12 w-24 bg-gray-100 mx-2"></div>
          ))}
        </nav>
      </div>
    </div>
  );
};

const SettingsNavigation = ({ tabs }: { tabs: OptionTab[] }) => {
  return (
    <Suspense fallback={<SettingsNavTabsSkeleton length={tabs.length} />}>
      <SettingsNavTabs tabs={tabs} />
    </Suspense>
  );
};

export default SettingsNavigation;
