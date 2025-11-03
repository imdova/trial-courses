"use server";

import {
  API_LOGIN,
  API_LOGOUT,
  API_REGISTER_USER,
} from "@/constants/api/users";
import { Result } from "@/types";
import { UserResponse } from "@/types/next-auth";
import { RegisterFormData, SigninFormData } from "@/types/users";
import { errorResult } from "@/util/general";
import { getUserFromResponse } from "@/util/user";
import { User } from "next-auth";

export const serverRegister = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  academy,
}: RegisterFormData): Promise<Result<User>> => {
  try {
    const response = await fetch(API_REGISTER_USER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        role,
        academy,
      }),
    });
    if (!response.ok) return errorResult("serverSignIn");
    const userResponse: UserResponse = await response.json();
    const user = await getUserFromResponse(userResponse);
    return {
      success: true,
      message: "login successfully",
      data: user,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An error occurred at Register",
      };
    } else {
      return {
        success: false,
        message: "Unknown error : Failed to Register",
      };
    }
  }
};

export const serverSignIn = async ({
  email,
  password,
}: SigninFormData): Promise<Result<User>> => {
  try {
    const response = await fetch(API_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!response.ok) return errorResult("serverSignIn");
    const userResponse: UserResponse = await response.json();
    const user = await getUserFromResponse(userResponse);
    return {
      success: true,
      message: "login successfully",
      data: user,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An error occurred at Login",
      };
    } else {
      return {
        success: false,
        message: "Unknown error : Failed to Login",
      };
    }
  }
};

export const serverSignOut = async () => {
  try {
    const response = await fetch(API_LOGOUT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) return errorResult("serverSignOut");
    return {
      success: true,
      message: "logout successfully",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message || "An error occurred at Logout",
      };
    } else {
      return {
        success: false,
        message: "Unknown error : Failed to Logout",
      };
    }
  }
};
