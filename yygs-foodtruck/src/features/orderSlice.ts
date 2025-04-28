// Logiken för kundvagn
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrderApi } from "../api/orderApi";
import { OrderData } from "../types/apiTypes";

interface PlaceOrderArgs {
  apiKey: string;
  tenantId: string;
  orderData: OrderData;
}

interface OrderState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastOrder: OrderData | null;
}

const initialState: OrderState = {
  status: "idle",
  error: null,
  lastOrder: null,
};


export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async ({ apiKey, tenantId, orderData }: PlaceOrderArgs, thunkAPI) => {
    try {
    

      return await placeOrderApi(apiKey, tenantId, orderData);
    } catch (error: unknown) {
      console.error("Error in placeOrder:", error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
      return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
	resetOrderState: (state) => {
	  state.status = "idle";
	  state.error = null;
	  state.lastOrder = null;
	},
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastOrder = action.payload as unknown as OrderData;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});
export const { resetOrderState } = orderSlice.actions; // Exportera resetOrderState
export default orderSlice.reducer;