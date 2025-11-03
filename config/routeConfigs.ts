import { roleBasedLinks } from "@/constants/header";
import { roleBasedSideBarLinks } from "@/constants/side-bar";
import { NavItem } from "@/types";
import { User } from "next-auth";
import { RouteConfig } from "@/types/navigation";
import { Permission_Keys } from "@/constants/enums/Permission_Keys.enum";
import { matchRoute } from "@/util/navigation";

// Unified Route Configs

export const routeConfigs: RouteConfig[] = [
  // default
  {
    pattern: "/",
    headerType: "home",
    sideBarType: "none",
    linksType: "default",
  },
  {
    pattern: "/prometric-exams/*",
    headerType: "full",
    sideBarType: "none",
    linksType: "default",
  },
  {
    pattern: "/chat",
    headerType: "full",
    sideBarType: "minimal",
    linksType: "userType",
  },
  {
    pattern: "/notifications",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },

  {
    pattern: "/blogs/*",
    headerType: "full",
    sideBarType: "none",
    linksType: "userType",
  },

  {
    pattern: "/search",
    headerType: "transparent",
    sideBarType: "none",
    linksType: "userType",
  },

  {
    pattern: "/courses/*",
    headerType: "full",
    sideBarType: "none",
    linksType: "userType",
  },
  {
    pattern: "/bundles/*",
    headerType: "full",
    sideBarType: "none",
    linksType: "userType",
  },
  {
    pattern: "/courses/view/*",
    headerType: "full",
    sideBarType: "none",
    linksType: "userType",
  },
  {
    pattern: "/event2",
    headerType: "transparent",
    sideBarType: "none",
    linksType: "default",
  },
  {
    pattern: "/events",
    headerType: "full",
    sideBarType: "none",
    linksType: "userType",
  },

  // instructor
  {
    pattern: "/instructor/dashboard",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },
  {
    pattern: "/instructor/students",
    headerType: "full",
    sideBarType: "minimal",
    linksType: "userType",
  },
  {
    pattern: "/instructor/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },
  {
    pattern: "/academy/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },
  {
    pattern: "/in/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },
  {
    pattern: "/ac/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },

  // student
  {
    pattern: "/student/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },
  {
    pattern: "/st/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },
  {
    pattern: "/cart",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },

  // admin
  {
    pattern: "/admin/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },

  {
    pattern: "/lms/*",
    headerType: "full",
    sideBarType: "full",
    linksType: "userType",
  },

  // auth
  {
    pattern: "/auth/*",
    headerType: "minimal",
    sideBarType: "none",
    linksType: "userType",
  },
];

// Header Links
export function getNavLinks(user?: User, pathname?: string) {
  const userType = user?.type;
  if (pathname) {
    const type = matchRoute(routeConfigs, pathname)?.linksType;
    if (type === "userType" && userType) {
      return roleBasedLinks[userType] || roleBasedLinks.default;
    }
  }
  return roleBasedLinks.default;
}

export const hasRequiredPermissions = (
  permissions: Permission_Keys[],
  userPermissions: Permission_Keys[],
) =>
  permissions.length > 0
    ? permissions.some((perm) => userPermissions.includes(perm))
    : true;

// Sidebar Links
export function getSideBarLinks(user?: User, pathname?: string): NavItem[] {
  const userType = user?.type;
  const userPermissions: Permission_Keys[] = user?.permissions || []; // Ensure permissions are available\
  if (pathname) {
    const type = matchRoute(routeConfigs, pathname)?.linksType;
    if (type === "default") return roleBasedSideBarLinks.default;
    if (userType) {
      const links =
        roleBasedSideBarLinks[userType] || roleBasedSideBarLinks.default;
      const filteredLinks = links.filter((x) =>
        hasRequiredPermissions(x.permissions, userPermissions),
      );
      return filteredLinks;
    }
  }
  return roleBasedSideBarLinks.default;
}
