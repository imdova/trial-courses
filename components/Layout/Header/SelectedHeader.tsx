"use client";
import MinimalHeader from "./MinimalHeader";
import FullHeader from "./FullHeader";
import CenteredHeader from "./CenteredHeader";
import TransparentHeader from "./TransparentHeader";
import DarkHeader from "./DarkHeader";
import { usePathname } from "next/navigation";
import { User } from "next-auth";
import HomeHeader from "./HomeHeader";
import { routeConfigs } from "@/config/routeConfigs";
import { matchRoute } from "@/util/navigation";
import { useGeoLocation } from "@/hooks/useGeoLocation";
import { useEffect } from "react";

const HeaderSelector: React.FC<{ user?: User }> = ({ user }) => {
  const { getGeoData } = useGeoLocation();

  const pathname = usePathname();

  const headerType =
    matchRoute(routeConfigs, pathname)?.headerType || "minimal";

  const headerComponents = {
    minimal: MinimalHeader,
    full: FullHeader,
    centered: CenteredHeader,
    transparent: TransparentHeader,
    dark: DarkHeader,
    home: HomeHeader,
  };

  useEffect(() => {
    getGeoData();
  }, [getGeoData]);

  if (headerType === "none") return null;
  const SelectedHeader = headerComponents[headerType];

  return <SelectedHeader user={user} pathname={pathname} />;
};

export default HeaderSelector;
