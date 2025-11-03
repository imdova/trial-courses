"use client";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { fetchGeoData } from "@/store/slices/geo.slice";

export const useGeoLocation = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.geoLocation);

  const getGeoData = useCallback(() => {
    return dispatch(fetchGeoData());
  }, [dispatch]);

  return {
    data: data,
    loading,
    error,

    getGeoData,
  };
};
