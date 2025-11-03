import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

type GeoInfo = {
  country_name: string;
  country_code2: string;
  region_name: string;
  city: string;
  latitude: number;
  longitude: number;
  isp: string;
};
interface LocationState {
  data: GeoInfo | null;
  loading: boolean;
  error: string | null;
}

const getGeoInfo = (): GeoInfo | null => {
  if (typeof window === "undefined") return null;
  const cached = localStorage.getItem("geoInfo");
  if (!cached) return null;
  const parsed = JSON.parse(cached) as GeoInfo;
  return parsed;
};

const initialState: LocationState = {
  data: getGeoInfo(),
  loading: false,
  error: null,
};

// Async thunk for fetching countries
export const fetchGeoData = createAsyncThunk(
  "geo/fetchGeoData",
  async (_, { rejectWithValue }) => {
    const cached = localStorage.getItem("geoInfo");
    if (cached) {
      const parsed = JSON.parse(cached) as GeoInfo;
      return parsed;
    }
    try {
      const ipResponse = await fetch("https://api64.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const userIP = ipData.ip;

      const response = await fetch(`https://api.iplocation.net/?ip=${userIP}`);

      if (response.ok) {
        const data: GeoInfo = await response.json();
        localStorage.setItem("geoInfo", JSON.stringify(data));
        return data;
      }
      return rejectWithValue("Failed to fetch countries");
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Failed to fetch countries",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.geoLocation.loading) return false;
      if (state.geoLocation.data) return false;
      return true;
    },
  },
);

const geoLocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    clearGeoInfo: (state) => {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
    setGeoInfo: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Countries reducers
    builder
      .addCase(fetchGeoData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeoData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchGeoData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGeoInfo, setGeoInfo } = geoLocationSlice.actions;
export const geoLocationReducer = geoLocationSlice.reducer;
