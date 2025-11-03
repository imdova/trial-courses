import { fetchEnrolledCourses, fetchLatestCourses, fetchRelatedCourses, fetchCourseItemsProgress, fetchStudentActivity } from "@/store/slices/enrolledCoursesSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { useSession } from "next-auth/react";

export const useEnrolledCourses = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const dispatch = useAppDispatch();
  const { 
    courses, 
    latestCourses, 
    relatedCourses, 
    courseItemsProgress,
    meta, 
    loading, 
    loadingLatest, 
    loadingRelated, 
    loadingItemsProgress,
    error,
    activityStats,
    loadingActivity,
  } = useAppSelector(
    (state) => state.enrolledCourses
  );

  const getEnrolledCourses = useCallback(() => {
    if (token) {
      dispatch(fetchEnrolledCourses({ token }));
    }
  }, [dispatch, token]);

  const getLatestCourses = useCallback(() => {
    if (token) {
      dispatch(fetchLatestCourses({ token }));
    }
  }, [dispatch, token]);

  const getRelatedCourses = useCallback(() => {
    if (token) {
      dispatch(fetchRelatedCourses({ token }));
    }
  }, [dispatch, token]);

  const getCourseItemsProgress = useCallback((courseId: string) => {
    if (token) {
      dispatch(fetchCourseItemsProgress({ courseId, token }));
    }
  }, [dispatch, token]);

  const getStudentActivity = useCallback(() => {
    if (token) {
      dispatch(fetchStudentActivity({ token }));
    }
  }, [dispatch, token]);

  return {
    courses,
    latestCourses,
    relatedCourses,
    courseItemsProgress,
    meta,
    loading,
    loadingLatest,
    loadingRelated,
    loadingItemsProgress,
    error,
    activityStats,
    loadingActivity,
    getEnrolledCourses,
    getLatestCourses,
    getRelatedCourses,
    getCourseItemsProgress,
    getStudentActivity,
  };
};

