"use client";
import { Option } from "@/types/forms";
import { createUrl } from "@/util";
import { Tab, Tabs } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

type ProfileTabs = "personal-info" | "professional" | "career-preference";

export const tabs: Option<Record<ProfileTabs, string>>[] = [
  { label: "Personal Info", value: "personal-info" },
  { label: "Professional Info", value: "professional" },
];

interface ProfileNavTabsProps {
  tab: ProfileTabs;
  onTabChange: (tab: ProfileTabs) => void;
}

const ProfileNavTabs = ({
  tab: activeTab,
  onTabChange,
}: ProfileNavTabsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleTabChange = (_: React.SyntheticEvent, newTab: string) => {
    // Update parent component state
    onTabChange(newTab as ProfileTabs);

    // Update URL
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", newTab);
    router.push(createUrl(pathname, newParams), { scroll: false });
  };

  return (
    <div className="body-container overflow-hidden text-primary rounded-base border border-gray-200 bg-white shadow-soft">
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons={false}
        aria-label="Profile tabs"
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            className="font-semibold normal-case"
          />
        ))}
      </Tabs>
    </div>
  );
};

const ProfileTabsSkeleton = () => {
  return (
    <div className="body-container overflow-hidden text-primary rounded-base border border-gray-200 bg-white shadow-soft">
      <Tabs variant="scrollable" scrollButtons={false}>
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            value={tab.value}
            className="font-semibold normal-case"
          />
        ))}
      </Tabs>
    </div>
  );
};

interface ProfileNavigationProps {
  tab: ProfileTabs;
  onTabChange?: (tab: ProfileTabs) => void;
}

export const ProfileNavigation = ({
  tab,
  onTabChange = () => {},
}: ProfileNavigationProps) => {
  return (
    <Suspense fallback={<ProfileTabsSkeleton />}>
      <ProfileNavTabs tab={tab} onTabChange={onTabChange} />
    </Suspense>
  );
};
