import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AcademyInstructor, AcademyInstructorForm } from "@/types/academy";
import {
  createAcademyInstructor,
  deleteAcademyInstructor,
  fetchAcademyInstructors,
  updateAcademyInstructor,
} from "@/store/slices/academyInstructors.slice";
import { useAcademy } from "./useAcademy";

export const useAcademyInstructors = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { academy } = useAcademy();
  const { data, fetching, loading, error, cached } = useAppSelector(
    (state) => state.academyInstructors,
  );
  // Get the access token from session
  const token = session?.user?.accessToken;
  const academyId = session?.user?.academy?.id;

  const getAcademyInstructors = useCallback(() => {
    if (token && academyId)
      return dispatch(fetchAcademyInstructors({ academyId, token }));
  }, [dispatch, token, academyId]);

  const createAcademyInstructorHandler = useCallback(
    (values: AcademyInstructorForm, template: AcademyInstructor) => {
      if (token && academyId)
        return dispatch(
          createAcademyInstructor({ academyId, values, token, template }),
        ).unwrap();
    },
    [dispatch, token, academyId],
  );

  // ─── Update Instructor (Optimistic) ───
  const updateAcademyInstructorHandler = useCallback(
    (id: string, values: Partial<AcademyInstructorForm>) => {
      if (token && academyId)
        return dispatch(
          updateAcademyInstructor({ academyId, id, token, values }),
        ).unwrap();
    },
    [dispatch, token, academyId],
  );

  // ─── Delete Instructor (Optimistic) ───
  const deleteAcademyInstructorHandler = useCallback(
    (id: string) => {
      if (token && academyId)
        dispatch(deleteAcademyInstructor({ academyId, id, token }));
    },
    [dispatch, token, academyId],
  );

  const academyInstructors: AcademyInstructor[] = academy?.instructors || [];

  return {
    // State
    instructors: data.length > 0 ? data : academyInstructors,
    fetching,
    loading,
    error,
    cached,
    // Actions
    getAcademyInstructors,
    createAcademyInstructorHandler,
    updateAcademyInstructorHandler,
    deleteAcademyInstructorHandler,
  };
};
