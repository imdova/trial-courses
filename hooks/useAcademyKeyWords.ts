import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchAcademyKeywords,
  clearAcademyKeywords,
} from "@/store/slices/academyKeywords.slice";

export const useAcademyKeywords = () => {
  const dispatch = useAppDispatch();
  const { data, fetching } = useAppSelector((state) => state.academyKeywords);

  // Fetch courses with optional filters
  const getAcademyKeywords = useCallback(() => {
    return dispatch(fetchAcademyKeywords());
  }, [dispatch]);

  const clearAcademyKeywordsHandler = useCallback(() => {
    dispatch(clearAcademyKeywords());
  }, [dispatch]);

  // auto fetch

  useEffect(() => {
    getAcademyKeywords();
  }, [getAcademyKeywords]);

  return {
    // State
    keyWords: data,
    fetching,

    // Actions
    getAcademyKeywords,
    clearAcademyKeywordsHandler,
  };
};
