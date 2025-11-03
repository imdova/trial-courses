import { API_GET_ACADEMY_BY_SLUG } from "@/constants/api/academy";
import { Result } from "@/types";
import { Academy } from "@/types/academy";
import { unstable_cache } from "next/cache";

export const getAcademyBySlug = unstable_cache(
  async (slug: string): Promise<Result<Academy>> => {
    try {
      const response = await fetch(API_GET_ACADEMY_BY_SLUG + slug, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      if (response.ok) {
        const data: Academy = await response.json();
        return {
          success: true,
          message: "Academy fetched successfully",
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
  },
  ["academy"],
  {
    revalidate: false,
  },
);
