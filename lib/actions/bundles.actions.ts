import { TAGS } from "@/constants/api";
import { API_GET_BUNDLE_BY_ID } from "@/constants/api/bundle.api";
import { Result } from "@/types";
import { CourseBundle } from "@/types/courses";

export const getBundleById = async (
  id: string,
  token?: string,
): Promise<Result<CourseBundle>> => {
  if (!token) {
    return {
      success: false,
      message: "No token provided",
    };
  }
  try {
    const response = await fetch(API_GET_BUNDLE_BY_ID + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: [TAGS.bundles] },
    });
    if (response.ok) {
      const data: CourseBundle = await response.json();
      return {
        success: true,
        message: "Course fetched successfully",
        data: data,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.message || "An error occurred",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `An error occurred ${error}`,
    };
  }
};
