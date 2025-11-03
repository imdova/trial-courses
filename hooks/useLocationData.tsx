import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchStates,
  fetchStatesByCountries,
} from "@/store/slices/locationSlice";
import { useEffect, useState } from "react";
import countries from "@/constants/countries.json";

export const useLocationData = (selectedCountryCode?: string | string[]) => {
  const dispatch = useAppDispatch();
  const { states } = useAppSelector((state) => state.location);
  const [cachedCountry, setCached] = useState<string | string[] | null>(null);

  useEffect(() => {
    if (JSON.stringify(selectedCountryCode) === JSON.stringify(cachedCountry))
      return;
    if (Array.isArray(selectedCountryCode)) {
      dispatch(fetchStatesByCountries(selectedCountryCode));
      setCached(selectedCountryCode);
    } else if (selectedCountryCode) {
      setCached(selectedCountryCode);
      dispatch(fetchStates(selectedCountryCode));
    }
  }, [dispatch, selectedCountryCode, cachedCountry]);

  return {
    countries: countries,
    states: selectedCountryCode ? states.data : [],
  };
};
