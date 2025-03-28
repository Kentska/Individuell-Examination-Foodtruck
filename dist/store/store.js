//Redux store
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '../features/menuSlice';
import orderReducer from '../features/orderSlice';
import receiptReducer from '../features/receiptSlice';
import cartReducer from '../features/cartSlice';
const store = configureStore({
    reducer: {
        menu: menuReducer,
        orders: orderReducer,
        receipt: receiptReducer,
        cart: cartReducer,
    },
});
export default store;
