import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  clearAcademyError,
  fetchAcademy,
  updateAcademy,
} from "@/store/slices/academy.slice";
import { AcademyForm } from "@/types/academy";
import { User } from "next-auth";
import { diffObjects } from "@/util/forms";

export const useAcademy = () => {
  const dispatch = useAppDispatch();
  const { data: session, update } = useSession();
  const { data, status, error } = useAppSelector((state) => state.academy);
  // Get the access token from session
  const token = session?.user?.accessToken;
  const academyId = session?.user?.academy?.id;

  // Fetch courses with optional filters
  const getAcademy = useCallback(() => {
    if (token && academyId)
      return dispatch(fetchAcademy({ id: academyId, token }));
  }, [dispatch, token, academyId]);

  // Update an existing course
  const updateAcademyHandler = useCallback(
    async (values: Partial<AcademyForm>) => {
      if (token && academyId) {
        const updatedAcademy = await dispatch(
          updateAcademy({ id: academyId, values, token }),
        ).unwrap();

        const userAcademy: User["academy"] = {
          id: updatedAcademy.id,
          description: updatedAcademy.description,
          image: updatedAcademy.image,
          name: updatedAcademy.name,
          slug: updatedAcademy.slug,
        };

        const isDiff = diffObjects(session?.user?.academy, userAcademy, {
          ignoreMissing: true,
        });
        if (isDiff.length > 0) {
          await update({ user: { academy: userAcademy } });

          if (isDiff.map((diff) => diff.key).includes("slug")) {
            setTimeout(() => {
              window.location.replace(`/ac/${updatedAcademy.slug}`);
            }, 100);
          }
        }

        return updatedAcademy;
      }
    },
    [dispatch, token, academyId, update, session?.user?.academy],
  );

  const clearAcademyErrorsHandler = useCallback(() => {
    dispatch(clearAcademyError());
  }, [dispatch]);

  return {
    // State
    academy: data,
    status,
    error,

    // Actions
    getAcademy,
    updateAcademyHandler,
    clearAcademyErrorsHandler,
  };
};
