// Hantering av menydata
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenuApi } from "../api/menuApi";
const initialState = {
    items: [],
    status: "idle",
    error: null,
};
// Thunk för att hämta menyn
export const fetchMenu = createAsyncThunk("menu/fetchMenu", (apiKey, thunkAPI) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield fetchMenuApi(apiKey);
    }
    catch (error) {
        console.error('Error in fetchMenu:', error);
        if (error instanceof Error) {
            return thunkAPI.rejectWithValue(error.message);
        }
        return thunkAPI.rejectWithValue('An unknown error occured');
    }
}));
const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
            state.status = "loading";
        })
            .addCase(fetchMenu.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload; // Uppdatera menyn
        })
            .addCase(fetchMenu.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});
export default menuSlice.reducer;
