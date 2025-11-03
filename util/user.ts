import { UserResponse } from "@/types/next-auth";
import { User } from "next-auth";

export function getUserSharedData(user: User) {
  let userName = "";
  let image = "";
  let name = "";
  let profileUrl = "";
  let email = "";
  switch (user.type) {
    case "student":
      userName = user.userName || "";
      image = user.image || "";
      name = user.firstName ?? "";
      email = user.email ?? "";
      profileUrl = `/st/${user.userName}`;
      break;
    case "instructor":
      userName = user.userName || "";
      image = user.image || "";
      name = user.firstName ?? "";
      email = user.email ?? "";
      profileUrl = `/in/${user.userName}`;
      break;
    case "admin":
      userName = "Admin";
      image = user?.image || "";
      name = user?.firstName ?? "";
      email = user?.email ?? "";
      profileUrl = `/admin`;
      break;
    case "academy_admin":
      userName = user.academy?.slug || "";
      image = user.academy?.image || "";
      name = user.academy?.name ?? "";
      email = user.email ?? "";
      profileUrl = `/ac/${user.academy?.slug}`;
      break;
    default:
      break;
  }

  return { userName, image, name, profileUrl, email };
}

export const getUserFromResponse = async (
  userResponse: UserResponse,
): Promise<User> => {
  const user: User = {
    id: userResponse.user.id,
    email: userResponse.user.email,
    firstName: userResponse.user.firstName,
    lastName: userResponse.user.lastName,
    userName: userResponse.user.userName || null,
    type: userResponse.user.role,
    image: userResponse.user.photo || null,
    permissions: userResponse.user.permissions,
    accessToken: userResponse.tokens?.access_token || "",
    refreshToken: userResponse.tokens?.refresh_token || "",
    academy: userResponse.academy,
    hasAcademy: Boolean(userResponse.academy?.id),
  };
  return user;
};

export function generateMemberId(prefix = "EG"): string {
  const number = Math.floor(Math.random() * 100_000_000) // 0 .. 99,999,999
    .toString()
    .padStart(8, "0"); // 8 digits
  return `${prefix}${number.slice(0, 2)}-${number.slice(2, 5)}-${number.slice(5, 8)}`;
}

export function generatePrefixId(prefix = "EG"): string {
  const num = Math.floor(Math.random() * 10000) // 0–999
    .toString()
    .padStart(4, "0");
  return `${prefix}-${num}`;
}
