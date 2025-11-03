import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CouponFormData } from "@/types/coupon";
import {
  fetchInstructorCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
  clearCouponsError,
  CouponFilters,
} from "@/store/slices/instructor-coupons.slice";

export const useInstructorCoupons = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { data, fetching, loading, error, cached } = useAppSelector(
    (state) => state.instructorCoupons,
  );
  // Get the access token from session
  const token = session?.user?.accessToken;

  // Fetch courses with optional filters
  const getCoupons = useCallback(
    (filters?: CouponFilters) => {
      if (token)
        return dispatch(
          fetchInstructorCoupons({ filters: filters || {}, token }),
        );
    },
    [dispatch, token],
  );

  // Create a new coupon
  const createNewCoupon = useCallback(
    (values: CouponFormData) => {
      if (token) return dispatch(createCoupon({ values, token })).unwrap();
    },
    [dispatch, token],
  );

  // Update an existing coupon
  const updateExistingCoupon = useCallback(
    (id: string, values: Partial<CouponFormData>) => {
      if (token) return dispatch(updateCoupon({ id, values, token })).unwrap();
    },
    [dispatch, token],
  );

  // Delete a coupon
  const deleteExistingCoupon = useCallback(
    (couponId: string) => {
      if (token) return dispatch(deleteCoupon({ id: couponId, token }));
    },
    [dispatch, token],
  );

  const clearCouponError = useCallback(() => {
    dispatch(clearCouponsError());
  }, [dispatch]);

  return {
    // State
    coupons: data,
    loading,
    fetching,
    error,
    cached,

    // Actions
    getCoupons,
    createNewCoupon,
    updateExistingCoupon,
    deleteExistingCoupon,
    clearCouponError,
  };
};
