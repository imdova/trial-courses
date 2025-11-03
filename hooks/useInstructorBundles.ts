import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createBundle,
  deleteBundle,
  fetchBundleById,
  fetchInstructorBundles,
  updateBundle,
  BundleFilters,
  clearBundlesError,
} from "@/store/slices/instructor-bundles.slice";
import { BundleFormData } from "@/app/(auth)/lms/bundle/utils/bundle.schema";

export const useInstructorBundles = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { data, fetching, loading, error, drafting, cachedId, bundle, cached } =
    useAppSelector((state) => state.instructorBundles);
  // Get the access token from session
  const token = session?.user?.accessToken;

  // Fetch courses with optional filters
  const getBundles = useCallback(
    (filters?: BundleFilters) => {
      if (token)
        return dispatch(
          fetchInstructorBundles({ filters: filters || {}, token }),
        );
    },
    [dispatch, token],
  );

  const getBundleById = useCallback(
    (id: string) => {
      return token && dispatch(fetchBundleById({ id, token }));
    },
    [dispatch, token],
  );

  // Create a new quiz
  const createNewBundle = useCallback(
    (values: BundleFormData) => {
      if (token) return dispatch(createBundle({ values, token })).unwrap();
    },
    [dispatch, token],
  );

  // Update an existing quiz
  const updateExistingBundle = useCallback(
    (id: string, values: Partial<BundleFormData>) => {
      if (token) return dispatch(updateBundle({ id, values, token })).unwrap();
    },
    [dispatch, token],
  );

  // Delete a quiz
  const deleteExistingBundle = useCallback(
    (courseId: string) => {
      if (token) return dispatch(deleteBundle({ id: courseId, token }));
    },
    [dispatch, token],
  );

  const clearBundleError = useCallback(() => {
    dispatch(clearBundlesError());
  }, [dispatch]);

  return {
    // State
    bundles: data,
    bundle,
    cachedId,
    loading,
    fetching,
    error,
    drafting,
    cached,

    // Actions
    getBundles,
    getBundleById,
    createNewBundle,
    updateExistingBundle,
    deleteExistingBundle,
    clearBundleError,
  };
};
