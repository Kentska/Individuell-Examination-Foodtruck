var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Logiken för kundvagn
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { placeOrderApi } from "../api/orderApi";
const initialState = {
    status: "idle",
    error: null,
    lastOrder: null,
};
export const placeOrder = createAsyncThunk("orders/placeOrder", (_a, thunkAPI_1) => __awaiter(void 0, [_a, thunkAPI_1], void 0, function* ({ apiKey, tenantId, orderData }, thunkAPI) {
    try {
        // Mappa om OrderData till PlaceOrderData
        return yield placeOrderApi(apiKey, tenantId, orderData);
    }
    catch (error) {
        console.error("Error in placeOrder:", error);
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue("An unknown error occurred.");
    }
}));
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
            state.lastOrder = action.payload;
        })
            .addCase(placeOrder.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});
export const { resetOrderState } = orderSlice.actions; // Exportera resetOrderState
export default orderSlice.reducer;
