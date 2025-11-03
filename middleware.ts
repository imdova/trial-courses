/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import { User } from "next-auth";
import { NextResponse } from "next/server";
import { isCurrentPage } from "./util";

export default auth((req: any) => {
  const user = req.auth?.user;
  const path = req.nextUrl.pathname;

  // Redirect to login page if there is no accessible token
  if (!user) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  const userType = user.type as User["type"];
  if (path == "/me") {
    const redirectMap: Record<User["type"], string> = {
      instructor: `/in/${user.userName}`,
      student: `/st/${user.userName}`,
      admin: `/admin`,
      academy_admin: `/ac/${user.academy.slug}`,
      unverified: `/`,
    };

    const redirectPath = redirectMap[userType];
    return NextResponse.redirect(new URL(redirectPath, req.url));
  }

  const haveAccess = hasAccessToURL(userType, path);

  if (!haveAccess) {
    // Redirect to login page if user has no access to that particular page
    return NextResponse.rewrite(new URL("/403", req.url));
  }
  // Allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/student/:path*",
    "/instructor/:path*",
    "/admin/:path*",
    "/lms/:path*",
    "/me",
  ],
};

const roleAccessMap: Record<User["type"], string[]> = {
  student: ["/student/*"],
  instructor: ["/instructor/*", "/instructor", "/lms/*"],
  academy_admin: ["/instructor/*", "/instructor", "/lms/*", "/academy/*"],
  admin: ["/admin/*", "/lms/*", "/instructor/*", "/student/*"],
  unverified: ["/"],
};

function hasAccessToURL(userType: User["type"], url: string): boolean {
  const rolePatterns = roleAccessMap[userType] || [];
  const hasRoleAccess = rolePatterns.some((pattern) =>
    isCurrentPage(url, pattern),
  );
  if (!hasRoleAccess) return false;
  return true;
}
