import NextAuth from "next-auth";
import { callbacks } from "./lib/auth/callbacks";
import { providers } from "./lib/auth/providers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers,
  callbacks,
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
  session: {
    strategy: "jwt",
  },
});
