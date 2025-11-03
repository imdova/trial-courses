import { CartItem } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartTotals {
  coursesTotal: number;
  productsTotal: number;
  grandTotal: number;
}

interface CartState {
  courses: CartItem[];
  products: CartItem[];
  totals: CartTotals;
}

const initialState: CartState = {
  courses: [],
  products: [],
  totals: {
    coursesTotal: 0,
    productsTotal: 0,
    grandTotal: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCourse: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        image: string;
        description: string;
        price: number;
      }>,
    ) => {
      const { id, title, price, image, description } = action.payload;
      const existingItem = state.courses.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        // courses use price only
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.courses.push({
          id,
          title,
          price,
          image,
          description,
          quantity: 1,
          totalPrice: price,
        });
      }

      state.totals = calculateTotalPrice(state);
    },

    addProduct: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        image: string;
        description: string;
        price: number;
        discountedPrice?: number;
      }>,
    ) => {
      const { id, title, price, image, description, discountedPrice } =
        action.payload;

      const finalPrice = discountedPrice ?? price;

      const existingItem = state.products.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        // use discountedPrice if exists otherwise price
        const effectivePrice =
          existingItem.discountedPrice ?? existingItem.price;
        existingItem.totalPrice = effectivePrice * existingItem.quantity;
      } else {
        state.products.push({
          id,
          title,
          price,
          discountedPrice,
          image,
          description,
          quantity: 1,
          totalPrice: finalPrice,
        });
      }

      state.totals = calculateTotalPrice(state);
    },

    removeCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (item) => item.id !== action.payload,
      );
      state.totals = calculateTotalPrice(state);
    },

    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload,
      );
      state.totals = calculateTotalPrice(state);
    },

    decreaseCourseQuantity: (state, action: PayloadAction<string>) => {
      const item = state.courses.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.totalPrice = item.price * item.quantity;
        } else {
          state.courses = state.courses.filter((i) => i.id !== action.payload);
        }
        state.totals = calculateTotalPrice(state);
      }
    },

    decreaseProductQuantity: (state, action: PayloadAction<string>) => {
      const item = state.products.find((i) => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          // <-- use discountedPrice if present
          const effectivePrice = item.discountedPrice ?? item.price;
          item.totalPrice = effectivePrice * item.quantity;
        } else {
          state.products = state.products.filter(
            (i) => i.id !== action.payload,
          );
        }
        state.totals = calculateTotalPrice(state);
      }
    },

    updateCourseQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.courses.find((i) => i.id === id);

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
          item.totalPrice = item.price * quantity;
        } else {
          state.courses = state.courses.filter((i) => i.id !== id);
        }
        state.totals = calculateTotalPrice(state);
      }
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const item = state.products.find((i) => i.id === id);

      if (item) {
        if (quantity > 0) {
          item.quantity = quantity;
          // <-- use discountedPrice if present
          const effectivePrice = item.discountedPrice ?? item.price;
          item.totalPrice = effectivePrice * quantity;
        } else {
          state.products = state.products.filter((i) => i.id !== id);
        }
        state.totals = calculateTotalPrice(state);
      }
    },

    clearCart: (state) => {
      state.courses = [];
      state.products = [];
      state.totals = { coursesTotal: 0, productsTotal: 0, grandTotal: 0 };
    },
  },
});

// Helper function
const calculateTotalPrice = (state: CartState): CartTotals => {
  const coursesTotal = state.courses.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );
  const productsTotal = state.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0,
  );
  return {
    coursesTotal,
    productsTotal,
    grandTotal: coursesTotal + productsTotal,
  };
};

export const {
  addCourse,
  addProduct,
  removeCourse,
  removeProduct,
  decreaseCourseQuantity,
  decreaseProductQuantity,
  updateCourseQuantity,
  updateProductQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
