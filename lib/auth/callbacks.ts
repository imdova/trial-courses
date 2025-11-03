/* eslint-disable @typescript-eslint/no-explicit-any */
// import { API_REFRESH_TOKEN } from "@/constants/api/users";
import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import { API_REFRESH_TOKEN } from "@/constants/api/users";
import { UserResponse } from "@/types/next-auth";
// import { UserResponse } from "@/types/next-auth";

export const callbacks = {
  jwt: async ({
    token,
    user,
    account,
    trigger,
    session,
  }: {
    token: JWT;
    user: any;
    account?: any;
    trigger?: "update" | "signIn" | "signUp" | undefined;
    session?: any;
  }) => {
    // On login → store initial tokens
    if (user && account) {
      token.id = user.id;
      token.email = user.email;
      token.firstName = user.firstName;
      token.lastName = user.lastName;
      token.image = user.image || user.image;
      token.userName = user.userName;
      token.permissions = user.permissions;
      token.type = user.type;
      token.accessToken = user.accessToken;
      token.refreshToken = user.refreshToken;
      token.academy = user.academy;
      token.hasAcademy = user.hasAcademy;
    }

    if (trigger === "update") {
      if (session?.email) token.email = session.email;
      if (session?.firstName) token.firstName = session.firstName;
      if (session?.lastName) token.lastName = session.lastName;
      if (session?.userName) token.userName = session.userName;
      if (session?.image) token.image = session.image;
      if (session?.user?.academy) token.academy = session.user.academy;
    }

    if (token.accessToken) {
      const decodedToken = jwtDecode(token.accessToken as string);
      if (decodedToken.exp) {
        token.accessTokenExpires = (decodedToken.exp - 300) * 1000;
      }
    }
    // console.log(
    //   "🔍 ~ jwt ~ medicova-courses/lib/auth/callbacks.ts:52 ~ (Date.now() < (token.accessTokenExpires as number)):",
    //   ((token.accessTokenExpires as number) - Date.now()) / 1000 / 60,
    // );
    if (Date.now() < (token.accessTokenExpires as number)) {
      return token;
    }
    token = await refreshAccessToken(token);
    return token;
  },
  async session({ session, token }: { session: Session; token: JWT }) {
    if (session.user) {
      session.user.id = token.id as string | null;
      session.user.email = token.email as string | null;
      session.user.firstName = token.firstName as string | null;
      session.user.lastName = token.lastName as string | null;
      session.user.userName = token.userName as string | null;
      session.user.image = token.image as string | null;
      session.user.type = token.type as User["type"];
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.academy = token.academy as User["academy"];
      session.user.hasAcademy = token.hasAcademy as boolean;
    }
    session.error = token.error as string;
    return session;
  },
};

 async function refreshAccessToken(token: any) {
  try {
    const url = API_REFRESH_TOKEN.replace("{token}", token.refreshToken);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const refreshedTokens: UserResponse = await response.json();

    if (!response.ok) throw refreshedTokens;
    const decodedToken = jwtDecode(token.accessToken as string);
    if (decodedToken.exp) {
      token.accessTokenExpires = (decodedToken.exp - 300) * 1000;
    }
    console.log(
      "🔍 ~ refreshAccessToken ~ medicova-courses/lib/auth/callbacks.ts:94 ~ refreshed",
    );
    return {
      ...token,
      accessToken: refreshedTokens.tokens?.access_token,
      refreshToken: refreshedTokens.tokens?.refresh_token ?? token.refreshToken,
    };
  } catch (err) {
    console.error("Refresh error", err);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}
