import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  CourseFilters,
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCourseById,
  clearCourse,
  quickUpdateCourse,
  fetchCourseStudents,
  loadCourseFromDB,
  clearCourseError as clearError,
} from "@/store/slices/courses.slice";
import { CourseFormType, CourseItem } from "@/types/courses";
import { convertCourseFormToItem } from "@/app/(auth)/lms/course/util/transformToCourseForm";

export const useInstructorCourse = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const {
    data,
    fetching,
    loading,
    error,
    drafting,
    course,
    students,
    fetchingStudents,
    cachedId,
    previewCourse,
    meta,
  } = useAppSelector((state) => state.instructorCourses);
  // Get the access token from session
  const token = session?.user?.accessToken;

  // Fetch courses with optional filters
  const getCourses = useCallback(
    (filters?: CourseFilters | null) => {
      const initialFilter: CourseFilters = {
        limit: 50,
      };
      if (token)
        return dispatch(
          fetchCourses({ filters: filters || initialFilter, token }),
        );
    },
    [dispatch, token],
  );

  const getPreviewedCourse = useCallback(
    (courseId: string) => {
      return dispatch(loadCourseFromDB(courseId));
    },
    [dispatch],
  );

  const getCourseById = useCallback(
    (id: string) => {
      return token && dispatch(fetchCourseById({ id, token }));
    },
    [dispatch, token],
  );
  const getCourseStudentsById = useCallback(
    (id: string) => {
      return token && dispatch(fetchCourseStudents({ id, token }));
    },
    [dispatch, token],
  );
  const clearSingleCourse = useCallback(() => {
    return dispatch(clearCourse());
  }, [dispatch]);

  // Create a new quiz
  const createNewCourse = useCallback(
    (values: CourseFormType) => {
      if (token) return dispatch(createCourse({ values, token })).unwrap();
    },
    [dispatch, token],
  );

  // Update an existing quiz
  const updateFullExistingCourse = useCallback(
    (id: string, values: CourseFormType) => {
      if (token) return dispatch(updateCourse({ id, values, token })).unwrap();
    },
    [dispatch, token],
  );

  const quickUpdateExistingCourse = useCallback(
    (
      id: string,
      values: Partial<CourseFormType>,
      template?: Partial<CourseItem>,
    ) => {
      template = template || convertCourseFormToItem(values);
      if (token)
        return dispatch(quickUpdateCourse({ id, values, template, token }));
    },
    [dispatch, token],
  );

  // Delete a quiz
  const deleteExistingCourse = useCallback(
    (courseId: string) => {
      if (token) return dispatch(deleteCourse({ id: courseId, token }));
    },
    [dispatch, token],
  );

  const clearCourseError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    // State
    previewCourse,
    courses: data,
    meta,
    loading,
    fetching,
    fetchingStudents,
    error,
    drafting,
    course,
    students,
    cachedId,

    // Actions
    getPreviewedCourse,
    getCourses,
    getCourseById,
    getCourseStudentsById,
    clearSingleCourse,
    createNewCourse,
    updateFullExistingCourse,
    quickUpdateExistingCourse,
    deleteExistingCourse,
    clearCourseError,
  };
};
