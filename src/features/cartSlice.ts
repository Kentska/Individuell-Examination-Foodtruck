import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../types/apiTypes";


interface CartState {
  error: string;
  loading: string;
  totalPrice: number;
  items: CartItem[];
}
const initialState: CartState = {
  error: "",
  loading: "idle",
  totalPrice: 0,
  items: [],
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
	resetCart: (state) => {
	state.items = [];
	},

    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { resetCart, addItem, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;








