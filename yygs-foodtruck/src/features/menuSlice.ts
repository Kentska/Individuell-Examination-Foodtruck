// Hantering av menydata
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMenuApi } from "../api/menuApi";
import { MenuItem } from "../types/apiTypes";


interface MenuState {
  items: MenuItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  status: "idle",
  error: null,
};

// Thunk för att hämta menyn
export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (apiKey: string, thunkAPI) => {
    try {
      return await fetchMenuApi(apiKey);
    } catch (error: unknown) {
		console.error('Error in fetchMenu:', error);
		if (error instanceof Error) {
			 return thunkAPI.rejectWithValue(error.message);
		}
      return thunkAPI.rejectWithValue('An unknown error occured');
    }
  }
);

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
        state.error = action.payload as string;
      });
  },
});

export default menuSlice.reducer;