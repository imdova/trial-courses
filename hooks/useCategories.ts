import { useEffect, useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCategories, clearError, clearCategories } from "@/store/slices/categorySlice";
import type { Category } from "@/store/slices/categorySlice";

export { type Category };

export const useCategories = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { categories, loading, error } = useAppSelector((state) => state.category);
  const [isClient, setIsClient] = useState(false);

  // Ensure this only runs on the client to prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the access token from session
  const token = session?.user?.accessToken;

  const fetchCategoriesData = useCallback(() => {
    if (isClient && token) {
      dispatch(fetchCategories({ token }));
    }
  }, [dispatch, token, isClient]);

  useEffect(() => {
    if (isClient && categories.length === 0 && token) {
      fetchCategoriesData();
    }
  }, [fetchCategoriesData, categories.length, token, isClient]);

  const refetch = useCallback(() => {
    if (isClient && token) {
      dispatch(fetchCategories({ token }));
    }
  }, [dispatch, token, isClient]);

  const clearCategoriesData = useCallback(() => {
    dispatch(clearCategories());
  }, [dispatch]);

  const clearErrorMessage = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    categories: isClient ? categories : [],
    loading: isClient ? loading : false,
    error: isClient ? error : null,
    refetch,
    clearCategories: clearCategoriesData,
    clearError: clearErrorMessage,
  };
};