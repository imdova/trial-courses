import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchInstructors, clearInstructors, setSearchQuery } from "@/store/slices/instructors.slice";

export const useInstructors = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const { data, pagination, fetching, error, searchQuery } = useAppSelector(
    (state) => state.instructors
  );

  const getInstructors = useCallback(
    (params?: { page?: number; limit?: number; search?: string }) => {
      if (!token) return;
      return dispatch(
        fetchInstructors({
          token,
          page: params?.page || 1,
          limit: params?.limit || 10,
          search: params?.search || "",
        })
      );
    },
    [dispatch, token]
  );

  const searchInstructors = useCallback(
    (search: string, limit: number = 10) => {
      if (!token) return;
      dispatch(setSearchQuery(search));
      return dispatch(
        fetchInstructors({
          token,
          page: 1,
          limit,
          search,
        })
      );
    },
    [dispatch, token]
  );

  const clearInstructorsData = useCallback(() => {
    dispatch(clearInstructors());
  }, [dispatch]);

  return {
    instructors: data,
    pagination,
    loading: fetching,
    error,
    searchQuery,
    getInstructors,
    searchInstructors,
    clearInstructors: clearInstructorsData,
  };
};

