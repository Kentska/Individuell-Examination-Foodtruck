// Hantering av kvitto
import { createSlice } from '@reduxjs/toolkit';
import { Receipt } from '../types/apiTypes';

interface ReceiptState {
	items: Receipt[]; // Array of Receipt items
}

const initialState: ReceiptState = {
	items: [], // Initialize with an empty array
};

const receiptSlice = createSlice({
  name: 'receipt',
  initialState,
  reducers: {
    setReceipts(state, action) {
      state.items = action.payload; //Uppdatera kvitton
    },
    clearReceipts(state) {
      state.items = []; // Töm kvitton
    },
  },
});

export const { setReceipts, clearReceipts } = receiptSlice.actions;
export default receiptSlice.reducer;