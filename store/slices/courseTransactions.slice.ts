import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CourseTransaction } from "@/types/transaction";
import { toast } from "@/components/UI/toast";

interface CourseTransactionState {
  data: CourseTransaction[];
  fetching: boolean;
  loading: boolean;
  cached: boolean;
}

const initialState: CourseTransactionState = {
  data: [],
  fetching: false,
  loading: false,
  cached: false,
};

const transactions: CourseTransaction[] = [
  {
    id: "EG_001",
    firstName: "Abdelrahman",
    lastName: "Ahmed",
    email: "abdelrahman@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    item: "Advanced React",
    type: "course",
    currency: "USD",
    amount: 89.99,
    method: "Credit Card",
    created_at: "April 5, 2025",
  },
  {
    id: "EG_002",
    firstName: "Laila",
    lastName: "Mostafa",
    email: "laila.mostafa@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    item: "Full Stack Mastery",
    type: "bundle",
    currency: "USD",
    amount: 129.99,
    method: "Visa",
    created_at: "March 28, 2025",
  },
  {
    id: "EG_003",
    firstName: "Omar",
    lastName: "Hassan",
    email: "omar.hassan@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    item: "UI/UX Design Basics",
    type: "course",
    currency: "USD",
    amount: 59.99,
    method: "Wallet",
    created_at: "March 20, 2025",
  },
  {
    id: "EG_004",
    firstName: "Sara",
    lastName: "Khaled",
    email: "sara.khaled@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    item: "Frontend Pro Pack",
    type: "bundle",
    currency: "USD",
    amount: 149.0,
    method: "InstaPay",
    created_at: "April 10, 2025",
  },
  {
    id: "EG_005",
    firstName: "Youssef",
    lastName: "Mahmoud",
    email: "youssef.mahmoud@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    item: "JavaScript from Zero",
    type: "course",
    currency: "USD",
    amount: 79.99,
    method: "PayPal",
    created_at: "April 15, 2025",
  },
  {
    id: "EG_006",
    firstName: "Nour",
    lastName: "Ali",
    email: "nour.ali@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    item: "Python for Data Science",
    type: "course",
    currency: "USD",
    amount: 99.99,
    method: "Credit Card",
    created_at: "April 22, 2025",
  },
  {
    id: "EG_007",
    firstName: "Karim",
    lastName: "Fathy",
    email: "karim.fathy@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    item: "Machine Learning Advanced",
    type: "bundle",
    currency: "USD",
    amount: 199.99,
    method: "Wallet",
    created_at: "May 1, 2025",
  },
  {
    id: "EG_008",
    firstName: "Mona",
    lastName: "Ibrahim",
    email: "mona.ibrahim@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    item: "Next.js Deep Dive",
    type: "course",
    currency: "USD",
    amount: 89.99,
    method: "PayPal",
    created_at: "May 5, 2025",
  },
  {
    id: "EG_009",
    firstName: "Tarek",
    lastName: "Samir",
    email: "tarek.samir@gmail.com",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    item: "Backend Essentials",
    type: "course",
    currency: "USD",
    amount: 69.99,
    method: "Visa",
    created_at: "May 10, 2025",
  },
  {
    id: "EG_010",
    firstName: "Heba",
    lastName: "Saeed",
    email: "heba.saeed@gmail.com",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    item: "Web Developer Bundle",
    type: "bundle",
    currency: "USD",
    amount: 159.0,
    method: "InstaPay",
    created_at: "May 14, 2025",
  },
];

// ─── Fetch Course Transactions ──────────────────────────────
export const fetchCourseTransactions = createAsyncThunk(
  "courseTransactions/fetchCourseTransactions",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await fetch(API_GET_ADMIN_COURSE_TRANSACTIONS, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //     accept: "application/json",
      //   },
      // });
      // if (response.ok) {
      //   const data: PaginatedResponse<CourseTransaction> =
      //     await response.json();
      //   return data.data;
      // }
      // return rejectWithValue("Failed to fetch course transactions");
      return transactions;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to fetch course transactions",
      );
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState;
      if (state.courseTransactions.fetching) return false;
      if (state.courseTransactions.cached) return false;
      return true;
    },
  },
);

// ─── Update Course Transaction ──────────────────────────────
export const updateCourseTransaction = createAsyncThunk(
  "courseTransactions/updateCourseTransaction",
  async (
    { id, updates }: { id: string; updates: Partial<CourseTransaction> },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("API_UPDATE_ADMIN_COURSE_TRANSACTION", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ id, ...updates }),
      });

      if (response.ok) {
        const data: CourseTransaction = await response.json();
        return data;
      }

      const error = await response.json();
      return rejectWithValue(
        error.message || "Failed to update course transaction",
      );
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "Failed to update course transaction",
      );
    }
  },
);

// ─── Slice ──────────────────────────────────────────────
const courseTransactionsSlice = createSlice({
  name: "courseTransactions",
  initialState,
  reducers: {
    clearCourseTransactions: (state) => {
      state.data = [];
      state.fetching = false;
      state.loading = false;
      state.cached = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // ─── Fetch ───
      .addCase(fetchCourseTransactions.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchCourseTransactions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.fetching = false;
        state.cached = true;
      })
      .addCase(fetchCourseTransactions.rejected, (state, action) => {
        state.fetching = false;
        toast.error("Error Fetching Transactions", {
          description: action.payload as string,
        });
      })

      // ─── Update ───
      .addCase(updateCourseTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourseTransaction.fulfilled, (state, action) => {
        state.data = state.data.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        );
        state.loading = false;
      })
      .addCase(updateCourseTransaction.rejected, (state, action) => {
        toast.error("Error Updating Transaction", {
          description: action.payload as string,
        });
        state.loading = false;
      });
  },
});

// ─── Export ──────────────────────────────────────────────
export const { clearCourseTransactions } = courseTransactionsSlice.actions;
export const courseTransactionsReducer = courseTransactionsSlice.reducer;
