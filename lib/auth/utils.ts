import { RegisterFormData, SigninFormData } from "@/types/users";
import { serverRegister, serverSignIn } from "../access";

export async function authenticateUser(
  credentials: Partial<Record<"email" | "password", unknown>>,
) {
  if (!credentials?.email || !credentials?.password) return null;
  try {
    const signinFormData = {
      email: credentials.email,
      password: credentials.password,
    } as SigninFormData;
    const result = await serverSignIn(signinFormData);
    if (!result.success || !result.data) return null;
    return result.data;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
export async function authRegisterUser(
  credentials: Partial<
    Record<
      | "firstName"
      | "lastName"
      | "email"
      | "password"
      | "role"
      | "academyName"
      | "academySlug",
      unknown
    >
  >,
) {
  if (!credentials?.email || !credentials?.password) return null;
  try {
    const registerFormData = {
      email: credentials.email,
      password: credentials.password,
      firstName: credentials.firstName,
      lastName: credentials.lastName,
      role: credentials.role,
      academy: {
        name: credentials.academyName,
        slug: credentials.academySlug,
      },
    } as RegisterFormData;

    const result = await serverRegister(registerFormData);
    if (!result.success || !result.data) return null;
    return result.data;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
