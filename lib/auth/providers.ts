import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser, authRegisterUser } from "./utils";

export const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: authenticateUser,
  }),
  CredentialsProvider({
    id: "register-Credentials",
    name: "register Credentials",
    credentials: {
      firstName: { type: "text" },
      lastName: { type: "text" },
      email: { type: "email" },
      password: { type: "password" },
      role: { type: "text" },
      academyName: { type: "text" },
      academySlug: { type: "text" },
    },
    authorize: authRegisterUser,
  }),
];
