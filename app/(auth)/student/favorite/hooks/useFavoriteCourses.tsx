import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { EnrolledCourse } from "@/types/enrolledCourses";
import { 
  API_GET_FAVORITE_COURSES, 
  API_ADD_OR_REMOVE_FAVORITE_COURSE 
} from "@/constants/api/favoriteCourses";

export const useFavoriteCourses = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  
  const [favoriteCourses, setFavoriteCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // Fetch favorite courses
  const getFavoriteCourses = useCallback(async () => {
    if (!token) {
      setError("Authentication required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(API_GET_FAVORITE_COURSES, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch favorite courses: ${response.statusText}`);
      }

      const result = await response.json();
      
      // Handle different response formats
      if (result.data) {
        setFavoriteCourses(Array.isArray(result.data) ? result.data : []);
      } else if (Array.isArray(result)) {
        setFavoriteCourses(result);
      } else {
        setFavoriteCourses([]);
      }
    } catch (err) {
      console.error("Error fetching favorite courses:", err);
      setError(err instanceof Error ? err.message : "Failed to load favorite courses");
      setFavoriteCourses([]);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Add course to favorites
  const addFavorite = useCallback(
    async (courseId: string) => {
      if (!token) {
        setError("Authentication required");
        return false;
      }

      try {
        const endpoint = API_ADD_OR_REMOVE_FAVORITE_COURSE.replace("{id}", courseId);
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to add to favorites");
        }

        // Refresh the list
        await getFavoriteCourses();
        return true;
      } catch (err) {
        console.error("Error adding to favorites:", err);
        setError(err instanceof Error ? err.message : "Failed to add to favorites");
        return false;
      }
    },
    [token, getFavoriteCourses]
  );

  // Remove course from favorites
  const removeFavorite = useCallback(
    async (courseId: string) => {
      if (!token) {
        setError("Authentication required");
        return false;
      }

      setRemovingId(courseId);

      try {
        const endpoint = API_ADD_OR_REMOVE_FAVORITE_COURSE.replace("{id}", courseId);
        const response = await fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to remove from favorites");
        }

        // Remove from local state immediately for better UX
        setFavoriteCourses((prev) => prev.filter((course) => course.id !== courseId));
        return true;
      } catch (err) {
        console.error("Error removing from favorites:", err);
        setError(err instanceof Error ? err.message : "Failed to remove from favorites");
        return false;
      } finally {
        setRemovingId(null);
      }
    },
    [token]
  );

  // Check if course is favorited
  const isFavorite = useCallback(
    (courseId: string) => {
      return favoriteCourses.some((course) => course.id === courseId);
    },
    [favoriteCourses]
  );

  // Toggle favorite status
  const toggleFavorite = useCallback(
    async (courseId: string) => {
      if (isFavorite(courseId)) {
        return await removeFavorite(courseId);
      } else {
        return await addFavorite(courseId);
      }
    },
    [isFavorite, removeFavorite, addFavorite]
  );

  return {
    favoriteCourses,
    loading,
    error,
    removingId,
    getFavoriteCourses,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};

