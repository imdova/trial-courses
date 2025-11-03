"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { signIn } from "@/auth";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <NextAuthToken />
      {children}
    </SessionProvider>
  );
};

const NextAuthToken = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [session?.error]);

  return null;
};
