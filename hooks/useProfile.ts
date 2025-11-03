/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { 
  fetchProfile, 
  updateProfile, 
  clearProfile, 
  clearErrors, 
  updateProfileField 
} from "@/store/slices/profileSlice";

export const useProfile = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { profile, loading, error, updating, updateError } = useAppSelector(
    (state) => state.profile
  );

  // Get the access token from session
  const token = session?.user?.accessToken;

  const getProfile = useCallback(
    (userId: string) => {
      return dispatch(fetchProfile({ userId, token }));
    },
    [dispatch, token]
  );

  const saveProfile = useCallback(
    (userId: string, profileData: any) => {
      return dispatch(updateProfile({ userId, profileData, token }));
    },
    [dispatch, token]
  );

  const clearProfileData = useCallback(() => {
    dispatch(clearProfile());
  }, [dispatch]);

  const clearProfileErrors = useCallback(() => {
    dispatch(clearErrors());
  }, [dispatch]);

  const updateField = useCallback(
    (field: string, value: any) => {
      dispatch(updateProfileField({ field, value }));
    },
    [dispatch]
  );

  return {
    // State
    profile,
    loading,
    error,
    updating,
    updateError,
    
    // Actions
    getProfile,
    saveProfile,
    clearProfileData,
    clearProfileErrors,
    updateField,
  };
};