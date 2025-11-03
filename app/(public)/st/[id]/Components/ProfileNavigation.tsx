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

const ProfileNavTabs: React.FC<{ tab: ProfileTabs }> = ({ tab: activeTab }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onTabChange = (_: React.SyntheticEvent, tab: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("tab", tab);
    router.push(createUrl(pathname, newParams));
  };

  return (
    <div className="body-container overflow-hidden text-primary rounded-base border border-gray-200 bg-white shadow-soft">
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons={false}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            value={tab.value}
            className="font-semibold normal-case"
          />
        ))}
      </Tabs>
    </div>
  );
};
const ProfileTabsSk = () => {
  return (
    <Tabs variant="scrollable" scrollButtons={false}>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          value={tab.value}
          className="font-semibold normal-case"
        />
      ))}
    </Tabs>
  );
};
const ProfileNavigation: React.FC<{ tab: ProfileTabs }> = (props) => {
  return (
    <Suspense fallback={<ProfileTabsSk />}>
      <ProfileNavTabs {...props} />
    </Suspense>
  );
};

export default ProfileNavigation;
