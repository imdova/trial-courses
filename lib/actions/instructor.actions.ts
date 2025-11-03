import { TAGS } from "@/constants/api";
import { API_GET_PUBLIC_INSTRUCTOR_BY_USERNAME } from "@/constants/api/instructor";
import { Result } from "@/types";
import { InstructorType } from "@/types/instructor-type";

export const getInstructorByUserName = async (
  userName: string,
  token?: string,
): Promise<Result<InstructorType>> => {
  try {
    const response = await fetch(
      API_GET_PUBLIC_INSTRUCTOR_BY_USERNAME.replace("{userName}", userName),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { tags: [TAGS.instructors] },
      },
    );
    if (response.ok) {
      const data = await response.json(); // Replace 'any' with your InstructorType
      return {
        success: true,
        message: "Instructor fetched successfully",
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
