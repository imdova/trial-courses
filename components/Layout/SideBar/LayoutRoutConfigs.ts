import { roleBasedSideBarLinks } from "@/constants/side-bar";
import { SideBarType } from "@/types/navigation";
import { RoleState } from "@/types/next-auth";
import { User } from "next-auth";

type LinksType = "default" | "userType";

interface RouteConfig {
  pattern: string;
  sideBarType: SideBarType;
  linksType?: LinksType;
}

export const routeConfigs: RouteConfig[] = [
  // default

  { pattern: "/chat", sideBarType: "minimal", linksType: "userType" },
  { pattern: "/notifications", sideBarType: "full", linksType: "userType" },
  { pattern: "/blogs/*", sideBarType: "minimal", linksType: "userType" },

  { pattern: "/courses/view/*", sideBarType: "minimal", linksType: "userType" },

  {
    pattern: "/instructor/dashboard",
    sideBarType: "full",
    linksType: "userType",
  },
  { pattern: "/instructor/*", sideBarType: "full", linksType: "userType" },
  { pattern: "/in/*", sideBarType: "full", linksType: "userType" },
  //student
  { pattern: "/student/*", sideBarType: "full", linksType: "userType" },
  { pattern: "/st/*", sideBarType: "full", linksType: "userType" },
  { pattern: "/cart", sideBarType: "full", linksType: "userType" },
  //admin
  { pattern: "/admin/*", sideBarType: "admin-full", linksType: "userType" },

  { pattern: "/lms/*", sideBarType: "full", linksType: "userType" },
];

export const matchRoute = (pathname: string): RouteConfig | undefined => {
  // First, prioritize exact matches (including dynamic segments)
  const exactMatch = routeConfigs.find((route) => {
    // Handle dynamic segments (e.g., "/user/[id]")
    const regexPattern = route.pattern
      .replace(/\[.*?\]/g, "[^/]+")
      .replace(/\//g, "\\/");
    const regex = new RegExp(`^${regexPattern}$`);
    return regex.test(pathname);
  });

  if (exactMatch) return exactMatch;

  // If no exact match, check for wildcard patterns
  const wildcardMatch = routeConfigs.find((route) => {
    if (route.pattern.includes("*")) {
      // Convert wildcard pattern into a base path regex
      const wildcardPattern = route.pattern.replace(/\*/g, ".*");
      const regex = new RegExp(`^${wildcardPattern}`);
      return regex.test(pathname);
    }
    return false;
  });

  return wildcardMatch;
};

export function getSideBarLinks(user?: User, pathname?: string) {
  const userType = user?.type as RoleState;
  if (pathname) {
    const type = matchRoute(pathname)?.linksType;
    if (type === "userType" && userType) {
      return roleBasedSideBarLinks[userType];
    }
  }
  return roleBasedSideBarLinks.default;
}
