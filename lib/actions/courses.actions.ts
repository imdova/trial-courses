import { TAGS } from "@/constants/api";
import {
  API_GET_COURSE_BY_ID,
  API_GET_COURSE_BY_SLUG,
  API_GET_COURSE_SECTIONS,
  API_GET_PUBLIC_COURSES_BY_ACADEMY,
} from "@/constants/api/course";
import { Result } from "@/types";
import { CourseItem, CourseType, CurriculumModule } from "@/types/courses";
import { unstable_cache } from "next/cache";

export async function getCourses(): Promise<CourseType[]> {
  const res = await fetch(`http://localhost:3000/api/courses`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch courses");
  }

  return res.json();
}

export const getCourseByID = async (
  id: string,
  token?: string,
): Promise<Result<CourseItem>> => {
  if (!token) {
    return {
      success: false,
      message: "No token provided",
    };
  }
  try {
    const response = await fetch(API_GET_COURSE_BY_ID + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      next: { tags: [TAGS.courses] },
    });
    if (response.ok) {
      const data: CourseItem = await response.json();
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
export const getCourseSectionsByID = async (
  id: string,
  token?: string,
): Promise<Result<CurriculumModule[]>> => {
  try {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      accept: "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await fetch(
      API_GET_COURSE_SECTIONS.replace("{courseId}", id),
      {
        method: "GET",
        headers: headers,
        next: { tags: [TAGS.courses] },
      },
    );
    if (response.ok) {
      const data: CurriculumModule[] = await response.json();
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

export const getFullCourseByID = async (
  id: string,
  token?: string,
): Promise<Result<{ course: CourseItem; sections: CurriculumModule[] }>> => {
  if (!token) {
    return {
      success: false,
      message: "No token provided",
    };
  }
  try {
    const courseResponse = await getCourseByID(id, token);
    const sectionsResponse = await getCourseSectionsByID(id, token);

    if (!courseResponse.success || !sectionsResponse.success) {
      return {
        success: false,
        message: "Failed to fetch course and sections",
      };
    }

    if (!courseResponse.data || !sectionsResponse.data) {
      return {
        success: false,
        message: "Failed to fetch course and sections",
      };
    }
    return {
      success: true,
      message: "Course and sections fetched successfully",
      data: {
        course: courseResponse.data,
        sections: sectionsResponse.data,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occurred ${error}`,
    };
  }
};

export const getCourseBySlug = async (
  slug: string,
): Promise<Result<CourseItem>> => {
  try {
    const response = await fetch(API_GET_COURSE_BY_SLUG + slug, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      next: { tags: ["courses"] }, // still keeps Next.js cache tags
    });

    if (response.ok) {
      const data: CourseItem = await response.json();
      return {
        success: true,
        message: "Course fetched successfully",
        data,
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

export const getAcademyPublicCourses = unstable_cache(
  async (
    academyId: string,
  ): Promise<Result<PaginatedResponse_New<CourseItem>>> => {
    try {
      const response = await fetch(
        API_GET_PUBLIC_COURSES_BY_ACADEMY + academyId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
        },
      );
      if (response.ok) {
        const data: PaginatedResponse_New<CourseItem> = await response.json();
        return {
          success: true,
          message: "Courses fetched successfully",
          data,
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
  },
  ["academyCourses"],
  {
    revalidate: false,
  },
);
