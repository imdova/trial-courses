import { TAGS } from "@/constants/api";
import { API_GET_BLOG_BY_ID, API_GET_BLOGS } from "@/constants/api/blog";
import { Result } from "@/types";
import { BlogType } from "@/types/blog";

export const getBlog = async (id: string): Promise<Result<BlogType>> => {
  try {
    const response = await fetch(API_GET_BLOG_BY_ID + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      next: { tags: [TAGS.blogs] },
    });
    if (response.ok) {
      const data: BlogType = await response.json();
      return {
        success: true,
        message: "Jobs list fetched successfully",
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

export const getAllBlogs = async (): Promise<
  Result<PaginatedResponse<BlogType>>
> => {
  try {
    const response = await fetch(API_GET_BLOGS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      next: { tags: [TAGS.blogs] },
    });
    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: "Blogs fetched successfully",
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