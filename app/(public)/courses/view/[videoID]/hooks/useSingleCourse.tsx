import { fetchSingleCourse } from "@/store/slices/singleCourse";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { useSession } from "next-auth/react";


export const useSingleCourse = (id: string) => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  const dispatch = useAppDispatch();
  const { course, loading, error } = useAppSelector((state) => state.singleCourse);

  const getSingleCourse = useCallback(() => {
    if (token) {
      dispatch(fetchSingleCourse({ id, token }));
    }
  }, [dispatch, id, token]);

  return { course, loading, error, getSingleCourse };
};