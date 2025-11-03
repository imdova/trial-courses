import { RoleBasedLinks } from "@/types";
import {
  Calendar,
  GraduationCap,
  Home,
  Hospital,
  Layers,
  Newspaper,
} from "lucide-react";

export const roleBasedLinks: RoleBasedLinks = {
  instructor: [
    {
      id: 1,
      permissions: [],
      label: "Dashboard",
      path: "/instructor/dashboard",
    },
    {
      id: 2,
      permissions: [],
      label: "All Courses",
      path: "/instructor/courses",
      pattern: "/instructor/courses/*",
    },
    {
      id: 3,
      permissions: [],
      label: "Add New Course",
      path: "/lms/course/add",
    },
  ],
  academy_admin: [
    {
      id: 1,
      permissions: [],
      label: "Dashboard",
      path: "/instructor/dashboard",
    },
    {
      id: 2,
      permissions: [],
      label: "All Courses",
      path: "/instructor/courses",
      pattern: "/instructor/courses/*",
    },
    {
      id: 3,
      permissions: [],
      label: "Add New Course",
      path: "/lms/course/add",
    },
  ],
  student: [
    {
      id: 0,
      permissions: [],
      label: "Dashboard",
      path: "/student/dashboard",
    },
    {
      id: 1,
      permissions: [],
      label: "Explore Courses",
      path: "/courses",
      pattern: "/courses/*",
    },
    {
      id: 2,
      permissions: [],
      label: "My Courses",
      path: "/student/my-courses",
    },
  ],
  admin: [
    {
      id: 1,
      permissions: [],
      label: "Admin Dashboard",
      path: "/admin",
    },
    {
      id: 1,
      permissions: [],
      label: "User Management",
      path: "/admin/users",
    },
    {
      id: 1,
      permissions: [],
      label: "Settings",
      path: "/admin/settings",
    },
  ],
  default: [
    {
      id: 1,
      permissions: [],
      label: "Home",
      icon: Home,
      path: "/",
    },
    {
      id: 2,
      permissions: [],
      label: "Courses",
      icon: GraduationCap,
      path: "/courses",
      pattern: "/courses/*",
    },
    {
      id: 3,
      permissions: [],
      label: "Jobs",
      icon: Hospital,
      path: "http://medicova.net/",
    },
    {
      id: 4,
      permissions: [],
      label: "Resources",
      icon: Layers,
      path: "/resources",
      pattern: "/resources/*",
    },
    {
      id: 5,
      permissions: [],
      label: "Events",
      icon: Calendar,
      path: "/events",
      pattern: "/events/*",
    },
    {
      id: 6,
      permissions: [],
      label: "Store",
      icon: Calendar,
      path: "/store",
      pattern: "/store/*",
    },
    {
      id: 7,
      permissions: [],
      label: "Blogs",
      icon: Newspaper,
      path: "/blogs",
      pattern: "/blogs/*",
    },
  ],
  unverified: [],
};
